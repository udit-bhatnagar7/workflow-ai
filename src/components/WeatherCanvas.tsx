import React, { useState } from 'react';
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
  CalendarDays,
  Cloud,
  CloudRain,
  X,
  History,
  Settings2,
  Maximize2,
  Loader2,
  RefreshCcw,
  ExternalLink
} from 'lucide-react';

export function WeatherCanvas() {

  return (
    <div className="flex-1 flex flex-col h-full bg-white relative overflow-hidden">
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
      <div className="flex-1 overflow-y-auto p-8 mx-auto w-full">
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

        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          <div className="flex-1">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex items-start h-full">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 mr-4 flex-shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-[16px] font-bold text-gray-900 mb-1">Weather Risk Detected</h3>
                <p className="text-[13px] text-amber-800 leading-relaxed">
                  Incoming storm system expected Mar 06-07. High probability of precipitation and wind gusts exceeding 20mph will impact all coastal drone operations.
                </p>
                <div className="flex gap-3 mt-4">
                  <span className="px-2 py-1 bg-amber-100 text-[10px] font-bold text-amber-700 rounded uppercase tracking-wider">Drone Restricted</span>
                  <span className="px-2 py-1 bg-amber-100 text-[10px] font-bold text-amber-700 rounded uppercase tracking-wider">Painting Alert</span>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/3">
            <ImpactSummaryCard 
              count={3} 
              properties={["4521 Barton Creek Blvd", "3307 Manor Rd", "1124 Westlake Dr"]} 
            />
          </div>
        </div>

        {/* 2. 7-Day Forecast */}
        <WeeklyOverview />

        {/* Pro AI Automation Section */}
        <div className="mt-8">
          <AIScheduleRecommendation />
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


function WeeklyOverview() {
  const weatherData = [
    { day: 'Tue', date: 'Mar 03', icon: 'cloud', high: '72°', low: '58°', rain: '10% rain', drone: '✓ Drone', droneType: 'success', border: 'border-violet-300', dateColor: 'text-violet-600', dateWeight: 600 },
    { day: 'Wed', date: 'Mar 04', icon: 'sun', high: '76°', low: '60°', rain: '5% rain', drone: '✓ Drone', droneType: 'success', border: 'border-gray-200', dateColor: 'text-gray-400', dateWeight: 400 },
    { day: 'Thu', date: 'Mar 05', icon: 'sun', high: '78°', low: '62°', rain: '0% rain', drone: '✓ Drone', droneType: 'success', border: 'border-gray-200', dateColor: 'text-gray-400', dateWeight: 400 },
    { day: 'Fri', date: 'Mar 06', icon: 'cloud', high: '74°', low: '59°', rain: '15% rain', drone: '✓ Drone', droneType: 'success', border: 'border-gray-200', dateColor: 'text-gray-400', dateWeight: 400 },
    { day: 'Sat', date: 'Mar 07', icon: 'cloud-rain', high: '64°', low: '55°', rain: '70% rain', drone: '✗ Drone', droneType: 'danger', border: 'border-red-200', dateColor: 'text-gray-400', dateWeight: 400 },
    { day: 'Sun', date: 'Mar 08', icon: 'sun-amber', high: '68°', low: '57°', rain: '30% rain', drone: '✗ Drone', droneType: 'danger', border: 'border-gray-200', dateColor: 'text-gray-400', dateWeight: 400 },
    { day: 'Mon', date: 'Mar 09', icon: 'sun', high: '75°', low: '61°', rain: '5% rain', drone: '✓ Drone', droneType: 'success', border: 'border-gray-200', dateColor: 'text-gray-400', dateWeight: 400 },
  ];

  return (
    <div className="mb-8">
      <h3 className="text-[14px] font-semibold text-gray-900 mb-4">7-Day Weather Forecast</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
        {weatherData.map((item, idx) => (
          <div key={idx} className={`bg-white rounded-xl border-2 p-4 text-center ${item.border}`}>
            <div className="text-xs text-gray-500 mb-1">{item.day}</div>
            <div className={`text-sm mb-1 ${item.dateColor}`} style={{ fontWeight: item.dateWeight }}>{item.date}</div>
            {item.icon === 'cloud' && <Cloud className="lucide lucide-cloud w-7 h-7 mx-auto mb-2 text-emerald-500" />}
            {item.icon === 'sun' && <Sun className="lucide lucide-sun w-7 h-7 mx-auto mb-2 text-emerald-500" />}
            {item.icon === 'sun-amber' && <Sun className="lucide lucide-sun w-7 h-7 mx-auto mb-2 text-amber-500" />}
            {item.icon === 'cloud-rain' && <CloudRain className="lucide lucide-cloud-rain w-7 h-7 mx-auto mb-2 text-red-500" />}
            <div className="text-sm text-gray-800 mb-2" style={{ fontWeight: 600 }}>{item.high}</div>
            <div className="text-xs text-gray-400 mb-2">{item.low}</div>
            <div className={`text-xs px-1.5 py-0.5 rounded-full mb-1 ${item.rain.includes('70%') ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
              {item.rain}
            </div>
            <div className="flex gap-1 justify-center">
              <span className={`text-[10px] px-1 py-0.5 rounded ${item.droneType === 'danger' ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-600'}`}>
                {item.drone}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AIScheduleRecommendation() {
  const [selectedTasks, setSelectedTasks] = useState<number[]>([0, 1, 2]); // Default selection
  const [executionStatus, setExecutionStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  const tasks = [
    { 
      task: 'Drone Photography', 
      address: '4521 Barton Creek Blvd',
      reason: 'Avoid 70% precipitation on Mar 7. Moving to Mar 5 offers 94% safety score.',
      from: 'Mar 7', 
      to: 'Mar 5', 
      risk: 'Rain (70%)', 
      impact: 'High',
      confidence: 0.98
    },
    { 
      task: 'Exterior Painting', 
      address: '3307 Manor Rd',
      reason: 'Avoid high wind gusts (22mph) on Mar 6. Mar 9 forecast is calm (5mph).',
      from: 'Mar 6', 
      to: 'Mar 9', 
      risk: 'Wind (18mph)', 
      impact: 'Moderate',
      confidence: 0.92
    },
    { 
      task: 'Roof Inspection', 
      address: '1124 Westlake Dr',
      reason: 'Rain forecast for afternoon. Moving to morning slot for dry surface.',
      from: 'Mar 8', 
      to: 'Mar 8 (AM)', 
      risk: 'Rain (40%)', 
      impact: 'High',
      confidence: 0.95
    },
    { 
      task: 'Landscaping Photo', 
      address: '2901 Oak Haven Dr',
      reason: 'Cloudy skies on Mar 4. Moving to Mar 5 for full sun photography.',
      from: 'Mar 4', 
      to: 'Mar 5', 
      risk: 'Overcast', 
      impact: 'Low',
      confidence: 0.88
    }
  ];

  const toggleTask = (index: number) => {
    if (executionStatus !== 'idle') return;
    setSelectedTasks(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };

  const handleExecute = () => {
    setExecutionStatus('processing');
    // Simulated API call/sync
    setTimeout(() => {
      setExecutionStatus('success');
    }, 2400);
  };

  if (executionStatus === 'success') {
    return (
      <div className="bg-white border-2 border-emerald-100 rounded-2xl p-8 shadow-xl relative overflow-hidden animate-in zoom-in-95 duration-500">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <CheckCircle2 className="w-32 h-32 text-emerald-500" />
        </div>
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6 shadow-inner ring-4 ring-emerald-50/50">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          
          <h3 className="text-[24px] font-black text-gray-900 mb-2">Transformation Complete</h3>
          <p className="text-[15px] text-gray-500 max-w-md mb-8">
            Successfully synchronized <span className="font-bold text-emerald-600">{selectedTasks.length} schedule updates</span> across listing calendars and vendor networks.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl mb-8">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Calendar Sync</div>
              <div className="text-[14px] font-bold text-gray-900 flex items-center justify-center">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mr-2" /> Verified
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Vendor Alert</div>
              <div className="text-[14px] font-bold text-gray-900">Sent (Automated)</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Efficiency</div>
              <div className="text-[14px] font-bold text-emerald-600">+{selectedTasks.length * 4}% Overall</div>
            </div>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={() => setExecutionStatus('idle')}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-[15px] transition-all shadow-lg shadow-indigo-200"
            >
              Done
            </button>
            <button className="px-8 py-3 bg-white border border-gray-200 text-gray-600 rounded-xl font-bold text-[15px] hover:bg-gray-50 transition-all flex items-center">
              View Updated Schedule <ChevronRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-indigo-200 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
      {/* Processing Overlay */}
      {executionStatus === 'processing' && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-md z-50 flex flex-col items-center justify-center animate-in fade-in duration-300">
          <div className="w-16 h-16 relative mb-4">
            <Loader2 className="w-16 h-16 text-indigo-600 animate-spin" />
            <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-indigo-400" />
          </div>
          <p className="text-[16px] font-bold text-gray-900 animate-pulse">Synchronizing Transformations...</p>
          <p className="text-[12px] text-gray-500 mt-2">AI is updating vendor portals and agent calendars</p>
        </div>
      )}

      {/* Decorative pulse glow */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-700"></div>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 relative z-10">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200 mr-4">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-[18px] font-bold text-gray-900 flex items-center">
              Autonomous Scheduler
              <span className="ml-3 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest bg-indigo-100 text-indigo-700 rounded-full">Pro</span>
            </h3>
            <p className="text-[13px] text-gray-500">AI has identified {tasks.length} optimizations based on weather delta.</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-6 px-6 py-3 bg-gray-50 rounded-xl border border-gray-100">
          <div className="text-center">
            <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Selected</div>
            <div className="text-[16px] font-bold text-indigo-600">{selectedTasks.length.toString().padStart(2, '0')}</div>
          </div>
          <div className="w-px h-8 bg-gray-200"></div>
          <div className="text-center">
            <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Efficiency</div>
            <div className="text-[16px] font-bold text-emerald-500">+{selectedTasks.length * 4}%</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        {tasks.map((rec, i) => (
          <div 
            key={i} 
            onClick={() => toggleTask(i)}
            className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 relative group/card ${
              selectedTasks.includes(i) 
                ? 'border-indigo-300 bg-white shadow-md' 
                : 'border-gray-100 bg-gray-50/30'
            }`}
          >
            {/* Selection Indicator */}
            <div className={`absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
              selectedTasks.includes(i)
                ? 'bg-indigo-600 border-indigo-600 text-white'
                : 'bg-white border-gray-300'
            }`}>
              {selectedTasks.includes(i) && <CheckCircle2 className="w-3.5 h-3.5" />}
            </div>

            <div className="flex justify-between items-start mb-3 pr-8">
              <div>
                <div className={`text-[13px] font-bold transition-colors ${selectedTasks.includes(i) ? 'text-gray-900' : 'text-gray-400'}`}>
                  {rec.task}
                </div>
                <div className="text-[11px] text-gray-500 flex items-center mt-1">
                  <MapPin className="w-3 h-3 mr-1" /> {rec.address}
                </div>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                !selectedTasks.includes(i) ? 'bg-gray-100 text-gray-400' :
                rec.impact === 'High' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
              }`}>
                {rec.impact} Impact
              </span>
            </div>
            
            <div className={`flex items-center justify-between mt-4 p-2 rounded-lg transition-colors ${
              selectedTasks.includes(i) ? 'bg-gray-50' : 'bg-transparent'
            }`}>
              <div className="text-center">
                <div className="text-[9px] uppercase font-bold text-gray-400">Current</div>
                <div className={`text-[12px] font-bold line-through ${selectedTasks.includes(i) ? 'text-red-400' : 'text-gray-300'}`}>{rec.from}</div>
              </div>
              <ArrowRight className={`w-4 h-4 transition-transform ${selectedTasks.includes(i) ? 'text-indigo-400 group-hover/card:translate-x-1' : 'text-gray-200'}`} />
              <div className="text-center">
                <div className="text-[9px] uppercase font-bold text-gray-400">AI Target</div>
                <div className={`text-[12px] font-bold ${selectedTasks.includes(i) ? 'text-emerald-600' : 'text-gray-400'}`}>{rec.to}</div>
              </div>
              <div className="text-right border-l border-gray-200 pl-4 ml-4">
                <div className="text-[9px] uppercase font-bold text-gray-400">Delta</div>
                <div className={`text-[11px] font-bold tracking-tight ${selectedTasks.includes(i) ? 'text-gray-700' : 'text-gray-400'}`}>{rec.risk}</div>
              </div>
            </div>

            {selectedTasks.includes(i) && (
              <div className="mt-3 p-2 bg-indigo-50/50 rounded text-[11px] text-indigo-900 border-l-2 border-indigo-300 flex items-start animate-in fade-in slide-in-from-top-1">
                <Sparkles className="w-3 h-3 mr-2 mt-0.5 flex-shrink-0 text-indigo-400" />
                {rec.reason}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button 
          onClick={handleExecute}
          disabled={selectedTasks.length === 0}
          className={`flex-1 py-4 text-[14px] font-bold rounded-xl shadow-lg transition-all flex items-center justify-center group/btn ${
            selectedTasks.length > 0
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200'
              : 'bg-gray-100 text-gray-400 shadow-none cursor-not-allowed'
          }`}
        >
          {selectedTasks.length > 0 
            ? `Execute Autonomous Reschedule (${selectedTasks.length})` 
            : 'Select Tasks to Proceed'}
          {selectedTasks.length > 0 && <Sparkles className="w-4 h-4 ml-2 group-hover/btn:rotate-12 transition-transform" />}
        </button>
        <button className="px-6 py-4 text-[14px] font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all">
          Ignore Suggestion
        </button>
      </div>
    </div>
  );
}
