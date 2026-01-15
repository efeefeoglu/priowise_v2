import { NextRequest } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { parseFile } from '@/lib/file-processing';
import { ChatOpenAI } from '@langchain/openai';
import { SystemMessage } from '@langchain/core/messages';
import { table, base } from '@/lib/airtable';

export const maxDuration = 300;

function isValidDate(dateString: string): boolean {
    const date = new Date(dateString);
    return !isNaN(date.getTime()) && dateString.trim() !== '';
}

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }
    const userEmail = user.emailAddresses[0]?.emailAddress;

    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return new Response(JSON.stringify({ error: 'No file provided' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    // Convert file to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let fileContent = "";
    try {
        fileContent = await parseFile(buffer, file.type);
    } catch (e: any) {
        console.error("File parsing failed", e);
        return new Response(JSON.stringify({ error: 'Error parsing file content', details: e.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    if (!fileContent || fileContent.trim().length === 0) {
        return new Response(JSON.stringify({ error: 'File is empty or could not be read.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    // Fetch user links from Airtable
    let userRecordId: string | undefined;
    let faRecordId: string | undefined;

    try {
        // Find in Users table (tblXIJvbUjYjUNN7T)
        // Using filterByFormula. Escape single quotes in email just in case.
        const safeEmail = userEmail.replace(/'/g, "\\'");

        const userRecords = await base('tblXIJvbUjYjUNN7T').select({
            maxRecords: 1,
            filterByFormula: `{Email} = '${safeEmail}'`
        }).firstPage();

        if (userRecords.length > 0) {
            userRecordId = userRecords[0].id;
        }

        // Find in 1FA table (tblIErZyMRYEm14bg)
        const faRecords = await base('tblIErZyMRYEm14bg').select({
            maxRecords: 1,
            filterByFormula: `{Email (from Linked record)} = '${safeEmail}'`
        }).firstPage();

        if (faRecords.length > 0) {
            faRecordId = faRecords[0].id;
        }

    } catch (err: any) {
        console.error('Error fetching linked records from Airtable:', err);
        // We continue even if linking fails, or maybe we should error?
        // User instruction implies these are needed. But let's try to proceed.
    }

    const llm = new ChatOpenAI({
      model: 'gpt-4o-mini',
      temperature: 0,
      apiKey: process.env.OPENAI_API_KEY
    });

    const extractionPrompt = `
Your Role as an AI Assistant for Product Features Analysis:
You are an intelligent assistant that extracts product features from uploaded files and prepares them for strategy-based scoring. Your task is to analyze each row of data in the provided input and convert it into a structured and informative feature description that can be used later for strategic prioritization.

Input File Notice:

You are receiving raw file content that may come from a CSV, Excel file, or PDF. Each row typically represents a single feature.
* Columns may include: Name, Description, Tags, Status, Dates, Notes, Owner, etc.
* You must parse this raw content yourself — there is no structured JSON input.
* Ignore table formatting, headers, or system metadata.
* Focus on identifying each distinct feature and extract its values into the final structured output.

Instructions:
	1.	For each feature in the file, extract relevant data from all available fields such as:
* Feature Name or Title
* Description or Details
* Tags / Labels / Categories
* Notes or Comments
* Priority or Status
* Any dates (Planned, Created, Finished)
* Owner or Team (if relevant)
	2.	Combine this information into single, clean, structured paragraphs, suitable for the fields below of a product feature:
* Feature Name
* Description
* Tag
* Planned Date
* Finish Date
* Attachment Priority
* Attachment Status
	3.	Only include content that may influence future strategic prioritization.
Internal/system-like values may be omitted from the description, but they must never cause a row to be skipped. Every row still produces one feature object.
	4.	Use full sentences or bullet points.
Format each Description field like this:

Feature Description Template:
[Short summary of what the feature does or why it exists.]

Details:
* Tags: [if available, goes to Tag field in Airtable]
* Status: [if available, goes to Attachment Status]
* Notes: [any additional info, include in the description]
* Dates: [Planned Date or Finish Date → match to Airtable fields]

	5.	Use "Status" field in the JSON to indicate:
* "NeedsReview" → for all uploaded features requiring user review.
* "AttachmentCompleted" → only if the feature has a finish date and a status such as “Cancelled” or “Completed”.
	6.	Ensure all output descriptions are:
* Easy to read
* Uniform in tone and formatting
* Self-contained — no reference to source fields or file structure

Final JSON Output Format:

[
  {
    "Feature Name": "AI Task Recommender",
    "Description": "Feature Description:\\nSuggests which tasks to tackle next based on user context and deadlines.\\n\\nDetails:\\n- Tags: Productivity, AI\\n- Status: Backlog\\n- Notes: Needs integration with calendar\\n- Dates: Target release in Q3",
    "Tag": "Productivity, AI",
    "Planned Date": "2025-08-01",
    "Finish Date": "",
    "Attachment Priority": "Medium",
    "Attachment Status": "Backlog",
    "Status": "NeedsReview"
  }
]

IMPORTANT: Return ONLY the JSON array. Do not include markdown code blocks.

    Document Content:
    ${fileContent.substring(0, 50000)}
    `;

    const result = await llm.invoke([new SystemMessage(extractionPrompt)]);
    let features: any[] = [];
    try {
        let clean = (result.content as string).replace(/```json/g, '').replace(/```/g, '').trim();
        features = JSON.parse(clean);
    } catch (e: any) {
        console.error("JSON parse error from LLM analysis", e);
        return new Response(JSON.stringify({ error: 'Failed to parse AI response', details: e.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    if (!Array.isArray(features)) {
         return new Response(JSON.stringify({ error: 'AI response format invalid', details: 'Expected array' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    // Chunk features into batches of 10 for Airtable API
    const chunks = [];
    for (let i = 0; i < features.length; i += 10) {
        chunks.push(features.slice(i, i + 10));
    }

    for (const chunk of chunks) {
        const records = chunk.map((feature: any) => {
            const fields: any = {
                "Name": feature["Feature Name"] || "Untitled",
                "Description": feature["Description"] || "",
                "Tag": feature["Tag"] || "",
                "AttachmentStatus": feature["Attachment Status"] || "",
                "Uploaded Priority": feature["Attachment Priority"] || "",
                "Status": "AttachmentCompleted",
                "Source": "CSV Uploaded",
            };

            // Link to user if found
            if (userRecordId) {
                fields["Users"] = [userRecordId];
            }
            // Link to 1FA if found
            if (faRecordId) {
                fields["1FA"] = [faRecordId];
            }

            // Handle dates: ensure they are not empty strings and are valid dates
            if (feature["Planned Date"] && isValidDate(feature["Planned Date"])) {
                fields["Planned Date"] = feature["Planned Date"];
            }
            if (feature["Finish Date"] && isValidDate(feature["Finish Date"])) {
                fields["Finish Date"] = feature["Finish Date"];
            }

            return { fields };
        });

        try {
            await table.create(records);
        } catch (airtableError: any) {
            console.error('Airtable Error:', airtableError);
            // Return detailed error if Airtable fails (e.g., column mismatch)
            return new Response(JSON.stringify({
                error: 'Airtable save failed',
                details: airtableError.message || JSON.stringify(airtableError)
            }), { status: 500, headers: { 'Content-Type': 'application/json' } });
        }
    }

    return new Response(JSON.stringify({ success: true, count: features.length }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    console.error('Error in roadmap upload route:', error);
    // Return detailed error to client
    return new Response(JSON.stringify({
        error: 'Internal Server Error',
        details: error.message || String(error)
    }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
