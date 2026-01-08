import { currentUser } from '@clerk/nextjs/server';
import { getSummaryForUser } from '@/lib/summary-service';
import Link from 'next/link';

export default async function SummaryPage() {
  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress;

  const summary = email ? await getSummaryForUser(email) : null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold font-rubik text-gray-900">Summary</h2>
      </div>

      <div className="bg-white rounded-lg border border-gray-100 p-6 shadow-sm min-h-[200px]">
        {summary ? (
          <div
            className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: summary }}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-12">
            <p className="text-gray-500 text-lg">
              Please complete First assessment and roadmap
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
