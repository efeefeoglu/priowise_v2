import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { table } from '@/lib/airtable';

// Force dynamic
export const dynamic = 'force-dynamic';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const { Name, Description, Tag } = body;

    // We allow partial updates, but validate that we aren't updating read-only fields if they were sent (optional, but good practice)
    // Here we just pick the allowed fields.
    const fieldsToUpdate: any = {};
    if (Name !== undefined) fieldsToUpdate.Name = Name;
    if (Description !== undefined) fieldsToUpdate.Description = Description;
    if (Tag !== undefined) fieldsToUpdate.Tag = Tag;

    const updatedRecords = await table.update([
      {
        id: id,
        fields: fieldsToUpdate,
      },
    ]);

    return NextResponse.json({ record: { id: updatedRecords[0].id, fields: updatedRecords[0].fields } });
  } catch (error: any) {
    console.error('Error updating roadmap record:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const deletedRecords = await table.destroy([id]);

    return NextResponse.json({ id: deletedRecords[0].id, deleted: true });
  } catch (error: any) {
    console.error('Error deleting roadmap record:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
