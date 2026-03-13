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
  Settings,
  Building,
  GitCommitHorizontal,
  CloudSun,
  UserCheck
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function TemplatesCanvas() {
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

  const templates = [
    {
      id: 1,
      title: "Standard Listing Prep",
      description: "Basic preparation workflow for standard listings",
      tasks: 7,
      used: 142,
      avgLive: "8d",
      status: "Active",
      sequence: [
        { name: 'Deep Clean', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
        { name: 'Staging', color: 'bg-pink-50 text-pink-600 border-pink-100' },
        { name: 'Photography', color: 'bg-blue-50 text-blue-600 border-blue-100' },
        { name: 'Sign Install', color: 'bg-lime-50 text-lime-700 border-lime-200' },
        { name: 'Lockbox', color: 'bg-orange-50 text-orange-700 border-orange-200' },
      ],
      steps: [
        { id: 1, name: 'Initial Walkthrough', duration: '1 Day', assignee: 'Agent', type: 'Inspection' },
        { id: 2, name: 'Deep Cleaning', duration: '1 Day', assignee: 'Vendor', type: 'Cleaning' },
        { id: 3, name: 'Home Staging', duration: '2 Days', assignee: 'Vendor', type: 'Staging' },
        { id: 4, name: 'Professional Photography', duration: '1 Day', assignee: 'Vendor', type: 'Media' },
        { id: 5, name: 'Drone & Video Walkthrough', duration: '1 Day', assignee: 'Vendor', type: 'Media' },
        { id: 6, name: 'Sign Installation', duration: '1 Day', assignee: 'Vendor', type: 'Admin' },
        { id: 7, name: 'MLS Draft & Review', duration: '1 Day', assignee: 'Agent', type: 'Admin' },
      ]
    },
    {
      id: 2,
      title: "Luxury Property Prep",
      description: "Extended workflow for high-end residential estates",
      tasks: 9,
      used: 56,
      avgLive: "14d",
      status: "Active",
      sequence: [
        { name: 'Luxury Clean', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
        { name: 'High Staging', color: 'bg-pink-50 text-pink-600 border-pink-100' },
        { name: 'Drone/Video', color: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
        { name: 'Twilight', color: 'bg-purple-50 text-purple-600 border-purple-100' },
        { name: '3D Tour', color: 'bg-sky-50 text-sky-600 border-sky-100' },
      ],
      steps: [
        { id: 1, name: 'Initial Walkthrough', duration: '1 Day', assignee: 'Agent', type: 'Inspection' },
        { id: 2, name: 'Deep Cleaning', duration: '2 Days', assignee: 'Vendor', type: 'Cleaning' },
        { id: 3, name: 'Luxury Home Staging', duration: '3 Days', assignee: 'Vendor', type: 'Staging' },
        { id: 4, name: 'Daytime Photography', duration: '1 Day', assignee: 'Vendor', type: 'Media' },
        { id: 5, name: 'Twilight Photography', duration: '1 Day', assignee: 'Vendor', type: 'Media' },
        { id: 6, name: 'Drone & Video Walkthrough', duration: '1 Day', assignee: 'Vendor', type: 'Media' },
        { id: 7, name: '3D Virtual Tour', duration: '1 Day', assignee: 'Vendor', type: 'Media' },
        { id: 8, name: 'Premium Marketing', duration: '2 Days', assignee: 'Agent', type: 'Marketing' },
        { id: 9, name: 'MLS Draft & Review', duration: '2 Days', assignee: 'Agent', type: 'Admin' },
      ]
    },
    {
      id: 3,
      title: "Quick Turnaround",
      description: "Accelerated preparation for fast-to-market properties",
      tasks: 4,
      used: 218,
      avgLive: "4d",
      status: "Active",
      sequence: [
        { name: 'Light Clean', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
        { name: 'Basic Photo', color: 'bg-blue-50 text-blue-600 border-blue-100' },
        { name: 'Sign Install', color: 'bg-lime-50 text-lime-700 border-lime-200' },
        { name: 'Lockbox', color: 'bg-orange-50 text-orange-700 border-orange-200' },
      ],
      steps: [
        { id: 1, name: 'Light Cleaning', duration: '1 Day', assignee: 'Vendor', type: 'Cleaning' },
        { id: 2, name: 'Basic Photography', duration: '1 Day', assignee: 'Vendor', type: 'Media' },
        { id: 3, name: 'Sign Installation', duration: '1 Day', assignee: 'Vendor', type: 'Admin' },
        { id: 4, name: 'MLS Draft & Review', duration: '1 Day', assignee: 'Agent', type: 'Admin' },
      ]
    }
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 relative">
      {/* Top Bar */}
      <div className="h-12 border-b border-[#EAEAEA] bg-white flex items-center px-6 justify-between flex-shrink-0">
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
      <div className="flex-1 overflow-y-auto p-8 mx-auto w-full">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-[32px] font-bold tracking-tight text-slate-900 mb-2">
              Workflow Templates
            </h1>
            <p className="text-[15px] text-slate-500">
              Standardize your listing preparation with reusable task workflows.
            </p>
          </div>
          <button className="px-4 py-2 text-[14px] font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-all flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Create Template
          </button>
        </div>

        {/* Grid of Templates */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {templates.map(template => (
            <div
              key={template.id}
              onClick={() => setSelectedTemplate(template)}
              className="border border-[#EAEAEA] rounded-2xl p-6 bg-white shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all cursor-pointer flex flex-col group relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-100 transition-colors border border-indigo-100">
                    <LayoutTemplate className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-[18px] font-bold text-slate-900 leading-none mb-1.5">{template.title}</h3>
                    <p className="text-[14px] text-slate-500 mb-0">{template.description}</p>
                  </div>
                </div>
                <div className="flex space-x-1" onClick={(e) => e.stopPropagation()}>
                  <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="h-px bg-slate-100 w-full mb-6" />

              <div className="flex items-center space-x-3 mb-6">
                <div className="flex items-center text-[13px] font-bold text-slate-700 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                  {template.tasks} Tasks
                </div>
                <div className="w-1 h-1 rounded-full bg-slate-300" />
                <div className="flex items-center text-[13px] font-bold text-slate-700 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                  {template.used} Used
                </div>
                <div className="w-1 h-1 rounded-full bg-slate-300" />
                <div className="flex items-center text-[13px] font-bold text-slate-700 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                  {template.avgLive} Avg Live
                </div>
              </div>

              <div className="h-px bg-slate-100 w-full mb-6" />

              <div className="flex flex-wrap items-center gap-y-3 mb-8">
                {template.sequence.map((item, idx) => (
                  <div key={idx} className="flex items-center">
                    <span className={`text-[12px] font-bold px-3 py-1.5 rounded-full border ${item.color}`}>
                      {item.name}
                    </span>
                    {idx < template.sequence.length - 1 && (
                      <ChevronRight className="w-3.5 h-3.5 text-slate-300 mx-1.5" />
                    )}
                  </div>
                ))}
                <span className="text-[12px] font-bold text-slate-400 ml-2">
                  +2 more
                </span>
              </div>

              <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${template.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>
                    Status: {template.status}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedTemplate(template); }}
                    className="px-4 py-2 text-[13px] font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all border border-slate-200"
                  >
                    Preview Workflow
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); }}
                    className="px-4 py-2 text-[13px] font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-md shadow-indigo-100 border border-indigo-700"
                  >
                    Apply Template
                  </button>
                </div>
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
  const [activeTab, setActiveTab] = useState<'timeline' | 'dependency'>('timeline');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Simplified Header */}
        <div className="px-8 py-5 border-b border-slate-100 bg-white flex items-center justify-between z-10 shrink-0">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100">
              <LayoutTemplate className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h2 className="text-[18px] font-bold text-slate-900 leading-tight tracking-tight">{template.title}</h2>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${template.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>
                  {template.status}
                </span>
              </div>
              <p className="text-[13px] text-slate-500">{template.description}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden flex flex-col bg-slate-50/30">
          {/* Sub-Header with Tabs and Actions */}
          <div className="sticky top-0 bg-white/95 backdrop-blur-md z-30 border-b border-slate-100 px-8 shrink-0">
            <div className="flex items-center justify-between h-14">
              <div className="flex space-x-8 h-full">
                <button
                  onClick={() => setActiveTab('timeline')}
                  className={`h-full flex items-center text-[13px] font-bold transition-colors relative ${activeTab === 'timeline' ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-900'}`}
                >
                  Timeline View
                  {activeTab === 'timeline' && <motion.div layoutId="modalTab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-indigo-600" />}
                </button>
                <button
                  onClick={() => setActiveTab('dependency')}
                  className={`h-full flex items-center text-[13px] font-bold transition-colors relative ${activeTab === 'dependency' ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-900'}`}
                >
                  Dependency View
                  {activeTab === 'dependency' && <motion.div layoutId="modalTab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-indigo-600" />}
                </button>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 text-[12px] font-bold text-slate-600 hover:bg-slate-50 rounded-lg transition-all flex items-center">
                  Bulk Actions
                </button>
                <button className="px-3.5 py-1.5 text-[12px] font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm shadow-indigo-100 transition-all flex items-center gap-1.5">
                  <Plus className="w-3.5 h-3.5" /> Add Step
                </button>
              </div>
            </div>
          </div>
 
          <div className="flex-1 overflow-y-auto px-8 py-8">
            <div className="max-w-5xl mx-auto w-full pb-32">
              {activeTab === 'timeline' ? (
                <div className="space-y-0 relative">
                  {/* Integrated Timeline Rail */}
                  <div className="absolute top-2 bottom-0 left-[21px] w-[2px] bg-indigo-50" />
                  
                  {template.steps.map((step: any, index: number) => {
                    const getStepIcon = (type: string) => {
                      switch (type.toLowerCase()) {
                        case 'inspection': return <Search className="w-3.5 h-3.5" />;
                        case 'cleaning': return <CloudSun className="w-3.5 h-3.5" />;
                        case 'staging': return <LayoutTemplate className="w-3.5 h-3.5" />;
                        case 'media': return <Play className="w-3.5 h-3.5" />;
                        case 'admin': return <Settings className="w-3.5 h-3.5" />;
                        default: return <CheckCircle2 className="w-3.5 h-3.5" />;
                      }
                    };

                    return (
                      <div key={step.id} className="relative mb-3 last:mb-0 group">
                        {/* Timeline Node - Smaller for density */}
                        <div className="absolute left-[2px] top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full border-[3px] border-white bg-indigo-600 text-white shadow-md z-10 transition-transform group-hover:scale-110">
                          {getStepIcon(step.type)}
                        </div>

                        {/* Step Card - Ultra-Compact Single Row */}
                        <div className="ml-14">
                          <div className="bg-white border border-slate-100 rounded-xl px-4 py-2.5 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all flex items-center justify-between group-hover:bg-slate-50/50">
                            <div className="flex items-center gap-4 flex-1 min-w-0">
                              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-tight shrink-0">Step {index + 1}</span>
                              
                              <h4 className="text-[14px] font-bold text-slate-900 truncate max-w-[200px]">{step.name}</h4>
                              
                              <div className="h-4 w-px bg-slate-100 shrink-0" />
                              
                              <span className="px-1.5 py-0.5 rounded bg-slate-50 text-slate-400 text-[9px] font-bold uppercase tracking-tight border border-slate-100 shrink-0 capitalize">
                                {step.type}
                              </span>

                              <div className="flex items-center gap-4 ml-4 text-[11px] text-slate-500 font-medium">
                                <div className="flex items-center gap-1.5">
                                  <Clock className="w-3 h-3 text-slate-300" />
                                  <span className="text-slate-900 font-bold">{step.duration}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <User className="w-3 h-3 text-slate-300" />
                                  <span className="text-slate-900 font-bold text-xs truncate max-w-[100px]">{step.assignee}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all shrink-0">
                              <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-lg transition-all">
                                <Settings className="w-3.5 h-3.5" />
                              </button>
                              <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-white rounded-lg transition-all">
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                              <div className="w-px h-5 bg-slate-100 mx-1" />
                              <GripVertical className="w-3.5 h-3.5 text-slate-300 cursor-grab active:cursor-grabbing" />
                            </div>
                          </div>

                          {/* Minimal Marker between steps to maintain visual flow without large vertical gap */}
                          {index < template.steps.length - 1 && (
                            <div className="absolute left-[19px] bottom-[-6px] w-[2px] h-[6px] bg-indigo-50" />
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {/* High Density Completion State */}
                  <div className="relative group mt-6 pb-4">
                    <div className="absolute left-[2px] top-0 flex items-center justify-center w-9 h-9 rounded-full border-[3px] border-white bg-emerald-500 text-white shadow-md z-10 transition-transform group-hover:scale-110">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div className="ml-14 flex items-center h-9">
                      <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-2">
                        Complete
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <DependencyView />
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-8 py-5 border-t border-slate-100 bg-white flex justify-end space-x-4 shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-[14px] font-bold text-slate-500 hover:text-slate-900 transition-colors"
          >
            Cancel
          </button>
          <button className="px-8 py-2.5 text-[14px] font-bold text-white bg-slate-900 hover:bg-black rounded-xl shadow-lg transition-all">
            Save Template
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function DependencyView() {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition-all border-indigo-200">
        <div className="absolute -top-2.5 -right-2.5 bg-indigo-100 text-indigo-700 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-indigo-200 shadow-sm">Critical Path</div>
        <div className="flex justify-between items-start mb-3">
          <div>
            <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Preparation</div>
            <div className="font-medium text-[14px] text-gray-900">Cleaning</div>
          </div>
          <div className="text-[12px] font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded flex items-center">
            <Clock className="w-3 h-3 mr-1.5" /> 24h
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-auto pt-3 border-t border-[#EAEAEA]">
          <span className="text-[11px] font-medium px-2 py-0.5 rounded flex items-center text-gray-600 bg-gray-100">
            <Building className="w-3 h-3 mr-1" /> Vendor Required
          </span>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-px h-6 bg-indigo-200"></div>
      </div>

      <div className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition-all border-indigo-200">
        <div className="absolute -top-2.5 -right-2.5 bg-indigo-100 text-indigo-700 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-indigo-200 shadow-sm">Critical Path</div>
        <div className="flex justify-between items-start mb-3">
          <div>
            <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Staging</div>
            <div className="font-medium text-[14px] text-gray-900">Staging Consult</div>
          </div>
          <div className="text-[12px] font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded flex items-center">
            <Clock className="w-3 h-3 mr-1.5" /> 48h
          </div>
        </div>
        <div className="text-[11px] text-gray-500 mb-3 flex items-center">
          <GitCommitHorizontal className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
          Depends on: <span className="font-medium text-gray-700 ml-1">Cleaning</span>
        </div>
        <div className="flex flex-wrap gap-2 mt-auto pt-3 border-t border-[#EAEAEA]"></div>
      </div>

      <div className="flex justify-center">
        <div className="w-px h-6 bg-indigo-200"></div>
      </div>

      <div className="grid grid-cols-2 gap-6 relative mt-6">
        <div className="absolute top-[-24px] left-1/4 right-1/4 h-px bg-gray-200"></div>
        <div className="absolute top-[-24px] left-1/4 w-px h-6 bg-gray-200"></div>
        <div className="absolute top-[-24px] right-1/4 w-px h-6 bg-indigo-200"></div>

        <div className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition-all border-[#EAEAEA]">
          <div className="flex justify-between items-start mb-3">
            <div>
              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Media</div>
              <div className="font-medium text-[14px] text-gray-900">Drone Photography</div>
            </div>
            <div className="text-[12px] font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded flex items-center">
              <Clock className="w-3 h-3 mr-1.5" /> 24h
            </div>
          </div>
          <div className="text-[11px] text-gray-500 mb-3 flex items-center">
            <GitCommitHorizontal className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
            Depends on: <span className="font-medium text-gray-700 ml-1">Staging Consult</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-auto pt-3 border-t border-[#EAEAEA]">
            <span className="text-[11px] font-medium px-2 py-0.5 rounded flex items-center text-emerald-700 bg-emerald-50 border border-emerald-100">
              <Building className="w-3 h-3 mr-1" /> SkyView Drones
            </span>
            <span className="text-[11px] font-medium text-sky-700 bg-sky-50 px-2 py-0.5 rounded flex items-center border border-sky-100">
              <CloudSun className="w-3 h-3 mr-1" /> Weather Sensitive
            </span>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition-all border-indigo-200">
          <div className="absolute -top-2.5 -right-2.5 bg-indigo-100 text-indigo-700 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-indigo-200 shadow-sm">Critical Path</div>
          <div className="flex justify-between items-start mb-3">
            <div>
              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Media</div>
              <div className="font-medium text-[14px] text-gray-900">Photography</div>
            </div>
            <div className="text-[12px] font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded flex items-center">
              <Clock className="w-3 h-3 mr-1.5" /> 48h
            </div>
          </div>
          <div className="text-[11px] text-gray-500 mb-3 flex items-center">
            <GitCommitHorizontal className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
            Depends on: <span className="font-medium text-gray-700 ml-1">Staging Consult</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-auto pt-3 border-t border-[#EAEAEA]">
            <span className="text-[11px] font-medium px-2 py-0.5 rounded flex items-center text-emerald-700 bg-emerald-50 border border-emerald-100">
              <Building className="w-3 h-3 mr-1" /> ATX Visual Studios
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-center relative">
        <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gray-200"></div>
        <div className="absolute top-0 left-1/4 w-px h-6 bg-gray-200"></div>
        <div className="absolute top-0 right-1/4 w-px h-6 bg-indigo-200"></div>
        <div className="w-px h-6 bg-indigo-200 mt-6"></div>
      </div>

      <div className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition-all border-indigo-200">
        <div className="absolute -top-2.5 -right-2.5 bg-indigo-100 text-indigo-700 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-indigo-200 shadow-sm">Critical Path</div>
        <div className="flex justify-between items-start mb-3">
          <div>
            <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Launch</div>
            <div className="font-medium text-[14px] text-gray-900">MLS Upload</div>
          </div>
          <div className="text-[12px] font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded flex items-center">
            <Clock className="w-3 h-3 mr-1.5" /> 2h
          </div>
        </div>
        <div className="text-[11px] text-gray-500 mb-3 flex items-center">
          <GitCommitHorizontal className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
          Depends on: <span className="font-medium text-gray-700 ml-1">Photography, Drone</span>
        </div>
        <div className="flex flex-wrap gap-2 mt-auto pt-3 border-t border-[#EAEAEA]">
          <span className="text-[11px] font-medium text-orange-700 bg-orange-50 px-2 py-0.5 rounded flex items-center border border-orange-100">
            <UserCheck className="w-3 h-3 mr-1" /> Manual Approval
          </span>
        </div>
      </div>
    </div>
  );
}
