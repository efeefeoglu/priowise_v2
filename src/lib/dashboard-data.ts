import Airtable from 'airtable';

// Use the specific Base ID and Table ID provided
const DASHBOARD_BASE_ID = 'c08Z8oqrIPIgq';
const DASHBOARD_TABLE_ID = 'tblIErZyMRYEm14bg';

// Ensure API key is available
if (!process.env.AIRTABLE_API_KEY) {
  throw new Error('AIRTABLE_API_KEY is not defined');
}

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(DASHBOARD_BASE_ID);
const table = base(DASHBOARD_TABLE_ID);

export interface DashboardMetrics {
  baseAlignmentScore: number;
  improvedAlignmentScore: number;
  confidenceIndex: number;
}

export async function getDashboardMetrics(userEmail: string): Promise<DashboardMetrics | null> {
  if (!userEmail) return null;

  try {
    // Search user email in Email (from Linked record) field.
    // Using filterByFormula to find the record where the Email field matches.
    const records = await table.select({
      filterByFormula: `{Email (from Linked record)} = '${userEmail}'`,
      maxRecords: 1,
    }).firstPage();

    if (records.length === 0) {
      return null;
    }

    const record = records[0];
    const fields = record.fields;

    // Parse fields ensuring they are numbers
    const baseScore = fields['Base-AlignmentScore'];
    const improvedScore = fields['Improved-AlignmentScore'];
    const confidenceIdx = fields['ConfidenceIndex'];

    return {
      baseAlignmentScore: typeof baseScore === 'number' ? baseScore : Number(baseScore) || 0,
      improvedAlignmentScore: typeof improvedScore === 'number' ? improvedScore : Number(improvedScore) || 0,
      confidenceIndex: typeof confidenceIdx === 'number' ? confidenceIdx : Number(confidenceIdx) || 0,
    };
  } catch (error) {
    console.error('Error fetching dashboard metrics:', error);
    return null;
  }
}
