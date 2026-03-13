import {
  AlertTriangle,
  ArrowRight,
  Bot,
  Calendar,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  CloudSun,
  Droplets,
  Home,
  Loader2,
  MapPin,
  MessageSquare,
  MoreHorizontal,
  Play,
  Search,
  Settings,
  Sparkles,
  User,
  Wind,
  Zap,
} from 'lucide-react';
import { useState } from 'react';

export function SchedulerCanvas() {
  const [automationMode, setAutomationMode] = useState('suggest');

  return (
    <div className="flex-1 flex flex-col h-full bg-white relative">
      {/* Top Bar */}
      <div className="h-12 border-b border-[#EAEAEA] flex items-center px-6 justify-between flex-shrink-0">
        <div className="flex items-center text-gray-500 space-x-2 text-[13px]">
          <span>Operations</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 font-medium">AI Scheduler</span>
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
              AI Scheduler
            </h1>
            <p className="text-[14px] text-gray-500">
              Intelligent scheduling assistant for listing preparation workflows.
            </p>
          </div>
          <button className="px-3 py-1.5 text-[13px] font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-sm transition-colors flex items-center">
            <Sparkles className="w-4 h-4 mr-1.5" />
            Generate New Schedule
          </button>
        </div>

        {/* 2. Listing Selection Card */}
        <div className="bg-white border border-[#EAEAEA] rounded-xl p-5 mb-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0">
              <Home className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-[16px] font-semibold text-gray-900">4521 Barton Creek Blvd</h2>
              <div className="flex items-center text-[13px] text-gray-500 mt-1 space-x-3">
                <span className="flex items-center"><User className="w-3.5 h-3.5 mr-1" /> Sarah Jenkins (Seller)</span>
                <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1" /> Target: Mar 10</span>
              </div>
            </div>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-4">
            <div className="text-center">
              <div className="text-[20px] font-semibold text-gray-900 leading-none">85%</div>
              <div className="text-[11px] text-gray-500 mt-1">Readiness</div>
            </div>
            <div className="w-px h-8 bg-[#EAEAEA] self-center"></div>
            <div className="flex flex-col space-y-1.5 justify-center">
              <div className="flex items-center text-[11px] font-medium text-gray-600">
                <CheckCircle2 className="w-3 h-3 mr-1.5 text-emerald-500" /> 4 Tasks Remaining
              </div>
              <div className="flex items-center text-[11px] font-medium text-gray-600">
                <CloudSun className="w-3 h-3 mr-1.5 text-amber-500" /> Weather Risk: Low
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Config & Status */}
          <div className="space-y-8 lg:col-span-1">
            
            {/* 1. Automation Mode Section */}
            <div className="bg-white border border-[#EAEAEA] rounded-xl p-5 shadow-sm">
              <h3 className="text-[14px] font-semibold text-gray-900 mb-4">Automation Mode</h3>
              <div className="space-y-3">
                <ModeCard 
                  id="suggest"
                  title="AI Suggest" 
                  desc="AI proposes schedule but requires human approval before contacting vendors."
                  control="High Control"
                  risk="Low Risk"
                  active={automationMode === 'suggest'}
                  onClick={() => setAutomationMode('suggest')}
                />
                <ModeCard 
                  id="autobook"
                  title="Auto Book" 
                  desc="AI automatically books vendors and generates a final schedule."
                  control="Medium Control"
                  risk="Medium Risk"
                  active={automationMode === 'autobook'}
                  onClick={() => setAutomationMode('autobook')}
                />
                <ModeCard 
                  id="autonomous"
                  title="Fully Autonomous" 
                  desc="AI negotiates with vendors and manages scheduling automatically."
                  control="Low Control"
                  risk="High Risk"
                  active={automationMode === 'autonomous'}
                  onClick={() => setAutomationMode('autonomous')}
                />
              </div>
            </div>

            {/* 3. AI Schedule Scan Section */}
            <div className="bg-[#FAFAFA] border border-[#EAEAEA] rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[14px] font-semibold text-gray-900">System Scan</h3>
                <Loader2 className="w-4 h-4 text-indigo-600 animate-spin" />
              </div>
              <div className="space-y-2.5">
                <ScanItem text="Reading listing details" status="done" />
                <ScanItem text="Checking seller availability" status="done" />
                <ScanItem text="Syncing agent calendar" status="done" />
                <ScanItem text="Fetching vendor availability" status="done" />
                <ScanItem text="Checking weather forecast" status="done" />
                <ScanItem text="Analyzing task dependencies" status="active" />
                <ScanItem text="Generating optimal schedule" status="pending" />
              </div>
            </div>

            {/* 8. Automation Rules Panel */}
            <div className="bg-white border border-[#EAEAEA] rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[14px] font-semibold text-gray-900">Scheduling Rules</h3>
                <Settings className="w-4 h-4 text-gray-400" />
              </div>
              <div className="space-y-3">
                <RuleToggle label="Respect seller availability" active={true} />
                <RuleToggle label="Avoid late-night vendor messages" active={true} />
                <RuleToggle label="Automatically follow up after 24h" active={false} />
                <RuleToggle label="Suggest alternate vendors" active={true} />
                <RuleToggle label="Block drone tasks if high wind" active={true} />
              </div>
            </div>

          </div>

          {/* Right Column: Results & Timeline */}
          <div className="space-y-8 lg:col-span-2">
            
            {/* Top Results Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* 4. Optimal Schedule Result Card */}
              <div className="bg-indigo-600 rounded-xl p-5 shadow-sm text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                  <Sparkles className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <div className="text-[13px] font-medium text-indigo-100 mb-1">Optimal Listing Go Live</div>
                  <div className="text-[28px] font-bold mb-4">March 10, 2026</div>
                  <div className="space-y-1.5">
                    <div className="flex items-center text-[12px] text-indigo-50">
                      <CalendarDays className="w-3.5 h-3.5 mr-1.5" /> 7 days from today
                    </div>
                    <div className="flex items-center text-[12px] text-indigo-50">
                      <Zap className="w-3.5 h-3.5 mr-1.5" /> Est. 6 days faster than manual
                    </div>
                  </div>
                </div>
              </div>

              {/* 9. Schedule Confidence Score */}
              <div className="bg-white border border-[#EAEAEA] rounded-xl p-5 shadow-sm flex flex-col justify-center">
                <div className="text-[13px] font-medium text-gray-500 mb-1">Schedule Confidence</div>
                <div className="text-[32px] font-bold text-gray-900 mb-3">94%</div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">Vendor Availability</span>
                  <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">Weather Stability</span>
                  <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">Seller Availability</span>
                </div>
              </div>
            </div>

            {/* 7. Schedule Risk Detection */}
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between">
              <div className="flex items-start space-x-3 mb-3 sm:mb-0">
                <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[14px] font-semibold text-orange-900">Schedule Risk Detected</h4>
                  <p className="text-[12px] text-orange-700 mt-0.5">Drone vendor unavailable on Mar 7. May delay listing by 2 days.</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1.5 text-[12px] font-medium text-orange-700 bg-white border border-orange-200 hover:bg-orange-50 rounded-md transition-colors">
                  View Alternatives
                </button>
                <button className="px-3 py-1.5 text-[12px] font-medium text-white bg-orange-600 hover:bg-orange-700 rounded-md transition-colors shadow-sm">
                  Apply AI Fix
                </button>
              </div>
            </div>

            {/* 5. Proposed Timeline Schedule */}
            <div className="bg-white border border-[#EAEAEA] rounded-xl p-5 shadow-sm">
              <h3 className="text-[14px] font-semibold text-gray-900 mb-4">Proposed Timeline</h3>
              <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#EAEAEA] before:to-transparent">
                <TimelineItem 
                  date="Mar 6"
                  task="Photography"
                  vendor="Bright Lens Studio"
                  time="10:00 AM – 12:00 PM"
                  weather="Ideal"
                  confidence="98%"
                  icon={<Bot className="w-4 h-4" />}
                />
                <TimelineItem 
                  date="Mar 7"
                  task="Drone Shoot"
                  vendor="SkyView Drones"
                  time="2:00 PM – 3:30 PM"
                  weather="Wind Risk"
                  confidence="75%"
                  icon={<Wind className="w-4 h-4" />}
                  hasRisk
                />
                <TimelineItem 
                  date="Mar 8"
                  task="Deep Cleaning"
                  vendor="Sparkle Cleaners"
                  time="9:00 AM – 1:00 PM"
                  weather="Indoor"
                  confidence="99%"
                  icon={<Sparkles className="w-4 h-4" />}
                />
              </div>
            </div>

            {/* 6. Vendor Coordination Section */}
            <div className="bg-white border border-[#EAEAEA] rounded-xl p-5 shadow-sm">
              <h3 className="text-[14px] font-semibold text-gray-900 mb-4">Vendor Coordination</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <VendorCoordCard 
                  name="SkyView Drones"
                  service="Drone Photography"
                  sent={true}
                  response="Pending"
                  confidence="85%"
                />
                <VendorCoordCard 
                  name="Bright Lens Studio"
                  service="Photography"
                  sent={true}
                  response="Confirmed"
                  confidence="97%"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

function ModeCard({ id, title, desc, control, risk, active, onClick }: any) {
  return (
    <div 
      onClick={onClick}
      className={`p-3 rounded-lg border cursor-pointer transition-all ${
        active 
          ? 'border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500' 
          : 'border-[#EAEAEA] hover:border-gray-300 bg-white'
      }`}
    >
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center">
          <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-2 ${active ? 'border-indigo-600' : 'border-gray-300'}`}>
            {active && <div className="w-2 h-2 rounded-full bg-indigo-600" />}
          </div>
          <span className={`text-[13px] font-semibold ${active ? 'text-indigo-900' : 'text-gray-900'}`}>{title}</span>
        </div>
        <div className="flex space-x-1.5">
          <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">{control}</span>
          <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${risk === 'High Risk' ? 'bg-red-50 text-red-600' : risk === 'Medium Risk' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>{risk}</span>
        </div>
      </div>
      <p className="text-[11px] text-gray-500 pl-6">{desc}</p>
    </div>
  );
}

function ScanItem({ text, status }: { text: string, status: 'done' | 'active' | 'pending' }) {
  return (
    <div className="flex items-center text-[12px]">
      <div className="w-5 flex justify-center mr-2">
        {status === 'done' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
        {status === 'active' && <Loader2 className="w-4 h-4 text-indigo-600 animate-spin" />}
        {status === 'pending' && <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />}
      </div>
      <span className={`${status === 'active' ? 'text-indigo-900 font-medium' : status === 'done' ? 'text-gray-700' : 'text-gray-400'}`}>
        {text}
      </span>
    </div>
  );
}

function RuleToggle({ label, active }: { label: string, active: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[12px] text-gray-700">{label}</span>
      <div className={`w-8 h-4 rounded-full flex items-center px-0.5 transition-colors ${active ? 'bg-indigo-500' : 'bg-gray-200'}`}>
        <div className={`w-3 h-3 rounded-full bg-white shadow-sm transition-transform ${active ? 'translate-x-4' : 'translate-x-0'}`} />
      </div>
    </div>
  );
}

function TimelineItem({ date, task, vendor, time, weather, confidence, icon, hasRisk }: any) {
  return (
    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
      {/* Icon */}
      <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-indigo-50 text-indigo-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
        {icon}
      </div>
      
      {/* Card */}
      <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border shadow-sm ${hasRisk ? 'bg-orange-50/30 border-orange-200' : 'bg-white border-[#EAEAEA]'}`}>
        <div className="flex items-center justify-between mb-2">
          <div className="text-[14px] font-semibold text-gray-900">{task}</div>
          <div className="text-[12px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{date}</div>
        </div>
        
        <div className="space-y-1.5 mb-3">
          <div className="text-[12px] text-gray-600 flex items-center">
            <User className="w-3.5 h-3.5 mr-1.5 text-gray-400" /> Vendor: <span className="font-medium text-gray-900 ml-1">{vendor}</span>
          </div>
          <div className="text-[12px] text-gray-600 flex items-center">
            <Clock className="w-3.5 h-3.5 mr-1.5 text-gray-400" /> Time: <span className="font-medium text-gray-900 ml-1">{time}</span>
          </div>
          <div className="text-[12px] text-gray-600 flex items-center">
            <CloudSun className="w-3.5 h-3.5 mr-1.5 text-gray-400" /> Weather: <span className={`font-medium ml-1 ${weather === 'Ideal' ? 'text-emerald-600' : weather === 'Indoor' ? 'text-gray-600' : 'text-amber-600'}`}>{weather}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-[#EAEAEA]/60">
          <div className="text-[11px] text-gray-500">AI Confidence</div>
          <div className="text-[11px] font-medium text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">{confidence}</div>
        </div>
      </div>
    </div>
  );
}

function VendorCoordCard({ name, service, sent, response, confidence }: any) {
  return (
    <div className="border border-[#EAEAEA] rounded-lg p-3.5 bg-[#FAFAFA]">
      <div className="text-[13px] font-semibold text-gray-900 mb-0.5">{name}</div>
      <div className="text-[11px] text-gray-500 mb-3">{service}</div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[12px]">
          <span className="text-gray-600">Message Sent:</span>
          {sent ? <span className="text-emerald-600 font-medium flex items-center"><Check className="w-3 h-3 mr-1" /> Yes</span> : <span className="text-gray-400">No</span>}
        </div>
        <div className="flex items-center justify-between text-[12px]">
          <span className="text-gray-600">Response:</span>
          <span className={`font-medium ${response === 'Confirmed' ? 'text-emerald-600' : 'text-amber-600'}`}>{response}</span>
        </div>
        <div className="flex items-center justify-between text-[12px]">
          <span className="text-gray-600">AI Confidence:</span>
          <span className="font-medium text-indigo-600">{confidence}</span>
        </div>
      </div>
      
      <button className="w-full mt-3 py-1.5 text-[11px] font-medium text-gray-600 bg-white border border-[#EAEAEA] hover:bg-gray-50 rounded transition-colors">
        Manual Override
      </button>
    </div>
  );
}
