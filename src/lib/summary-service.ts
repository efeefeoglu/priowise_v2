import { base } from './airtable';

const TABLE_1FA_ID = 'tblIErZyMRYEm14bg';

export async function getSummaryForUser(email: string): Promise<string | null> {
  if (!email) {
    return null;
  }

  // Escape single quotes in email to prevent Airtable formula errors
  const escapedEmail = email.replace(/'/g, "\\'");

  try {
    const records = await base(TABLE_1FA_ID).select({
      filterByFormula: `{Email (from Linked record)} = '${escapedEmail}'`,
      maxRecords: 1,
    }).firstPage();

    if (records.length === 0) {
      return null;
    }

    const summary = records[0].get('Summary') as string;
    return summary || null;
  } catch (error) {
    console.error('Error fetching summary from Airtable:', error);
    return null;
  }
}
