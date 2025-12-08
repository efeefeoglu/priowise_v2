import { NextRequest } from 'next/server';
import { getAssessment, updateAssessment } from '@/lib/assessment-service';
import { questions } from '@/lib/questions';
import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { currentUser } from '@clerk/nextjs/server';
import { iteratorToStream } from '@/lib/stream-utils';
import { parseFile } from '@/lib/file-processing';

export const maxDuration = 60; // Allow longer duration for file processing

const DELIMITER_START = ':::JSON_START:::';
const DELIMITER_END = ':::JSON_END:::';

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { messages, data } = await req.json();
    const lastMessage = messages[messages.length - 1];

    // Extracted answers from client state (passed in every request)
    const clientExtractedContext = data?.extractedContext || {};

    const assessment = await getAssessment(user.id);
    const currentQIndex = assessment.currentQuestionIndex;
    const isCompleted = assessment.status === 'completed';

    if (isCompleted) {
        return new Response("Assessment already completed.", { status: 200 });
    }

    const llm = new ChatOpenAI({
      model: 'gpt-4o-mini',
      temperature: 0,
      apiKey: process.env.OPENAI_API_KEY
    });

    // --- LOGIC FLOW ---

    let isFileUpload = false;
    let fileContent = "";

    if (data?.file) {
        isFileUpload = true;
        // Parse the file content from base64
        if (data.file.content) {
            try {
                const buffer = Buffer.from(data.file.content, 'base64');
                fileContent = await parseFile(buffer, data.file.type);
            } catch (e) {
                console.error("File parsing failed", e);
                fileContent = "Error parsing file.";
            }
        }
    }

    if (isFileUpload) {
        // File Analysis Logic
        const remainingQuestions = questions.filter((_, i) => i >= currentQIndex);

        const analysisPrompt = `
        You are an expert business analyst.
        Analyze the following document content and extract answers for the following questions.
        Only extract answers if they are explicitly present or strongly implied in the document.
        Do not guess.

        Questions to answer:
        ${JSON.stringify(remainingQuestions.map(q => ({ id: q.id, text: q.text })))}

        Return the result as a valid JSON object where keys are question IDs (e.g., "q1") and values are the extracted answers strings.
        Example: { "q1": "Acme Corp", "q3": "SaaS" }
        If you are unsure about a question, do not include its key.
        Do not include markdown formatting like \`\`\`json. Just raw JSON.

        Document Content:
        ${fileContent.substring(0, 50000)} // Limit context
        `;

        const analysisRes = await llm.invoke([new SystemMessage(analysisPrompt)]);
        let analysisJson = {};
        try {
            let clean = (analysisRes.content as string).replace(/```json/g, '').replace(/```/g, '').trim();
            analysisJson = JSON.parse(clean);
        } catch (e) {
            console.error("JSON parse error from LLM analysis", e);
        }

        // Merge with existing context
        const newContext = { ...clientExtractedContext, ...analysisJson };

        // Prepare Response
        // We will confirm receipt and send the hidden data.

        const responseMessage = `I've analyzed your document "${data.file.name}". I found potential answers for ${Object.keys(analysisJson).length} questions. We'll use these as we go! Let's continue.`;

        // We need to return a stream that contains the text AND the hidden block.
        // We can just create a simple iterator.

        const fullResponse = `${responseMessage}${DELIMITER_START}${JSON.stringify(analysisJson)}${DELIMITER_END}`;

        // Since we are not asking a question yet (or we should?), let's just trigger the NEXT question logic?
        // Actually, if we just say "Let's continue", the user has to type something?
        // Better: Say "Let's continue. [Repeat Current Question]"
        // But the Current Question Logic is below.

        // Let's chain the flow.
        // If file uploaded, we update the context.
        // Then we proceed to "Generate Response" logic, BUT treating the "User Input" as the file upload event.
        // We should skip "Answer Validation" for the *current* question because the user didn't answer it, they just uploaded a file.
        // So we skip to "Ask Next Question" (which is actually the *Same* question, but now with context).

        // However, `data.file` upload is a distinct event.
        // Let's return the stream directly here for simplicity, prompting the *same* question again but with the new context awareness?
        // Or just let the user say "Ready" or "Okay"?
        // Let's just output the confirmation and the current question again immediately.

        const currentQ = questions[currentQIndex];

        // Check if we extracted an answer for the CURRENT question
        const extractedForCurrent = newContext[currentQ.id];

        let followUpText = "";
        if (extractedForCurrent) {
            followUpText = `\n\nFor the current question "**${currentQ.text}**", I found: \n> ${extractedForCurrent}\n\nIs this correct?`;
        } else {
            followUpText = `\n\n**${currentQ.text}**`;
        }

        const streamIterator = async function* () {
            const text = responseMessage + followUpText;
            // Send text in chunks to simulate typing
            const chunkSize = 10;
            for (let i = 0; i < text.length; i += chunkSize) {
                yield text.slice(i, i + chunkSize);
                await new Promise(r => setTimeout(r, 10)); // tiny delay
            }
            // Append hidden block at the end
            yield `${DELIMITER_START}${JSON.stringify(analysisJson)}${DELIMITER_END}`;
        };

        return new Response(iteratorToStream(streamIterator()));

    } else {
        // Normal Text Flow
        const currentQ = questions[currentQIndex];

        // Check if the user's message is an answer.
        // We need to be aware if we just asked "Is this correct?" for a file extraction.
        // If `clientExtractedContext[currentQ.id]` exists, the previous message from AI *likely* asked for confirmation.
        // So "Yes" means "Use extracted answer".

        const pendingAnswer = clientExtractedContext[currentQ.id];

        const validationPrompt = `
        Context: The user is answering Question: "${currentQ.text}".
        ${pendingAnswer ? `There is a PENDING ANSWER from a file upload: "${pendingAnswer}".` : ''}

        User Input: "${lastMessage.content}"

        Task: Determine if the user is confirming the pending answer, providing a new answer, or asking a question.

        1. If user says "Yes", "Correct", "Sure" AND there is a pending answer -> Use pending answer.
        2. If user provides a different answer -> Use user's answer.
        3. If user asks a question -> Not an answer.
        4. If user says "No" -> Not an answer (ask for correct one).

        Return JSON:
        {
          "isAnswer": boolean,
          "extractedText": string (the final answer to save),
          "switchLanguage": string (optional)
        }
        `;

        const validationRes = await llm.invoke([
            new SystemMessage(validationPrompt),
        ]);

        let validationData = { isAnswer: false, extractedText: "", switchLanguage: "" };
        try {
            const clean = (validationRes.content as string).replace(/```json/g, '').replace(/```/g, '').trim();
            validationData = JSON.parse(clean);
        } catch (e) {
             // Fallback
             if (lastMessage.content.length > 1) {
                validationData = { isAnswer: true, extractedText: lastMessage.content, switchLanguage: "" };
             }
        }

        let nextQ = questions[currentQIndex];
        let milestoneMsg = "";
        let nextIndex = currentQIndex;

        if (validationData.switchLanguage) {
             await updateAssessment(user.id, { language: validationData.switchLanguage });
        }
        else if (validationData.isAnswer) {
             // Save Answer
             const updatedAnswers = { ...assessment.answers, [currentQ.id]: validationData.extractedText };
             const newIndex = currentQIndex + 1;

             await updateAssessment(user.id, {
                answers: updatedAnswers,
                currentQuestionIndex: newIndex,
                status: newIndex >= questions.length ? 'completed' : 'in_progress'
             });

             nextIndex = newIndex;
             nextQ = questions[nextIndex]; // This might be undefined if completed

             if (currentQ.id === 'q12') milestoneMsg = "You're halfway there! 🚀";
             if (currentQ.id === 'q19') milestoneMsg = "You're almost done! 🔥";
        }

        // Now generate the conversational response

        if (nextIndex >= questions.length) {
            // Completion
            const summaryPrompt = `
            The user has completed the assessment.
            Generate the completion summary.
            Answers: ${JSON.stringify(assessment.answers)}
            Last Answer: ${validationData.extractedText}
            `;

            const stream = await llm.stream([new SystemMessage(summaryPrompt)]);
            return new Response(iteratorToStream(stream));
        }

        // Determine if the Next Question has a pending extracted answer
        const pendingForNext = clientExtractedContext[nextQ.id];

        const responseSystemPrompt = `
        You are a friendly business assessment bot.
        Language: ${assessment.language || 'en'}.

        ${validationData.isAnswer ? `
        The user answered the previous question.
        Answer recorded: "${validationData.extractedText}".
        Acknowledge it briefly.
        ${milestoneMsg}
        ` : `
        The user asked a question or gave invalid input.
        Address it, then repeat the Current Question.
        `}

        Next Question: "${nextQ.text}"

        ${pendingForNext ? `
        SPECIAL INSTRUCTION:
        You have an answer extracted from their uploaded file for this question: "${pendingForNext}".
        Instead of asking the standard question, say something like:
        "Based on your document, it looks like [rephrase question topic] is '${pendingForNext}'. Is that correct?"
        ` : `
        Ask the question normally.
        ${nextQ.options ? `Options: ${nextQ.options.join(', ')}` : ''}
        `}

        Rules:
        - One question at a time.
        - Be encouraging.
        `;

        const stream = await llm.stream([new SystemMessage(responseSystemPrompt)]);
        return new Response(iteratorToStream(stream));
    }

  } catch (error) {
    console.error('Error in chat route:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
