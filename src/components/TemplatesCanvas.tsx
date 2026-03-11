import {
  ChevronRight,
  MoreHorizontal,
  Search,
  LayoutTemplate,
  Clock,
  CheckCircle2,
  Play,
  Copy,
  Trash2,
  X,
  Plus,
  GripVertical,
  Calendar,
  User,
  Settings
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function TemplatesCanvas() {
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

  const templates = [
    {
      id: 1,
      title: "Standard Listing Prep",
      description: "Basic preparation workflow for standard residential listings.",
      tasks: 6,
      duration: "14 Days",
      status: "Active",
      steps: [
        { id: 1, name: 'Initial Walkthrough', duration: '1 Day', assignee: 'Agent', type: 'Inspection' },
        { id: 2, name: 'Deep Cleaning', duration: '1 Day', assignee: 'Vendor', type: 'Cleaning' },
        { id: 3, name: 'Home Staging', duration: '2 Days', assignee: 'Vendor', type: 'Staging' },
        { id: 4, name: 'Professional Photography', duration: '1 Day', assignee: 'Vendor', type: 'Media' },
        { id: 5, name: 'Drone & Video Walkthrough', duration: '1 Day', assignee: 'Vendor', type: 'Media' },
        { id: 6, name: 'MLS Draft & Review', duration: '1 Day', assignee: 'Agent', type: 'Admin' },
      ]
    },
    {
      id: 2,
      title: "Luxury Property Prep",
      description: "Extended workflow including drone, twilight photography, and deep staging.",
      tasks: 8,
      duration: "21 Days",
      status: "Active",
      steps: [
        { id: 1, name: 'Initial Walkthrough', duration: '1 Day', assignee: 'Agent', type: 'Inspection' },
        { id: 2, name: 'Deep Cleaning', duration: '2 Days', assignee: 'Vendor', type: 'Cleaning' },
        { id: 3, name: 'Luxury Home Staging', duration: '3 Days', assignee: 'Vendor', type: 'Staging' },
        { id: 4, name: 'Daytime Photography', duration: '1 Day', assignee: 'Vendor', type: 'Media' },
        { id: 5, name: 'Twilight Photography', duration: '1 Day', assignee: 'Vendor', type: 'Media' },
        { id: 6, name: 'Drone & Video Walkthrough', duration: '1 Day', assignee: 'Vendor', type: 'Media' },
        { id: 7, name: '3D Virtual Tour', duration: '1 Day', assignee: 'Vendor', type: 'Media' },
        { id: 8, name: 'MLS Draft & Review', duration: '2 Days', assignee: 'Agent', type: 'Admin' },
      ]
    },
    {
      id: 3,
      title: "Quick Turnaround",
      description: "Accelerated preparation for fast-to-market properties.",
      tasks: 4,
      duration: "5 Days",
      status: "Draft",
      steps: [
        { id: 1, name: 'Light Cleaning', duration: '1 Day', assignee: 'Vendor', type: 'Cleaning' },
        { id: 2, name: 'Basic Photography', duration: '1 Day', assignee: 'Vendor', type: 'Media' },
        { id: 3, name: 'Sign Installation', duration: '1 Day', assignee: 'Vendor', type: 'Admin' },
        { id: 4, name: 'MLS Draft & Review', duration: '1 Day', assignee: 'Agent', type: 'Admin' },
      ]
    }
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-white relative">
      {/* Top Bar */}
      <div className="h-12 border-b border-[#EAEAEA] flex items-center px-6 justify-between flex-shrink-0">
        <div className="flex items-center text-gray-500 space-x-2 text-[13px]">
          <span>Operations</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 font-medium">Templates</span>
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
              Workflow Templates
            </h1>
            <p className="text-[14px] text-gray-500">
              Standardize your listing preparation with reusable task workflows.
            </p>
          </div>
          <button className="px-3 py-1.5 text-[13px] font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-sm transition-colors">
            Create Template
          </button>
        </div>

        {/* Grid of Templates */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map(template => (
            <div 
              key={template.id} 
              onClick={() => setSelectedTemplate(template)}
              className="border border-[#EAEAEA] rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-100 transition-colors">
                  <LayoutTemplate className="w-5 h-5" />
                </div>
                <div className="flex space-x-1" onClick={(e) => e.stopPropagation()}>
                  <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
                    <Play className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
                    <Copy className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <h3 className="text-[16px] font-semibold text-gray-900 mb-1">{template.title}</h3>
              <p className="text-[13px] text-gray-500 mb-5 flex-1">{template.description}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-[#EAEAEA]">
                <div className="flex space-x-4 text-[12px] text-gray-500">
                  <div className="flex items-center">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                    {template.tasks} Tasks
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-3.5 h-3.5 mr-1" />
                    {template.duration}
                  </div>
                </div>
                <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${template.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-gray-100 text-gray-600 border border-gray-200'}`}>
                  {template.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedTemplate && (
          <TemplateModal template={selectedTemplate} onClose={() => setSelectedTemplate(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function TemplateModal({ template, onClose }: { template: any, onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="px-8 py-6 border-b border-[#EAEAEA] bg-white flex items-start justify-between z-10">
          <div className="flex items-center space-x-5">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-100">
              <LayoutTemplate className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center space-x-3 mb-1">
                <h2 className="text-[22px] font-bold text-gray-900 leading-tight tracking-tight">{template.title}</h2>
                <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${template.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                  {template.status}
                </span>
              </div>
              <p className="text-[14px] text-gray-500 max-w-md">{template.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 text-[13px] font-semibold text-gray-700 bg-white border border-[#EAEAEA] hover:bg-gray-50 rounded-lg transition-all shadow-sm">
              Duplicate
            </button>
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content Area - Split Layout */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row bg-gray-50/30">
          
          {/* Left Side: Stats & Info */}
          <div className="w-full md:w-72 border-r border-[#EAEAEA] p-8 space-y-8 bg-white/50">
            <div>
              <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.1em] mb-4">Workflow Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-gray-500">Total Tasks</span>
                  <span className="text-[13px] font-bold text-gray-900">{template.steps.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-gray-500">Est. Duration</span>
                  <span className="text-[13px] font-bold text-gray-900">{template.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-gray-500">Avg. Cost</span>
                  <span className="text-[13px] font-bold text-gray-900">$1,250</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.1em] mb-4">Automation Rules</h3>
              <div className="space-y-3">
                <div className="flex items-center text-[12px] text-gray-600">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-2 text-emerald-500" /> Auto-assign vendors
                </div>
                <div className="flex items-center text-[12px] text-gray-600">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-2 text-emerald-500" /> Weather-aware scheduling
                </div>
                <div className="flex items-center text-[12px] text-gray-600">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-2 text-emerald-500" /> Seller sync enabled
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#EAEAEA]">
              <button className="w-full py-2.5 text-[13px] font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-all border border-indigo-100">
                Edit Template Rules
              </button>
            </div>
          </div>

          {/* Right Side: Timeline Steps */}
          <div className="flex-1 overflow-y-auto p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-[16px] font-bold text-gray-900 tracking-tight">Sequence of Operations</h3>
              <button className="px-3 py-1.5 text-[12px] font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-md shadow-indigo-100 transition-all flex items-center">
                <Plus className="w-4 h-4 mr-1.5" /> Add Step
              </button>
            </div>

            {/* Timeline Container */}
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-indigo-100 before:via-indigo-100 before:to-transparent">
              {template.steps.map((step: any, index: number) => (
                <div key={step.id} className="relative flex items-start group">
                  {/* Timeline Dot */}
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-indigo-50 text-indigo-600 shadow-sm shrink-0 z-10 transition-transform group-hover:scale-110">
                    <span className="text-[11px] font-bold">{index + 1}</span>
                  </div>
                  
                  {/* Step Card */}
                  <div className="ml-6 flex-1 bg-white border border-[#EAEAEA] rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group-hover:border-indigo-200">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="text-[15px] font-bold text-gray-900 mb-0.5">{step.name}</div>
                        <div className="text-[11px] font-bold text-indigo-500 uppercase tracking-wider">{step.type}</div>
                      </div>
                      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                          <Settings className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center text-[12px] text-gray-600 bg-gray-50 px-3 py-2 rounded-xl border border-gray-100">
                        <Clock className="w-3.5 h-3.5 mr-2 text-gray-400" />
                        <span className="text-gray-400 mr-1">Duration:</span>
                        <span className="font-bold text-gray-900">{step.duration}</span>
                      </div>
                      <div className="flex items-center text-[12px] text-gray-600 bg-gray-50 px-3 py-2 rounded-xl border border-gray-100">
                        <User className="w-3.5 h-3.5 mr-2 text-gray-400" />
                        <span className="text-gray-400 mr-1">Assignee:</span>
                        <span className="font-bold text-gray-900">{step.assignee}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="px-8 py-5 border-t border-[#EAEAEA] bg-white flex justify-end space-x-4">
          <button 
            onClick={onClose}
            className="px-5 py-2.5 text-[14px] font-bold text-gray-600 hover:text-gray-900 transition-colors"
          >
            Cancel
          </button>
          <button className="px-8 py-2.5 text-[14px] font-bold text-white bg-gray-900 hover:bg-black rounded-xl shadow-lg transition-all">
            Save Template
          </button>
        </div>
      </motion.div>
    </div>
  );
}
