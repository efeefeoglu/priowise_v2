import { NextRequest } from 'next/server';
import { ChatOpenAI } from '@langchain/openai';
import { SystemMessage, HumanMessage } from '@langchain/core/messages';
import { currentUser } from '@clerk/nextjs/server';

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }

    const { prompt, currentHtml, images } = await req.json();

    console.log('AI Assist Request:', { prompt, imageCount: images?.length });

    if (!prompt) {
      return new Response(JSON.stringify({ error: 'Prompt is required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const llm = new ChatOpenAI({
      model: 'gpt-4o-mini',
      temperature: 0,
      apiKey: process.env.OPENAI_API_KEY
    });

    const systemPrompt = `
You are an expert content formatter for a blog. Your goal is to produce clean, valid, semantic HTML based on the user's input and context.

RULES:
1. Output ONLY valid HTML tags: <h2> through <h6>, <p>, <ul>, <ol>, <li>, <strong>, <em>, <a>, <img>.
2. Use <h3> for subtitles/section headings unless specifically asked otherwise.
3. Text always begins with an introduction, which follows the main heading. It doesn't need an H3 heading. 
3. DO NOT generate any CSS, <style> tags, or class attributes. Pure HTML only.
4. DO NOT include <html>, <head>, or <body> tags. Return the content body only.
5. If the User Input is a request to modify the existing content (e.g., "make the second paragraph bold", "change bullets to numbers"), apply that change to the "Current Context HTML".
6. If the User Input is raw text (e.g., a pasted article), convert it into the structured HTML format described above.
7. If images are provided in the context, YOU MUST insert them into the content using <img> tags. Do NOT ignore them.
   - Use the provided URL in the 'src' attribute.
   - Use the file name (without extension) as the 'alt' text if no better description can be inferred.
   - If the user specifies placement (e.g., "put image A after the intro"), follow it.
   - If no placement is specified, distribute them logically throughout the content or append them at the end.
   - Ensure the images are wrapped in <p> tags or their own block elements if appropriate.
   - Example insertion: <p><img src="URL" alt="Description"></p>
8. Return the response in strict JSON format:
{
  "html": "The full updated HTML content",
  "message": "A short confirmation message (e.g., 'Converted text to HTML', 'Updated headings to H3')"
}
    `;

    const userContent = `
Current Context HTML:
${currentHtml || '(None)'}

User Input:
${prompt}

Available Images (to be inserted if not already present):
${images ? JSON.stringify(images) : '(None)'}
    `;

    const response = await llm.invoke([
      new SystemMessage(systemPrompt),
      new HumanMessage(userContent)
    ]);

    let result = { html: '', message: '' };
    try {
        const cleanContent = (response.content as string).replace(/```json/g, '').replace(/```/g, '').trim();
        result = JSON.parse(cleanContent);
    } catch (e) {
        console.error("Failed to parse AI response", e);
        // Fallback if JSON parsing fails - treat entire content as HTML if it looks like it, or error
        return new Response(JSON.stringify({ error: 'Failed to generate valid JSON response from AI' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    console.error('Error in blog ai-assist route:', error);
    return new Response(JSON.stringify({ error: error.message || 'Internal Server Error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
