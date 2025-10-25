import { Plus, TrendingUp, Clock, FileText, CheckCircle2 } from "lucide-react";

const stats = [
  {
    name: "Active Workflows",
    value: "24",
    change: "↑ 12% from last month",
    icon: FileText,
    color: "text-blue-600",
  },
  {
    name: "Pending Approvals",
    value: "8",
    change: "Requires your action",
    icon: Clock,
    color: "text-orange-600",
  },
  {
    name: "Forms Submitted",
    value: "156",
    change: "This week",
    icon: FileText,
    color: "text-green-600",
  },
  {
    name: "Completed Tasks",
    value: "89",
    change: "94% completion rate",
    icon: CheckCircle2,
    color: "text-purple-600",
  },
];

const recentActivity = [
  {
    title: "Leave Request Approved",
    user: "John Doe",
    time: "2 hours ago",
    type: "approval",
  },
  {
    title: "New Purchase Order Submitted",
    user: "Sarah Smith",
    time: "4 hours ago",
    type: "form",
  },
  {
    title: "Workflow Created: Expense Approval",
    user: "Mike Johnson",
    time: "Yesterday",
    type: "workflow",
  },
  {
    title: "Invoice Processed",
    user: "Emma Wilson",
    time: "2 days ago",
    type: "task",
  },
];

export default function DashboardPage() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back! Here's what's happening with your workflows today.
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark transition-colors">
          <Plus className="h-4 w-4" />
          New Workflow
        </button>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="rounded-lg bg-white p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-xs text-gray-500">{stat.change}</p>
                </div>
                <div className={`rounded-full bg-gray-100 p-3 ${stat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity and Chart */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Activity
            </h2>
            <button className="text-sm text-primary hover:text-primary-dark font-medium">
              View all
            </button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="mt-1 rounded-full bg-primary/10 p-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {activity.user} • {activity.time}
                  </p>
                </div>
                <span className="text-xs font-medium text-gray-500 capitalize">
                  {activity.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Workflow Trends Chart Placeholder */}
        <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Workflow Trends
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="font-medium text-green-600">+12.5%</span>
            </div>
          </div>
          <div className="flex h-64 items-center justify-center rounded-lg bg-gray-50">
            <div className="text-center text-gray-400">
              <TrendingUp className="mx-auto h-12 w-12 mb-2" />
              <p className="text-sm">Chart will be displayed here</p>
              <p className="text-xs mt-1">Workflow execution trends over time</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 rounded-lg bg-gradient-to-r from-primary/10 to-purple-600/10 p-6 border border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Ready to automate your next process?
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Create a new workflow or design a custom form in minutes
            </p>
          </div>
          <div className="flex gap-3">
            <button className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 transition-colors">
              Create Form
            </button>
            <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark transition-colors">
              Create Workflow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
