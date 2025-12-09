import { NextRequest } from 'next/server';
import { getAssessment } from '@/lib/assessment-service';
import { questions } from '@/lib/questions';
import { ChatOpenAI } from '@langchain/openai';
import { SystemMessage } from '@langchain/core/messages';
import { currentUser } from '@clerk/nextjs/server';
import { parseFile } from '@/lib/file-processing';

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return new Response('No file provided', { status: 400 });
    }

    // Convert file to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let fileContent = "";
    try {
        fileContent = await parseFile(buffer, file.type);
    } catch (e) {
        console.error("File parsing failed", e);
        return new Response('Error parsing file content', { status: 500 });
    }

    if (!fileContent || fileContent.trim().length === 0) {
        return new Response('File is empty or could not be read.', { status: 400 });
    }

    const assessment = await getAssessment(user.id);
    const currentQIndex = assessment.currentQuestionIndex;

    const llm = new ChatOpenAI({
      model: 'gpt-4o-mini',
      temperature: 0,
      apiKey: process.env.OPENAI_API_KEY
    });

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
        // We return empty JSON instead of erroring, so the user can just continue.
    }

    return new Response(JSON.stringify(analysisJson), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error in upload route:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
