import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  Download, 
  Eye, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  FileSignature,
  ArrowUpDown,
  Calendar,
  Building2,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FormItem {
  id: string;
  address: string;
  type: 'Listing Agreement' | 'Seller Disclosure';
  status: 'Completed' | 'In Progress' | 'Draft' | 'Sent';
  lastModified: string;
  client: string;
  progress: number;
}

const mockForms: FormItem[] = [
  {
    id: '1',
    address: '123 Maple Avenue, Austin, TX',
    type: 'Listing Agreement',
    status: 'Completed',
    lastModified: '2 hours ago',
    client: 'John & Jane Doe',
    progress: 100
  },
  {
    id: '2',
    address: '456 Oak Boulevard, Dallas, TX',
    type: 'Seller Disclosure',
    status: 'In Progress',
    lastModified: '5 hours ago',
    client: 'Robert Smith',
    progress: 65
  },
  {
    id: '3',
    address: '789 Pine Street, Houston, TX',
    type: 'Listing Agreement',
    status: 'Draft',
    lastModified: '1 day ago',
    client: 'Bhatnagar Family',
    progress: 20
  },
  {
    id: '4',
    address: '101 Cedar Lane, San Antonio, TX',
    type: 'Seller Disclosure',
    status: 'Sent',
    lastModified: '2 days ago',
    client: 'Alice Cooper',
    progress: 85
  }
];

