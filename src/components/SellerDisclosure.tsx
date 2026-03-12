import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Home, 
  Wrench, 
  AlertTriangle, 
  Droplets, 
  FileText, 
  Settings, 
  CheckCircle2,
  Info,
  ShieldCheck,
  Building2,
  Zap,
  Waves,
  PanelLeftOpen
} from 'lucide-react';

// --- Shared Components ---

function Question({ label, description, type = 'radio', options = ['Yes', 'No'], placeholder }: any) {
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
              <input type="radio" name={label} className="sr-only peer" />
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

      {type === 'select' && (
        <select className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition-all appearance-none">
          {options.map((opt: string) => <option key={opt}>{opt}</option>)}
        </select>
      )}
    </div>
  );
}

function CheckboxItem({ label, ...props }: { label: string; [key: string]: any }) {
  return (
    <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
      <span className="text-[13px] text-gray-700 font-medium">{label}</span>
    </label>
  );
}

function SignatureBlock({ title, description }: { title: string; description: string }) {
  const [signed, setSigned] = useState(false);
  const [date, setDate] = useState(new Date().toLocaleDateString('en-GB').split('/').join('-'));

  return (
    <div className="p-6 bg-white rounded-2xl border border-gray-100 hover:border-indigo-100 transition-all group">
      <h4 className="text-[14px] font-bold text-gray-900 mb-1">{title}</h4>
      <p className="text-[12px] text-gray-500 mb-6">{description}</p>
      
      <div className="space-y-4">
        <Question label="Printed Name" type="text" placeholder="John Doe" />
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Date</label>
            <input 
              type="text" 
              value={date} 
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border-2 border-transparent rounded-xl text-[13px] outline-none focus:bg-white focus:border-indigo-500/20 transition-all font-medium"
            />
          </div>
        </div>

        <div>
          <label className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Signature</label>
          <div 
            onClick={() => setSigned(true)}
            className={`h-24 rounded-2xl border-2 border-dashed flex items-center justify-center cursor-pointer transition-all ${
              signed 
                ? 'bg-indigo-50 border-indigo-200' 
                : 'bg-gray-50 border-gray-200 hover:border-indigo-300 hover:bg-white'
            }`}
          >
            {signed ? (
              <div className="text-center">
                <span className="font-['Dancing_Script',_cursive] text-2xl text-indigo-600 block">John Doe</span>
                <span className="text-[10px] text-indigo-400 font-medium">Digitally Signed & Verified</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <Wrench className="w-4 h-4 text-indigo-600" />
                </div>
                <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wide">Click to Sign</span>
              </div>
            )}
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); setSigned(true); }}
            className="mt-3 w-full py-2 bg-indigo-50 text-indigo-600 text-[11px] font-bold rounded-lg border border-indigo-100 hover:bg-indigo-600 hover:text-white transition-all uppercase tracking-wide"
          >
            Mock Generate Signature
          </button>
        </div>
      </div>
    </div>
  );
}

