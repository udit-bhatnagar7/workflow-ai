import {
  Building,
  ChevronRight,
  ChevronLeft,
  CloudSun,
  Home,
  Inbox,
  LayoutGrid,
  LayoutTemplate,
  Network,
  Settings,
  Sparkles,
  CalendarDays,
  LayoutDashboard,
  FileSignature,
  FileText,
  FileCheck,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function Sidebar({ activePage, setActivePage }: { activePage: string, setActivePage: (page: string) => void }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  React.useEffect(() => {
    if (activePage === 'seller-disclosure' || activePage === 'listing-agreement') {
      setIsCollapsed(true);
    }
  }, [activePage]);

  return (
    <motion.div 
      initial={false}
      animate={{ width: isCollapsed ? 64 : 220 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="hidden md:flex flex-shrink-0 border-r border-[#EAEAEA] bg-[#FAFAFA] flex-col h-full relative"
    >
      {/* Collapse Toggle Button */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 bg-white border border-[#EAEAEA] rounded-full p-1 shadow-sm hover:bg-gray-50 z-10 text-gray-400 hover:text-gray-600 transition-colors"
      >
        {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>

      <div className="flex flex-col h-full overflow-hidden w-full">
        {/* Workspace Header */}
        <div className={`h-12 flex items-center ${isCollapsed ? 'justify-center' : 'px-4'} font-medium text-[14px] hover:bg-[#F2F2F2] cursor-pointer transition-colors shrink-0`}>
          <div className="w-5 h-5 rounded bg-indigo-600 text-white flex items-center justify-center text-[11px] font-bold shrink-0">
            R
          </div>
          {!isCollapsed && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="ml-2 flex items-center flex-1"
            >
              RIA Assistant
              <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
            </motion.div>
          )}
        </div>

        {/* Navigation */}
        <div className={`flex-1 overflow-y-auto py-3 ${isCollapsed ? 'px-2' : 'px-2'} space-y-0.5`}>
          <NavItem 
            icon={<LayoutDashboard className="w-4 h-4 text-indigo-500" />} 
            label="Dashboard" 
            active={activePage === 'dashboard'} 
            onClick={() => setActivePage('dashboard')} 
            isCollapsed={isCollapsed}
          />
          <NavItem icon={<Inbox className="w-4 h-4" />} label="Inbox" badge="3" isCollapsed={isCollapsed} />
          <NavItem icon={<Home className="w-4 h-4" />} label="Active Listings" isCollapsed={isCollapsed} />
          <NavItem icon={<LayoutGrid className="w-4 h-4" />} label="Views" isCollapsed={isCollapsed} />
          
          {!isCollapsed ? (
            <div className="mt-6 mb-2 px-2 text-[11px] font-medium text-gray-400 uppercase tracking-wider overflow-hidden whitespace-nowrap">
              Operations
            </div>
          ) : <div className="h-4 mt-6" />}
          
          <NavItem 
            icon={<LayoutTemplate className="w-4 h-4 text-indigo-500" />} 
            label="Templates" 
            active={activePage === 'templates'} 
            onClick={() => setActivePage('templates')} 
            isCollapsed={isCollapsed}
          />
          <NavItem 
            icon={<CalendarDays className="w-4 h-4 text-orange-500" />} 
            label="AI Scheduler" 
            active={activePage === 'scheduler'} 
            onClick={() => setActivePage('scheduler')} 
            isCollapsed={isCollapsed}
          />
          <NavItem icon={<Network className="w-4 h-4 text-blue-500" />} label="Workflows" isCollapsed={isCollapsed} />
          <NavItem 
            icon={<FileSignature className="w-4 h-4 text-emerald-500" />} 
            label="Seller Workflow" 
            active={activePage === 'seller-workflow'} 
            onClick={() => setActivePage('seller-workflow')} 
            isCollapsed={isCollapsed}
          />
          <NavItem 
            icon={<FileCheck className="w-4 h-4 text-indigo-500" />} 
            label="Listing Agreement" 
            active={activePage === 'listing-agreement'} 
            onClick={() => setActivePage('listing-agreement')} 
            isCollapsed={isCollapsed}
          />
          <NavItem 
            icon={<FileText className="w-4 h-4 text-purple-500" />} 
            label="Seller Disclosure" 
            active={activePage === 'seller-disclosure'} 
            onClick={() => setActivePage('seller-disclosure')} 
            isCollapsed={isCollapsed}
          />
          <NavItem 
            icon={<Building className="w-4 h-4 text-emerald-500" />} 
            label="Vendors" 
            active={activePage === 'vendors'} 
            onClick={() => setActivePage('vendors')} 
            isCollapsed={isCollapsed}
          />

          {!isCollapsed ? (
            <div className="mt-6 mb-2 px-2 text-[11px] font-medium text-gray-400 uppercase tracking-wider overflow-hidden whitespace-nowrap">
              AI Intelligence
            </div>
          ) : <div className="h-4 mt-6" />}
          
          <NavItem icon={<Sparkles className="w-4 h-4 text-indigo-500" />} label="Critical Paths" isCollapsed={isCollapsed} />
          <NavItem 
            icon={<CloudSun className="w-4 h-4 text-sky-500" />} 
            label="Weather Risks" 
            active={activePage === 'weather'} 
            onClick={() => setActivePage('weather')} 
            isCollapsed={isCollapsed}
          />
        </div>

        {/* Footer */}
        <div className="p-2 border-t border-[#EAEAEA] shrink-0">
          <NavItem icon={<Settings className="w-4 h-4" />} label="Settings" isCollapsed={isCollapsed} />
        </div>
      </div>
    </motion.div>
  );
}

function NavItem({ 
  icon, 
  label, 
  badge, 
  active = false, 
  onClick, 
  isCollapsed 
}: { 
  icon: React.ReactNode; 
  label: string; 
  badge?: string; 
  active?: boolean; 
  onClick?: () => void;
  isCollapsed: boolean;
}) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center rounded-md cursor-pointer transition-all ${isCollapsed ? 'justify-center p-2' : 'px-2 py-1.5'} ${
        active ? 'bg-[#EFEFEF] text-gray-900 font-medium' : 'text-gray-600 hover:bg-[#F2F2F2] hover:text-gray-900'
      }`}
      title={isCollapsed ? label : ""}
    >
      <div className={`${isCollapsed ? '' : 'mr-2'} opacity-80 shrink-0`}>{icon}</div>
      {!isCollapsed && (
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="whitespace-nowrap overflow-hidden text-ellipsis"
        >
          {label}
        </motion.span>
      )}
      {!isCollapsed && badge && (
        <span className="ml-auto bg-gray-200 text-gray-600 text-[10px] px-1.5 py-0.5 rounded-sm font-medium">
          {badge}
        </span>
      )}
    </div>
  );
}
