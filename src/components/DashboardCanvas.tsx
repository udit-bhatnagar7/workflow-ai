import { 
  Building,
  ChevronRight, 
  Search, 
  MoreHorizontal, 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  Calendar,
  Home,
  FileSignature
} from 'lucide-react';

export function DashboardCanvas({ setActivePage }: { setActivePage: (page: string) => void }) {
  return (
    <div className="flex-1 flex flex-col h-full bg-white relative">
      {/* Top Bar */}
      <div className="h-12 border-b border-[#EAEAEA] flex items-center px-6 justify-between flex-shrink-0">
        <div className="flex items-center text-gray-500 space-x-2 text-[13px]">
          <span>Overview</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 font-medium">Dashboard</span>
        </div>
        <div className="flex items-center space-x-3">
          <Search className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
          <MoreHorizontal className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 mx-auto w-full">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-[28px] font-semibold tracking-tight text-gray-900 mb-2">
              Welcome back, Sarah
            </h1>
            <p className="text-[14px] text-gray-500">
              Here is what's happening with your listings and workflows today.
            </p>
          </div>
          <button 
            onClick={() => setActivePage('seller-workflow')}
            className="px-3 py-1.5 text-[13px] font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-sm transition-colors flex items-center">
            <FileSignature className="w-4 h-4 mr-1.5" />
            New Seller Workflow
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard 
            title="Active Listings" 
            value="12" 
            trend="+2 this week" 
            icon={<Home className="w-5 h-5 text-indigo-600" />} 
            bg="bg-indigo-50"
          />
          <StatCard 
            title="Pending Tasks" 
            value="34" 
            trend="12 due today" 
            icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />} 
            bg="bg-emerald-50"
          />
          <StatCard 
            title="Active Vendors" 
            value="8" 
            trend="All confirmed" 
            icon={<Users className="w-5 h-5 text-blue-600" />} 
            bg="bg-blue-50"
          />
          <StatCard 
            title="Weather Alerts" 
            value="1" 
            trend="Affecting 2 tasks" 
            icon={<AlertTriangle className="w-5 h-5 text-orange-600" />} 
            bg="bg-orange-50"
            alert
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Recent Activity */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white border border-[#EAEAEA] rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[16px] font-semibold text-gray-900">Recent Activity</h3>
                <button className="text-[13px] text-indigo-600 font-medium hover:text-indigo-700">View All</button>
              </div>
              <div className="space-y-6">
                <ActivityItem 
                  title="Photography scheduled for 4521 Barton Creek Blvd"
                  time="2 hours ago"
                  icon={<Calendar className="w-4 h-4 text-indigo-600" />}
                  bg="bg-indigo-50"
                />
                <ActivityItem 
                  title="Vendor 'Sparkle Cleaners' confirmed appointment"
                  time="4 hours ago"
                  icon={<CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  bg="bg-emerald-50"
                />
                <ActivityItem 
                  title="Weather alert: High wind warning for Drone Shoot"
                  time="Yesterday"
                  icon={<AlertTriangle className="w-4 h-4 text-orange-600" />}
                  bg="bg-orange-50"
                />
                <ActivityItem 
                  title="New listing template applied to 1890 Ocean Way"
                  time="Yesterday"
                  icon={<Building className="w-4 h-4 text-blue-600" />}
                  bg="bg-blue-50"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Upcoming Tasks */}
          <div className="space-y-8">
            <div className="bg-[#FAFAFA] border border-[#EAEAEA] rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[16px] font-semibold text-gray-900">Upcoming Tasks</h3>
                <button className="text-[13px] text-indigo-600 font-medium hover:text-indigo-700">See All</button>
              </div>
              <div className="space-y-4">
                <TaskItem 
                  title="Review Listing Draft"
                  listing="4521 Barton Creek Blvd"
                  time="Today, 2:00 PM"
                  urgent={true}
                />
                <TaskItem 
                  title="Confirm Staging Vendor"
                  listing="1890 Ocean Way"
                  time="Tomorrow"
                  urgent={false}
                />
                <TaskItem 
                  title="Upload Floor Plans"
                  listing="4521 Barton Creek Blvd"
                  time="Mar 12"
                  urgent={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, trend, icon, bg, alert }: any) {
  return (
    <div className="bg-white border border-[#EAEAEA] rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${bg}`}>
          {icon}
        </div>
        {alert && <span className="flex items-center text-[11px] font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded">Requires Action</span>}
      </div>
      <div>
        <div className="text-[28px] font-bold text-gray-900 leading-none mb-1">{value}</div>
        <div className="text-[13px] text-gray-500 font-medium">{title}</div>
      </div>
      <div className="mt-4 pt-4 border-t border-[#EAEAEA] text-[12px] text-gray-500">
        {trend}
      </div>
    </div>
  );
}

function ActivityItem({ title, time, icon, bg }: any) {
  return (
    <div className="flex items-start space-x-4">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${bg}`}>
        {icon}
      </div>
      <div>
        <p className="text-[14px] text-gray-900 font-medium">{title}</p>
        <p className="text-[12px] text-gray-500 mt-1">{time}</p>
      </div>
    </div>
  );
}

function TaskItem({ title, listing, time, urgent }: any) {
  return (
    <div className="bg-white border border-[#EAEAEA] rounded-lg p-3 shadow-sm">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[13px] font-semibold text-gray-900">{title}</span>
        {urgent && <span className="w-2 h-2 rounded-full bg-orange-500"></span>}
      </div>
      <div className="text-[12px] text-gray-500 mb-2">{listing}</div>
      <div className="flex items-center text-[11px] text-gray-400 font-medium">
        <Clock className="w-3 h-3 mr-1" />
        {time}
      </div>
    </div>
  );
}
