import {
  Building,
  ChevronRight,
  CloudSun,
  Home,
  Inbox,
  LayoutGrid,
  LayoutTemplate,
  Network,
  Settings,
  Sparkles,
  CalendarDays
} from 'lucide-react';
import React from 'react';

export function Sidebar({ activePage, setActivePage }: { activePage: string, setActivePage: (page: string) => void }) {
  return (
    <div className="w-[220px] flex-shrink-0 border-r border-[#EAEAEA] bg-[#FAFAFA] flex flex-col h-full">
      {/* Workspace Header */}
      <div className="h-12 flex items-center px-4 font-medium text-[14px] hover:bg-[#F2F2F2] cursor-pointer transition-colors">
        <div className="w-5 h-5 rounded bg-indigo-600 text-white flex items-center justify-center mr-2 text-[11px] font-bold">
          R
        </div>
        RIA Assistant
        <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        <NavItem icon={<Inbox className="w-4 h-4" />} label="Inbox" badge="3" />
        <NavItem icon={<Home className="w-4 h-4" />} label="Active Listings" />
        <NavItem icon={<LayoutGrid className="w-4 h-4" />} label="Views" />
        
        <div className="mt-6 mb-2 px-2 text-[11px] font-medium text-gray-400 uppercase tracking-wider">
          Operations
        </div>
        <NavItem 
          icon={<LayoutTemplate className="w-4 h-4 text-indigo-500" />} 
          label="Templates" 
          active={activePage === 'templates'} 
          onClick={() => setActivePage('templates')} 
        />
        <NavItem 
          icon={<CalendarDays className="w-4 h-4 text-orange-500" />} 
          label="AI Scheduler" 
          active={activePage === 'scheduler'} 
          onClick={() => setActivePage('scheduler')} 
        />
        <NavItem icon={<Network className="w-4 h-4 text-blue-500" />} label="Workflows" />
        <NavItem 
          icon={<Building className="w-4 h-4 text-emerald-500" />} 
          label="Vendors" 
          active={activePage === 'vendors'} 
          onClick={() => setActivePage('vendors')} 
        />

        <div className="mt-6 mb-2 px-2 text-[11px] font-medium text-gray-400 uppercase tracking-wider">
          AI Intelligence
        </div>
        <NavItem icon={<Sparkles className="w-4 h-4 text-indigo-500" />} label="Critical Paths" />
        <NavItem 
          icon={<CloudSun className="w-4 h-4 text-sky-500" />} 
          label="Weather Risks" 
          active={activePage === 'weather'} 
          onClick={() => setActivePage('weather')} 
        />
      </div>

      {/* Footer */}
      <div className="p-2 border-t border-[#EAEAEA]">
        <NavItem icon={<Settings className="w-4 h-4" />} label="Settings" />
      </div>
    </div>
  );
}

function NavItem({ icon, label, badge, active = false, onClick }: { icon: React.ReactNode; label: string; badge?: string; active?: boolean; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center px-2 py-1.5 rounded-md cursor-pointer transition-colors ${
        active ? 'bg-[#EFEFEF] text-gray-900 font-medium' : 'text-gray-600 hover:bg-[#F2F2F2] hover:text-gray-900'
      }`}
    >
      <div className="mr-2 opacity-80">{icon}</div>
      <span>{label}</span>
      {badge && (
        <span className="ml-auto bg-gray-200 text-gray-600 text-[10px] px-1.5 py-0.5 rounded-sm font-medium">
          {badge}
        </span>
      )}
    </div>
  );
}
