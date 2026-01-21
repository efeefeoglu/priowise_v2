import { ArrowBigUpDash } from "lucide-react";

const DictionaryPage = () => {
  const sections = [
    { id: "core-concepts", title: "Core Priowise Concepts" },
    { id: "strategy-objectives", title: "Strategy & Objectives" },
    { id: "execution-planning", title: "Execution & Planning" },
    { id: "impact-decision-logic", title: "Impact & Decision Logic" },
    { id: "market-competition", title: "Market & Competition" },
    { id: "product-growth", title: "Product & Growth" },
    { id: "data-security-compliance", title: "Data, Security & Compliance" },
    { id: "ai-technical-terms", title: "AI & Technical Terms" },
    { id: "reporting-outputs", title: "Reporting & Outputs" },
  ];

  return (
    <div id="top" className="bg-white p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Priowise Dictionary
        </h1>
        <p className="text-gray-600 mb-6">
          This dictionary explains the key terms, abbreviations, and concepts
          used across the Priowise platform and in your Summary Reports. Its
          purpose is to ensure shared understanding, reduce ambiguity, and
          support clearer decision-making.
        </p>

        <div className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Sections:
          </h2>
          <ol className="list-decimal list-inside space-y-2">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </div>

        <div className="space-y-12">
          <section id="core-concepts">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <a href="#top" className="mr-2 text-gray-400 hover:text-gray-600">
                <ArrowBigUpDash className="w-5 h-5" />
              </a>
              Core Priowise Concepts
            </h2>
            <div className="space-y-4">
              <p>
                <strong className="font-semibold text-gray-800">
                  Assessment:
                </strong>{" "}
                A structured input process where Priowise collects business
                context, goals, constraints, and signals to generate strategy
                and prioritization outputs.
              </p>
              <p>
                <strong className="font-semibold text-gray-800">
                  First Assessment (FA):
                </strong>{" "}
                The initial assessment that establishes your strategic baseline.
                It defines objectives, impact parameters, weights, and
                assumptions used in all subsequent analyses.
              </p>
              <p>
                <strong className="font-semibold text-gray-800">
                  Alignment:
                </strong>{" "}
                The degree to which your roadmap, initiatives, and features
                support your defined objectives and strategy.
              </p>
              <p>
                <strong className="font-semibold text-gray-800">
                  Alignment Score:
                </strong>{" "}
                A quantified indicator showing how well your current roadmap
                aligns with strategic objectives, based on impact weights and
                feature coverage.
              </p>
              <p>
                <strong className="font-semibold text-gray-800">
                  Alignment Uplift:
                </strong>{" "}
                The expected improvement in alignment after applying Priowise’s
                recommendations (e.g., adding, removing, or reprioritizing
                features).
              </p>
              <p>
                <strong className="font-semibold text-gray-800">
                  Confidence Index:
                </strong>{" "}
                A composite indicator reflecting how reliable a prioritization
                or recommendation is, based on input completeness, consistency,
                and signal strength.
              </p>
            </div>
          </section>

          <section id="strategy-objectives">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <a href="#top" className="mr-2 text-gray-400 hover:text-gray-600">
                <ArrowBigUpDash className="w-5 h-5" />
              </a>
              Strategy & Objectives
            </h2>
            <div className="space-y-4">
              <p>
                <strong className="font-semibold text-gray-800">
                  Objective:
                </strong>{" "}
                A clear, strategic outcome your organization aims to achieve.
                Objectives answer “why are we doing this?”
              </p>
              <p>
                <strong className="font-semibold text-gray-800">
                  Key Result (KR):
                </strong>{" "}
                A measurable indicator used to track progress toward an
                objective. Key Results define how success is measured, not how
                work is done.
              </p>
              <p>
                <strong className="font-semibold text-gray-800">
                  OKR (Objectives and Key Results):
                </strong>{" "}
                A goal-setting framework that combines qualitative objectives
                with quantitative key results.
              </p>
              <p>
                <strong className="font-semibold text-gray-800">
                  KPI (Key Performance Indicator):
                </strong>{" "}
                An ongoing performance metric used to monitor business or
                operational health. Unlike KRs, KPIs are usually continuous
                rather than goal-specific.
              </p>
            </div>
          </section>

          <section id="execution-planning">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <a href="#top" className="mr-2 text-gray-400 hover:text-gray-600">
                <ArrowBigUpDash className="w-5 h-5" />
              </a>
              Execution & Planning
            </h2>
            <div className="space-y-4">
              <p>
                <strong className="font-semibold text-gray-800">
                  Initiative:
                </strong>{" "}
                A strategic theme or workstream that groups related features or
                activities aimed at achieving one or more objectives.
              </p>
              <p>
                <strong className="font-semibold text-gray-800">
                  Roadmap:
                </strong>{" "}
                A structured view of planned features, initiatives, or
                investments over time, typically organized by themes or time
                horizons.
              </p>
              <p>
                <strong className="font-semibold text-gray-800">
                  Feature:
                </strong>{" "}
                A discrete piece of functionality, capability, or work item
                included in a product roadmap.
              </p>
              <p>
                <strong className="font-semibold text-gray-800">
                  Prioritization:
                </strong>{" "}
                The process of ordering initiatives or features based on
                expected impact, effort, risk, and strategic alignment.
              </p>
              <p>
                <strong className="font-semibold text-gray-800">
                  Priority:
                </strong>{" "}
                The relative importance assigned to a feature or initiative
                compared to others.
              </p>
            </div>
          </section>

          <section id="impact-decision-logic">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <a href="#top" className="mr-2 text-gray-400 hover:text-gray-600">
                <ArrowBigUpDash className="w-5 h-5" />
              </a>
              Impact & Decision Logic
            </h2>
            <div className="space-y-4">
              <p>
                <strong className="font-semibold text-gray-800">
                  Impact:
                </strong>{" "}
                The expected positive effect a feature or initiative has on
                objectives, users, or the business.
              </p>
              <p>
                <strong className="font-semibold text-gray-800">
                  Impact Parameter:
                </strong>{" "}
                A dimension used to evaluate value (e.g., revenue potential,
                user satisfaction, operational efficiency).
              </p>
              <p>
                <strong className="font-semibold text-gray-800">
                  Impact Weight:
                </strong>{" "}
                The relative importance assigned to an impact parameter,
                reflecting strategic focus.
              </p>
              <p>
                <strong className="font-semibold text-gray-800">
                  Effort:
                </strong>{" "}
                An estimate of the resources, time, or complexity required to
                deliver a feature or initiative.
              </p>
            </div>
          </section>

          <section id="market-competition">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <a href="#top" className="mr-2 text-gray-400 hover:text-gray-600">
                <ArrowBigUpDash className="w-5 h-5" />
              </a>
              Market & Competition
            </h2>
            <div className="space-y-4">
              <p>
                <strong className="font-semibold text-gray-800">
                  Competition:
                </strong>{" "}
                The landscape of alternative products or solutions that target
                the same users or problems.
              </p>
              <p>
                <strong className="font-semibold text-gray-800">
                  Competitive Signal:
                </strong>{" "}
                Any insight indicating how competitors position, differentiate,
                or invest relative to your product.
              </p>
            </div>
          </section>

          <section id="product-growth">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <a href="#top" className="mr-2 text-gray-400 hover:text-gray-600">
                <ArrowBigUpDash className="w-5 h-5" />
              </a>
              Product & Growth
            </h2>
            <div className="space-y-4">
              <p>
                <strong className="font-semibold text-gray-800">
                  MVP (Minimum Viable Product):
                </strong>{" "}
                The smallest version of a product that delivers core value and
                enables learning.
              </p>
              <p>
                <strong className="font-semibold text-gray-800">
                  PLG (Product-Led Growth):
                </strong>{" "}
                A growth strategy where the product itself drives acquisition,
                activation, and expansion.
              </p>
              <p>
                <strong className="font-semibold text-gray-800">
                  CSAT (Customer Satisfaction Score):
                </strong>{" "}
                A metric measuring how satisfied customers are with a product or
                experience.
              </p>
            </div>
          </section>

          <section id="data-security-compliance">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <a href="#top" className="mr-2 text-gray-400 hover:text-gray-600">
                <ArrowBigUpDash className="w-5 h-5" />
              </a>
              Data, Security & Compliance
            </h2>
            <div className="space-y-4">
              <p>
                <strong className="font-semibold text-gray-800">
                  GDPR (General Data Protection Regulation):
                </strong>{" "}
                EU regulation governing personal data protection and privacy.
              </p>
              <p>
                <strong className="font-semibold text-gray-800">
                  CCPA / CPRA:
                </strong>{" "}
                California privacy regulations defining consumer data rights and
                business obligations.
              </p>
              <p>
                <strong className="font-semibold text-gray-800">
                  NIS2:
                </strong>{" "}
                EU directive focused on cybersecurity and resilience of
                critical and digital services.
              </p>
              <p>
                <strong className="font-semibold text-gray-800">
                  DPA (Data Processing Agreement):
                </strong>{" "}
                A contract that defines how personal data is processed between a
                controller and a processor.
              </p>
              <p>
                <strong className="font-semibold text-gray-800">
                  DSAR (Data Subject Access Request):
                </strong>{" "}
                A request by an individual to access, correct, or delete their
                personal data.
              </p>
            </div>
          </section>

          <section id="ai-technical-terms">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <a href="#top" className="mr-2 text-gray-400 hover:text-gray-600">
                <ArrowBigUpDash className="w-5 h-5" />
              </a>
              AI & Technical Terms
            </h2>
            <div className="space-y-4">
              <p>
                <strong className="font-semibold text-gray-800">
                  RAG (Retrieval-Augmented Generation):
                </strong>{" "}
                An AI approach where responses are generated using both a
                language model and retrieved external knowledge.
              </p>
              <p>
                <strong className="font-semibold text-gray-800">
                  AI Act:
                </strong>{" "}
                Proposed and emerging EU regulation governing the use of
                artificial intelligence systems.
              </p>
              <p>
                <strong className="font-semibold text-gray-800">
                  SSO (Single Sign-On):
                </strong>{" "}
                Authentication method allowing users to log in using one
                identity across multiple systems.
              </p>
              <p>
                <strong className="font-semibold text-gray-800">
                  SCIM (System for Cross-domain Identity Management):
                </strong>{" "}
                A standard for automating user provisioning and access
                management.
              </p>
              <p>
                <strong className="font-semibold text-gray-800">
                  ACM:
                </strong>{" "}
                In Priowise context, refers to Alignment & Consistency Modeling —
                the internal logic used to evaluate how consistently inputs
                support strategy.
              </p>
            </div>
          </section>

          <section id="reporting-outputs">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <a href="#top" className="mr-2 text-gray-400 hover:text-gray-600">
                <ArrowBigUpDash className="w-5 h-5" />
              </a>
              Reporting & Outputs
            </h2>
            <div className="space-y-4">
              <p>
                <strong className="font-semibold text-gray-800">
                  Summary Report:
                </strong>{" "}
                An executive-ready output that consolidates strategy,
                alignment analysis, prioritization results, and recommendations
                into a single narrative.
              </p>
              <p>
                <strong className="font-semibold text-gray-800">
                  Recommendation:
                </strong>{" "}
                A suggested action generated by Priowise to improve alignment,
                prioritization, or strategic clarity.
              </p>
              <p>
                <strong className="font-semibold text-gray-800">
                  Version:
                </strong>{" "}
                A saved state of strategy, roadmap, or assessment results at a
                specific point in time, enabling comparison over time.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DictionaryPage;