export function FormsDashboard({ setActivePage }: { setActivePage: (page: string) => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'All' | 'Listing Agreement' | 'Seller Disclosure'>('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredForms = mockForms.filter(form => {
    const matchesSearch = form.address.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         form.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = activeTab === 'All' || form.type === activeTab;
    const matchesStatus = filterStatus === 'All' || form.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'In Progress': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Draft': return 'bg-gray-50 text-gray-700 border-gray-100';
      case 'Sent': return 'bg-purple-50 text-purple-700 border-purple-100';
      default: return 'bg-gray-50 text-gray-700 border-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckCircle2 className="w-3.5 h-3.5" />;
      case 'In Progress': return <Clock className="w-3.5 h-3.5" />;
      case 'Draft': return <FileText className="w-3.5 h-3.5" />;
      case 'Sent': return <FileSignature className="w-3.5 h-3.5" />;
      default: return null;
    }
  };

  const tabs = [
    { id: 'All', label: 'All Documents', count: mockForms.length },
    { id: 'Listing Agreement', label: 'Listing Agreements', count: mockForms.filter(f => f.type === 'Listing Agreement').length },
    { id: 'Seller Disclosure', label: 'Seller Disclosures', count: mockForms.filter(f => f.type === 'Seller Disclosure').length },
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-[#FAFAFA] overflow-hidden">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-100 px-8 py-6 shrink-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 max-w-[1600px] mx-auto w-full">
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">Documents Manager</h1>
            <p className="text-[13px] text-gray-500 mt-1 font-medium italic">Manage and track your listing documents and disclosures.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-50 text-indigo-600 rounded-xl text-[13px] font-bold border border-indigo-100 hover:bg-indigo-100 transition-all active:scale-95 group">
              <Plus className="w-4 h-4" />
              Add Template
              <span className="bg-indigo-600 text-white text-[9px] px-1.5 py-0.5 rounded ml-1 group-hover:scale-105 transition-transform">AGENT</span>
            </button>
            <div className="h-8 w-px bg-gray-100 mx-1" />
            <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 text-gray-600 rounded-xl text-[13px] font-bold border border-gray-100 hover:bg-gray-100 transition-all active:scale-95">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button 
              onClick={() => setActivePage('listing-agreement')}
              className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-[13px] font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              New Listing
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-[1600px] mx-auto space-y-8">
          {/* Quick Create Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <QuickActionCard 
              title="Listing Agreement"
              description="Standard contract between broker and seller."
              icon={<FileSignature className="w-6 h-6" />}
              color="indigo"
              onClick={() => setActivePage('listing-agreement')}
            />
            <QuickActionCard 
              title="Seller's Disclosure"
              description="Legal document detailing property condition."
              icon={<FileText className="w-6 h-6" />}
              color="emerald"
              onClick={() => setActivePage('seller-disclosure')}
            />
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white shadow-xl shadow-indigo-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-700" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-5 h-5 text-indigo-200" />
                  <span className="text-[11px] font-black uppercase tracking-widest text-indigo-100">Smart Features</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Automated Bundles</h3>
                <p className="text-sm text-indigo-100/80 mb-6">Create multiple documents at once using smart property data.</p>
                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-[12px] font-bold transition-all border border-white/20 underline-offset-4 decoration-white/30 decoration-2">
                  Coming Soon
                </button>
              </div>
            </div>
          </div>

          {/* Tabs and Controls */}
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-100 pb-2">
              <div className="flex items-center gap-8">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`relative pb-4 text-[14px] font-bold transition-all ${
                      activeTab === tab.id 
                        ? 'text-indigo-600' 
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {tab.label}
                      <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                        activeTab === tab.id ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {tab.count}
                      </span>
                    </div>
                    {activeTab === tab.id && (
                      <motion.div 
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 rounded-full"
                      />
                    )}
                  </button>
                ))}
              </div>
              
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl border border-gray-100 shrink-0">
                  <div className="w-2 h-2 rounded-full bg-indigo-500" />
                  <select 
                    className="bg-transparent text-[12px] font-bold text-gray-600 outline-none"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option>All Status</option>
                    <option>Completed</option>
                    <option>In Progress</option>
                    <option>Draft</option>
                    <option>Sent</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text"
                  placeholder="Search by address or client name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-transparent rounded-xl text-[13px] focus:bg-white focus:border-indigo-500/30 outline-none transition-all placeholder:text-gray-400"
                />
              </div>
            </div>
          </div>

          {/* Documents Table */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">
                    <div className="flex items-center gap-2 cursor-pointer hover:text-gray-600 transition-colors">
                      Property Address
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Type</th>
                  <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Client</th>
                  <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Last Modified</th>
                  <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <AnimatePresence>
                  {filteredForms.map((form) => (
                    <motion.tr 
                      key={form.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="group hover:bg-indigo-50/30 transition-colors"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:text-indigo-600 transition-all border border-transparent group-hover:border-indigo-100">
                            <Building2 className="w-4.5 h-4.5" />
                          </div>
                          <div>
                            <div className="text-[14px] font-bold text-gray-900 leading-tight">
                              {form.address}
                            </div>
                            <div className="text-[11px] text-gray-400 mt-0.5">Austin Metro Area</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <span className={`p-1.5 rounded-lg ${form.type === 'Listing Agreement' ? 'bg-emerald-50 text-emerald-600' : 'bg-purple-50 text-purple-600'}`}>
                            {form.type === 'Listing Agreement' ? <FileSignature className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                          </span>
                          <span className="text-[13px] font-medium text-gray-600">{form.type}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-[13px] font-semibold text-gray-700">
                        {form.client}
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-[12px] text-gray-500">
                          <Calendar className="w-3.5 h-3.5" />
                          {form.lastModified}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-bold uppercase tracking-wider ${getStatusColor(form.status)}`}>
                          {getStatusIcon(form.status)}
                          {form.status}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-white rounded-lg transition-all border border-transparent hover:border-indigo-100">
                            <Eye className="w-4.5 h-4.5" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-white rounded-lg transition-all border border-transparent hover:border-indigo-100">
                            <Download className="w-4.5 h-4.5" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white rounded-lg transition-all">
                            <MoreHorizontal className="w-4.5 h-4.5" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
            
            {filteredForms.length === 0 && (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-dashed border-gray-200">
                  <Search className="w-6 h-6 text-gray-300" />
                </div>
                <h3 className="text-[15px] font-bold text-gray-900">No documents found</h3>
                <p className="text-[13px] text-gray-500 mt-1 max-w-[200px] mx-auto leading-relaxed">Try adjusting your filters or search term to find what you're looking for.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickActionCard({ title, description, icon, color, onClick }: any) {
  const colors: any = {
    indigo: 'bg-indigo-500 shadow-indigo-100 hover:bg-indigo-600',
    emerald: 'bg-emerald-500 shadow-emerald-100 hover:bg-emerald-600',
    orange: 'bg-orange-500 shadow-orange-100 hover:bg-orange-600',
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group relative overflow-hidden active:scale-[0.98]"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white transition-all transform group-hover:scale-110 duration-300 ${colors[color]}`}>
          {icon}
        </div>
        <div className="p-2 bg-gray-50 rounded-lg text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
      
      {/* Subtle Bottom Accent */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 transition-all ${
        color === 'indigo' ? 'bg-indigo-500' : 'bg-emerald-500'
      } opacity-0 group-hover:opacity-100`} />
    </div>
  );
}

function Sparkles({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}
