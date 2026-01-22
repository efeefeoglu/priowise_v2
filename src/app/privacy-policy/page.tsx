import { Header } from "@/components/home/Header";
import { Footer } from "@/components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-gray-600 mb-8">Last Updated: January 15, 2026</p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Who We Are</h2>
            <p>
              Priowise is an AI-powered strategy execution and prioritization
              platform that helps businesses define objectives, align strategic
              decisions, and build impactful roadmaps. We are committed to
              protecting the privacy of our users and their businesses. This
              Privacy Policy explains how we collect, use, store, and protect
              the data you provide to us. It also outlines your rights and
              choices under relevant data protection laws, including the General
              Data Protection Regulation (GDPR) and the California Consumer
              Privacy Act (CCPA), among others.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              2. What Information We Collect
            </h2>
            <p>
              When you use Priowise, we collect both personal and
              business-related information that enables us to provide our
              services efficiently and securely.
            </p>
            <div className="mt-4 space-y-4">
              <div>
                <h3 className="text-xl font-semibold">Account Information:</h3>
                <p>
                  When you register on our platform, we collect personal
                  information such as your full name, email address, and a
                  password (stored securely using hashing). If you sign in using
                  a third-party provider like Google, we receive only the
                  information required to authenticate your identity.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Business Content:</h3>
                <p>
                  To generate strategic insights and prioritization results, you
                  may voluntarily submit business-related data including your
                  company name, strategic statements, goals, objectives, key
                  results (OKRs), and product or feature descriptions. This
                  information is central to the service we provide and is
                  treated with confidentiality.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Usage Data:</h3>
                <p>
                  We automatically collect certain technical data when you
                  interact with Priowise, such as your device type, browser,
                  operating system, IP address, and the features you use. This
                  helps us improve the platform’s performance and user
                  experience.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Payment Data:</h3>
                <p>
                  If you subscribe to a paid plan, your payment is securely
                  processed by our third-party payment provider. We do not store
                  your full payment information, such as credit card numbers, on
                  our servers.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              3. How We Use Your Information
            </h2>
            <p>
              We use the information we collect for the following core purposes:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>
                <strong>Service Delivery:</strong> To operate the Priowise
                platform, generate AI-powered strategy assessments, and maintain
                your user account.
              </li>
              <li>
                <strong>Personalization and Support:</strong> To tailor the
                experience to your business context and respond to any inquiries
                or support requests.
              </li>
              <li>
                <strong>Improvements and Development:</strong> To analyze usage
                patterns and make continuous improvements to the performance,
                reliability, and relevance of the platform.
              </li>
              <li>
                <strong>Account and Subscription Management:</strong> To manage
                your subscription, billing, and administrative communications.
              </li>
              <li>
                <strong>Legal and Security Obligations:</strong> To comply with
                legal requirements, enforce our Terms of Service, and maintain
                the security of your data.
              </li>
            </ul>
            <p className="mt-4">
              We do not use your business content for advertising or sell your
              data to third parties. Our commitment to privacy extends to all
              aspects of how we operate.
            </p>
            <p className="mt-4">
              Some outputs in Priowise are generated through a system of
              collaborating AI agents (“agentic AI squad”) that analyze
              different parts of the data you provide. These agents may include
              components focused on objective validation, feature scoring,
              competitor insights, or research enrichment. This internal
              structure helps us deliver more precise and context-aware outputs,
              while maintaining strict data control within the platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              4. Cookies and Tracking Technologies
            </h2>
            <p>
              Priowise uses a minimal and privacy-conscious approach to cookies
              and similar technologies. We use essential cookies and local
              storage mechanisms only, strictly required for the operation of
              the platform.
            </p>
            <p className="mt-4">
              These include cookies or storage entries used to:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>Maintain authenticated user sessions</li>
              <li>Enable secure login and account access</li>
              <li>Ensure platform stability, security, and performance</li>
            </ul>
            <p className="mt-4">
              Our infrastructure and service providers may set essential cookies
              or storage entries as part of delivering these functions,
              including:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>
                <strong>Vercel (hosting and content delivery)</strong>, to
                support secure application delivery and performance
                optimization
              </li>
              <li>
                <strong>Clerk (user authentication and subscription management)</strong>, to
                manage login sessions, identity verification, and access control
              </li>
              <li>
                <strong>Supabase (database and backend services)</strong>, which
                may store session-related identifiers required for secure data
                access
              </li>
            </ul>
            <p className="mt-4">
              These technologies are strictly functional, do not involve
              advertising, behavioral profiling, or cross-site tracking, and
              cannot be disabled without impacting core platform functionality.
            </p>
            <p className="mt-4">
              You can control or block cookies via your browser settings.
              However, disabling essential cookies or storage mechanisms may
              prevent you from logging into your account or using key features
              of the platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              5. Data Ownership and Use of Subprocessors
            </h2>
            <p>
              You retain full ownership of all business data you submit to
              Priowise, including your strategic plans, objectives, key results,
              and roadmap details. This content remains under your control, and
              we will never claim rights to it beyond what is necessary to
              operate the service.
            </p>
            <p className="mt-4">
              Priowise acts as a data processor, using your submitted
              information solely for the purpose of delivering the services
              you've signed up for. We will never sell or disclose your business
              data to third parties for advertising, profiling, or competitive
              analysis.
            </p>
            <p className="mt-4">
              To provide core functionality, we rely on a limited set of trusted
              subprocessors, including:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>
                <strong>OpenAI Google Gemini</strong>, for AI model execution
                (to generate responses and insights)
              </li>
              <li>
                <strong>Perplexity AI</strong> – for research summarization and
                competitive intelligence insight
              </li>
              <li>
                <strong>Vercel</strong>, for hosting, content delivery, and
                static asset management
              </li>
              <li>
                <strong>Clerk</strong>, for user authentication, identity
                management, and subscription services
              </li>
              <li>
                <strong>Airtable</strong>, for structured data storage and
                organization
              </li>
              <li>
                <strong>Supabase</strong>, as our database provider for storing
                application data
              </li>
              <li>
                <strong>Make.com</strong>, to automate workflows and AI prompt
                flows
              </li>
            </ul>
            <p className="mt-4">
              Perplexity AI does not access your personal or company-uploaded
              data. It is used only for generating generalized, AI-powered
              research summaries that may inform some outputs presented within
              the platform.
            </p>
            <p className="mt-4">
              Each of these providers is under a strict data processing
              agreement with us, and they are contractually obligated to
              maintain confidentiality and meet GDPR-compliant security
              standards.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Data Retention</h2>
            <p>
              We retain your account information and business content for as
              long as your Priowise account is active.
            </p>
            <p className="mt-4">
              If you choose to cancel your subscription or delete your account,
              we will begin the process of permanently removing your data:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>
                All production data is removed within 30 days of account
                deletion.
              </li>
              <li>
                Encrypted backups containing your data are purged within 90
                days.
              </li>
            </ul>
            <p className="mt-4">
              You may also contact us at any time to request the immediate
              deletion of your data. Once deleted, this data cannot be
              recovered.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              7. Data Transfers and Storage Locations
            </h2>
            <p>
              Priowise stores all user and business data on secure servers
              located within the European Union, primarily in data centers
              managed by Airtable.
            </p>
            <p className="mt-4">
              Where data is transferred outside the EU (e.g., to OpenAI), we
              rely on Standard Contractual Clauses (SCCs) and similar legal
              mechanisms to ensure that your data receives a level of protection
              equivalent to that provided under European law.
            </p>
            <p className="mt-4">
              We continuously monitor our subprocessors' compliance with data
              protection requirements and avoid using vendors in jurisdictions
              lacking adequate safeguards.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              8. Your Rights (GDPR, CCPA, and Beyond)
            </h2>
            <p>
              We respect your right to control your personal and business data.
              Depending on your location, you may have the following rights:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>
                <strong>Access:</strong> Request to see what data we hold about
                you.
              </li>
              <li>
                <strong>Correction:</strong> Request correction of inaccurate
                information.
              </li>
              <li>
                <strong>Deletion:</strong> Request deletion of your personal
                data at any time.
              </li>
              <li>
                <strong>Objection:</strong> Object to certain types of data
                processing (e.g., marketing).
              </li>
              <li>
                <strong>Restriction:</strong> Ask us to temporarily stop
                processing your data.
              </li>
              <li>
                <strong>Data Portability:</strong> Request an export of your data
                in a structured format.
              </li>
            </ul>
            <p className="mt-4">
              To exercise any of these rights, please contact us at{" "}
              <a
                href="mailto:privacy@priowise.com"
                className="text-blue-600 hover:underline"
              >
                privacy@priowise.com
              </a>
              . We will respond within 30 days of your request.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              9. Data Processing Agreement (DPA)
            </h2>
            <p>
              For GDPR compliance, Priowise includes a Data Processing Addendum
              as part of our Terms of Service. This DPA outlines the rights and
              obligations between you (the data controller) and us (the data
              processor) regarding your business content.
            </p>
            <p className="mt-4">
              If you require a signed version of the DPA for enterprise
              procurement, legal review, or vendor onboarding, please contact us
              and we’ll provide a copy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              10. Contact Information
            </h2>
            <p>
              If you have questions about this Privacy Policy, data security, or
              your rights under data protection law, you can reach us directly:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>
                Email:{" "}
                <a
                  href="mailto:privacy@priowise.com"
                  className="text-blue-600 hover:underline"
                >
                  privacy@priowise.com
                </a>
              </li>
              <li>
                Website:{" "}
                <a
                  href="https://www.priowise.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  https://www.priowise.com
                </a>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