function ItemRow({ label, ...props }: { label: string; [key: string]: any }) {
  return (
    <div className="flex items-center justify-between py-2 md:py-3 border-b border-gray-50 group hover:bg-gray-50/50 px-2 rounded-xl transition-all" {...props}>
      <span className="text-[12px] md:text-[13px] text-gray-700 font-semibold pr-4 leading-snug">{label}</span>
      <div className="flex gap-1 bg-gray-100/50 p-0.5 rounded-lg border border-gray-200 shrink-0 ml-auto">
        {['Y', 'N', 'U'].map((opt) => (
          <label key={opt} className="cursor-pointer">
            <input type="radio" name={label} className="sr-only peer" />
            <div className="w-8 h-8 md:w-9 md:h-8 flex items-center justify-center text-[10px] md:text-[11px] font-black text-gray-400 peer-checked:bg-white peer-checked:text-indigo-600 peer-checked:shadow-[0_2px_4px_rgba(0,0,0,0.05)] rounded-md transition-all active:scale-90">
              {opt}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

function ComplexItemRow({ label, subOptions }: { label: string; subOptions: any[] }) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className={`rounded-3xl border-2 transition-all duration-500 overflow-hidden ${
      selected === 'Yes' 
        ? 'border-indigo-500 bg-white shadow-2xl shadow-indigo-500/10' 
        : selected === 'No' || selected === 'U'
          ? 'border-gray-200 bg-gray-50/20 shadow-none'
          : 'border-gray-100 bg-white shadow-sm'
    }`}>
      <div className="p-4 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-sm ${
              selected === 'Yes' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400'
            }`}>
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-[14px] md:text-[15px] font-black text-gray-900 tracking-tight">{label}</h3>
              <p className="text-[11px] md:text-[12px] text-gray-500 font-medium">Status & verification</p>
            </div>
          </div>
          
          <div className="flex gap-2 p-1 bg-gray-100 rounded-xl border border-gray-200 w-fit shrink-0">
            {[
              { id: 'Yes', label: 'Y', color: 'peer-checked:bg-emerald-500 peer-checked:text-white' },
              { id: 'No', label: 'N', color: 'peer-checked:bg-gray-700 peer-checked:text-white' },
              { id: 'U', label: 'U', color: 'peer-checked:bg-gray-400 peer-checked:text-white' }
            ].map((opt) => (
              <label key={opt.id} className="cursor-pointer">
                <input 
                  type="radio" 
                  name={label} 
                  className="sr-only peer" 
                  checked={selected === opt.id}
                  onChange={() => setSelected(opt.id)}
                />
                <div className={`px-5 py-2.5 rounded-lg text-[12px] font-bold text-gray-400 hover:text-gray-600 transition-all ${opt.color}`}>
                  {opt.label}
                </div>
              </label>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {selected === 'Yes' && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: 'auto', opacity: 1, marginTop: 24 }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="overflow-hidden"
            >
              <div className="pt-6 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                {subOptions.map((opt, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="space-y-2"
                  >
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">{opt.label}</label>
                    
                    {opt.type === 'text' && (
                      <div className="relative group">
                        <input 
                          type="text" 
                          placeholder={opt.placeholder}
                          className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl text-[14px] text-gray-900 focus:bg-white focus:border-indigo-500/30 focus:shadow-lg focus:shadow-indigo-500/5 outline-none transition-all placeholder:text-gray-300"
                        />
                      </div>
                    )}
                    
                    {opt.type === 'select' && (
                      <div className="flex gap-2">
                        {opt.options.map((option: string) => (
                          <label key={option} className="flex-1 cursor-pointer">
                            <input type="radio" name={`${label}-${opt.label}`} className="sr-only peer" />
                            <div className="px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl text-[13px] text-gray-600 font-semibold text-center peer-checked:border-indigo-500 peer-checked:bg-white peer-checked:text-indigo-600 peer-checked:shadow-md transition-all">
                              {option}
                            </div>
                          </label>
                        ))}
                      </div>
                    )}
                    
                    {opt.type === 'multi-select' && (
                      <div className="flex flex-wrap gap-2">
                        {opt.options.map((option: string) => (
                          <label key={option} className="cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="px-4 py-2.5 bg-gray-50 border-2 border-transparent rounded-xl text-[12px] text-gray-600 font-bold text-center peer-checked:border-indigo-500 peer-checked:bg-white peer-checked:text-indigo-600 peer-checked:shadow-sm transition-all">
                              {option}
                            </div>
                          </label>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

type Step = {
  id: string;
  title: string;
  substeps?: string[];
  icon: React.ReactNode;
};

const STEPS: Step[] = [
  { id: 'conditions', title: 'Property Information', substeps: ['Address & Occupancy', 'Property Items', 'Additional Systems', 'Structural & Utilities'], icon: <Home className="w-4 h-4" /> },
  { id: 'defects', title: 'Defects & Malfunctions', icon: <AlertTriangle className="w-4 h-4" /> },
  { id: 'known', title: 'Known Conditions', icon: <Info className="w-4 h-4" /> },
  { id: 'repairs', title: 'Repairs & Flooding', icon: <Waves className="w-4 h-4" /> },
  { id: 'other', title: 'Other Conditions', icon: <Settings className="w-4 h-4" /> },
  { id: 'exemptions', title: 'Exemptions & Utilities', icon: <Zap className="w-4 h-4" /> },
  { id: 'signatures', title: 'Signatures & Acks', icon: <ShieldCheck className="w-4 h-4" /> },
];

export function SellerDisclosure() {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentSubstep, setCurrentSubstep] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [inspectionReports, setInspectionReports] = useState<any[]>([
    { date: '', type: '', name: '', pages: '' }
  ]);
  const addInspectionRow = () => {
    setInspectionReports([...inspectionReports, { date: '', type: '', name: '', pages: '' }]);
  };

  const removeInspectionRow = (index: number) => {
    setInspectionReports(inspectionReports.filter((_, i) => i !== index));
  };

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

  const currentStepData = STEPS[currentStep];

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
          <div className="p-1.5 md:p-2 bg-indigo-50 rounded-lg shrink-0">
            <FileText className="w-4 h-4 md:w-5 md:h-5 text-indigo-600" />
          </div>
          <div className="overflow-hidden">
            <h1 className="text-[14px] md:text-[16px] font-semibold text-gray-900 truncate">Seller's Disclosure</h1>
            <p className="hidden md:block text-[12px] text-gray-500 whitespace-nowrap">Legal disclosure of property conditions</p>
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
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all ${
                    currentStep === index 
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
                  <div className={`flex-shrink-0 w-7 h-7 rounded-xl flex items-center justify-center text-[11px] font-black ${
                    currentStep === index 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                    : index < currentStep 
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-100' 
                      : 'border-2 border-gray-100 text-gray-400'
                  }`}>
                    {index < currentStep ? <CheckCircle2 className="w-4 h-4" /> : index + 1}
                  </div>
                  <span className="text-[13px] tracking-tight">{step.title}</span>
                </div>
                
                {/* Nested Substeps */}
                {step.substeps && currentStep === index && (
                  <div className="ml-10 mt-2 space-y-1 border-l-2 border-indigo-100/50 pl-5 py-2">
                    {step.substeps.map((sub, sIdx) => (
                      <div 
                        key={sub}
                        className={`text-[12px] py-2 cursor-pointer transition-all rounded-lg px-2 ${
                          currentSubstep === sIdx 
                          ? 'text-indigo-600 font-bold bg-indigo-50/30' 
                          : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50/50'
                        }`}
                        onClick={() => {
                          setCurrentSubstep(sIdx);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        {sub}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 p-5 bg-orange-50/50 rounded-2xl border border-orange-100">
            <div className="flex gap-4">
              <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0" />
              <div>
                <p className="text-[11px] font-black text-orange-800 uppercase tracking-widest mb-1.5">Expert Tip</p>
                <p className="text-[12px] text-orange-700 leading-relaxed font-medium">
                  Be as detailed as possible. Accurate disclosures build trust and avoid future legal issues.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-[#FAFAFA] p-4">
          <div className="max-w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentStep}-${currentSubstep}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl border border-[#EAEAEA] shadow-sm overflow-hidden"
              >
                <div className="p-8">
                  <div className="space-y-6">
                    {renderStepContent(currentStep, currentSubstep, { inspectionReports, addInspectionRow, removeInspectionRow })}
                  </div>
                </div>

                <div className="px-8 py-5 bg-gray-50/50 border-t border-[#EAEAEA] flex items-center justify-between">
                  <button 
                    onClick={prevStep}
                    disabled={currentStep === 0 && currentSubstep === 0}
                    className="flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>
                  <button 
                    onClick={nextStep}
                    className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg text-[13px] font-semibold hover:bg-indigo-700 shadow-sm shadow-indigo-200 transition-all active:scale-[0.98]"
                  >
                    {currentStep === STEPS.length - 1 ? 'Finish & Sign' : 'Continue'}
                    {currentStep !== STEPS.length - 1 && <ChevronRight className="w-4 h-4" />}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex justify-center gap-8 text-[12px] text-gray-400 font-medium">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> Encrypted Connection</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> Auto-saved</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function renderStepContent(stepIdx: number, subStepIdx: number, { inspectionReports, addInspectionRow, removeInspectionRow }: any) {
    // Mock content for each step to demonstrate the UI

  if (stepIdx === 0 && subStepIdx === 0) {
      return (
        <div className="space-y-8">
          <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <Home className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-gray-900 uppercase tracking-tight">1. Property Address & Occupancy</h3>
              <p className="text-[12px] text-gray-500">Provide the property location and your residency status.</p>
            </div>
          </div>

          <div className="space-y-4">
            <Question 
              label="Property Address" 
              type="text" 
              placeholder="Enter full property address"
            />
          </div>

          <div className="space-y-4 pt-2">
            <Question 
              label="Seller Occupancy" 
              options={['Occupying', 'Not Occupying']}
            />
          </div>

          <div className="p-6 bg-indigo-50/50 rounded-2xl border border-indigo-100 space-y-5">
            <p className="text-[12px] font-semibold text-indigo-900 uppercase tracking-wider">If unoccupied, how long since Seller has occupied the Property?</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Question 
                label="Approximate Date" 
                type="text" 
                placeholder="MM/DD/YYYY"
              />
              <div className="flex items-end pb-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 transition-all" />
                  <span className="text-[13px] text-gray-700 font-medium group-hover:text-indigo-600">Never Occupied</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      );
  }
    
  if (stepIdx === 0 && subStepIdx === 1) {
    // Step 2: Property Items
      const items = [
      "Cable TV Wiring", "Carbon Monoxide Det.", "Ceiling Fans", "Cooktop", "Dishwasher", 
      "Disposal", "Emergency Escape Ladder(s)", "Exhaust Fans", "Fences", "Fire Detection Equip.", 
      "French Drain", "Gas Fixtures", "Liquid Propane Gas: LP Community (Captive)", 
      "Liquid Propane Gas: LP on Property", "Natural Gas Lines", "Fuel Gas Piping: Black Iron Pipe", 
      "Fuel Gas Piping: Copper", "Fuel Gas Piping: Corrugated Stainless Steel", "Fuel Gas Piping: Steel Tubing", 
      "Hot Tub", "Intercom System", "Microwave", "Outdoor Grill", "Patio/Decking", "Plumbing System", 
      "Pool", "Pool Equipment", "Pool Maint. Accessories", "Pool Heater", "Pump: Sump", 
      "Pump: Grinder", "Rain Gutters", "Range/Stove", "Roof/Attic Vents", "Sauna", "Smoke Detector", 
      "Smoke Detector - Hearing Impaired", "Spa", "Trash Compactor", "TV Antenna", 
      "Washer/Dryer Hookup", "Window Screens", "Public Sewer System"
    ];

    return (
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-100 pb-6 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 shrink-0">
              <Wrench className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div>
              <h3 className="text-[15px] md:text-[16px] font-black text-gray-900 uppercase tracking-tight">2. Property Items & Equipment</h3>
              <p className="text-[11px] md:text-[12px] text-gray-500 font-medium">Functional status of property assets</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 self-start md:self-center shrink-0">
            <span className="text-[11px] font-black text-indigo-600">Y</span><span className="text-[10px] text-gray-400 font-bold">=Yes</span>
            <span className="text-[10px] text-gray-300">|</span>
            <span className="text-[11px] font-black text-indigo-600">N</span><span className="text-[10px] text-gray-400 font-bold">=No</span>
            <span className="text-[10px] text-gray-300">|</span>
            <span className="text-[11px] font-black text-indigo-600">U</span><span className="text-[10px] text-gray-400 font-bold">=Unknown</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
          {items.map(item => (
            <ItemRow key={item} label={item} />
          ))}
        </div>
      </div>
    );
  }

  if (stepIdx === 0 && subStepIdx === 2) {
    const systemItems = [
      "Central A/C", "Evaporative Coolers", "Wall/Window AC Units", "Attic Fan(s)",
      "Central Heat", "Other Heat", "Oven", "Fireplace & Chimney",
      "Carport", "Garage", "Garage Door Openers", "Satellite Dish & Controls",
      "Security System", "Solar Panels", "Water Heater", "Water Softener",
      "Other Leased Item(s)", "Underground Lawn Sprinkler"
    ];

    return (
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-100 pb-6 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 shrink-0">
              <Settings className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div>
              <h3 className="text-[15px] md:text-[16px] font-black text-gray-900 uppercase tracking-tight">3. Systems & Additional Information</h3>
              <p className="text-[11px] md:text-[12px] text-gray-500 font-medium">Heating, cooling, and utility details</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 self-start md:self-center shrink-0">
            <span className="text-[11px] font-black text-indigo-600">Y</span><span className="text-[10px] text-gray-400 font-bold">=Yes</span>
            <span className="text-[10px] text-gray-300">|</span>
            <span className="text-[11px] font-black text-indigo-600">N</span><span className="text-[10px] text-gray-400 font-bold">=No</span>
            <span className="text-[10px] text-gray-300">|</span>
            <span className="text-[11px] font-black text-indigo-600">U</span><span className="text-[10px] text-gray-400 font-bold">=Unknown</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
          {systemItems.map(item => (
            <ItemRow key={item} label={item} />
          ))}
        </div>
      </div>
    );
  }


  if (stepIdx === 0 && subStepIdx === 3) {
    return (
      <div className="space-y-8 pb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-100 pb-6 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 shrink-0">
              <Building2 className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div>
              <h3 className="text-[15px] md:text-[16px] font-black text-gray-900 uppercase tracking-tight">4. Structural, Utilities & Roof</h3>
              <p className="text-[11px] md:text-[12px] text-gray-500 font-medium">Infrastructure and construction details</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 self-start md:self-center shrink-0">
            <span className="text-[11px] font-black text-indigo-600">Y</span><span className="text-[10px] text-gray-400 font-bold">=Yes</span>
            <span className="text-[10px] text-gray-300">|</span>
            <span className="text-[11px] font-black text-indigo-600">N</span><span className="text-[10px] text-gray-400 font-bold">=No</span>
            <span className="text-[10px] text-gray-300">|</span>
            <span className="text-[11px] font-black text-indigo-600">U</span><span className="text-[10px] text-gray-400 font-bold">=Unknown</span>
          </div>
        </div>



        <div className="grid grid-cols-1 gap-6">
          {/* Septic Section */}
          <div className="bg-white rounded-2xl border-2 border-gray-100 p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-1">
                <h4 className="text-[15px] font-bold text-gray-900">Septic / On-Site Sewer Facility</h4>
                <p className="text-[12px] text-gray-500 italic">(if yes, attach TXR-1407)</p>
              </div>
              <div className="flex gap-2 p-1 bg-gray-100 rounded-xl border border-gray-200 w-fit shrink-0">
                {['Y', 'N'].map((opt) => (
                  <label key={opt} className="cursor-pointer">
                    <input type="radio" name="septic-sewer" className="sr-only peer" />
                    <div className="px-8 py-3 rounded-lg text-[13px] font-bold text-gray-400 peer-checked:bg-white peer-checked:text-indigo-600 peer-checked:shadow-md transition-all">
                      {opt}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Water Supply Section */}
          <div className="bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-200 p-6 space-y-4">
            <label className="text-[14px] font-bold text-gray-900 flex items-center gap-2">
              <Droplets className="w-4 h-4 text-blue-500" />
              Water supply provided by:
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
              {['City', 'Well', 'MUD', 'Co-op', 'Unknown', 'Other'].map(opt => (
                <label key={opt} className="cursor-pointer">
                  <input type="radio" name="water-supply-source" className="sr-only peer" />
                  <div className="px-3 py-3 bg-white border-2 border-gray-100 rounded-xl text-[12px] text-gray-600 font-bold text-center peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 transition-all hover:border-gray-200">
                    {opt}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Pre-1978 Check */}
          <div className="bg-white rounded-2xl border-2 border-gray-100 p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-1">
                <h4 className="text-[15px] font-bold text-gray-900">Was the Property built before 1978?</h4>
                <p className="text-[12px] text-gray-500">Lead-based paint disclosures may be required for older properties.</p>
              </div>
              <div className="flex gap-2 p-1 bg-gray-100 rounded-xl border border-gray-200 w-fit shrink-0">
                {['Y', 'N', 'U'].map((opt) => (
                  <label key={opt} className="cursor-pointer">
                    <input type="radio" name="lead-paint-check" className="sr-only peer" />
                    <div className="px-6 py-3 rounded-lg text-[13px] font-bold text-gray-400 peer-checked:bg-white peer-checked:text-blue-600 peer-checked:shadow-md transition-all">
                      {opt}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Roof Specialized Card */}
          <div className="bg-neutral-900 text-white rounded-3xl p-8 space-y-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px]" />
            <div className="relative flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
                <Building2 className="w-6 h-6 text-blue-400" />
              </div>
              <h4 className="text-[18px] font-bold">Roof Information</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
              <div className="space-y-3">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Roof Type</label>
                <input 
                  type="text" 
                  placeholder="e.g. Composition Shingle"
                  className="w-full bg-white/5 border-2 border-white/10 rounded-2xl px-5 py-4 text-[14px] outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all placeholder:text-gray-600"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Age (approximate)</label>
                <input 
                  type="text" 
                  placeholder="e.g. 10 years"
                  className="w-full bg-white/5 border-2 border-white/10 rounded-2xl px-5 py-4 text-[14px] outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all placeholder:text-gray-600"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <label className="text-[14px] font-semibold mb-4 block">Is there an overlay roof covering on the Property (shingles or roof covering placed over existing shingles or roof covering)?</label>
              <div className="flex gap-2 p-1 bg-white/5 rounded-2xl border border-white/10 w-full md:w-fit">
                {['Y', 'N', 'U'].map((opt) => (
                  <label key={opt} className="flex-1 md:flex-none cursor-pointer">
                    <input type="radio" name="overlay-roof" className="sr-only peer" />
                    <div className="px-8 py-3 rounded-xl text-[13px] font-bold text-gray-500 peer-checked:bg-blue-600 peer-checked:text-white peer-checked:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all text-center">
                      {opt}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Section 1 Awareness Statement */}
          <div className="p-8 bg-amber-50 rounded-3xl border-2 border-amber-100 flex flex-col md:flex-row gap-6 items-start">
            <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center shrink-0">
              <AlertTriangle className="w-7 h-7 text-amber-600" />
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <h4 className="text-[15px] font-bold text-gray-900">Section 1 Awareness Statement</h4>
                <p className="text-[13px] text-gray-600 mt-1">Are you (Seller) aware of any of the items listed in this Section 1 that are not in working condition, that have defects, or are need of repair?</p>
              </div>
              <div className="flex gap-3">
                {['Y', 'N'].map((opt) => (
                  <label key={opt} className="cursor-pointer group flex-1 md:flex-none">
                    <input type="radio" name="section1-awareness" className="sr-only peer" />
                    <div className="px-10 py-3 bg-white border border-gray-200 rounded-xl text-[14px] font-bold text-gray-400 group-hover:border-amber-400 peer-checked:bg-amber-600 peer-checked:text-white peer-checked:border-amber-600 transition-all text-center shadow-sm">
                      {opt}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (stepIdx === 1) {
    const defectItems = [
      "Basement", "Ceilings", "Doors", "Driveways", "Electrical Systems", 
      "Exterior Walls", "Floors", "Foundation / Slab(s)", "Interior Walls", 
      "Lighting Fixtures", "Plumbing Systems", "Roof", "Sidewalks", 
      "Walls / Fences", "Windows", "Other Structural Components"
    ];

    return (
      <div className="space-y-8 pb-10">
        <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-[16px] font-bold text-gray-900 uppercase tracking-tight">2. Defects & Malfunctions</h3>
            <p className="text-[12px] text-gray-500">Identify any known defects or malfunctions in structural or utility components.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
          {defectItems.map(item => (
            <div key={item} className="flex items-center justify-between py-2.5 border-b border-gray-50 group hover:bg-gray-50/50 px-2 rounded-md transition-colors">
              <span className="text-[13px] text-gray-700 font-medium">{item}</span>
              <div className="flex gap-1 bg-gray-100/50 p-0.5 rounded-lg border border-gray-200 shrink-0 ml-4">
                {['Yes', 'No'].map((opt) => (
                  <label key={opt} className="cursor-pointer">
                    <input type="radio" name={`${item}-defect`} className="sr-only peer" />
                    <div className="w-12 h-8 flex items-center justify-center text-[11px] font-bold text-gray-400 peer-checked:bg-white peer-checked:text-indigo-600 peer-checked:shadow-sm rounded-md transition-all">
                      {opt}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-6 space-y-4">
          <label className="text-[14px] font-bold text-gray-900 block">
            If the answer to any of the items in Section 2 is yes, explain (attach additional sheets if necessary):
          </label>
          <textarea 
            placeholder="Provide explanation or additional details here..."
            className="w-full h-32 px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl text-[14px] text-gray-900 focus:bg-white focus:border-indigo-500/30 focus:shadow-lg focus:shadow-indigo-500/5 outline-none transition-all placeholder:text-gray-300 resize-none"
          />
        </div>
      </div>
    );
  }

  if (stepIdx === 2) {
    const knownConditions = [
      "Aluminum Wiring", "Asbestos Components", "Diseased Trees", "Endangered Species/Habitat on Property", 
      "Fault Lines", "Hazardous or Toxic Waste", "Improper Drainage", "Intermittent or Weather Springs", 
      "Landfill", "Lead-Based Paint or Lead-Based Pt. Hazards", "Encroachments onto the Property", 
      "Improvements encroaching on others’ property", "Located in Historic District", 
      "Historic Property Designation", "Previous Foundation Repairs", "Radon Gas", "Settling", 
      "Soil Movement", "Subsurface Structure or Pits", "Underground Storage Tanks", 
      "Unplatted Easements", "Unrecorded Easements", "Urea-formaldehyde Insulation", 
      "Water Damage Not Due to a Flood Event", "Wetlands on Property", "Wood Rot", 
      "Active infestation of termites or other wood destroying insects (WDI)", 
      "Previous treatment for termites or WDI", "Previous termite or WDI damage repaired", 
      "Previous Fires", "Previous Roof Repairs", "Previous Other Structural Repairs", 
      "Previous Use of Premises for Manufacture of Methamphetamine", 
      "Termite or WDI damage needing repair", "Single Blockable Main Drain in Pool/Hot Tub/Spa"
    ];

    return (
      <div className="space-y-8 pb-10">
        <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <Info className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-[16px] font-bold text-gray-900 uppercase tracking-tight">3. Known Property Conditions</h3>
            <p className="text-[12px] text-gray-500">Are you (Seller) aware of any of the following conditions?</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
          {knownConditions.map(item => (
            <div key={item} className="flex items-center justify-between py-2.5 border-b border-gray-50 group hover:bg-gray-50/50 px-2 rounded-md transition-colors">
              <div className="space-y-0.5">
                <span className="text-[13px] text-gray-700 font-medium leading-tight">{item}</span>
                {item === "Diseased Trees" && <p className="text-[10px] text-indigo-500 font-bold uppercase tracking-wider">Oak Wilt Awareness</p>}
              </div>
              <div className="flex gap-1 bg-gray-100/50 p-0.5 rounded-lg border border-gray-200 shrink-0 ml-4">
                {(item === "Diseased Trees" || item === "Lead-Based Paint or Lead-Based Pt. Hazards") ? (
                  ['Yes', 'No', 'U'].map((opt) => (
                    <label key={opt} className="cursor-pointer">
                      <input type="radio" name={`${item}-known`} className="sr-only peer" />
                      <div className="w-10 h-8 flex items-center justify-center text-[10px] font-bold text-gray-400 peer-checked:bg-white peer-checked:text-indigo-600 peer-checked:shadow-sm rounded-md transition-all">
                        {opt}
                      </div>
                    </label>
                  ))
                ) : (
                  ['Yes', 'No'].map((opt) => (
                    <label key={opt} className="cursor-pointer">
                      <input type="radio" name={`${item}-known`} className="sr-only peer" />
                      <div className="w-12 h-8 flex items-center justify-center text-[11px] font-bold text-gray-400 peer-checked:bg-white peer-checked:text-indigo-600 peer-checked:shadow-sm rounded-md transition-all">
                        {opt}
                      </div>
                    </label>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-6 space-y-4">
          <label className="text-[14px] font-bold text-gray-900 block">
            If the answer to any of the items in Section 3 is yes, explain (attach additional sheets if necessary):
          </label>
          <textarea 
            placeholder="Provide explanation or additional details here..."
            className="w-full h-32 px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl text-[14px] text-gray-900 focus:bg-white focus:border-indigo-500/30 focus:shadow-lg focus:shadow-indigo-500/5 outline-none transition-all placeholder:text-gray-300 resize-none"
          />
        </div>
      </div>
    );
  }

  if (stepIdx === 3) {
    const floodItemsSimple = [
      "Present flood insurance coverage.",
      "Previous flooding due to a failure or breach of a reservoir or a controlled or emergency release of water from a reservoir.",
      "Previous flooding due to a natural flood event.",
      "Previous water penetration into a structure on the Property due to a natural flood."
    ];

    const floodItemsComplex = [
      { label: "Located in a 100-year floodplain", desc: "(Special Flood Hazard Area-Zone A, V, A99, AE, AO, AH, VE, or AR)" },
      { label: "Located in a 500-year floodplain", desc: "(Moderate Flood Hazard Area-Zone X (shaded))" },
      { label: "Located in a floodway", desc: "" },
      { label: "Located in a flood pool", desc: "" },
      { label: "Located in a reservoir", desc: "" }
    ];

    return (
      <div className="space-y-8 pb-10">
        <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <Waves className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-[16px] font-bold text-gray-900 uppercase tracking-tight">4. Repairs, Flooding & Assistance</h3>
            <p className="text-[12px] text-gray-500">Disclosure of repairs and flood-related history.</p>
          </div>
        </div>

        {/* Section 4: Repairs */}
        <div className="p-6 bg-white rounded-2xl border-2 border-gray-100 space-y-6">
          <Question 
            label="4. Are you (Seller) aware of any item, equipment, or system in or on the Property that is in need of repair, which has not been previously disclosed in this notice?" 
            options={['Yes', 'No']}
          />
          <div className="space-y-2">
            <label className="text-[12px] font-bold text-gray-400 uppercase tracking-wider">If yes, explain:</label>
            <textarea 
              placeholder="Provide explanation or additional details here..."
              className="w-full h-24 px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl text-[14px] focus:bg-white focus:border-indigo-500/30 outline-none transition-all resize-none"
            />
          </div>
        </div>

        {/* Section 5: Flooding Conditions */}
        <div className="space-y-6">
          <div className="bg-blue-50/30 rounded-3xl border-2 border-blue-100 p-8 space-y-6">
            <div className="flex items-center gap-3">
              <Droplets className="w-5 h-5 text-blue-600" />
              <h4 className="text-[15px] font-bold text-gray-900 uppercase tracking-tight">5. Flooding Conditions</h4>
            </div>

            <div className="space-y-4">
              {floodItemsSimple.map((item) => (
                <div key={item} className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-3 border-b border-blue-100/50">
                  <span className="text-[13px] text-gray-700 font-medium leading-snug max-w-xl">{item}</span>
                  <div className="flex gap-1 bg-white p-0.5 rounded-lg border border-blue-200 shrink-0">
                    {['Yes', 'No'].map((opt) => (
                      <label key={opt} className="cursor-pointer">
                        <input type="radio" name={item} className="sr-only peer" />
                        <div className="w-12 h-8 flex items-center justify-center text-[11px] font-bold text-gray-400 peer-checked:bg-blue-600 peer-checked:text-white rounded-md transition-all">
                          {opt}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              {floodItemsComplex.map((item) => (
                <div key={item.label} className="py-4 border-b border-blue-100/50 space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[13px] text-gray-700 font-bold">{item.label}</span>
                      {item.desc && <p className="text-[11px] text-gray-500 leading-tight">{item.desc}</p>}
                    </div>
                    <div className="flex gap-1 bg-white p-0.5 rounded-lg border border-blue-200 shrink-0">
                      {['Yes', 'No', 'U'].map((opt) => (
                        <label key={opt} className="cursor-pointer">
                          <input type="radio" name={item.label} className="sr-only peer" />
                          <div className="w-10 h-8 flex items-center justify-center text-[10px] font-bold text-gray-400 peer-checked:bg-blue-600 peer-checked:text-white rounded-md transition-all">
                            {opt}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 pl-4 border-l-2 border-blue-200">
                    <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">Coverage Filter:</span>
                    <div className="flex gap-2">
                      {['wholly', 'partly'].map(opt => (
                        <label key={opt} className="cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="px-3 py-1 bg-white border border-blue-200 rounded-md text-[10px] font-bold text-gray-400 peer-checked:bg-blue-100 peer-checked:text-blue-700 peer-checked:border-blue-500 transition-all uppercase">
                            {opt}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 space-y-2">
              <label className="text-[12px] font-bold text-blue-600 uppercase tracking-wider">If yes, explain:</label>
              <textarea 
                placeholder="Provide explanation or additional details here..."
                className="w-full h-24 px-4 py-3 bg-white border-2 border-blue-100 rounded-2xl text-[14px] focus:border-blue-400 outline-none transition-all resize-none shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Section 6 & 7: Claims & Assistance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-3xl border-2 border-gray-100 space-y-4">
            <h4 className="text-[14px] font-bold text-gray-900 leading-tight">6. Have you (Seller) ever filed a claim for flood damage to the Property?</h4>
            <div className="flex gap-2 p-1 bg-gray-100 rounded-xl border border-gray-200 w-fit">
              {['Yes', 'No'].map(opt => (
                <label key={opt} className="cursor-pointer">
                  <input type="radio" name="flood-claim" className="sr-only peer" />
                  <div className="px-8 py-2.5 rounded-lg text-[12px] font-bold text-gray-400 peer-checked:bg-white peer-checked:text-indigo-600 peer-checked:shadow-sm transition-all">
                    {opt}
                  </div>
                </label>
              ))}
            </div>
            <textarea 
              placeholder="If yes, explain..."
              className="w-full h-24 px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl text-[13px] focus:bg-white focus:border-indigo-500/30 outline-none transition-all resize-none"
            />
          </div>

          <div className="p-6 bg-white rounded-3xl border-2 border-gray-100 space-y-4">
            <h4 className="text-[14px] font-bold text-gray-900 leading-tight">7. Have you (Seller) ever received assistance from FEMA or SBA for flood damage?</h4>
            <div className="flex gap-2 p-1 bg-gray-100 rounded-xl border border-gray-200 w-fit">
              {['Yes', 'No'].map(opt => (
                <label key={opt} className="cursor-pointer">
                  <input type="radio" name="fema-assistance" className="sr-only peer" />
                  <div className="px-8 py-2.5 rounded-lg text-[12px] font-bold text-gray-400 peer-checked:bg-white peer-checked:text-indigo-600 peer-checked:shadow-sm transition-all">
                    {opt}
                  </div>
                </label>
              ))}
            </div>
            <textarea 
              placeholder="If yes, explain..."
              className="w-full h-24 px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl text-[13px] focus:bg-white focus:border-indigo-500/30 outline-none transition-all resize-none"
            />
          </div>
        </div>
      </div>
    );
  }

  if (stepIdx === 4) {
    const disclosureItems = [
      "Room additions, structural modifications, or other alterations or repairs made without necessary permits, with unresolved permits, or not in compliance with building codes in effect at the time.",
      "Homeowners’ associations or maintenance fees or assessments.",
      "Any common area (facilities such as pools, tennis courts, walkways, or other) co-owned in undivided interest with others.",
      "Any notices of violations of deed restrictions or governmental ordinances affecting the condition or use of the Property.",
      "Any lawsuits or other legal proceedings directly or indirectly affecting the Property. (Includes, but is not limited to: divorce, foreclosure, heirship, bankruptcy, and taxes.)",
      "Any death on the Property except for those deaths caused by: natural causes, suicide, or accident unrelated to the condition of the Property.",
      "Any condition on the Property which materially affects the health or safety of an individual.",
      "Any repairs or treatments, other than routine maintenance, made to the Property to remediate environmental hazards such as asbestos, radon, lead-based paint, urea-formaldehyde, or mold.",
      "Any rainwater harvesting system located on the Property that is larger than 500 gallons and that uses a public water supply as an auxiliary water source.",
      "The Property is located in a propane gas system service area owned by a propane distribution system retailer.",
      "Any portion of the Property that is located in a groundwater conservation district or a subsidence district."
    ];

    return (
      <div className="space-y-10 pb-10">
        <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-[16px] font-bold text-gray-900 uppercase tracking-tight">8. Additional Disclosures & Reports</h3>
            <p className="text-[12px] text-gray-500">Other conditions and legal disclosures affecting the property.</p>
          </div>
        </div>

        <div className="space-y-6">
          {disclosureItems.map((item, idx) => (
            <div key={idx} className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 py-4 border-b border-gray-50">
                <span className="text-[14px] text-gray-700 font-medium leading-relaxed max-w-2xl">{item}</span>
                <div className="flex gap-1 bg-gray-100/50 p-0.5 rounded-lg border border-gray-200 shrink-0">
                  {['Yes', 'No'].map((opt) => (
                    <label key={opt} className="cursor-pointer">
                      <input type="radio" name={`other-disclosure-${idx}`} className="sr-only peer" />
                      <div className="w-12 h-8 flex items-center justify-center text-[11px] font-bold text-gray-400 peer-checked:bg-white peer-checked:text-indigo-600 peer-checked:shadow-sm rounded-md transition-all">
                        {opt}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* HOA Specific Fields */}
              {item === "Homeowners’ associations or maintenance fees or assessments." && (
                <div className="p-6 bg-indigo-50/50 rounded-2xl border border-indigo-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                  <Question label="Name of association" type="text" placeholder="Enter name" />
                  <Question label="Manager's name" type="text" placeholder="Enter manager" />
                  <Question label="Phone" type="text" placeholder="Enter phone" />
                  
                  <div className="space-y-3">
                    <label className="text-[14px] font-semibold text-gray-900 block">Fees or assessments are:</label>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 font-bold">$</span>
                      <input type="text" placeholder="Amt" className="w-20 px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                      <span className="text-gray-400 text-sm">per</span>
                      <select className="px-2 py-2 border border-gray-200 rounded-lg text-sm bg-white outline-none">
                        <option>month</option>
                        <option>quarter</option>
                        <option>year</option>
                        <option>other</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[14px] font-semibold text-gray-900 block">Status</label>
                    <div className="flex gap-2">
                      {['mandatory', 'voluntary'].map(opt => (
                        <label key={opt} className="cursor-pointer flex-1">
                          <input type="radio" name="hoa-status" className="sr-only peer" />
                          <div className="py-2 bg-white border border-gray-200 rounded-lg text-[11px] font-bold text-gray-500 text-center peer-checked:border-indigo-600 peer-checked:bg-indigo-600 peer-checked:text-white transition-all uppercase tracking-tight">
                            {opt}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[14px] font-semibold text-gray-900 block">Unpaid Fees?</label>
                    <div className="flex gap-2">
                      {['yes', 'no'].map(opt => (
                        <label key={opt} className="cursor-pointer flex-1">
                          <input type="radio" name="hoa-unpaid" className="sr-only peer" />
                          <div className="py-2 bg-white border border-gray-200 rounded-lg text-[11px] font-bold text-gray-500 text-center peer-checked:border-indigo-600 peer-checked:bg-indigo-600 peer-checked:text-white transition-all uppercase tracking-tight">
                            {opt}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Common Area Specific Fields */}
              {item === "Any common area (facilities such as pools, tennis courts, walkways, or other) co-owned in undivided interest with others." && (
                <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between gap-6 mt-4">
                  <span className="text-[13px] font-semibold text-gray-700">Any optional user fees for common facilities charged?</span>
                  <div className="flex gap-2 bg-white p-1 rounded-xl border border-gray-200 shrink-0">
                    {['yes', 'no'].map(opt => (
                      <label key={opt} className="cursor-pointer">
                        <input type="radio" name="common-area-fees" className="sr-only peer" />
                        <div className="px-6 py-2 rounded-lg text-[11px] font-bold text-gray-400 peer-checked:bg-gray-700 peer-checked:text-white transition-all uppercase tracking-tight">
                          {opt}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Environmental Remediation Specific Fields */}
              {item === "Any repairs or treatments, other than routine maintenance, made to the Property to remediate environmental hazards such as asbestos, radon, lead-based paint, urea-formaldehyde, or mold." && (
                <div className="p-6 bg-orange-50/30 rounded-2xl border-orange-100 space-y-4 mt-4">
                  <p className="text-[12px] text-orange-700 font-medium italic">If yes, attach any certificates or other documentation identifying the extent of the remediation.</p>
                  <textarea 
                    placeholder="Provide remediation details here..."
                    className="w-full h-24 px-4 py-3 bg-white border-2 border-orange-100 rounded-xl text-[14px] focus:border-orange-300 outline-none transition-all resize-none shadow-sm"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="pt-6 space-y-4">
          <label className="text-[14px] font-bold text-gray-900 block border-l-4 border-indigo-600 pl-4">
            If the answer to any of the items in Section 8 is yes, explain (attach additional sheets if necessary):
          </label>
          <textarea 
            placeholder="Provide explanation or additional details here..."
            className="w-full h-32 px-4 py-3 bg-white border-2 border-gray-100 rounded-2xl text-[14px] text-gray-900 focus:border-indigo-500/30 focus:shadow-lg focus:shadow-indigo-500/5 outline-none transition-all placeholder:text-gray-300 resize-none shadow-sm"
          />
        </div>

        {/* Section 9: Inspection Reports */}
        <div className="pt-12 space-y-8">
          <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
            <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-gray-900 uppercase tracking-tight">9. Written Inspection Reports</h3>
              <p className="text-[12px] text-gray-500 italic">Within the last 4 years, written reports from licensed inspectors.</p>
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border-2 border-gray-100 space-y-6">
            <Question 
              label="Have you (Seller) received any written inspection reports from persons who regularly provide inspections?" 
              options={['Yes', 'No']}
            />

            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-gray-50/30 mt-6">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-100/50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Inspection Date</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Type</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Inspector Name</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest w-24 text-center">Pages</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest w-16"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {inspectionReports.map((report, idx) => (
                    <tr key={idx} className="bg-white hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <input type="text" placeholder="MM/DD/YYYY" className="w-full bg-transparent text-[13px] outline-none" />
                      </td>
                      <td className="px-6 py-4">
                        <input type="text" placeholder="Enter type" className="w-full bg-transparent text-[13px] outline-none" />
                      </td>
                      <td className="px-6 py-4">
                        <input type="text" placeholder="Enter name" className="w-full bg-transparent text-[13px] outline-none" />
                      </td>
                      <td className="px-6 py-4">
                        <input type="text" placeholder="0" className="w-full bg-transparent text-[13px] outline-none text-center" />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button 
                          onClick={() => removeInspectionRow(idx)}
                          className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 transition-all"
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button 
                onClick={addInspectionRow}
                className="w-full py-4 bg-white border-t border-gray-100 text-[12px] font-bold text-indigo-600 hover:bg-indigo-50/30 transition-all flex items-center justify-center gap-2"
              >
                + Add Row
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (stepIdx === 5) {
    const taxExemptions = [
      "Homestead", "Senior Citizen", "Disabled", "Wildlife Management", 
      "Agricultural", "Disabled Veteran", "Unknown"
    ];

    const utilities = [
      { label: "Electric", icon: <Zap className="w-4 h-4" /> },
      { label: "Sewer", icon: <Droplets className="w-4 h-4" /> },
      { label: "Water", icon: <Droplets className="w-4 h-4" /> },
      { label: "Cable", icon: <FileText className="w-4 h-4" /> },
      { label: "Trash", icon: <Wrench className="w-4 h-4" /> },
      { label: "Natural Gas", icon: <Zap className="w-4 h-4" /> },
      { label: "Phone Company", icon: <FileText className="w-4 h-4" /> },
      { label: "Propane", icon: <Droplets className="w-4 h-4" /> },
      { label: "Internet", icon: <FileText className="w-4 h-4" /> }
    ];

    return (
      <div className="space-y-12 pb-10">
        <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
          <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-[16px] font-bold text-gray-900 uppercase tracking-tight">Exemptions, Insurance & Utilities</h3>
            <p className="text-[12px] text-gray-500 italic">Disclosures regarding tax exemptions, insurance claims, and service providers.</p>
          </div>
        </div>

        {/* Section 10: Tax Exemptions */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-[12px] font-bold border border-indigo-100">10</span>
            <label className="text-[14px] font-bold text-gray-900 leading-tight">Check any tax exemption(s) which you (Seller) currently claim for the Property:</label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-6 bg-gray-50 rounded-2xl border border-gray-100">
            {taxExemptions.map(item => (
              <CheckboxItem key={item} label={item} />
            ))}
            <div className="md:col-span-2 lg:col-span-3 pt-2">
              <Question label="Other (please specify)" type="text" placeholder="Enter other exemption" />
            </div>
          </div>
        </div>

        {/* Section 11 & 12: Insurance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-3xl border-2 border-gray-100 space-y-4 hover:border-indigo-100 transition-colors">
            <div className="flex items-start gap-4">
              <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-[12px] font-bold border border-indigo-100 shrink-0">11</span>
              <h4 className="text-[14px] font-bold text-gray-900 leading-tight">Have you ever filed a claim for damage, other than flood, to the Property?</h4>
            </div>
            <div className="flex gap-2 p-1 bg-gray-100 rounded-xl border border-gray-200 w-fit ml-12">
              {['Yes', 'No'].map(opt => (
                <label key={opt} className="cursor-pointer">
                  <input type="radio" name="ins-claim-gen" className="sr-only peer" />
                  <div className="px-8 py-2 rounded-lg text-[12px] font-bold text-gray-400 peer-checked:bg-white peer-checked:text-indigo-600 peer-checked:shadow-sm transition-all uppercase">
                    {opt}
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="p-6 bg-white rounded-3xl border-2 border-gray-100 space-y-4 hover:border-indigo-100 transition-colors">
            <div className="flex items-start gap-4">
              <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-[12px] font-bold border border-indigo-100 shrink-0">12</span>
              <h4 className="text-[14px] font-bold text-gray-900 leading-tight">Ever received claim proceeds and NOT used them to make the repairs?</h4>
            </div>
            <div className="flex gap-2 p-1 bg-gray-100 rounded-xl border border-gray-200 w-fit ml-12">
              {['Yes', 'No'].map(opt => (
                <label key={opt} className="cursor-pointer">
                  <input type="radio" name="unused-proceeds" className="sr-only peer" />
                  <div className="px-8 py-2 rounded-lg text-[12px] font-bold text-gray-400 peer-checked:bg-white peer-checked:text-indigo-600 peer-checked:shadow-sm transition-all uppercase">
                    {opt}
                  </div>
                </label>
              ))}
            </div>
            <textarea 
              placeholder="If yes, explain..."
              className="w-full h-24 px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl text-[13px] focus:bg-white focus:border-indigo-500/30 outline-none transition-all resize-none ml-0"
            />
          </div>
        </div>

        {/* Section 13: Smoke Detectors */}
        <div className="p-5 md:p-8 bg-indigo-900 rounded-3xl text-white space-y-6 shadow-xl shadow-indigo-900/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 hidden md:block">
            <AlertTriangle className="w-32 h-32" />
          </div>
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 md:gap-8">
            <div className="flex items-center gap-4">
              <span className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center text-[14px] font-bold border border-white/20 shrink-0">13</span>
              <div>
                <h4 className="text-[15px] md:text-[16px] font-bold leading-tight">Property has working smoke detectors installed?</h4>
                <p className="text-[11px] md:text-[12px] text-indigo-200 mt-1">In accordance with Chapter 766 of the Health and Safety Code</p>
              </div>
            </div>
            <div className="flex gap-1.5 p-1 bg-white/5 rounded-2xl border border-white/10 w-full sm:w-fit shrink-0 backdrop-blur-sm">
              {['Yes', 'No', 'Unknown'].map(opt => (
                <label key={opt} className="flex-1 sm:flex-none cursor-pointer">
                  <input type="radio" name="smoke-detectors" className="sr-only peer" />
                  <div className="px-3 md:px-8 py-2 md:py-3 rounded-xl text-[11px] md:text-[12px] font-black text-indigo-300 peer-checked:bg-white peer-checked:text-indigo-900 peer-checked:shadow-lg transition-all uppercase tracking-wide text-center">
                    {opt === 'Unknown' ? 'U' : opt}
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Section 14: Utility Providers */}
        <div className="space-y-8">
          <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center text-[14px] font-bold border border-indigo-100">14</div>
            <div>
              <h3 className="text-[16px] font-bold text-gray-900 uppercase tracking-tight">Utility Providers</h3>
              <p className="text-[12px] text-gray-500">Service providers currently providing service to the property.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {utilities.map(util => (
              <div key={util.label} className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 text-gray-400 flex items-center justify-center transition-colors group-hover:bg-indigo-50 group-hover:text-indigo-600">
                    {util.icon}
                  </div>
                  <span className="text-[14px] font-bold text-gray-900">{util.label}</span>
                </div>
                <div className="space-y-3">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Provider Name"
                      className="w-full px-4 py-2 bg-gray-50 border border-transparent rounded-xl text-[13px] focus:bg-white focus:border-indigo-500/30 outline-none transition-all"
                    />
                  </div>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Phone #"
                      className="w-full px-4 py-2 bg-gray-50 border border-transparent rounded-xl text-[13px] focus:bg-white focus:border-indigo-500/30 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (stepIdx === 6) {
    return (
      <div className="space-y-12 pb-10">
        <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-[16px] font-bold text-gray-900 uppercase tracking-tight">Signatures & Acknowledgments</h3>
            <p className="text-[12px] text-gray-500 italic">Final step: Authenticate and acknowledge the disclosure.</p>
          </div>
        </div>

        {/* Seller Area */}
        <div className="space-y-8">
          <div className="p-6 bg-indigo-50/50 rounded-2xl border border-indigo-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-600 rounded-lg text-white">
                <Info className="w-4 h-4" />
              </div>
              <h4 className="text-[15px] font-bold text-indigo-900">Seller Acknowledgment</h4>
            </div>
            <p className="text-[13px] text-indigo-800 leading-relaxed font-medium">
              Seller acknowledges that the statements in this notice are true to the best of Seller’s belief and that no person, including the broker(s), has instructed or influenced Seller to provide inaccurate information or to omit any material information.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SignatureBlock title="Seller 1 Signature" description="Please provide your signature and details below." />
            <SignatureBlock title="Seller 2 Signature" description="Please provide your signature and details below." />
          </div>
        </div>

        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-100"></span>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-[#FAFAFA] px-4 text-gray-300">
              <Building2 className="w-5 h-5" />
            </span>
          </div>
        </div>

        {/* Buyer Area */}
        <div className="space-y-8">
          <div className="p-6 bg-emerald-50/50 rounded-2xl border border-emerald-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-emerald-600 rounded-lg text-white">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h4 className="text-[15px] font-bold text-emerald-900">Buyer Acknowledgment</h4>
            </div>
            <p className="text-[13px] text-emerald-800 leading-relaxed font-medium">
              This Seller's Disclosure Notice was completed by Seller as of the date signed. The brokers have relied on this notice as true and correct and have no reason to believe it to be false or inaccurate. <span className="text-emerald-950 font-bold uppercase underline">YOU ARE ENCOURAGED TO HAVE AN INSPECTOR OF YOUR CHOICE INSPECT THE PROPERTY.</span>
            </p>
            <p className="text-[12px] text-emerald-700 mt-4 italic">The undersigned Buyer acknowledges receipt of the foregoing notice.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SignatureBlock title="Buyer 1 Signature" description="Please provide your signature and details below." />
            <SignatureBlock title="Buyer 2 Signature" description="Please provide your signature and details below." />
          </div>
        </div>

        {/* Final Submission Card */}
        <div className="p-6 md:p-12 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-3xl text-white text-center shadow-2xl shadow-indigo-200 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
          
          <div className="relative z-10 max-w-lg mx-auto">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-md border border-white/20">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl md:text-2xl font-black mb-3">Ready to Finalize?</h3>
            <p className="text-indigo-100 text-[14px] md:text-[15px] font-medium mb-8 leading-relaxed">
              All sections have been completed. Once submitted, this disclosure will be legally binding and sent for verification.
            </p>
            <button className="w-full sm:w-auto px-12 py-4 bg-white text-indigo-600 rounded-2xl text-[15px] font-black hover:bg-gray-50 transition-all shadow-xl active:scale-95 uppercase tracking-widest">
              Submit Disclosure
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 py-8 text-center">
      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
        <FileText className="w-8 h-8 text-gray-300" />
      </div>
      <h3 className="text-gray-900 font-medium font-semibold">Form Content Placeholder</h3>
      <p className="text-gray-500 text-[13px] max-w-sm mx-auto">
        This section will contain specific disclosure questions relevant to {STEPS[stepIdx].title}.
      </p>
    </div>
  );
}

