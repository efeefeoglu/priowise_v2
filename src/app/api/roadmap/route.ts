import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { table } from '@/lib/airtable';

// Force dynamic to ensure we always fetch fresh data and have access to currentUser
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user || !user.emailAddresses?.[0]?.emailAddress) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const email = user.emailAddresses[0].emailAddress;

    // Filter by Email field in Airtable
    const records = await table.select({
      filterByFormula: `{Email} = '${email}'`,
      sort: [{ field: 'Created', direction: 'desc' }] // Optional: sort by creation time if available, or name
    }).all();

    const formattedRecords = records.map((record) => ({
      id: record.id,
      fields: record.fields,
    }));

    return NextResponse.json({ records: formattedRecords });
  } catch (error: any) {
    console.error('Error fetching roadmap records:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user || !user.emailAddresses?.[0]?.emailAddress) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const email = user.emailAddresses[0].emailAddress;
    const body = await req.json();
    const { Name, Description, Tag } = body;

    if (!Name || !Description) {
      return NextResponse.json({ error: 'Name and Description are required' }, { status: 400 });
    }

    const newRecord = await table.create([
      {
        fields: {
          Name,
          Description,
          Tag: Tag || '', // Ensure it's a string
          Status: 'Created',
          Source: 'Manual',
          Email: email,
        },
      },
    ]);

    return NextResponse.json({ record: { id: newRecord[0].id, fields: newRecord[0].fields } });
  } catch (error: any) {
    console.error('Error creating roadmap record:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
