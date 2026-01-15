import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Data Processing Addendum | Priowise',
};

export default function DataProcessingAddendumPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8">Data Processing Addendum</h1>
        <p className="text-gray-600 mb-8">Last Updated: January 15, 2026</p>

        <div className="space-y-8">
          <p>
            This Data Processing Addendum ("Addendum") forms part of the Terms of Service ("Agreement") between you ("Customer") and Priowise ("Processor"). The purpose of this Addendum is to ensure that the processing of personal data by Priowise, on behalf of the Customer, complies with applicable data protection laws, including the General Data Protection Regulation ("GDPR").
          </p>
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Scope and Roles</h2>
            <p>
              This Addendum applies when Priowise processes personal data on behalf of the Customer in the course of providing services under the Agreement. In this context, the Customer is the Data Controller and Priowise is the Data Processor.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Nature and Purpose of Processing</h2>
            <p>
              Priowise processes Customer Data solely for the purpose of providing the strategy execution and prioritization services defined in the Agreement. This may include storing, retrieving, analyzing, and transmitting data as required for platform functionality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Data Categories and Subjects</h2>
            <p>
              The personal data processed includes names, email addresses, and business data provided by the Customer. The data subjects may include employees, contractors, and users authorized by the Customer.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Subprocessors</h2>
            <p>
              Priowise uses trusted third-party subprocessors to support the delivery of services. These include infrastructure, hosting, and AI services providers such as:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>OpenAI – for AI model execution (to generate responses and insights)</li>
              <li>Google Gemini – for AI model execution.</li>
              <li>Airtable – for structured data storage and organization.</li>
              <li>Supabase – as our database provider for storing application data.</li>
              <li>Make.com – for automated workflows and integration services.</li>
              <li>Vercel – for hosting, content delivery, and static asset management.</li>
              <li>Clerk – for user authentication, identity management, and subscription services.</li>
              <li>Perplexity AI – for research summarization and competitive intelligence insights.</li>
            </ul>
            <p className="mt-4">
              GenAI tools are used solely for generating generalized market and competitor research summaries that support AI-assisted strategy suggestions. It does not receive or process Customer Data submitted through the Priowise platform.
            </p>
            <p className="mt-4">
              All subprocessors are bound by obligations of data protection, confidentiality, and compliance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Data Transfers</h2>
            <p>
              Where personal data is transferred outside the European Economic Area (EEA), Priowise ensures that appropriate safeguards are in place, such as Standard Contractual Clauses (SCCs).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Security Measures</h2>
            <p>
              Priowise implements technical and organizational measures to ensure a level of security appropriate to the risk, including encryption in transit, access control, and activity logging.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Rights of Data Subjects</h2>
            <p>
              Priowise shall assist the Customer in fulfilling its obligations to respond to requests from data subjects exercising their rights under applicable laws, including access, correction, and deletion.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Data Breach Notification</h2>
            <p>
              In the event of a data breach affecting Customer Data, Priowise will promptly notify the Customer and provide relevant details to support compliance with legal obligations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Termination and Deletion</h2>
            <p>
              Upon termination of the Agreement, Priowise will, at the Customer’s choice, return or delete all personal data processed on behalf of the Customer, unless retention is required by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Audit Rights</h2>
            <p>
              The Customer has the right to request information or an audit to verify Priowise’s compliance with this Addendum. Audits may be conducted once annually with reasonable notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Miscellaneous</h2>
            <p>
              This Addendum shall remain in effect for the duration of the Agreement and shall prevail in the event of any conflict with the Terms of Service relating to data processing.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
