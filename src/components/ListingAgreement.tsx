import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronRight,
  ChevronLeft,
  Home,
  Wrench,
  AlertTriangle,
  FileText,
  Settings,
  CheckCircle2,
  Info,
  ShieldCheck,
  Building2,
  Zap,
  Waves,
  PanelLeftOpen,
  User,
  Users,
  Network,
  Megaphone,
  Briefcase
} from 'lucide-react';

// --- Shared Components ---
function Question({ label, description, type = 'radio', options = ['Yes', 'No'], placeholder, value, onChange }: any) {
  return (
    <div className="space-y-3">
      <div>
        <label className="text-[14px] font-semibold text-gray-900 block">{label}</label>
        {description && <p className="text-[12px] text-gray-500 mt-0.5">{description}</p>}
      </div>

      {type === 'radio' && (
        <div className="grid grid-cols-2 sm:flex gap-3 md:gap-4">
          {options.map((opt: string) => (
            <label key={opt} className="flex-1 group cursor-pointer">
              <input type="radio" name={label} value={opt} checked={value === opt} onChange={(e) => onChange && onChange(e.target.value)} className="sr-only peer" />
              <div className="px-4 py-3 md:py-3 bg-white border-2 border-gray-100 rounded-xl text-[12px] md:text-[13px] text-gray-500 font-bold text-center peer-checked:border-indigo-600 peer-checked:bg-indigo-50 peer-checked:text-indigo-700 hover:border-gray-200 transition-all shadow-sm active:scale-95">
                {opt}
              </div>
            </label>
          ))}
        </div>
      )}

      {type === 'text' && (
        <input
          type="text"
          placeholder={placeholder}
          className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition-all"
        />
      )}

      {type === 'textarea' && (
        <textarea
          placeholder={placeholder}
          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-[13px] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition-all min-h-[100px] resize-y"
        />
      )}

      {type === 'date' && (
        <input
          type="date"
          className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition-all"
        />
      )}

      {type === 'select' && (
        <select className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition-all appearance-none">
          {options.map((opt: string) => <option key={opt}>{opt}</option>)}
        </select>
      )}
    </div>
  );
}

function CheckboxItem({ label, ...props }: { label: string;[key: string]: any }) {
  return (
    <label className="relative flex items-start justify-start p-3 rounded-xl border-2 border-gray-100 bg-white cursor-pointer transition-all hover:border-indigo-200 hover:shadow-sm focus-within:ring-2 focus-within:ring-indigo-500/20 active:scale-95 group">
      <input type="checkbox" className="sr-only peer" {...props} />
      <div className="absolute inset-0 rounded-xl border-2 border-transparent peer-checked:border-indigo-600 pointer-events-none transition-colors" />
      <div className="absolute inset-0 rounded-xl bg-indigo-50/0 peer-checked:bg-indigo-50/50 pointer-events-none transition-colors" />
      <span className="text-[13px] font-bold text-gray-500 peer-checked:text-indigo-700 transition-colors z-10">{label}</span>
      <div className="w-5 h-5 absolute right-3 rounded-full border-2 border-gray-200 peer-checked:border-indigo-600 peer-checked:bg-indigo-600 flex items-center justify-center transition-all opacity-0 peer-checked:opacity-100">
        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    </label>
  );
}

type Step = {
  id: string;
  title: string;
  substeps?: string[];
  icon: React.ReactNode;
};

const STEPS: Step[] = [
  { id: 'parties', title: 'Parties to the Agreement', icon: <Users className="w-4 h-4" /> },
  { id: 'property', title: 'Property Details', icon: <Home className="w-4 h-4" /> },
  { id: 'terms', title: 'Listing Terms', icon: <FileText className="w-4 h-4" /> },
  { id: 'services', title: 'Services & Access', icon: <Wrench className="w-4 h-4" /> },
  { id: 'cooperation', title: 'Cooperation with Other Brokers', icon: <Network className="w-4 h-4" /> },
  { id: 'marketing', title: 'Marketing, Financing & Review', icon: <Briefcase className="w-4 h-4" /> },
];

