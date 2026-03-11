import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  CloudSun,
  Droplets,
  MapPin,
  MoreHorizontal,
  Search,
  Sparkles,
  Sun,
  Wind,
  XCircle,
  CalendarDays
} from 'lucide-react';

export function WeatherCanvas() {
  return (
    <div className="flex-1 flex flex-col h-full bg-white relative">
      {/* Top Bar */}
      <div className="h-12 border-b border-[#EAEAEA] flex items-center px-6 justify-between flex-shrink-0">
        <div className="flex items-center text-gray-500 space-x-2 text-[13px]">
          <span>AI Intelligence</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 font-medium">Weather Risks</span>
        </div>
        <div className="flex items-center space-x-3">
          <Search className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
          <MoreHorizontal className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 max-w-7xl mx-auto w-full">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-[28px] font-semibold tracking-tight text-gray-900 mb-2">
              Weather Intelligence
            </h1>
            <p className="text-[14px] text-gray-500">
              Turn weather data into operational decisions for your listing preparations.
            </p>
          </div>
          <button className="px-3 py-1.5 text-[13px] font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-sm transition-colors">
            Auto Reschedule Affected Tasks
          </button>
        </div>

        {/* 1. Weather Risk Alert Card */}
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 mb-8 flex flex-col sm:flex-row sm:items-center justify-between shadow-sm">
          <div className="flex items-start sm:items-center space-x-4 mb-4 sm:mb-0">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 flex-shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-[15px] font-semibold text-orange-900">Weather Risk Detected</h3>
              <p className="text-[13px] text-orange-700 mt-0.5">Drone shoot scheduled for Mar 7 may be affected by rain.</p>
              <div className="mt-2 flex items-center text-[12px] font-medium text-orange-800 bg-orange-100/50 px-2 py-1 rounded inline-flex">
                <Sparkles className="w-3 h-3 mr-1.5" /> AI Recommendation: Move drone shoot to Mar 5.
              </div>
            </div>
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 text-[13px] font-medium text-orange-700 bg-white border border-orange-200 hover:bg-orange-50 rounded-md transition-colors shadow-sm">
              View Task Timeline
            </button>
            <button className="px-4 py-2 text-[13px] font-medium text-white bg-orange-600 hover:bg-orange-700 rounded-md shadow-sm transition-colors">
              Auto Fix Schedule
            </button>
          </div>
        </div>

        {/* Top Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <MetricCard 
            title="Exterior Work Score" 
            value="92 / 100" 
            subtitle="This Week" 
            icon={<CloudSun className="w-5 h-5" />} 
          />
          <MetricCard 
            title="Drone Safety Score" 
            value="94 / 100" 
            subtitle="Mar 5" 
            icon={<Wind className="w-5 h-5" />} 
          />
          <ImpactSummaryCard 
            count={3} 
            properties={["4521 Barton Creek Blvd", "3307 Manor Rd", "1124 Westlake Dr"]} 
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            <OptimalDays />
            <WeeklyOverview />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <AIScheduleRecommendation />
            <WeatherSensitiveTasks />
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, subtitle, icon }: any) {
  return (
    <div className="bg-white border border-[#EAEAEA] rounded-xl p-5 shadow-sm flex items-center space-x-4">
      <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0">
        {icon}
      </div>
      <div>
        <div className="text-[12px] font-medium text-gray-500 mb-0.5">{title}</div>
        <div className="text-[24px] font-semibold text-gray-900 leading-tight">{value}</div>
        <div className="text-[11px] text-gray-400 mt-1">{subtitle}</div>
      </div>
    </div>
  );
}

function ImpactSummaryCard({ count, properties }: any) {
  return (
    <div className="bg-white border border-[#EAEAEA] rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="text-[12px] font-medium text-gray-500">Listings Affected This Week</div>
        <div className="w-6 h-6 rounded-full bg-red-50 text-red-600 flex items-center justify-center text-[12px] font-bold">{count}</div>
      </div>
      <div className="space-y-1.5">
        {properties.map((prop: string) => (
          <div key={prop} className="text-[12px] text-gray-700 flex items-center">
            <MapPin className="w-3 h-3 mr-1.5 text-gray-400" /> {prop}
          </div>
        ))}
      </div>
    </div>
  );
}

function OptimalDays() {
  return (
    <div className="bg-white border border-[#EAEAEA] rounded-xl p-5 shadow-sm">
      <h3 className="text-[14px] font-semibold text-gray-900 mb-4">Optimal Exterior Work Days</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="border border-emerald-200 bg-emerald-50/30 rounded-lg p-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-emerald-400"></div>
          <div className="flex justify-between items-start mb-2">
            <div className="font-semibold text-gray-900 text-[14px]">Mar 5</div>
            <CloudSun className="w-5 h-5 text-sky-500" />
          </div>
          <div className="text-[20px] font-bold text-gray-900 mb-3">72°F <span className="text-[12px] font-normal text-gray-500 ml-1">Partly Cloudy</span></div>
          <div className="flex space-x-4 text-[11px] text-gray-600">
            <div className="flex items-center"><Wind className="w-3 h-3 mr-1" /> 8 mph</div>
            <div className="flex items-center"><Droplets className="w-3 h-3 mr-1" /> 10% rain</div>
          </div>
        </div>
        <div className="border border-emerald-200 bg-emerald-50/30 rounded-lg p-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-emerald-400"></div>
          <div className="flex justify-between items-start mb-2">
            <div className="font-semibold text-gray-900 text-[14px]">Mar 9</div>
            <Sun className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-[20px] font-bold text-gray-900 mb-3">75°F <span className="text-[12px] font-normal text-gray-500 ml-1">Clear Skies</span></div>
          <div className="flex space-x-4 text-[11px] text-gray-600">
            <div className="flex items-center"><Wind className="w-3 h-3 mr-1" /> 5 mph</div>
            <div className="flex items-center"><Droplets className="w-3 h-3 mr-1" /> 0% rain</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WeeklyOverview() {
  const days = [
    { date: 'Mar 3', status: 'Ideal', type: 'success' },
    { date: 'Mar 4', status: 'Ideal', type: 'success' },
    { date: 'Mar 5', status: 'Ideal', type: 'success' },
    { date: 'Mar 6', status: 'Wind Risk', type: 'warning' },
    { date: 'Mar 7', status: 'Rain Risk', type: 'danger' },
    { date: 'Mar 8', status: 'Light Rain', type: 'warning' },
    { date: 'Mar 9', status: 'Ideal', type: 'success' },
  ];

  return (
    <div className="bg-white border border-[#EAEAEA] rounded-xl p-5 shadow-sm">
      <h3 className="text-[14px] font-semibold text-gray-900 mb-4">Weekly Weather Overview</h3>
      <div className="space-y-2">
        {days.map(day => (
          <div key={day.date} className="flex items-center justify-between p-2.5 rounded-lg border border-transparent hover:border-[#EAEAEA] hover:bg-[#FAFAFA] transition-colors">
            <div className="text-[13px] font-medium text-gray-900 w-16">{day.date}</div>
            <div className="flex-1">
              {day.type === 'success' && <span className="inline-flex items-center text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-100"><CheckCircle2 className="w-3 h-3 mr-1.5" /> {day.status}</span>}
              {day.type === 'warning' && <span className="inline-flex items-center text-[11px] font-medium text-amber-700 bg-amber-50 px-2 py-1 rounded border border-amber-100"><AlertTriangle className="w-3 h-3 mr-1.5" /> {day.status}</span>}
              {day.type === 'danger' && <span className="inline-flex items-center text-[11px] font-medium text-red-700 bg-red-50 px-2 py-1 rounded border border-red-100"><XCircle className="w-3 h-3 mr-1.5" /> {day.status}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AIScheduleRecommendation() {
  return (
    <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-5 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
        <Sparkles className="w-24 h-24 text-indigo-600" />
      </div>
      <div className="flex items-center mb-4">
        <Sparkles className="w-4 h-4 text-indigo-600 mr-2" />
        <h3 className="text-[14px] font-semibold text-indigo-900">AI Schedule Fix</h3>
      </div>
      
      <div className="space-y-3 mb-5 relative z-10">
        <div className="bg-white border border-indigo-100 rounded-lg p-3 flex items-center justify-between shadow-sm">
          <div>
            <div className="text-[12px] font-medium text-gray-900">Move drone shoot</div>
            <div className="text-[11px] text-gray-500">4521 Barton Creek Blvd</div>
          </div>
          <div className="flex items-center text-[12px] font-medium">
            <span className="text-red-600 line-through mr-2">Mar 7</span>
            <ArrowRight className="w-3 h-3 text-gray-400 mr-2" />
            <span className="text-emerald-600">Mar 5</span>
          </div>
        </div>
        
        <div className="bg-white border border-indigo-100 rounded-lg p-3 flex items-center justify-between shadow-sm">
          <div>
            <div className="text-[12px] font-medium text-gray-900">Move exterior painting</div>
            <div className="text-[11px] text-gray-500">3307 Manor Rd</div>
          </div>
          <div className="flex items-center text-[12px] font-medium">
            <span className="text-amber-600 line-through mr-2">Mar 6</span>
            <ArrowRight className="w-3 h-3 text-gray-400 mr-2" />
            <span className="text-emerald-600">Mar 9</span>
          </div>
        </div>
      </div>
      
      <button className="w-full py-2.5 text-[13px] font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-sm transition-colors relative z-10">
        Apply Suggested Schedule
      </button>
    </div>
  );
}

function WeatherSensitiveTasks() {
  const tasks = [
    { name: 'Drone Photography', address: '4521 Barton Creek Blvd', date: 'Mar 7', risk: 'High', type: 'danger' },
    { name: 'Exterior Painting', address: '3307 Manor Rd', date: 'Mar 6', risk: 'Moderate', type: 'warning' },
    { name: 'Roof Inspection', address: '1124 Westlake Dr', date: 'Mar 8', risk: 'Moderate', type: 'warning' },
  ];

  return (
    <div className="bg-white border border-[#EAEAEA] rounded-xl p-5 shadow-sm">
      <h3 className="text-[14px] font-semibold text-gray-900 mb-4">Weather-Sensitive Tasks</h3>
      <div className="space-y-3">
        {tasks.map((task, idx) => (
          <div key={idx} className="border border-[#EAEAEA] rounded-lg p-3.5 hover:bg-[#FAFAFA] transition-colors">
            <div className="flex justify-between items-start mb-2">
              <div className="font-medium text-[13px] text-gray-900">{task.name}</div>
              {task.type === 'danger' && <span className="text-[10px] font-bold uppercase tracking-wider text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-100">High Risk</span>}
              {task.type === 'warning' && <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">Moderate Risk</span>}
            </div>
            <div className="text-[12px] text-gray-500 flex items-center mb-2">
              <MapPin className="w-3 h-3 mr-1.5 text-gray-400" /> {task.address}
            </div>
            <div className="text-[11px] text-gray-500 flex items-center">
              <CalendarDays className="w-3 h-3 mr-1.5 text-gray-400" /> Scheduled: <span className="font-medium text-gray-700 ml-1">{task.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
