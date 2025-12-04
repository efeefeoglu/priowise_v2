import { currentUser } from "@clerk/nextjs/server";
import { Plus, FolderPlus, ListTodo, TrendingUp } from "lucide-react";

export default async function DashboardPage() {
  const user = await currentUser();
  const firstName = user?.firstName || "there";

  return (
    <div className="max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-rubik font-bold text-gray-900">
          Good morning, {firstName}! ☀️
        </h1>
        <p className="mt-2 text-gray-600">
          Here is what is happening with your projects today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-8">
        {[
          { name: 'Active Projects', stat: '12', icon: FolderPlus, color: 'bg-blue-500' },
          { name: 'Pending Tasks', stat: '4', icon: ListTodo, color: 'bg-yellow-500' },
          { name: 'Team Velocity', stat: '+24%', icon: TrendingUp, color: 'bg-green-500' },
        ].map((item) => (
          <div key={item.name} className="relative overflow-hidden rounded-xl bg-white p-6 shadow-sm border border-gray-100">
            <dt>
              <div className={`absolute rounded-md p-3 ${item.color}/10`}>
                <item.icon className={`h-6 w-6 text-${item.color.replace('bg-', '')}`} aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-1 sm:pb-2">
              <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
            </dd>
          </div>
        ))}
      </div>

      {/* Empty State / Main Action Area */}
      <div className="rounded-2xl border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 bg-white">
        <div className="mx-auto h-12 w-12 text-gray-400">
             <Plus className="h-12 w-12" />
        </div>
        <h3 className="mt-2 text-sm font-semibold text-gray-900">No projects started</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by creating a new strategic project.</p>
        <div className="mt-6">
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-brand-yellow px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
          >
            <Plus className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            New Project
          </button>
        </div>
      </div>

    </div>
  );
}
