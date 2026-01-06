import Airtable from 'airtable';

if (!process.env.AIRTABLE_API_KEY) {
  throw new Error('AIRTABLE_API_KEY is not defined');
}

if (!process.env.AIRTABLE_BASE_ID) {
  throw new Error('AIRTABLE_BASE_ID is not defined');
}

Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
});

export const base = Airtable.base(process.env.AIRTABLE_BASE_ID);
export const table = base(process.env.AIRTABLE_TABLE_ID || 'tblT3cN2vOKEQiZvc');
