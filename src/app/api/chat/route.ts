import { NextRequest } from 'next/server';
import { getAssessment, updateAssessment } from '@/lib/assessment-service';
import { questions } from '@/lib/questions';
import { ChatOpenAI } from '@langchain/openai';
import { SystemMessage } from '@langchain/core/messages';
import { currentUser } from '@clerk/nextjs/server';
import { iteratorToStream } from '@/lib/stream-utils';

export const maxDuration = 60;

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

    const llm = new ChatOpenAI({
      model: 'gpt-4o-mini',
      temperature: 0,
      apiKey: process.env.OPENAI_API_KEY
    });

    // ------------------------------------------------------------------
    // HANDLE COMPLETED STATE (Review Mode)
    // ------------------------------------------------------------------
    if (isCompleted) {
        const reviewPrompt = `
        You are a helpful assistant assisting a user who has just completed their business assessment.
        The user is reviewing their answers and may want to update them.

        Current Answers:
        ${JSON.stringify(assessment.answers, null, 2)}

        Questions Reference:
        ${questions.map(q => `${q.id}: ${q.text}`).join('\n')}

        User Input: "${lastMessage.content}"

        Task:
        1. Determine if the user is asking to update a specific question.
        2. If YES, identify the Question ID and the New Answer.
        3. If NO, just chat helpfully.

        Return JSON:
        {
           "isUpdate": boolean,
           "questionId": string | null,
           "newAnswer": string | null,
           "responseMessage": string
        }

        If it is an update, "responseMessage" should confirm the update (e.g., "I've updated your Company Name to 'Acme Inc'.").
        If not, "responseMessage" should be a normal helpful reply.
        `;

        const reviewRes = await llm.invoke([
            new SystemMessage(reviewPrompt),
        ]);

        let reviewData = { isUpdate: false, questionId: null, newAnswer: null, responseMessage: "I'm here to help." };
        try {
            const clean = (reviewRes.content as string).replace(/```json/g, '').replace(/```/g, '').trim();
            reviewData = JSON.parse(clean);
        } catch (e) {
            console.error("Failed to parse review logic", e);
            // Fallback to simple chat
            const fallbackStream = await llm.stream([
                new SystemMessage("You are a helpful assistant. The user has completed the assessment. Respond to: " + lastMessage.content)
            ]);
            return new Response(iteratorToStream(fallbackStream));
        }

        if (reviewData.isUpdate && reviewData.questionId && reviewData.newAnswer) {
             const updatedAnswers = { ...assessment.answers, [reviewData.questionId]: reviewData.newAnswer };
             await updateAssessment(user.id, { answers: updatedAnswers });
        }

        // Return the response message as a stream
        const stream = await llm.stream([new SystemMessage(`Just repeat this exactly: ${reviewData.responseMessage}`)]);
        return new Response(iteratorToStream(stream));
    }

    // ------------------------------------------------------------------
    // HANDLE IN-PROGRESS STATE
    // ------------------------------------------------------------------

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

  } catch (error) {
    console.error('Error in chat route:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
