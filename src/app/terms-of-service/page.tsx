import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";

export default function TermsOfServicePage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
        <p className="text-gray-600 mb-8">Last Updated: January 15, 2026</p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Who We Are</h2>
            <p>
              Priowise is an AI-powered strategy execution and prioritization platform. These Terms form a legal agreement between you (the user or organization) and Priowise, a product of Priowise B.V.  ('we', 'us', or 'our').
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Eligibility & Account Responsibilities</h2>
            <p>
              You must be at least 18 years old to use Priowise. If you are using the platform on behalf of a company or startup, you represent that you are authorized to do so. We do not verify email domains; you are solely responsible for the accuracy and legitimacy of the data you submit, including company-related or strategic content. You are responsible for safeguarding your account credentials and activities performed under your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. License to Use Priowise</h2>
            <p>
              We grant you a non-exclusive, non-transferable, revocable license to access and use Priowise in accordance with these Terms and your selected subscription plan. We reserve the right to modify, suspend, or discontinue any part of the service with reasonable notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>Use the platform for unlawful, harmful, or misleading purposes</li>
              <li>Upload or input abusive, discriminatory, or infringing content</li>
              <li>Attempt to reverse engineer or replicate Priowise systems or algorithms</li>
              <li>Circumvent usage limits or misuse automation features</li>
              <li>Use outputs for disinformation, spam, or investment solicitation</li>
            </ul>
            <p className="mt-4">Violations may result in account suspension or termination.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. AI Usage & Disclaimers</h2>
            <p>
              Priowise uses large language models (LLMs) to assist in generating strategic insights and scoring feature priorities. You acknowledge that AI-generated outputs are informational and not business, legal, or investment advice. You remain responsible for decisions based on platform output.
            </p>
            <p className="mt-4">
              Experimental or beta features may be offered and are provided 'as-is' without guarantees of performance, accuracy, or future availability.
            </p>
            <p className="mt-4">
              The platform’s strategic recommendations may be informed by a structured sequence of AI agents that operate collaboratively (“agentic AI squad”). These agents process different aspects of your data to generate context-specific outputs, which should always be reviewed and validated by your team before implementation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Plans, Billing & Cancellations</h2>
            <p>Your access to Priowise depends on your subscription plan.</p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li><strong>Annual Plan:</strong> If you cancel mid-term, used months are billed at standard monthly rates, and unused balance is refunded.</li>
              <li><strong>Monthly Plan:</strong> Auto-renews monthly; cancellable anytime before next cycle.</li>
            </ul>
            <p className="mt-4">Payments are non-refundable once a billing period begins. We may update pricing with prior notice.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Termination</h2>
            <p>
              You may cancel your subscription anytime. Annual cancellations will be refunded for unused months (at monthly rates). We may terminate your account for policy violations, abusive behavior, or prolonged inactivity.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Intellectual Property</h2>
            <p>
              All platform content and tools are owned by Priowise or its licensors. You may not reuse or resell them. You retain full ownership of the business content you input. Priowise acts as a data processor for your strategy and feature data, using it only to provide the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Subprocessors</h2>
            <p>
              We use trusted subprocessors such as OpenAI, Airtable, and Make.com to deliver parts of our service. We are not responsible for disruptions or limitations originating from these third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Limitation of Liability</h2>
            <p>
              Priowise is provided 'as-is' without warranties. We are not liable for indirect or consequential damages. Our liability is capped at the total fees paid by you in the past 12 months.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Updates to These Terms</h2>
            <p>
              We may update these Terms with notice. Continued use of Priowise after updates constitutes acceptance of the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">12. Governing Law</h2>
            <p>
              These Terms are governed by the laws of [Your Jurisdiction]. Disputes will be resolved in the courts of [Your City/Country].
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">13. Contact</h2>
            <p>
              Questions? Contact us at: support@priowise.com
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">14. Third-Party Services and Hosting</h2>
            <p>
              Priowise is built and hosted using trusted third-party infrastructure and service providers to deliver a secure, responsive, and reliable experience. Our platform is hosted and deployed via Vercel, while Clerk is used for user authentication, session management, and subscription-related access control. Supabase is used as a backend database and application data layer.
            </p>
            <p className="mt-4">
              As part of providing these core functionalities, essential cookies or similar storage mechanisms may be set by these service providers for purposes such as authentication, secure session handling, routing, and performance optimization. These technologies are strictly functional and are not used for advertising, behavioral tracking, or profiling.
            </p>
            <p className="mt-4">
              By using Priowise, you acknowledge and agree that your interaction with the platform is subject to the technical and operational logic of these third-party services. Priowise ensures that all authorized subprocessors comply with industry-standard security practices and are bound by appropriate contractual safeguards, including data protection and GDPR-compliant obligations where applicable.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
