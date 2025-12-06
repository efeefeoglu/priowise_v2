export interface Question {
  id: string;
  text: string;
  section: string;
  type: 'text' | 'select';
  required: boolean;
  options?: string[];
  allowMultiSelect?: boolean;
}

export const questions: Question[] = [
  {"id": "q1", "text": "What is your Company Name?", "section": "Company Overview", "type": "text", "required": true},
  {"id": "q2", "text": "What is your Website?", "section": "Company Overview", "type": "text", "required": true},
  {"id": "q3", "text": "Which industry best describes your company?", "section": "Company Overview", "type": "select", "required": true, "options": ["eCommerce / Marketplace (B2C/B2B)", "AdTech / MarTech Platforms", "Fintech / Payments", "Healthcare / MedTech / Wellness", "Logistics / Delivery / Mobility", "SaaS / Productivity Tools", "EdTech / Education Platforms", "EV Charging / Energy / IoT", "LegalTech / Compliance", "Travel / Booking Systems", "Social Media / Content Platforms", "HR Tech / Recruiting Platforms", "Gaming / Sports Betting", "PropTech / Real Estate", "ClimateTech / Sustainability Platforms", "AI/ML Platforms", "Creator Eco", "Other"], "allowMultiSelect": true},
  {"id": "q4", "text": "What is your Business Model?", "section": "Company Overview", "type": "select", "required": true, "options": ["B2C", "B2B", "Hybrid"], "allowMultiSelect": true},
  {"id": "q5", "text": "What is your Funding Stage?", "section": "Company Overview", "type": "select", "required": true, "options": ["Pre-seed", "Seed", "Series A", "Series B", "Series C", "Privately owned"], "allowMultiSelect": true},
  {"id": "q6", "text": "Describe your Product / Service", "section": "Company Overview", "type": "text", "required": true},
  {"id": "q7", "text": "What is your Product Stage?", "section": "Company Overview", "type": "select", "required": true, "options": ["Ideation", "Prototype / Proof of Concept", "MVP (Internal / Alpha)", "MVP (Public / Beta)", "Post-MVP / Early Adoption", "Living Product (Iterative Releases)", "Scaling / Market Expansion", "Mature Product / Optimization", "Legacy / Rebuild / Sunsetting"], "allowMultiSelect": true},
  {"id": "q8", "text": "What is your Market / Geography?", "section": "Company Overview", "type": "text", "required": true},
  {"id": "q9", "text": "Who is your Target Audience?", "section": "Company Overview", "type": "text", "required": true},
  {"id": "q10", "text": "Who are your Competitors?", "section": "Company Overview", "type": "text", "required": true},
  {"id": "q11", "text": "How do you acquire customers?", "section": "Strategy & Market Priorities", "type": "text", "required": true},
  {"id": "q12", "text": "What pain points do your customers face?", "section": "Strategy & Market Priorities", "type": "text", "required": true},
  {"id": "q13", "text": "Are there external factors affecting your business?", "section": "Strategy & Market Priorities", "type": "text", "required": false},
  {"id": "q14", "text": "Could you please share brief details about the impact of external factors (if applicable)?", "section": "Strategy & Market Priorities", "type": "text", "required": false},
  {"id": "q15", "text": "What is your customer retention strategy?", "section": "Strategy & Market Priorities", "type": "text", "required": true},
  {"id": "q16", "text": "What are your top 3 business priorities for the next 12 months?", "section": "Strategy & Market Priorities", "type": "text", "required": true},
  {"id": "q17", "text": "Which areas of your business need immediate attention?", "section": "Strategy & Market Priorities", "type": "text", "required": true},
  {"id": "q18", "text": "What outcomes would you like to achieve in these areas?", "section": "Strategy & Market Priorities", "type": "text", "required": true},
  {"id": "q19", "text": "Do you currently have all the resources you need to execute your strategy over the next 12 months?", "section": "Constraints & Resources", "type": "text", "required": true},
  {"id": "q20", "text": "How would you define success for your business?", "section": "Measurement & Success", "type": "text", "required": true},
  {"id": "q21", "text": "What is your core business metric for the next 12 months?", "section": "Measurement & Success", "type": "text", "required": true},
  {"id": "q22", "text": "What measurable outcomes will indicate success?", "section": "Measurement & Success", "type": "text", "required": true},
  {"id": "q23", "text": "Which key metrics are you currently tracking, and what are their latest values and timeframes?", "section": "Measurement & Success", "type": "text", "required": true}
];
