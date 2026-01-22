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

function normalizeAirtableValue(value: any): number {
  if (Array.isArray(value)) {
    // If it's an array (common for Lookup/Rollup fields), take the first item
    return value.length > 0 ? normalizeAirtableValue(value[0]) : 0;
  }
  const num = Number(value);
  return isNaN(num) ? 0 : num;
}

export async function getDashboardMetrics(userEmail: string): Promise<DashboardMetrics | null> {
  if (!userEmail) return null;

  try {
    // Search user email in Email (from Linked record) field.
    // Using filterByFormula to find the record where the Email field matches.
    // Note: If 'Email (from Linked record)' is a Lookup field, it returns an array.
    // However, in filterByFormula, it usually behaves as a string or can be compared.
    const records = await table.select({
      filterByFormula: `{Email (from Linked record)} = '${userEmail}'`,
      maxRecords: 1,
    }).firstPage();

    if (records.length === 0) {
      console.log(`[DashboardMetrics] No records found for email: ${userEmail}`);
      return null;
    }

    const record = records[0];
    const fields = record.fields;

    console.log(`[DashboardMetrics] Found record ${record.id} for ${userEmail}. Fields:`, Object.keys(fields));

    // Parse fields ensuring they are numbers, handling potential arrays from Lookups
    const baseScore = normalizeAirtableValue(fields['Base-AlignmentScore']);
    const improvedScore = normalizeAirtableValue(fields['Improved-AlignmentScore']);
    const confidenceIdx = normalizeAirtableValue(fields['ConfidenceIndex']);

    return {
      baseAlignmentScore: baseScore,
      improvedAlignmentScore: improvedScore,
      confidenceIndex: confidenceIdx,
    };
  } catch (error) {
    console.error('[DashboardMetrics] Error fetching dashboard metrics:', error);
    return null;
  }
}