export function ListingAgreement({ setActivePage }: { setActivePage?: (page: string) => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentSubstep, setCurrentSubstep] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Form states context
  const [mlsFilingOption, setMlsFilingOption] = useState<string>('File listing with MLS');
  const [isTenantOccupied, setIsTenantOccupied] = useState<string>('No');

  const nextStep = () => {
    const step = STEPS[currentStep];
    if (step.substeps && currentSubstep < step.substeps.length - 1) {
      setCurrentSubstep(currentSubstep + 1);
    } else if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
      setCurrentSubstep(0);
    }
  };

  const prevStep = () => {
    const step = STEPS[currentStep];
    if (step.substeps && currentSubstep > 0) {
      setCurrentSubstep(currentSubstep - 1);
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      const prevStepData = STEPS[currentStep - 1];
      setCurrentSubstep(prevStepData.substeps ? prevStepData.substeps.length - 1 : 0);
    }
  };

  return (
    <div className="flex flex-1 flex-col bg-[#FAFAFA] h-full relative hide-scrollbar overflow-y-auto">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Header */}
      <div className="h-16 md:h-20 flex items-center px-4 md:px-8 border-b border-[#EAEAEA] bg-white sticky top-0 z-40 py-4">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 mr-2 lg:hidden text-gray-400 hover:text-indigo-600 transition-colors"
        >
          {isMobileMenuOpen ? <ChevronLeft className="w-6 h-6" /> : <PanelLeftOpen className="w-6 h-6" />}
        </button>

        <div className="flex items-center gap-2 md:gap-3 overflow-hidden">
          {setActivePage && (
            <button onClick={() => setActivePage('dashboard')} className="p-1.5 md:p-2 -ml-2 text-gray-400 hover:text-indigo-600 transition-colors hidden lg:block" title="Back to Dashboard">
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          <div className="p-1.5 md:p-2 bg-indigo-50 rounded-lg shrink-0">
            <FileText className="w-4 h-4 md:w-5 md:h-5 text-indigo-600" />
          </div>
          <div className="overflow-hidden">
            <h1 className="text-[14px] md:text-[16px] font-semibold text-gray-900 truncate">Listing Agreement</h1>
            <p className="hidden md:block text-[12px] text-gray-500 whitespace-nowrap">Exclusive Right to Sell</p>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-3 md:gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-[11px] md:text-[12px] font-medium text-gray-500 uppercase tracking-wider">Progress</span>
            <div className="w-20 md:w-32 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 transition-all duration-500 shadow-[0_0_8px_rgba(79,70,229,0.3)]"
                style={{ width: `${((currentStep / (STEPS.length - 1)) * 100)}%` }}
              />
            </div>
            <span className="text-[11px] md:text-[12px] font-black text-indigo-600">{Math.round((currentStep / (STEPS.length - 1)) * 100)}%</span>
            <span className="text-[11px] md:text-[12px] font-medium text-gray-500">Estimated time: 6–8 mins &bull; Total Questions: 32</span>
          </div>
          <button className="px-3 md:px-4 py-1.5 text-[12px] md:text-[13px] font-bold text-indigo-600 border border-indigo-200 bg-indigo-50/50 rounded-lg hover:bg-indigo-600 hover:text-white transition-all shadow-sm active:scale-95">
            Save
          </button>
        </div>
      </div>

      <div className="flex flex-1 relative">
        {/* Mobile Navigation Backdrop */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-40 lg:hidden"
            />
          )}
        </AnimatePresence>

        <div
          className={`
            fixed lg:sticky top-0 left-0 h-[calc(100vh-64px)] lg:h-[calc(100vh-80px)] 
            w-[280px] lg:w-80 border-r border-[#EAEAEA] bg-white p-6 z-50 lg:z-0 
            overflow-y-auto hide-scrollbar transition-transform duration-300 ease-in-out
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          <div className="space-y-1">
            {STEPS.map((step, index) => (
              <div key={step.id}>
                <div
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all ${currentStep === index
                      ? 'bg-indigo-50 text-indigo-700 font-bold shadow-sm'
                      : index < currentStep
                        ? 'text-emerald-600 hover:bg-gray-50'
                        : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  onClick={() => {
                    setCurrentStep(index);
                    setCurrentSubstep(0);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <div className={`flex-shrink-0 w-7 h-7 rounded-xl flex items-center justify-center text-[11px] font-black ${currentStep === index
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                      : index < currentStep
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-100'
                        : 'border-2 border-gray-100 text-gray-400'
                    }`}>
                    {index < currentStep ? <CheckCircle2 className="w-4 h-4" /> : index + 1}
                  </div>
                  <span className="text-[13px] tracking-tight">{step.title}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-5 bg-blue-50/50 rounded-2xl border border-blue-100 relative overflow-hidden">
            <div className="flex gap-4 relative z-10">
              <Info className="w-5 h-5 text-blue-500 flex-shrink-0" />
              <div>
                <p className="text-[11px] font-black text-blue-800 uppercase tracking-widest mb-1.5">Listing Activity</p>
                <p className="text-[12px] text-blue-700 leading-relaxed font-medium">
                  Complete this form to finalize the listing terms and allow your broker to start marketing the property.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-[#FAFAFA] p-3 md:p-6 lg:p-8 overflow-x-hidden">
          <div className="max-w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentStep}-${currentSubstep}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl border border-[#EAEAEA] shadow-sm overflow-hidden mb-8"
              >
                <div className="p-4 md:p-8">
                  <div className="space-y-6 md:space-y-8">
                    {renderStepContent(currentStep, { mlsFilingOption, setMlsFilingOption, isTenantOccupied, setIsTenantOccupied })}
                  </div>
                </div>

                <div className="px-4 py-4 md:px-8 md:py-5 bg-gray-50/50 border-t border-[#EAEAEA] flex items-center justify-between">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 0 && currentSubstep === 0}
                    className="flex items-center gap-1 md:gap-2 px-3 py-2 md:px-4 md:py-2 text-[12px] md:text-[13px] font-medium text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>
                  <button
                    onClick={nextStep}
                    className="flex items-center gap-1 md:gap-2 px-4 py-2 md:px-6 md:py-2 bg-indigo-600 text-white rounded-lg text-[12px] md:text-[13px] font-semibold hover:bg-indigo-700 shadow-sm shadow-indigo-200 transition-all active:scale-[0.98]"
                  >
                    {currentStep === STEPS.length - 1 ? 'Finish & Sign' : 'Continue'}
                    {currentStep !== STEPS.length - 1 && <ChevronRight className="w-4 h-4" />}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* QUICK SUMMARY PANEL */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 max-w-full hidden">
                <h4 className="text-[13px] font-bold text-gray-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-indigo-500" /> Quick Summary Overview
                </h4>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Seller</span>
                        <span className="text-[13px] font-medium text-gray-900">—</span>
                    </div>
                    <div>
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Broker</span>
                        <span className="text-[13px] font-medium text-gray-900">—</span>
                    </div>
                    <div>
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Property</span>
                        <span className="text-[13px] font-medium text-gray-900">—</span>
                    </div>
                    <div>
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Listing Price</span>
                        <span className="text-[13px] font-medium text-gray-900">—</span>
                    </div>
                    <div>
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Term</span>
                        <span className="text-[13px] font-medium text-gray-900">—</span>
                    </div>
                    <div>
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Compensation</span>
                        <span className="text-[13px] font-medium text-gray-900">—</span>
                    </div>
                </div>
            </div>

            <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-8 text-[11px] md:text-[12px] text-gray-400 font-medium">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> Encrypted Connection</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> Auto-saved</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function renderStepContent(stepIdx: number, state: any = {}) {
  if (stepIdx === 0) {
    return (
      <div className="space-y-8 pb-4">
        <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-[16px] font-bold text-gray-900 uppercase tracking-tight">Parties to the Agreement</h3>
            <p className="text-[12px] text-gray-500">Enter the seller and broker information.</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50/50 border border-gray-100 p-6 rounded-2xl space-y-4">
            <h4 className="text-[14px] font-bold text-gray-900">Seller Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Question label="Seller Name(s)" type="text" placeholder="e.g. John & Jane Doe" />
              <Question label="Phone" type="text" placeholder="e.g. (512) 555-1234" />
              <Question label="Email" type="text" placeholder="e.g. seller@email.com" />
              <Question label="Fax" type="text" placeholder="e.g. (512) 555-0000" />
            </div>
            <div className="space-y-4 pt-2">
               <Question label="Address" type="text" placeholder="e.g. 123 Main St" />
               <Question label="City, State, Zip" type="text" placeholder="e.g. Austin, TX 78701" />
            </div>
          </div>

          <div className="bg-gray-50/50 border border-gray-100 p-6 rounded-2xl space-y-4">
            <h4 className="text-[14px] font-bold text-gray-900">Broker Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Question label="Broker / Firm Name" type="text" placeholder="e.g. ABC Realty" />
              <Question label="License No." type="text" placeholder="e.g. 900xxxx" />
              <Question label="Phone" type="text" placeholder="e.g. (512) 555-5678" />
              <Question label="Email" type="text" placeholder="e.g. broker@realty.com" />
              <Question label="Fax" type="text" placeholder="e.g. (512) 555-0000" />
            </div>
            <div className="space-y-4 pt-2">
               <Question label="Address" type="text" placeholder="e.g. 456 Broker Blvd" />
               <Question label="City, State, Zip" type="text" placeholder="e.g. Austin, TX 78701" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (stepIdx === 1) {
    return (
      <div className="space-y-8 pb-4">
        <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 shrink-0">
            <Home className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-[16px] font-bold text-gray-900 uppercase tracking-tight">Property Details</h3>
            <p className="text-[12px] text-gray-500">Describe the property being listed for sale.</p>
          </div>
        </div>

        <div className="space-y-6">
            <div className="bg-white border-2 border-gray-100 p-6 rounded-2xl space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Question label="Property Street Address" type="text" placeholder="Address" />
                    <Question label="City" type="text" placeholder="City" />
                    <Question label="Zip Code" type="text" placeholder="Zip" />
                    <Question label="County" type="text" placeholder="County" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-gray-100 pt-4 mt-4">
                    <Question label="Legal Description" type="text" placeholder="" />
                    <Question label="Lot" type="text" placeholder="" />
                    <Question label="Block" type="text" placeholder="" />
                    <Question label="Addition" type="text" placeholder="" />
                </div>
            </div>

            <div className="bg-white border-2 border-gray-100 p-6 rounded-2xl space-y-6">
                <Question label="Is this a condominium?" type="radio" options={['Yes', 'No']} />
                <Question label="Is the property subject to mandatory HOA membership?" type="radio" options={['Yes', 'No']} />
                <Question label="Exclusions (Items Seller Will Retain)" type="text" placeholder="e.g. Ring doorbell, mounted TV in living room" />
            </div>
        </div>
      </div>
    );
  }

  if (stepIdx === 2) {
    return (
      <div className="space-y-8 pb-4">
        <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-[16px] font-bold text-gray-900 uppercase tracking-tight">Listing Terms</h3>
            <p className="text-[12px] text-gray-500">Set the listing price, listing dates, and broker compensation.</p>
          </div>
        </div>

        <div className="space-y-6">
            <div className="bg-white border-2 border-gray-100 p-6 rounded-2xl space-y-4">
                <h4 className="text-[14px] font-bold text-gray-900">Price & Dates</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Question label="Listing Price ($)" type="text" placeholder="e.g. $500,000" />
                    <Question label="Will seller pay buyer's closing costs?" type="radio" options={['Yes', 'No']} />
                    <Question label="Listing Begin Date" type="date" />
                    <Question label="Listing End Date" type="date" />
                </div>
            </div>

            <div className="bg-white border-2 border-gray-100 p-6 rounded-2xl space-y-6">
                <h4 className="text-[14px] font-bold text-gray-900">Broker Compensation</h4>
                <Question label="Compensation Type" type="radio" options={['Percentage of sales price', 'Flat fee']} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <Question label="Protection Period" type="text" placeholder="Days after listing ends" />
                    <Question label="Other Fees / Reimbursable Expenses" type="text" placeholder="e.g. MLS fee" />
                    <Question label="County where broker compensation is payable" type="text" placeholder="County name" />
                </div>
                
                <div className="pt-2 border-t border-gray-100">
                    <Question label="Authorize escrow or closing agent to collect and disburse broker compensation?" type="radio" options={['Yes', 'No']} />
                </div>
            </div>
        </div>
      </div>
    );
  }

  if (stepIdx === 3) {
    return (
      <div className="space-y-8 pb-4">
        <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 shrink-0">
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-[16px] font-bold text-gray-900 uppercase tracking-tight">Services & Access</h3>
            <p className="text-[12px] text-gray-500">Configure MLS filing and property access options.</p>
          </div>
        </div>

        <div className="space-y-6">
            <div className="bg-white border-2 border-gray-100 p-6 rounded-2xl space-y-6">
                <h4 className="text-[14px] font-bold text-gray-900">MLS Filing</h4>
                <Question label="MLS Filing Option" type="radio" options={['File listing with MLS', 'Do NOT file listing with MLS']} value={state.mlsFilingOption} onChange={state.setMlsFilingOption} />
                
                <AnimatePresence>
                  {state.mlsFilingOption === 'File listing with MLS' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                      <div className="pt-2 border-t border-gray-100 mt-6">
                        <Question label="Delay MLS filing (days)" type="text" placeholder="Number of days (optional)" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
            </div>

            <div className="bg-white border-2 border-gray-100 p-6 rounded-2xl space-y-6">
                <h4 className="text-[14px] font-bold text-gray-900">Property Access</h4>
                <Question label="Is broker authorized to place a keybox on the property?" type="radio" options={['Yes', 'No']} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Question label="Scheduling Companies" type="text" placeholder="e.g. ShowingTime" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <Question label="Is property tenant occupied?" type="radio" options={['Yes', 'No']} value={state.isTenantOccupied} onChange={state.setIsTenantOccupied} />
                    <AnimatePresence>
                      {state.isTenantOccupied === 'Yes' && (
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full">
                           <Question label="Has tenant provided written keybox authorization?" type="radio" options={['Yes', 'No']} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                </div>
            </div>
            
            <div className="bg-white border-2 border-gray-100 p-6 rounded-2xl space-y-6">
                <h4 className="text-[14px] font-bold text-gray-900">Internet Display</h4>
                <Question label="Seller does NOT want listing displayed on Internet" type="radio" options={['Yes', 'No']} />
                <Question label="Seller does NOT want property address displayed on Internet" type="radio" options={['Yes', 'No']} />
            </div>
        </div>
      </div>
    );
  }

  if (stepIdx === 4) {
    return (
      <div className="space-y-8 pb-4">
        <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 shrink-0">
            <Network className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-[16px] font-bold text-gray-900 uppercase tracking-tight">Cooperation with Other Brokers</h3>
            <p className="text-[12px] text-gray-500">Define compensation and intermediary rules.</p>
          </div>
        </div>

        <div className="space-y-6">
            <div className="bg-white border-2 border-gray-100 p-6 rounded-2xl space-y-6">
                <h4 className="text-[14px] font-bold text-gray-900">MLS Broker Compensation</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Question label="Buyer’s Agent" type="text" placeholder="% or Flat Fee" />
                    <Question label="Subagent" type="text" placeholder="% or Flat Fee" />
                </div>
            </div>

            <div className="bg-white border-2 border-gray-100 p-6 rounded-2xl space-y-6">
                <h4 className="text-[14px] font-bold text-gray-900">Non-MLS Broker Compensation</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Question label="Buyer’s Agent" type="text" placeholder="% or Flat Fee" />
                    <Question label="Subagent" type="text" placeholder="% or Flat Fee" />
                </div>
            </div>

            <div className="bg-white border-2 border-gray-100 p-6 rounded-2xl space-y-6">
                <h4 className="text-[14px] font-bold text-gray-900">Intermediary Status</h4>
                <Question label="Is broker authorized to act as intermediary if representing both buyer and seller?" type="radio" options={['Yes — Broker may act as intermediary', 'No — Do not show property to broker’s buyer']} />
            </div>
        </div>
      </div>
    );
  }

  if (stepIdx === 5) {
    return (
      <div className="space-y-8 pb-4">
        <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 shrink-0">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-[16px] font-bold text-gray-900 uppercase tracking-tight">Marketing, Financing & Review</h3>
            <p className="text-[12px] text-gray-500">Additional terms, addenda, and signatures.</p>
          </div>
        </div>

        <div className="space-y-6">
            <div className="bg-white border-2 border-gray-100 p-6 rounded-2xl space-y-6">
                <h4 className="text-[14px] font-bold text-gray-900">Acceptable Financing Options</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    <CheckboxItem label="Conventional" />
                    <CheckboxItem label="VA" />
                    <CheckboxItem label="FHA" />
                    <CheckboxItem label="Cash" />
                    <CheckboxItem label="Texas Veterans Land" />
                    <CheckboxItem label="Owner Financing" />
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                    <Question label="Other financing" type="text" placeholder="e.g. Lease-option" />
                </div>
            </div>

            <div className="bg-white border-2 border-gray-100 p-6 rounded-2xl space-y-6">
               <h4 className="text-[14px] font-bold text-gray-900">Foreign Seller Status</h4>
               <Question label="Is seller a 'foreign person' under federal tax law?" type="radio" options={['Yes', 'No']} />
            </div>

            <div className="bg-white border-2 border-gray-100 p-6 rounded-2xl space-y-6">
               <h4 className="text-[14px] font-bold text-gray-900">Special Provisions</h4>
               <Question label="" type="textarea" placeholder="Enter additional provisions or special terms" />
            </div>

            <div className="bg-white border-2 border-gray-100 p-6 rounded-2xl space-y-6">
                <h4 className="text-[14px] font-bold text-gray-900">Seller Representations</h4>
                <Question label="Exceptions to Financial Obligations" type="text" placeholder="" />
                <Question label="Exceptions to Liens or Encumbrances" type="text" placeholder="" />
                <Question label="Employer / Relocation Company / Benefit Provider" type="text" placeholder="" />
            </div>

            <div className="bg-white border-2 border-gray-100 p-6 rounded-2xl space-y-6">
                <h4 className="text-[14px] font-bold text-gray-900">Addenda Checklist</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <CheckboxItem label="Information About Brokerage Services" />
                    <CheckboxItem label="Seller Disclosure Notice" />
                    <CheckboxItem label="Lead Based Paint Addendum" />
                    <CheckboxItem label="Residential Real Property Affidavit (T-47)" />
                    <CheckboxItem label="MUD / Water District Disclosure" />
                    <CheckboxItem label="Request for Information from Owners Association" />
                    <CheckboxItem label="Request for Mortgage Information" />
                    <CheckboxItem label="Mineral Clauses Information" />
                    <CheckboxItem label="On-Site Sewer Facility Information" />
                    <CheckboxItem label="Property Insurance Information" />
                    <CheckboxItem label="Special Flood Hazard Areas Information" />
                    <CheckboxItem label="Condominium Addendum to Listing" />
                    <CheckboxItem label="Keybox Authorization by Tenant" />
                    <CheckboxItem label="Seller Authorization to Release and Advertise Information" />
                    <CheckboxItem label="Other" />
                </div>
            </div>

            {/* SIGNATURES */}
            <div className="bg-white border-2 border-gray-100 p-6 rounded-2xl space-y-8">
                <h4 className="text-[14px] font-bold text-gray-900">Signatures</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h5 className="text-[13px] font-bold text-gray-600">Broker / Associate</h5>
                        <Question label="Broker Printed Name" type="text" placeholder="" />
                        <Question label="Broker Associate Printed Name" type="text" placeholder="" />
                        <Question label="Broker Signature Date" type="date" />
                        <Question label="Broker/Associate Initials" type="text" placeholder="Initials" />
                    </div>
                    <div className="space-y-4">
                        <h5 className="text-[13px] font-bold text-gray-600">Seller</h5>
                        <Question label="Seller Printed Name" type="text" placeholder="" />
                        <Question label="Seller Signature Date" type="date" />
                        <Question label="Seller Initials" type="text" placeholder="Initials" />
                    </div>
                </div>

                <div className="p-8 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 mt-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-100 transition-colors">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3">
                        <Briefcase className="w-6 h-6 text-indigo-600" />
                    </div>
                    <span className="text-[14px] font-bold text-indigo-600 uppercase tracking-wide">Generate Electronic Signatures</span>
                    <span className="text-[12px] text-gray-500 mt-1">Click to sign with DocuSign</span>
                </div>
            </div>
        </div>
      </div>
    );
  }

  return null;
}
