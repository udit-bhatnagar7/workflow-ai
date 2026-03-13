import React, { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
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
  PanelLeftOpen,
  Download,
  Printer
} from 'lucide-react';

// --- Shared Components ---

function Question({
  label,
  description,
  type = 'radio',
  options = ['Yes', 'No'],
  placeholder,
  value,
  onChange
}: any) {
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
              <input
                type="radio"
                name={label}
                className="sr-only peer"
                checked={value === opt}
                onChange={() => onChange?.(opt)}
              />
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
          value={value || ''}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition-all"
        />
      )}

      {type === 'select' && (
        <select
          className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition-all appearance-none"
          value={value || ''}
          onChange={(e) => onChange?.(e.target.value)}
        >
          <option value="" disabled>{placeholder || 'Select an option'}</option>
          {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      )}
    </div>
  );
}

function CheckboxItem({ label, checked, onChange, ...props }: { label: string; checked?: boolean; onChange?: (val: boolean) => void;[key: string]: any }) {
  return (
    <label className="relative flex items-start justify-start p-3 rounded-xl border-2 border-gray-100 bg-white cursor-pointer transition-all hover:border-indigo-200 hover:shadow-sm focus-within:ring-2 focus-within:ring-indigo-500/20 active:scale-95 group">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        {...props}
      />
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

function SignatureBlock({ title, description, signature, onSignatureChange, name, onNameChange, date, onDateChange }: any) {
  return (
    <div className="p-4 md:p-6 bg-white rounded-2xl border border-gray-100 hover:border-indigo-100 transition-all group">
      <h4 className="text-[14px] font-bold text-gray-900 mb-1">{title}</h4>
      <p className="text-[12px] text-gray-500 mb-4 md:mb-6">{description}</p>

      <div className="space-y-4">
        <Question
          label="Printed Name"
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={onNameChange}
        />
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Date</label>
            <input
              type="text"
              value={date || ''}
              onChange={(e) => onDateChange?.(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border-2 border-transparent rounded-xl text-[13px] outline-none focus:bg-white focus:border-indigo-500/20 transition-all font-medium"
            />
          </div>
        </div>

        <div>
          <label className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Signature</label>
          <div
            onClick={() => onSignatureChange?.(name || 'Signature')}
            className={`h-24 rounded-2xl border-2 border-dashed flex items-center justify-center cursor-pointer transition-all ${signature
              ? 'bg-indigo-50 border-indigo-200'
              : 'bg-gray-50 border-gray-200 hover:border-indigo-300 hover:bg-white'
              }`}
          >
            {signature ? (
              <div className="text-center">
                <span className="font-['Dancing_Script',_cursive] text-2xl text-indigo-600 block">{signature}</span>
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
            onClick={(e) => { e.stopPropagation(); onSignatureChange?.(name || 'Signature'); }}
            className="mt-3 w-full py-2 bg-indigo-50 text-indigo-600 text-[11px] font-bold rounded-lg border border-indigo-100 hover:bg-indigo-600 hover:text-white transition-all uppercase tracking-wide"
          >
            Mock Generate Signature
          </button>
        </div>
      </div>
    </div>
  );
}

function ItemRow({
  label,
  value,
  onChange,
  renderIfYes,
  ...props
}: {
  label: string;
  value?: string | null;
  onChange?: (val: string) => void;
  renderIfYes?: React.ReactNode;
  [key: string]: any
}) {
  return (
    <div className={`flex flex-col py-2 md:py-3 border-b border-gray-50 group hover:bg-gray-50/50 px-2 rounded-xl transition-all ${value === 'Y' && renderIfYes ? 'bg-indigo-50/10' : ''}`} {...props}>
      <div className="flex items-center justify-between">
        <span className="text-[12px] md:text-[13px] text-gray-700 font-semibold pr-4 leading-snug">{label}</span>
        <div className="flex gap-1 bg-gray-100/50 p-0.5 rounded-lg border border-gray-200 shrink-0 ml-auto">
          {['Y', 'N', 'U'].map((opt) => (
            <label key={opt} className="cursor-pointer">
              <input
                type="radio"
                name={label}
                className="sr-only peer"
                checked={value === opt}
                onChange={() => onChange?.(opt)}
              />
              <div className="w-12 h-8 flex items-center justify-center text-[11px] font-black text-gray-400 peer-checked:bg-white peer-checked:text-indigo-600 peer-checked:shadow-[0_2px_4px_rgba(0,0,0,0.05)] rounded-md transition-all active:scale-90">
                {opt}
              </div>
            </label>
          ))}
        </div>
      </div>
      {value === 'Y' && renderIfYes && (
        <div className="mt-4 pt-3 border-t border-indigo-100/60 pb-1">
          {renderIfYes}
        </div>
      )}
    </div>
  );
}

function ApproxDateSection({
  approximateChecked,
  onApproximateChange,
  approximateDate,
  onDateChange,
  neverOccupiedChecked,
  onNeverOccupiedChange
}: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-3 pb-3">
        <label className="flex items-center gap-3 cursor-pointer group w-fit">
          <input
            type="checkbox"
            checked={approximateChecked}
            onChange={(e) => onApproximateChange(e.target.checked)}
            className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 transition-all"
          />
          <span className="text-[13px] text-gray-700 font-medium group-hover:text-indigo-600 transition-colors">Approximate Date</span>
        </label>
        {approximateChecked && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="pt-1">
            <input
              type="text"
              placeholder="MM/DD/YYYY"
              value={approximateDate}
              onChange={(e) => onDateChange(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-indigo-200 rounded-lg text-[13px] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition-all shadow-sm"
            />
          </motion.div>
        )}
      </div>
      <div className="flex items-start pt-1 pb-3">
        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={neverOccupiedChecked}
            onChange={(e) => onNeverOccupiedChange(e.target.checked)}
            className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 transition-all"
          />
          <span className="text-[13px] text-gray-700 font-medium group-hover:text-indigo-600 transition-colors">Never Occupied</span>
        </label>
      </div>
    </div>
  );
}

function OptionsWithOther({
  label,
  options,
  placeholder,
  value,
  onChange,
  otherValue,
  onOtherChange
}: {
  label: string,
  options: string[],
  placeholder: string,
  value?: string | null,
  onChange?: (val: string) => void,
  otherValue?: string,
  onOtherChange?: (val: string) => void
}) {
  return (
    <div className="space-y-3">
      <label className="text-[14px] font-semibold text-gray-900 block">{label}</label>
      <div className="grid grid-cols-2 sm:flex gap-3 md:gap-4 flex-wrap">
        {options.map((opt) => (
          <label key={opt} className="flex-1 group cursor-pointer min-w-[100px]">
            <input
              type="radio"
              name={label}
              className="sr-only peer"
              checked={value === opt}
              onChange={() => onChange?.(opt)}
            />
            <div className="px-4 py-3 bg-white border-2 border-gray-100 rounded-xl text-[12px] md:text-[13px] text-gray-500 font-bold text-center peer-checked:border-indigo-600 peer-checked:bg-indigo-50 peer-checked:text-indigo-700 hover:border-gray-200 transition-all shadow-sm active:scale-95">
              {opt}
            </div>
          </label>
        ))}
      </div>
      {value?.toLowerCase() === 'other' && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="pt-1">
          <input
            type="text"
            placeholder={placeholder}
            value={otherValue || ''}
            onChange={(e) => onOtherChange?.(e.target.value)}
            className="w-full px-4 py-2.5 bg-white border border-indigo-200 rounded-lg text-[13px] outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all shadow-sm"
          />
        </motion.div>
      )}
    </div>
  );
}

function OptionsWithReveal({
  label,
  options,
  revealOn,
  revealPlaceholder,
  value,
  onChange,
  revealValue,
  onRevealChange
}: {
  label: string,
  options: string[],
  revealOn: string,
  revealPlaceholder: string,
  value?: string | null,
  onChange?: (val: string) => void,
  revealValue?: string,
  onRevealChange?: (val: string) => void
}) {
  return (
    <div className="space-y-3">
      <label className="text-[14px] font-semibold text-gray-900 block">{label}</label>
      <div className="grid grid-cols-2 sm:flex gap-3 md:gap-4 flex-wrap">
        {options.map((opt) => (
          <label key={opt} className="flex-1 group cursor-pointer min-w-[100px]">
            <input
              type="radio"
              name={label}
              className="sr-only peer"
              checked={value === opt}
              onChange={() => onChange?.(opt)}
            />
            <div className="px-4 py-3 bg-white border-2 border-gray-100 rounded-xl text-[12px] md:text-[13px] text-gray-500 font-bold text-center peer-checked:border-indigo-600 peer-checked:bg-indigo-50 peer-checked:text-indigo-700 hover:border-gray-200 transition-all shadow-sm active:scale-95">
              {opt}
            </div>
          </label>
        ))}
      </div>
      {value?.toLowerCase() === revealOn.toLowerCase() && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="pt-1 space-y-2 relative">
          <div className="absolute -left-2 top-0 bottom-0 w-1 bg-indigo-100 rounded-full" />
          <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider block ml-2">Leased From</span>
          <input
            type="text"
            placeholder={revealPlaceholder}
            value={revealValue || ''}
            onChange={(e) => onRevealChange?.(e.target.value)}
            className="w-full px-4 py-2.5 bg-white border border-indigo-200 rounded-lg text-[13px] outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all shadow-sm"
          />
        </motion.div>
      )}
    </div>
  );
}

function ComplexItemRow({
  label,
  value,
  onChange,
  renderIfYes,
  ...props
}: {
  label: string;
  value?: string | null;
  onChange?: (val: string) => void;
  renderIfYes?: React.ReactNode;
  [key: string]: any
}) {
  return (
    <div className={`p-4 md:p-6 rounded-2xl border-2 transition-all ${value === 'Y' ? 'bg-indigo-50/30 border-indigo-100 shadow-sm' : 'bg-white border-gray-100'}`} {...props}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <span className="text-[13px] md:text-[14px] text-gray-800 font-bold leading-snug">{label}</span>
        <div className="flex gap-1 bg-gray-100/50 p-0.5 rounded-lg border border-gray-200 shrink-0">
          {['Y', 'N', 'U'].map((opt) => (
            <label key={opt} className="cursor-pointer">
              <input
                type="radio"
                name={label}
                className="sr-only peer"
                checked={value === opt}
                onChange={() => onChange?.(opt)}
              />
              <div className="w-14 h-9 flex items-center justify-center text-[11px] font-black text-gray-400 peer-checked:bg-white peer-checked:text-indigo-600 peer-checked:shadow-md rounded-md transition-all active:scale-90">
                {opt}
              </div>
            </label>
          ))}
        </div>
      </div>
      {value === 'Y' && renderIfYes && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 pt-6 border-t border-indigo-100/60">
          {renderIfYes}
        </motion.div>
      )}
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

function FloodComplexRow({
  item,
  value,
  onChange,
  coverageValue,
  onCoverageChange,
  ...props
}: {
  item: any;
  value?: string | null;
  onChange?: (val: string) => void;
  coverageValue?: string | null;
  onCoverageChange?: (val: string) => void;
  [key: string]: any
}) {
  return (
    <div className="py-4 border-b border-blue-100/50 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[13px] text-gray-700 font-bold">{item.label}</span>
          {item.desc && <p className="text-[11px] text-gray-500 leading-tight">{item.desc}</p>}
        </div>
        <div className="flex gap-1 bg-white p-0.5 rounded-lg border border-blue-200 shrink-0">
          {['Yes', 'No', 'U'].map((opt) => (
            <label key={opt} className="cursor-pointer">
              <input
                type="radio"
                name={item.label}
                className="sr-only peer"
                checked={value === opt}
                onChange={() => onChange?.(opt)}
              />
              <div className="w-10 h-8 flex items-center justify-center text-[10px] font-bold text-gray-400 peer-checked:bg-blue-600 peer-checked:text-white rounded-md transition-all">
                {opt}
              </div>
            </label>
          ))}
        </div>
      </div>

      {value === 'Yes' && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="flex items-center gap-4 pl-4 border-l-2 border-blue-200 pt-2">
          <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">Coverage Filter:</span>
          <div className="flex gap-2">
            {['wholly', 'partly'].map(opt => (
              <label key={opt} className="cursor-pointer">
                <input
                  type="radio"
                  name={`${item.label}-coverage`}
                  className="sr-only peer"
                  checked={coverageValue === opt}
                  onChange={() => onCoverageChange?.(opt)}
                />
                <div className="px-3 py-1 bg-white border border-blue-200 rounded-md text-[10px] font-bold text-gray-400 peer-checked:bg-blue-100 peer-checked:text-blue-700 peer-checked:border-blue-500 transition-all uppercase">
                  {opt}
                </div>
              </label>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

function Section8Item({
  item,
  idx,
  value,
  onChange,
  formData,
  handleInputChange,
  ...props
}: {
  item: string,
  idx: number,
  value?: string | null,
  onChange?: (val: string) => void,
  formData: any,
  handleInputChange: (field: string, val: any) => void,
  [key: string]: any
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 py-4 border-b border-gray-50">
        <span className="text-[14px] text-gray-700 font-medium leading-relaxed max-w-2xl">{item}</span>
        <div className="flex gap-1 bg-gray-100/50 p-0.5 rounded-lg border border-gray-200 shrink-0">
          {['Yes', 'No'].map((opt) => (
            <label key={opt} className="cursor-pointer">
              <input
                type="radio"
                name={`other-disclosure-${idx}`}
                className="sr-only peer"
                checked={value === opt}
                onChange={() => onChange?.(opt)}
              />
              <div className="w-12 h-8 flex items-center justify-center text-[11px] font-bold text-gray-400 peer-checked:bg-white peer-checked:text-indigo-600 peer-checked:shadow-sm rounded-md transition-all">
                {opt}
              </div>
            </label>
          ))}
        </div>
      </div>

      {value === 'Yes' && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
          {/* HOA Specific Fields */}
          {item === "Homeowners’ associations or maintenance fees or assessments." && (
            <div className="p-6 bg-indigo-50/50 rounded-2xl border border-indigo-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              <Question
                label="Name of association"
                type="text"
                placeholder="Enter name"
                value={formData['section8.items.homeownersAssociationFees.metadata.associationName']}
                onChange={(val: string) => handleInputChange('section8.items.homeownersAssociationFees.metadata.associationName', val)}
              />
              <Question
                label="Manager's name"
                type="text"
                placeholder="Enter manager"
                value={formData['section8.items.homeownersAssociationFees.metadata.managerName']}
                onChange={(val: string) => handleInputChange('section8.items.homeownersAssociationFees.metadata.managerName', val)}
              />
              <Question
                label="Phone"
                type="text"
                placeholder="Enter phone"
                value={formData['section8.items.homeownersAssociationFees.metadata.managerPhone']}
                onChange={(val: string) => handleInputChange('section8.items.homeownersAssociationFees.metadata.managerPhone', val)}
              />

              <div className="space-y-3">
                <label className="text-[14px] font-semibold text-gray-900 block">Fees or assessments are:</label>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 font-bold">$</span>
                  <input
                    type="text"
                    placeholder="Amt"
                    className="w-20 px-3 py-2 border border-gray-200 rounded-lg text-sm"
                    value={formData['section8.items.homeownersAssociationFees.metadata.feeAmount']}
                    onChange={(e) => handleInputChange('section8.items.homeownersAssociationFees.metadata.feeAmount', e.target.value)}
                  />
                  <span className="text-gray-400 text-sm">per</span>
                  <select
                    className="px-2 py-2 border border-gray-200 rounded-lg text-sm bg-white outline-none"
                    value={formData['section8.items.homeownersAssociationFees.metadata.feeFrequency']}
                    onChange={(e) => handleInputChange('section8.items.homeownersAssociationFees.metadata.feeFrequency', e.target.value)}
                  >
                    <option value="month">month</option>
                    <option value="quarter">quarter</option>
                    <option value="year">year</option>
                    <option value="other">other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[14px] font-semibold text-gray-900 block">Unpaid Fees?</label>
                <div className="flex gap-2">
                  {['yes', 'no'].map(opt => (
                    <label key={opt} className="cursor-pointer flex-1">
                      <input
                        type="radio"
                        name="hoa-unpaid"
                        className="sr-only peer"
                        checked={(opt === 'yes' && formData['section8.items.homeownersAssociationFees.metadata.unpaidFees.hasUnpaid.yes']) || (opt === 'no' && formData['section8.items.homeownersAssociationFees.metadata.unpaidFees.hasUnpaid.no'])}
                        onChange={() => {
                          handleInputChange('section8.items.homeownersAssociationFees.metadata.unpaidFees.hasUnpaid.yes', opt === 'yes');
                          handleInputChange('section8.items.homeownersAssociationFees.metadata.unpaidFees.hasUnpaid.no', opt === 'no');
                        }}
                      />
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
                    <input
                      type="radio"
                      name="common-area-fees"
                      className="sr-only peer"
                      checked={(opt === 'yes' && formData['section8.items.commonAreaCoOwned.metadata.optionalFeesCharged.yes']) || (opt === 'no' && formData['section8.items.commonAreaCoOwned.metadata.optionalFeesCharged.no'])}
                      onChange={() => {
                        handleInputChange('section8.items.commonAreaCoOwned.metadata.optionalFeesCharged.yes', opt === 'yes');
                        handleInputChange('section8.items.commonAreaCoOwned.metadata.optionalFeesCharged.no', opt === 'no');
                      }}
                    />
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
              <p className="text-[12px] text-orange-700 font-medium italic">If yes, attach any certificates or other documentation identifying the extent of the remediation (for example, certificate of mold remediation or other remediation).</p>
              <textarea
                placeholder="Provide remediation details here..."
                value={formData['section8.explanation']}
                onChange={(e) => handleInputChange('section8.explanation', e.target.value)}
                className="w-full h-24 px-4 py-3 bg-white border-2 border-orange-100 rounded-xl text-[14px] focus:border-orange-300 outline-none transition-all resize-none shadow-sm"
              />
            </div>
          )}

          {/* Groundwater Conservation District Specific Field */}
          {item === "Any portion of the Property that is located in a groundwater conservation district or a subsidence district." && (
            <div className="p-6 bg-blue-50/30 rounded-2xl border-blue-100 space-y-4 mt-4">
              <label className="text-[14px] font-bold text-gray-900 block border-l-4 border-blue-600 pl-4">
                If the answer to any of the items in Section 8 is yes, explain (attach additional sheets if necessary):
              </label>
              <textarea
                placeholder="Provide explanation or additional details here..."
                value={formData['section8.explanation']}
                onChange={(e) => handleInputChange('section8.explanation', e.target.value)}
                className="w-full h-32 px-4 py-3 bg-white border-2 border-blue-100 rounded-2xl text-[14px] text-gray-900 focus:border-blue-500/30 outline-none transition-all placeholder:text-gray-300 resize-none shadow-sm"
              />
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}

function ExemptionOther({ value, onChange, otherValue, onOtherChange }: any) {
  return (
    <div className="col-span-1 md:col-span-2 lg:col-span-4 space-y-3 pt-2">
      <label className="relative flex items-start justify-start p-3 rounded-xl border-2 border-gray-100 bg-white cursor-pointer transition-all hover:border-indigo-200 hover:shadow-sm focus-within:ring-2 focus-within:ring-indigo-500/20 active:scale-95 group w-full md:w-1/2 lg:w-[calc(25%-9px)]">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className="absolute inset-0 rounded-xl border-2 border-transparent peer-checked:border-indigo-600 pointer-events-none transition-colors" />
        <div className="absolute inset-0 rounded-xl bg-indigo-50/0 peer-checked:bg-indigo-50/50 pointer-events-none transition-colors" />
        <span className="text-[13px] font-bold text-gray-500 peer-checked:text-indigo-700 transition-colors z-10 w-full">Other (please specify)</span>
        <div className="w-5 h-5 absolute right-3 top-3 rounded-full border-2 border-gray-200 peer-checked:border-indigo-600 peer-checked:bg-indigo-600 flex items-center justify-center transition-all opacity-0 peer-checked:opacity-100">
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </label>
      {value && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
          <input
            type="text"
            placeholder="Explain other exemption..."
            value={otherValue || ''}
            onChange={(e) => onOtherChange(e.target.value)}
            className="w-full px-4 py-3 bg-white border-2 border-gray-100 rounded-xl text-[14px] focus:border-indigo-300 outline-none transition-all shadow-sm"
          />
        </motion.div>
      )}
    </div>
  );
}

function Section12Card({ value, onChange, explanation, onExplanationChange }: any) {
  return (
    <div className="p-6 bg-white rounded-3xl border-2 border-gray-100 space-y-4 hover:border-indigo-100 transition-colors">
      <div className="flex items-start gap-4">
        <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-[12px] font-bold border border-indigo-100 shrink-0">12</span>
        <h4 className="text-[14px] font-bold text-gray-900 leading-tight">12. Have you (Seller) ever received proceeds for a claim for damage to the Property (for example, an insurance claim or a settlement or award in a legal proceeding) and not used the proceeds to make the repairs for which the claim was made?</h4>
      </div>
      <div className="flex gap-2 p-1 bg-gray-100 rounded-xl border border-gray-200 w-fit ml-12">
        {['Yes', 'No'].map(opt => (
          <label key={opt} className="cursor-pointer">
            <input
              type="radio"
              name="unused-proceeds"
              className="sr-only peer"
              checked={value === opt}
              onChange={() => onChange(opt)}
            />
            <div className="w-[80px] py-2.5 rounded-lg text-[12px] font-bold text-gray-400 peer-checked:bg-white peer-checked:text-indigo-600 peer-checked:shadow-sm transition-all uppercase text-center">
              {opt}
            </div>
          </label>
        ))}
      </div>
      {value === 'Yes' && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="ml-12 pt-2 space-y-2">
          <label className="text-[12px] font-bold text-gray-400 uppercase tracking-wider block">If yes, explain:</label>
          <textarea
            placeholder="Provide explanation..."
            value={explanation || ''}
            onChange={(e) => onExplanationChange(e.target.value)}
            className="w-full h-24 px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl text-[13px] focus:bg-white focus:border-indigo-500/30 outline-none transition-all resize-none"
          />
        </motion.div>
      )}
    </div>
  )
}

function Section13Card({ value, onChange, explanation, onExplanationChange }: any) {
  return (
    <div className="p-5 md:p-8 bg-indigo-900 rounded-3xl text-white shadow-xl shadow-indigo-900/20 relative overflow-hidden mt-6">
      <div className="absolute top-0 right-0 p-8 opacity-10 hidden md:block z-0">
        <AlertTriangle className="w-32 h-32" />
      </div>
      <div className="relative z-10 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 md:gap-8">
          <div className="flex items-start gap-4">
            <span className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center text-[14px] font-bold border border-white/20 shrink-0">13</span>
            <div>
              <h4 className="text-[15px] md:text-[16px] font-bold leading-tight max-w-2xl">13. Does the Property have working smoke detectors installed in accordance with the smoke detector requirements of Chapter 766 of the Health and Safety Code?</h4>
            </div>
          </div>
          <div className="flex gap-1.5 p-1 bg-white/5 rounded-2xl border border-white/10 w-full sm:w-fit shrink-0 backdrop-blur-sm">
            {['Yes', 'No', 'Unknown'].map(opt => (
              <label key={opt} className="flex-1 sm:flex-none cursor-pointer">
                <input
                  type="radio"
                  name="smoke-detectors"
                  className="sr-only peer"
                  checked={value === (opt === 'Unknown' ? 'Unknown' : opt)}
                  onChange={() => onChange(opt === 'Unknown' ? 'Unknown' : opt)}
                />
                <div className="w-[60px] md:w-[70px] py-2 md:py-3 rounded-xl text-[11px] md:text-[12px] font-black text-indigo-300 peer-checked:bg-white peer-checked:text-indigo-900 peer-checked:shadow-lg transition-all uppercase tracking-wide text-center">
                  {opt === 'Unknown' ? 'U' : opt}
                </div>
              </label>
            ))}
          </div>
        </div>
        {(value === 'No' || value === 'Unknown') && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="md:pl-14">
            <label className="text-[12px] font-bold text-indigo-200 uppercase tracking-wider block mb-2">If no or unknown, explain. (Attach additional sheets if necessary):</label>
            <textarea
              placeholder="Provide explanation..."
              value={explanation || ''}
              onChange={(e) => onExplanationChange(e.target.value)}
              className="w-full h-24 px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-[13px] text-white placeholder:text-indigo-300/50 focus:bg-white/20 outline-none transition-all resize-none backdrop-blur-md"
            />
          </motion.div>
        )}
      </div>
    </div>
  )
}

function WaterSupplySection({ formData, handleInputChange }: any) {
  const waterSupplyOptions = ['City', 'Well', 'MUD', 'Co-op', 'Unknown', 'Other'];

  return (
    <div className="bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-200 p-6 space-y-4">
      <label className="text-[14px] font-bold text-gray-900 flex items-center gap-2">
        <Droplets className="w-4 h-4 text-blue-500" />
        Water supply provided by:
      </label>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
        {waterSupplyOptions.map(opt => (
          <label key={opt} className="cursor-pointer">
            <input
              type="checkbox"
              name="water-supply-source"
              className="sr-only peer"
              checked={formData[`section1.waterSupplyProvidedBy.${opt.toLowerCase().replace('co-op', 'co-op')}`]}
              onChange={(e) => handleInputChange(`section1.waterSupplyProvidedBy.${opt.toLowerCase().replace('co-op', 'co-op')}`, e.target.checked)}
            />
            <div className="px-3 py-3 bg-white border-2 border-gray-100 rounded-xl text-[12px] text-gray-600 font-bold text-center peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 transition-all hover:border-gray-200 shadow-sm active:scale-95">
              {opt}
            </div>
          </label>
        ))}
      </div>
      {formData['section1.waterSupplyProvidedBy.other'] && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="pt-2">
          <label className="text-[12px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Other Water Supply</label>
          <input
            type="text"
            placeholder="Please specify..."
            value={formData['section1.waterSupplyOther']}
            onChange={(e) => handleInputChange('section1.waterSupplyOther', e.target.value)}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-[13px] shadow-sm"
          />
        </motion.div>
      )}
    </div>
  );
}

function Section1Awareness({ value, onChange, explanation, onExplanationChange }: any) {
  return (
    <div className="p-8 bg-amber-50 rounded-3xl border-2 border-amber-100 flex flex-col items-start gap-6">
      <div className="flex flex-col md:flex-row gap-6 items-start w-full">
        <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center shrink-0">
          <AlertTriangle className="w-7 h-7 text-amber-600" />
        </div>
        <div className="flex-1 space-y-4 w-full">
          <div>
            <h4 className="text-[15px] font-bold text-gray-900">Section 1 Awareness Statement</h4>
            <p className="text-[13px] text-gray-600 mt-1">Are you (Seller) aware of any of the items listed in this Section 1 that are not in working condition, that have defects, or are need of repair?</p>
          </div>
          <div className="flex gap-3">
            {['Yes', 'No'].map((opt) => (
              <label key={opt} className="cursor-pointer group flex-1 md:flex-none">
                <input
                  type="radio"
                  name="section1-awareness"
                  className="sr-only peer"
                  checked={value === opt}
                  onChange={() => onChange(opt)}
                />
                <div className="w-[100px] py-3 bg-white border border-gray-200 rounded-xl text-[14px] font-bold text-gray-400 group-hover:border-amber-400 peer-checked:bg-amber-600 peer-checked:text-white peer-checked:border-amber-600 transition-all text-center shadow-sm">
                  {opt}
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
      {value === 'Yes' && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="w-full md:pl-20 mt-2">
          <label className="text-[12px] font-bold text-amber-700 uppercase tracking-widest block mb-2">If yes, describe (attach additional sheets if necessary):</label>
          <textarea
            placeholder="Include explanation..."
            value={explanation || ''}
            onChange={(e) => onExplanationChange(e.target.value)}
            className="w-full h-24 px-4 py-3 bg-white border-2 border-amber-100 rounded-2xl outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-500/10 transition-all resize-none text-[13px] shadow-sm"
          />
        </motion.div>
      )}
    </div>
  );
}

export function SellerDisclosure() {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentSubstep, setCurrentSubstep] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showPdf, setShowPdf] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = async () => {
    if (!pdfRef.current) return;
    try {
      const canvas = await html2canvas(pdfRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`SellerDisclosure_${formData['meta.propertyAddress']?.replace(/\s+/g, '_') || 'Notice'}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const [formData, setFormData] = useState<any>({
    'meta.propertyAddress': '',
    'sellerOccupancy.status.occupying': false,
    'sellerOccupancy.status.notOccupying': false,
    'sellerOccupancy.unoccupiedDetails.type.approximateDate': false,
    'sellerOccupancy.unoccupiedDetails.type.never': false,
    'sellerOccupancy.unoccupiedDetails.approximateDate': '',
    'section1.items.cableTvWiring': null,
    'section1.items.carbonMonoxideDetector': null,
    'section1.items.ceilingFans': null,
    'section1.items.cooktop': null,
    'section1.items.dishwasher': null,
    'section1.items.disposal': null,
    'section1.items.emergencyEscapeLadders': null,
    'section1.items.exhaustFans': null,
    'section1.items.fences': null,
    'section1.items.fireDetectionEquipment': null,
    'section1.items.frenchDrain': null,
    'section1.items.gasFixtures': null,
    'section1.items.liquidPropaneGasCommunity': null,
    'section1.items.liquidPropaneGasOnProperty': null,
    'section1.items.naturalGasLines': null,
    'section1.items.fuelGasPipingBlackIron': null,
    'section1.items.fuelGasPipingCopper': null,
    'section1.items.fuelGasPipingCorrugatedStainlessSteel': null,
    'section1.items.fuelGasPipingSteelTubing': null,
    'section1.items.hotTub': null,
    'section1.items.intercomSystem': null,
    'section1.items.microwave': null,
    'section1.items.outdoorGrill': null,
    'section1.items.patioDecking': null,
    'section1.items.plumbingSystem': null,
    'section1.items.pool': null,
    'section1.items.poolEquipment': null,
    'section1.items.poolMaintenanceAccessories': null,
    'section1.items.poolHeater': null,
    'section1.items.pumpSump': null,
    'section1.items.pumpGrinder': null,
    'section1.items.rainGutters': null,
    'section1.items.rangeStove': null,
    'section1.items.roofAtticVents': null,
    'section1.items.sauna': null,
    'section1.items.smokeDetector': null,
    'section1.items.smokeDetectorHearingImpaired': null,
    'section1.items.spa': null,
    'section1.items.trashCompactor': null,
    'section1.items.tvAntenna': null,
    'section1.items.washerDryerHookup': null,
    'section1.items.windowScreens': null,
    'section1.items.publicSewerSystem': null,
    'section1.items.centralAc': null,
    'section1.items.centralAc.metadata.fuelTypes.electric': false,
    'section1.items.centralAc.metadata.fuelTypes.gas': false,
    'section1.items.centralAc.metadata.numberOfUnits': '',
    'section1.items.evaporativeCoolers': null,
    'section1.items.evaporativeCoolers.metadata.numberOfUnits': '',
    'section1.items.wallWindowAcUnits': null,
    'section1.items.wallWindowAcUnits.metadata.numberOfUnits': '',
    'section1.items.atticFans': null,
    'section1.items.atticFans.metadata.description': '',
    'section1.items.centralHeat': null,
    'section1.items.centralHeat.metadata.fuelTypes.electric': false,
    'section1.items.centralHeat.metadata.fuelTypes.gas': false,
    'section1.items.centralHeat.metadata.numberOfUnits': '',
    'section1.items.otherHeat': null,
    'section1.items.otherHeat.metadata.description': '',
    'section1.items.oven': null,
    'section1.items.oven.metadata.numberOfOvens': '',
    'section1.items.oven.metadata.fuelTypes.electric': false,
    'section1.items.oven.metadata.fuelTypes.gas': false,
    'section1.items.oven.metadata.fuelTypes.other': false,
    'section1.items.oven.metadata.otherDescription': '',
    'section1.items.fireplaceAndChimney': null,
    'section1.items.fireplaceAndChimney.metadata.types.wood': false,
    'section1.items.fireplaceAndChimney.metadata.types.gasLogs': false,
    'section1.items.fireplaceAndChimney.metadata.types.mock': false,
    'section1.items.fireplaceAndChimney.metadata.types.other': false,
    'section1.items.fireplaceAndChimney.metadata.otherDescription': '',
    'section1.items.carport': null,
    'section1.items.carport.metadata.type.attached': false,
    'section1.items.carport.metadata.type.notAttached': false,
    'section1.items.garage': null,
    'section1.items.garage.metadata.type.attached': false,
    'section1.items.garage.metadata.type.notAttached': false,
    'section1.items.garageDoorOpeners': null,
    'section1.items.garageDoorOpeners.metadata.numberOfUnits': '',
    'section1.items.garageDoorOpeners.metadata.numberOfRemotes': '',
    'section1.items.satelliteDishAndControls': null,
    'section1.items.satelliteDishAndControls.metadata.ownershipType.owned': false,
    'section1.items.satelliteDishAndControls.metadata.ownershipType.leased': false,
    'section1.items.satelliteDishAndControls.metadata.leasedFrom': '',
    'section1.items.securitySystem': null,
    'section1.items.securitySystem.metadata.ownershipType.owned': false,
    'section1.items.securitySystem.metadata.ownershipType.leased': false,
    'section1.items.securitySystem.metadata.leasedFrom': '',
    'section1.items.solarPanels': null,
    'section1.items.solarPanels.metadata.ownershipType.owned': false,
    'section1.items.solarPanels.metadata.ownershipType.leased': false,
    'section1.items.solarPanels.metadata.leasedFrom': '',
    'section1.items.waterHeater': null,
    'section1.items.waterHeater.metadata.fuelTypes.electric': false,
    'section1.items.waterHeater.metadata.fuelTypes.gas': false,
    'section1.items.waterHeater.metadata.fuelTypes.other': false,
    'section1.items.waterHeater.metadata.numberOfUnits': '',
    'section1.items.waterSoftener': null,
    'section1.items.waterSoftener.metadata.ownershipType.owned': false,
    'section1.items.waterSoftener.metadata.ownershipType.leased': false,
    'section1.items.waterSoftener.metadata.leasedFrom': '',
    'section1.items.otherLeasedItems': null,
    'section1.items.otherLeasedItems.metadata.description': '',
    'section1.items.undergroundLawnSprinkler': null,
    'section1.items.undergroundLawnSprinkler.metadata.type.automatic': false,
    'section1.items.undergroundLawnSprinkler.metadata.type.manual': false,
    'section1.items.undergroundLawnSprinkler.metadata.areasCovered': '',
    'section1.items.septicOnSiteSewerFacility': null,
    'section1.waterSupplyProvidedBy.city': false,
    'section1.waterSupplyProvidedBy.well': false,
    'section1.waterSupplyProvidedBy.mud': false,
    'section1.waterSupplyProvidedBy.co-op': false,
    'section1.waterSupplyProvidedBy.unknown': false,
    'section1.waterSupplyProvidedBy.other': false,
    'section1.waterSupplyOther': '',
    'section1.wasBuiltBefore1978.yes': false,
    'section1.wasBuiltBefore1978.no': false,
    'section1.wasBuiltBefore1978.unknown': false,
    'section1.roofAge': '',
    'section1.isOverlayRoofCovering.yes': false,
    'section1.isOverlayRoofCovering.no': false,
    'section1.isOverlayRoofCovering.unknown': false,
    'section1.itemsDefective.yes': false,
    'section1.itemsDefective.no': false,
    'section1.itemsDefectiveExplanation': '',
    'section2.items.basement': null,
    'section2.items.floors': null,
    'section2.items.sidewalks': null,
    'section2.items.ceilings': null,
    'section2.items.foundationSlabs': null,
    'section2.items.wallsFences': null,
    'section2.items.doors': null,
    'section2.items.interiorWalls': null,
    'section2.items.windows': null,
    'section2.items.driveways': null,
    'section2.items.lightingFixtures': null,
    'section2.items.otherStructuralComponents': null,
    'section2.items.electricalSystems': null,
    'section2.items.plumbingSystems': null,
    'section2.items.exteriorWalls': null,
    'section2.items.roof': null,
    'section2.explanation': '',
    'section3.items.encroachmentsOntoProperty': null,
    'section3.items.improvementsEncroachingOthers': null,
    'section3.items.woodRot': null,
    'section3.items.activeWdiInfestation': null,
    'section3.items.previousWdiTreatment': null,
    'section3.items.previousWdiDamageRepaired': null,
    'section3.items.diseasedTrees': null,
    'section3.items.diseasedTrees.oakWilt': false,
    'section3.items.soilMovement': null,
    'section3.items.settling': null,
    'section3.items.previousFoundationRepairs': null,
    'section3.items.previousFires': null,
    'section3.items.aluminumWiring': null,
    'section3.items.faultLines': null,
    'section3.items.subsurfaceStructure': null,
    'section3.items.unplattedEasements': null,
    'section3.items.unrecordedEasements': null,
    'section3.items.improperDrainage': null,
    'section3.items.intermittentSprings': null,
    'section3.items.wetlands': null,
    'section3.items.endangeredSpeciesHabitat': null,
    'section3.items.hazardousWaste': null,
    'section3.items.undergroundStorageTanks': null,
    'section3.items.ureaFormaldehydeInsulation': null,
    'section3.items.radonGas': null,
    'section3.items.asbestosComponents': null,
    'section3.items.leadBasedPaint': null,
    'section3.items.waterDamageNotFlood': null,
    'section3.items.landfill': null,
    'section3.items.locatedInHistoricDistrict': null,
    'section3.items.historicPropertyDesignation': null,
    'section3.items.previousRoofRepairs': null,
    'section3.items.previousUseForMethManufacture': null,
    'section3.items.termiteWdiDamageNeedingRepair': null,
    'section3.items.singleBlockableMainDrain': null,
    'section3.explanation': '',
    'section4.response': null,
    'section4.explanation': '',
    'section5.items.presentFloodInsuranceCoverage': null,
    'section5.items.previousFloodingReservoirRelease': null,
    'section5.items.previousFloodingNaturalEvent': null,
    'section5.items.previousWaterPenetrationNaturalFlood': null,
    'section5.items.previousFloodClaim': null,
    'section5.items.femaAssistance': null,
    'section5.items.locatedIn100YearFloodplain': null,
    'section5.items.locatedIn100YearFloodplain.metadata.coverageType': null,
    'section5.items.locatedIn500YearFloodplain': null,
    'section5.items.locatedIn500YearFloodplain.metadata.coverageType': null,
    'section5.items.locatedInFloodway': null,
    'section5.items.locatedInFloodway.metadata.coverageType': null,
    'section5.items.locatedInFloodPool': null,
    'section5.items.locatedInFloodPool.metadata.coverageType': null,
    'section5.items.locatedInReservoir': null,
    'section5.items.locatedInReservoir.metadata.coverageType': null,
    'section5.explanation': '',
    'section6.explanation': '',
    'section7.explanation': '',
    'section8.items.roomAdditionsOrModificationsWithoutPermits': null,
    'section8.items.homeownersAssociationFees': null,
    'section8.items.homeownersAssociationFees.metadata.associationName': '',
    'section8.items.homeownersAssociationFees.metadata.managerName': '',
    'section8.items.homeownersAssociationFees.metadata.managerPhone': '',
    'section8.items.homeownersAssociationFees.metadata.feeAmount': '',
    'section8.items.homeownersAssociationFees.metadata.feeFrequency': '',
    'section8.items.homeownersAssociationFees.metadata.unpaidFees.amount': '',
    'section8.items.homeownersAssociationFees.metadata.unpaidFees.hasUnpaid.yes': false,
    'section8.items.homeownersAssociationFees.metadata.unpaidFees.hasUnpaid.no': false,
    'section8.items.commonAreaCoOwned': null,
    'section8.items.commonAreaCoOwned.metadata.optionalFeesCharged.yes': false,
    'section8.items.commonAreaCoOwned.metadata.optionalFeesCharged.no': false,
    'section8.items.commonAreaCoOwned.metadata.description': '',
    'section8.items.noticesOfViolations': null,
    'section8.items.lawsuitsAffectingProperty': null,
    'section8.items.deathOnProperty': null,
    'section8.items.conditionAffectingHealthSafety': null,
    'section8.items.environmentalHazardRemediation': null,
    'section8.items.rainwaterHarvestingSystemOver500Gallons': null,
    'section8.items.locatedInPropaneServiceArea': null,
    'section8.items.locatedInGroundwaterOrSubsidenceDistrict': null,
    'section8.explanation': '',
    'section9.response': null,
    'section9.reports': [],
    'section10.exemptions.homestead': false,
    'section10.exemptions.seniorCitizen': false,
    'section10.exemptions.agricultural': false,
    'section10.exemptions.disabled': false,
    'section10.exemptions.disabledVeteran': false,
    'section10.exemptions.wildlifeManagement': false,
    'section10.exemptions.other': false,
    'section10.exemptions.unknown': false,
    'section11.response': null,
    'section12.response': null,
    'section12.explanation': '',
    'section13': null,
    'section13.explanation': '',
    'signature.seller1.name': '',
    'signature.seller1.date': '',
    'signature.seller1.signature': '',
    'signature.seller2.name': '',
    'signature.seller2.date': '',
    'signature.seller2.signature': '',
    'utilities.electric.provider': '',
    'utilities.electric.phone': '',
    'utilities.sewer.provider': '',
    'utilities.sewer.phone': '',
    'utilities.water.provider': '',
    'utilities.water.phone': '',
    'utilities.cable.provider': '',
    'utilities.cable.phone': '',
    'utilities.trash.provider': '',
    'utilities.trash.phone': '',
    'utilities.phoneCompany.provider': '',
    'utilities.phoneCompany.phone': '',
    'utilities.propane.provider': '',
    'utilities.propane.phone': '',
    'utilities.internet.provider': '',
    'utilities.internet.phone': '',
    'utilities.naturalGas.provider': '',
    'utilities.naturalGas.phone': '',
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };



  const nextStep = () => {
    const step = STEPS[currentStep];
    if (step.substeps && currentSubstep < step.substeps.length - 1) {
      setCurrentSubstep(currentSubstep + 1);
    } else if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
      setCurrentSubstep(0);
    } else {
      setShowPdf(true);
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

                {/* Nested Substeps */}
                {step.substeps && currentStep === index && (
                  <div className="ml-10 mt-2 space-y-1 border-l-2 border-indigo-100/50 pl-5 py-2">
                    {step.substeps.map((sub, sIdx) => (
                      <div
                        key={sub}
                        className={`text-[12px] py-2 cursor-pointer transition-all rounded-lg px-2 ${currentSubstep === sIdx
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
        <div className="flex-1 bg-[#FAFAFA] p-3 md:p-6 lg:p-8 overflow-x-hidden">
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
                <div className="p-4 md:p-8">
                  <div className="space-y-6 md:space-y-8">
                    {renderStepContent(currentStep, currentSubstep, { formData, handleInputChange })}
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

            <div className="mt-6 md:mt-8 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-8 text-[11px] md:text-[12px] text-gray-400 font-medium">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> Encrypted Connection</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> Auto-saved</span>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Preview Overlay */}
      <AnimatePresence>
        {showPdf && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-gray-900/80 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl h-full flex flex-col overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-[16px] font-bold text-gray-900">Seller Disclosure.pdf</h3>
                    <p className="text-[12px] text-gray-500 font-medium">Computer Generated PDF Notice</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDownloadPdf}
                    className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors"
                    title="Download PDF"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors"
                    title="Print Document"
                  >
                    <Printer className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setShowPdf(false)}
                    className="ml-2 px-4 py-2 bg-gray-900 text-white rounded-xl text-[13px] font-bold hover:bg-gray-800 transition-all active:scale-95"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
              {/* PDF Content (Mockup Image) */}
              <div className="flex-1 overflow-y-auto bg-gray-100/50 p-6 md:p-12 flex justify-center">
                <div
                  ref={pdfRef}
                  className="bg-white shadow-xl max-w-[800px] w-full min-h-[1100px] rounded-sm p-8 md:p-16 relative"
                >
                  <div className="absolute top-0 left-0 w-full h-[150px] bg-gradient-to-b from-gray-50/50 to-transparent pointer-events-none" />
                  <div className="space-y-12">
                    <div className="text-right text-[10px] font-medium text-gray-400 uppercase tracking-widest">Page 1 of 12</div>
                    <div className="space-y-4">
                      <h1 className="text-3xl font-black text-gray-900 leading-tight border-b-4 border-gray-900 pb-2 inline-block">SELLER'S DISCLOSURE NOTICE</h1>
                      <p className="text-[12px] text-gray-500 leading-relaxed font-medium">
                        CONCERNING THE PROPERTY AT: <span className="text-gray-900 font-bold underline decoration-indigo-500/30">{formData['meta.propertyAddress'] || '[No Address Provided]'}</span>
                      </p>
                    </div>

                    <div className="p-8 bg-gray-50 border border-gray-200 rounded-xl">
                      <p className="text-[13px] text-gray-800 leading-relaxed italic">
                        "THIS NOTICE IS A DISCLOSURE OF SELLER'S KNOWLEDGE OF THE CONDITION OF THE PROPERTY AS OF THE DATE SIGNED BY SELLER AND IS NOT A SUBSTITUTE FOR ANY INSPECTIONS OR WARRANTIES THE BUYER MAY WISH TO OBTAIN."
                      </p>
                    </div>

                    <div className="space-y-8">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="space-y-4">
                          <div className="h-4 bg-gray-200 rounded-full w-[40%]" />
                          <div className="space-y-2">
                            <div className="h-3 bg-gray-100 rounded-full w-[100%]" />
                            <div className="h-3 bg-gray-100 rounded-full w-[95%]" />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-20 border-t border-gray-200 grid grid-cols-2 gap-20">
                      <div className="space-y-4">
                        <div className="h-[60px] border-b-2 border-gray-900 flex items-end pb-2">
                          <span className="text-2xl font-serif text-indigo-700 italic opacity-50">{formData['signature.seller1.name'] || 'Seller Signature'}</span>
                        </div>
                        <div className="flex justify-between text-[11px] font-bold uppercase text-gray-400">
                          <span>Signature of Seller</span>
                          <span>Date</span>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="h-[60px] border-b-2 border-gray-900" />
                        <div className="flex justify-between text-[11px] font-bold uppercase text-gray-400">
                          <span>Signature of Seller</span>
                          <span>Date</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-100 bg-gray-50 flex items-center justify-center gap-6">
                <p className="text-[13px] text-gray-500 font-medium">This is a generated preview of the legal document.</p>
                <button
                  onClick={handleDownloadPdf}
                  className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl text-[14px] font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all active:scale-[0.98]"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Finalize & Submit Disclosure
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
function renderStepContent(stepIdx: number, subStepIdx: number, { formData, handleInputChange }: any) {
  // Mapping each step to its corresponding formData keys

  if (stepIdx === 0 && subStepIdx === 0) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-3 md:gap-4 border-b border-gray-100 pb-3 md:pb-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 shrink-0">
            <Home className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <div>
            <h3 className="text-[15px] md:text-[16px] font-bold text-gray-900 uppercase tracking-tight leading-tight">1. Property Address & Occupancy</h3>
            <p className="text-[11px] md:text-[12px] text-gray-500 mt-0.5">Provide the property location and your residency status.</p>
          </div>
        </div>

        <div className="space-y-4">
          <Question
            label="Property Address"
            type="text"
            placeholder="Enter full property address"
            value={formData['meta.propertyAddress']}
            onChange={(val: string) => handleInputChange('meta.propertyAddress', val)}
          />
        </div>

        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-[12px] font-bold border border-indigo-100">?</span>
            <label className="text-[14px] font-bold text-gray-900 uppercase tracking-tight">Seller Occupancy</label>
          </div>
          <div className="grid grid-cols-2 gap-4 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
            <CheckboxItem
              label="Seller is occupying"
              checked={formData['sellerOccupancy.status.occupying']}
              onChange={(val: boolean) => handleInputChange('sellerOccupancy.status.occupying', val)}
            />
            <CheckboxItem
              label="Seller is not occupying"
              checked={formData['sellerOccupancy.status.notOccupying']}
              onChange={(val: boolean) => handleInputChange('sellerOccupancy.status.notOccupying', val)}
            />
          </div>
        </div>

        <div className="p-6 bg-indigo-50/50 rounded-2xl border border-indigo-100 space-y-5">
          <p className="text-[12px] font-semibold text-indigo-900 uppercase tracking-wider">If unoccupied, how long since Seller has occupied the Property?</p>
          <ApproxDateSection
            approximateChecked={formData['sellerOccupancy.unoccupiedDetails.type.approximateDate']}
            onApproximateChange={(val: boolean) => handleInputChange('sellerOccupancy.unoccupiedDetails.type.approximateDate', val)}
            approximateDate={formData['sellerOccupancy.unoccupiedDetails.approximateDate']}
            onDateChange={(val: string) => handleInputChange('sellerOccupancy.unoccupiedDetails.approximateDate', val)}
            neverOccupiedChecked={formData['sellerOccupancy.unoccupiedDetails.type.never']}
            onNeverOccupiedChange={(val: boolean) => handleInputChange('sellerOccupancy.unoccupiedDetails.type.never', val)}
          />
        </div>
      </div>
    );
  }

  if (stepIdx === 0 && subStepIdx === 1) {
    const items = [
      { label: "Cable TV Wiring", key: "section1.items.cableTvWiring" },
      { label: "Carbon Monoxide Det.", key: "section1.items.carbonMonoxideDetector" },
      { label: "Ceiling Fans", key: "section1.items.ceilingFans" },
      { label: "Cooktop", key: "section1.items.cooktop" },
      { label: "Dishwasher", key: "section1.items.dishwasher" },
      { label: "Disposal", key: "section1.items.disposal" },
      { label: "Emergency Escape Ladder(s)", key: "section1.items.emergencyEscapeLadders" },
      { label: "Exhaust Fans", key: "section1.items.exhaustFans" },
      { label: "Fences", key: "section1.items.fences" },
      { label: "Fire Detection Equip.", key: "section1.items.fireDetectionEquipment" },
      { label: "French Drain", key: "section1.items.frenchDrain" },
      { label: "Gas Fixtures", key: "section1.items.gasFixtures" },
      { label: "Liquid Propane Gas: LP Community (Captive)", key: "section1.items.liquidPropaneGasLpCommunity" },
      { label: "Liquid Propane Gas: LP on Property", key: "section1.items.liquidPropaneGasLpOnProperty" },
      { label: "Natural Gas Lines", key: "section1.items.naturalGasLines" },
      { label: "Fuel Gas Piping: Black Iron Pipe", key: "section1.items.fuelGasPipingBlackIronPipe" },
      { label: "Fuel Gas Piping: Copper", key: "section1.items.fuelGasPipingCopper" },
      { label: "Fuel Gas Piping: Corrugated Stainless Steel", key: "section1.items.fuelGasPipingCorrugatedStainlessSteel" },
      { label: "Fuel Gas Piping: Steel Tubing", key: "section1.items.fuelGasPipingSteelTubing" },
      { label: "Hot Tub", key: "section1.items.hotTub" },
      { label: "Intercom System", key: "section1.items.intercomSystem" },
      { label: "Microwave", key: "section1.items.microwave" },
      { label: "Outdoor Grill", key: "section1.items.outdoorGrill" },
      { label: "Patio/Decking", key: "section1.items.patioDecking" },
      { label: "Plumbing System", key: "section1.items.plumbingSystem" },
      { label: "Pool", key: "section1.items.pool" },
      { label: "Pool Equipment", key: "section1.items.poolEquipment" },
      { label: "Pool Maint. Accessories", key: "section1.items.poolMaintenanceAccessories" },
      { label: "Pool Heater", key: "section1.items.poolHeater" },
      { label: "Pump: Sump", key: "section1.items.pumpSump" },
      { label: "Pump: Grinder", key: "section1.items.pumpGrinder" },
      { label: "Rain Gutters", key: "section1.items.rainGutters" },
      { label: "Range/Stove", key: "section1.items.rangeStove" },
      { label: "Roof/Attic Vents", key: "section1.items.roofAtticVents" },
      { label: "Sauna", key: "section1.items.sauna" },
      { label: "Smoke Detector", key: "section1.items.smokeDetector" },
      { label: "Smoke Detector - Hearing Impaired", key: "section1.items.smokeDetectorHearingImpaired" },
      { label: "Spa", key: "section1.items.spa" },
      { label: "Trash Compactor", key: "section1.items.trashCompactor" },
      { label: "TV Antenna", key: "section1.items.tvAntenna" },
      { label: "Washer/Dryer Hookup", key: "section1.items.washerDryerHookup" },
      { label: "Window Screens", key: "section1.items.windowScreens" },
      { label: "Public Sewer System", key: "section1.items.publicSewerSystem" }
    ];

    return (
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-100 pb-6 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 shrink-0">
              <Wrench className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div>
              <h3 className="text-[15px] md:text-[16px] font-bold text-gray-900 uppercase tracking-tight leading-tight">Section 1: Working Condition</h3>
              <p className="text-[11px] md:text-[12px] text-gray-500 mt-0.5">Mark (Y) if working, (N) if not, or (U) if unknown/not present.</p>
            </div>
          </div>
          <div class="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 self-start md:self-center shrink-0"><span class="text-[11px] font-black text-indigo-600">Y</span><span class="text-[10px] text-gray-400 font-bold">=Yes</span><span class="text-[10px] text-gray-300">|</span><span class="text-[11px] font-black text-indigo-600">N</span><span class="text-[10px] text-gray-400 font-bold">=No</span><span class="text-[10px] text-gray-300">|</span><span class="text-[11px] font-black text-indigo-600">U</span><span class="text-[10px] text-gray-400 font-bold">=Unknown</span></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-1">
          {items.map((item) => (
            <ItemRow
              key={item.key}
              label={item.label}
              value={formData[item.key]}
              onChange={(val: string) => handleInputChange(item.key, val)}
            />
          ))}
        </div>
      </div>
    );
  }

  if (stepIdx === 0 && subStepIdx === 2) {
    const systemItems = [
      { label: "Central A/C", key: "section1.items.centralAc" },
      { label: "Evaporative Coolers", key: "section1.items.evaporativeCoolers" },
      { label: "Wall/Window AC Units", key: "section1.items.wallWindowAcUnits" },
      { label: "Attic Fan(s)", key: "section1.items.atticFans" },
      { label: "Central Heat", key: "section1.items.centralHeat" },
      { label: "Other Heat", key: "section1.items.otherHeat" },
      { label: "Oven", key: "section1.items.oven" },
      { label: "Fireplace & Chimney", key: "section1.items.fireplaceAndChimney" },
      { label: "Carport", key: "section1.items.carport" },
      { label: "Garage", key: "section1.items.garage" },
      { label: "Garage Door Openers", key: "section1.items.garageDoorOpeners" },
      { label: "Satellite Dish & Controls", key: "section1.items.satelliteDishAndControls" },
      { label: "Security System", key: "section1.items.securitySystem" },
      { label: "Solar Panels", key: "section1.items.solarPanels" },
      { label: "Water Heater", key: "section1.items.waterHeater" },
      { label: "Water Softener", key: "section1.items.waterSoftener" },
      { label: "Other Leased Item(s)", key: "section1.items.otherLeasedItems" },
      { label: "Underground Lawn Sprinkler", key: "section1.items.undergroundLawnSprinkler" }
    ];

    return (
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-100 pb-6 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 shrink-0">
              <Settings className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div>
              <h3 className="text-[15px] md:text-[16px] font-bold text-gray-900 uppercase tracking-tight leading-tight">Section 1: Systems & Equipment</h3>
              <p className="text-[11px] md:text-[12px] text-gray-500 mt-0.5 italic">Heating, cooling, and additional property details.</p>
            </div>
          </div>
          <div class="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 self-start md:self-center shrink-0"><span class="text-[11px] font-black text-indigo-600">Y</span><span class="text-[10px] text-gray-400 font-bold">=Yes</span><span class="text-[10px] text-gray-300">|</span><span class="text-[11px] font-black text-indigo-600">N</span><span class="text-[10px] text-gray-400 font-bold">=No</span><span class="text-[10px] text-gray-300">|</span><span class="text-[11px] font-black text-indigo-600">U</span><span class="text-[10px] text-gray-400 font-bold">=Unknown</span></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
          {systemItems.map(item => {
            const key = item.key;
            if (item.label === "Central A/C") {
              return (
                <ItemRow
                  key={key}
                  label={item.label}
                  value={formData[key]}
                  onChange={(val: string) => handleInputChange(key, val)}
                  renderIfYes={
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Type</label>
                        <div className="flex gap-2">
                          {['Electric', 'Gas'].map(type => (
                            <CheckboxItem
                              key={type}
                              label={type}
                              checked={formData[`${key}.metadata.fuelTypes.${type.toLowerCase()}`]}
                              onChange={(val: boolean) => handleInputChange(`${key}.metadata.fuelTypes.${type.toLowerCase()}`, val)}
                            />
                          ))}
                        </div>
                      </div>
                      <Question
                        label="Number of units"
                        type="text"
                        placeholder="e.g. 2"
                        value={formData[`${key}.metadata.numberOfUnits`]}
                        onChange={(val: string) => handleInputChange(`${key}.metadata.numberOfUnits`, val)}
                      />
                    </div>
                  }
                />
              );
            }
            if (item.label === "Central Heat") {
              return (
                <ItemRow
                  key={key}
                  label={item.label}
                  value={formData[key]}
                  onChange={(val: string) => handleInputChange(key, val)}
                  renderIfYes={
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Fuel Type</label>
                        <div className="flex gap-2">
                          {['Electric', 'Gas'].map(type => (
                            <CheckboxItem
                              key={type}
                              label={type}
                              checked={formData[`${key}.metadata.fuelTypes.${type.toLowerCase()}`]}
                              onChange={(val: boolean) => handleInputChange(`${key}.metadata.fuelTypes.${type.toLowerCase()}`, val)}
                            />
                          ))}
                        </div>
                      </div>
                      <Question
                        label="Number of units"
                        type="text"
                        placeholder="e.g. 1"
                        value={formData[`${key}.metadata.numberOfUnits`]}
                        onChange={(val: string) => handleInputChange(`${key}.metadata.numberOfUnits`, val)}
                      />
                    </div>
                  }
                />
              );
            }
            if (item.label === "Other Heat") {
              return (
                <ItemRow
                  key={key}
                  label={item.label}
                  value={formData[key]}
                  onChange={(val: string) => handleInputChange(key, val)}
                  renderIfYes={
                    <Question
                      label="Description"
                      type="text"
                      placeholder="Describe other heat source"
                      value={formData[`${key}.metadata.description`]}
                      onChange={(val: string) => handleInputChange(`${key}.metadata.description`, val)}
                    />
                  }
                />
              );
            }
            if (item.label === "Oven") {
              return (
                <ItemRow
                  key={key}
                  label={item.label}
                  value={formData[key]}
                  onChange={(val: string) => handleInputChange(key, val)}
                  renderIfYes={
                    <div className="space-y-4">
                      <Question
                        label="Number of ovens"
                        type="text"
                        placeholder="e.g. 1"
                        value={formData[`${key}.metadata.numberOfOvens`]}
                        onChange={(val: string) => handleInputChange(`${key}.metadata.numberOfOvens`, val)}
                      />
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Fuel Type</label>
                        <OptionsWithOther
                          label="Fuel Type"
                          options={['Electric', 'Gas', 'Other']}
                          placeholder="Describe other fuel type"
                          value={formData[`${key}.metadata.fuelTypes.electric`] ? 'Electric' : formData[`${key}.metadata.fuelTypes.gas`] ? 'Gas' : formData[`${key}.metadata.fuelTypes.other`] ? 'Other' : null}
                          onChange={(val: string) => {
                            handleInputChange(`${key}.metadata.fuelTypes.electric`, val === 'Electric');
                            handleInputChange(`${key}.metadata.fuelTypes.gas`, val === 'Gas');
                            handleInputChange(`${key}.metadata.fuelTypes.other`, val === 'Other');
                          }}
                          otherValue={formData[`${key}.metadata.otherDescription`]}
                          onOtherChange={(val: string) => handleInputChange(`${key}.metadata.otherDescription`, val)}
                        />
                      </div>
                    </div>
                  }
                />
              );
            }
            if (item.label === "Fireplace & Chimney") {
              return (
                <ItemRow
                  key={key}
                  label={item.label}
                  value={formData[key]}
                  onChange={(val: string) => handleInputChange(key, val)}
                  renderIfYes={
                    <OptionsWithOther
                      label="Type"
                      options={['Wood', 'Gas Logs', 'Mock', 'Other']}
                      placeholder="Describe other type"
                      value={formData[`${key}.metadata.types.wood`] ? 'Wood' : formData[`key.metadata.types.gaslogs`] ? 'Gas Logs' : formData[`key.metadata.types.mock`] ? 'Mock' : formData[`key.metadata.types.other`] ? 'Other' : null}
                      onChange={(val: string) => {
                        handleInputChange(`${key}.metadata.types.wood`, val === 'Wood');
                        handleInputChange(`${key}.metadata.types.gaslogs`, val === 'Gas Logs');
                        handleInputChange(`${key}.metadata.types.mock`, val === 'Mock');
                        handleInputChange(`${key}.metadata.types.other`, val === 'Other');
                      }}
                      otherValue={formData[`${key}.metadata.otherDescription`]}
                      onOtherChange={(val: string) => handleInputChange(`${key}.metadata.otherDescription`, val)}
                    />
                  }
                />
              );
            }
            if (item.label === "Carport" || item.label === "Garage") {
              return (
                <ItemRow
                  key={key}
                  label={item.label}
                  value={formData[key]}
                  onChange={(val: string) => handleInputChange(key, val)}
                  renderIfYes={
                    <Question
                      label="Type"
                      options={['Attached', 'Not Attached']}
                      value={formData[`${key}.metadata.type.attached`] ? 'Attached' : formData[`${key}.metadata.type.notAttached`] ? 'Not Attached' : null}
                      onChange={(val: string) => {
                        handleInputChange(`${key}.metadata.type.attached`, val === 'Attached');
                        handleInputChange(`${key}.metadata.type.notAttached`, val === 'Not Attached');
                      }}
                    />
                  }
                />
              );
            }
            if (item.label === "Garage Door Openers") {
              return (
                <ItemRow
                  key={key}
                  label={item.label}
                  value={formData[key]}
                  onChange={(val: string) => handleInputChange(key, val)}
                  renderIfYes={
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Question
                        label="Number of Units"
                        type="text"
                        placeholder="e.g. 2"
                        value={formData[`${key}.metadata.numberOfUnits`]}
                        onChange={(val: string) => handleInputChange(`${key}.metadata.numberOfUnits`, val)}
                      />
                      <Question
                        label="Number of Remotes"
                        type="text"
                        placeholder="e.g. 4"
                        value={formData[`${key}.metadata.numberOfRemotes`]}
                        onChange={(val: string) => handleInputChange(`${key}.metadata.numberOfRemotes`, val)}
                      />
                    </div>
                  }
                />
              );
            }
            if (item.label === "Evaporative Coolers" || item.label === "Wall/Window AC Units" || item.label === "Attic Fan(s)") {
              return (
                <ItemRow
                  key={key}
                  label={item.label}
                  value={formData[key]}
                  onChange={(val: string) => handleInputChange(key, val)}
                  renderIfYes={
                    <Question
                      label="Number of units"
                      type="text"
                      placeholder="e.g. 1"
                      value={formData[`${key}.metadata.numberOfUnits`]}
                      onChange={(val: string) => handleInputChange(`${key}.metadata.numberOfUnits`, val)}
                    />
                  }
                />
              );
            }
            if (item.label === "Satellite Dish & Controls" || item.label === "Security System" || item.label === "Solar Panels" || item.label === "Water Softener") {
              return (
                <ItemRow
                  key={key}
                  label={item.label}
                  value={formData[key]}
                  onChange={(val: string) => handleInputChange(key, val)}
                  renderIfYes={
                    <OptionsWithReveal
                      label="Ownership Type"
                      options={['Owned', 'Leased']}
                      revealOn="Leased"
                      revealPlaceholder="Enter leasing company name"
                      value={formData[`${key}.metadata.ownershipType.owned`] ? 'Owned' : formData[`${key}.metadata.ownershipType.leased`] ? 'Leased' : null}
                      onChange={(val: string) => {
                        handleInputChange(`${key}.metadata.ownershipType.owned`, val === 'Owned');
                        handleInputChange(`${key}.metadata.ownershipType.leased`, val === 'Leased');
                      }}
                      revealValue={formData[`${key}.metadata.leasedFrom`]}
                      onRevealChange={(val: string) => handleInputChange(`${key}.metadata.leasedFrom`, val)}
                    />
                  }
                />
              );
            }
            if (item.label === "Water Heater") {
              return (
                <ItemRow
                  key={key}
                  label={item.label}
                  value={formData[key]}
                  onChange={(val: string) => handleInputChange(key, val)}
                  renderIfYes={
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Fuel Type</label>
                        <OptionsWithOther
                          label="Fuel Type"
                          options={['Electric', 'Gas', 'Other']}
                          placeholder="Describe other fuel type"
                          value={formData[`${key}.metadata.fuelTypes.electric`] ? 'Electric' : formData[`${key}.metadata.fuelTypes.gas`] ? 'Gas' : formData[`${key}.metadata.fuelTypes.other`] ? 'Other' : null}
                          onChange={(val: string) => {
                            handleInputChange(`${key}.metadata.fuelTypes.electric`, val === 'Electric');
                            handleInputChange(`${key}.metadata.fuelTypes.gas`, val === 'Gas');
                            handleInputChange(`${key}.metadata.fuelTypes.other`, val === 'Other');
                          }}
                          otherValue={formData[`${key}.metadata.otherDescription`]}
                          onOtherChange={(val: string) => handleInputChange(`${key}.metadata.otherDescription`, val)}
                        />
                      </div>
                      <Question
                        label="Number of Units"
                        type="text"
                        placeholder="e.g. 1"
                        value={formData[`${key}.metadata.numberOfUnits`]}
                        onChange={(val: string) => handleInputChange(`${key}.metadata.numberOfUnits`, val)}
                      />
                    </div>
                  }
                />
              );
            }
            if (item.label === "Underground Lawn Sprinkler") {
              return (
                <ItemRow
                  key={key}
                  label={item.label}
                  value={formData[key]}
                  onChange={(val: string) => handleInputChange(key, val)}
                  renderIfYes={
                    <div className="space-y-4">
                      <Question
                        label="Type"
                        options={['Automatic', 'Manual']}
                        value={formData[`${key}.metadata.type.automatic`] ? 'Automatic' : formData[`${key}.metadata.type.manual`] ? 'Manual' : null}
                        onChange={(val: string) => {
                          handleInputChange(`${key}.metadata.type.automatic`, val === 'Automatic');
                          handleInputChange(`${key}.metadata.type.manual`, val === 'Manual');
                        }}
                      />
                      <Question
                        label="Areas Covered"
                        type="text"
                        placeholder="e.g. Front yard"
                        value={formData[`${key}.metadata.areasCovered`]}
                        onChange={(val: string) => handleInputChange(`${key}.metadata.areasCovered`, val)}
                      />
                    </div>
                  }
                />
              );
            }

            return (
              <ItemRow
                key={key}
                label={item.label}
                value={formData[key]}
                onChange={(val: string) => handleInputChange(key, val)}
              />
            );
          })}
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
              <h3 className="text-[15px] md:text-[16px] font-bold text-gray-900 uppercase tracking-tight leading-tight">4. Structural, Utilities & Roof</h3>
              <p className="text-[11px] md:text-[12px] text-gray-500 mt-0.5">Infrastructure and construction details</p>
            </div>
          </div>
          <div class="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 self-start md:self-center shrink-0"><span class="text-[11px] font-black text-indigo-600">Y</span><span class="text-[10px] text-gray-400 font-bold">=Yes</span><span class="text-[10px] text-gray-300">|</span><span class="text-[11px] font-black text-indigo-600">N</span><span class="text-[10px] text-gray-400 font-bold">=No</span><span class="text-[10px] text-gray-300">|</span><span class="text-[11px] font-black text-indigo-600">U</span><span class="text-[10px] text-gray-400 font-bold">=Unknown</span></div>
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
                {['Y', 'N', 'U'].map((opt) => (
                  <label key={opt} className="cursor-pointer">
                    <input
                      type="radio"
                      name="septic-sewer"
                      className="sr-only peer"
                      checked={formData[`section1.items.septicOnSiteSewerFacility`] === opt}
                      onChange={() => handleInputChange(`section1.items.septicOnSiteSewerFacility`, opt)}
                    />
                    <div className="w-[60px] py-3 rounded-lg text-[13px] font-bold text-gray-400 peer-checked:bg-white peer-checked:text-indigo-600 peer-checked:shadow-md transition-all text-center">
                      {opt}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <WaterSupplySection formData={formData} handleInputChange={handleInputChange} />

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
                    <input
                      type="radio"
                      name="lead-paint-check"
                      className="sr-only peer"
                      checked={(opt === 'Y' && formData['section1.wasBuiltBefore1978.yes']) || (opt === 'N' && formData['section1.wasBuiltBefore1978.no']) || (opt === 'U' && formData['section1.wasBuiltBefore1978.unknown'])}
                      onChange={() => {
                        handleInputChange('section1.wasBuiltBefore1978.yes', opt === 'Y');
                        handleInputChange('section1.wasBuiltBefore1978.no', opt === 'N');
                        handleInputChange('section1.wasBuiltBefore1978.unknown', opt === 'U');
                      }}
                    />
                    <div className="w-[60px] py-3 rounded-lg text-[13px] font-bold text-gray-400 peer-checked:bg-white peer-checked:text-blue-600 peer-checked:shadow-md transition-all text-center">
                      {opt}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Roof Section */}
          <div className="rounded-3xl p-8 space-y-8 relative overflow-hidden border-2 border-gray-100">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px]" />
            <div className="relative flex items-center gap-4">
              <div className="w-12 h-12  flex items-center justify-center ">
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
                  value={formData['section1.roofType'] || ''}
                  onChange={(e) => handleInputChange('section1.roofType', e.target.value)}
                  className="w-full bg-white border-2 border-gray-100 rounded-2xl px-5 py-4 text-[14px] outline-none focus:border-blue-500/50 transition-all placeholder:text-gray-400"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Age (approximate)</label>
                <input
                  type="text"
                  placeholder="e.g. 10 years"
                  value={formData['section1.roofAge'] || ''}
                  onChange={(e) => handleInputChange('section1.roofAge', e.target.value)}
                  className="w-full bg-white border-2 border-gray-100 rounded-2xl px-5 py-4 text-[14px] outline-none focus:border-blue-500/50 transition-all placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <label className="text-[14px] font-semibold mb-4 block text-gray-700">Is there an overlay roof covering on the Property (shingles or roof covering placed over existing shingles or roof covering)?</label>
              <div className="flex gap-2 p-1 bg-gray-50 rounded-2xl border border-gray-200 w-full md:w-fit">
                {['Y', 'N', 'U'].map((opt) => (
                  <label key={opt} className="cursor-pointer">
                    <input
                      type="radio"
                      name="overlay-roof"
                      className="sr-only peer"
                      checked={(opt === 'Y' && formData['section1.isOverlayRoofCovering.yes']) || (opt === 'N' && formData['section1.isOverlayRoofCovering.no']) || (opt === 'U' && formData['section1.isOverlayRoofCovering.unknown'])}
                      onChange={() => {
                        handleInputChange('section1.isOverlayRoofCovering.yes', opt === 'Y');
                        handleInputChange('section1.isOverlayRoofCovering.no', opt === 'N');
                        handleInputChange('section1.isOverlayRoofCovering.unknown', opt === 'U');
                      }}
                    />
                    <div className="w-[60px] md:w-[80px] py-3 rounded-xl text-[13px] font-bold text-gray-500 peer-checked:bg-blue-600 peer-checked:text-white peer-checked:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all text-center">
                      {opt}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <Section1Awareness
            value={formData['section1.itemsDefective.yes'] ? 'Yes' : formData['section1.itemsDefective.no'] ? 'No' : null}
            onChange={(val: string) => {
              handleInputChange('section1.itemsDefective.yes', val === 'Yes');
              handleInputChange('section1.itemsDefective.no', val === 'No');
            }}
            explanation={formData['section1.itemsDefectiveExplanation']}
            onExplanationChange={(val: string) => handleInputChange('section1.itemsDefectiveExplanation', val)}
          />
        </div>
      </div>
    );
  } if (stepIdx === 1) {
    const defectItems = [
      { label: "Basement", key: "section2.items.basement" },
      { label: "Ceilings", key: "section2.items.ceilings" },
      { label: "Doors", key: "section2.items.doors" },
      { label: "Driveways", key: "section2.items.driveways" },
      { label: "Electrical Systems", key: "section2.items.electricalSystems" },
      { label: "Exterior Walls", key: "section2.items.exteriorWalls" },
      { label: "Floors", key: "section2.items.floors" },
      { label: "Foundation / Slab(s)", key: "section2.items.foundationSlabs" },
      { label: "Interior Walls", key: "section2.items.interiorWalls" },
      { label: "Lighting Fixtures", key: "section2.items.lightingFixtures" },
      { label: "Plumbing Systems", key: "section2.items.plumbingSystems" },
      { label: "Roof", key: "section2.items.roof" },
      { label: "Sidewalks", key: "section2.items.sidewalks" },
      { label: "Walls / Fences", key: "section2.items.wallsFences" },
      { label: "Windows", key: "section2.items.windows" },
      { label: "Other Structural Components", key: "section2.items.otherStructuralComponents" }
    ];

    return (
      <div className="space-y-8 pb-10">
        <div className="flex items-center gap-4 border-b border-gray-100 pb-4 justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-gray-900 uppercase tracking-tight">2. Defects & Malfunctions</h3>
              <p className="text-[12px] text-gray-500">Identify any known defects or malfunctions in structural or utility components.</p>
            </div>
          </div>
          <div class="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 self-start md:self-center shrink-0"><span class="text-[11px] font-black text-indigo-600">Y</span><span class="text-[10px] text-gray-400 font-bold">=Yes</span><span class="text-[10px] text-gray-300">|</span><span class="text-[11px] font-black text-indigo-600">N</span><span class="text-[10px] text-gray-400 font-bold">=No</span><span class="text-[10px] text-gray-300">|</span><span class="text-[11px] font-black text-indigo-600">U</span><span class="text-[10px] text-gray-400 font-bold">=Unknown</span></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
          {defectItems.map(item => (
            <div key={item.key} className="flex items-center justify-between py-2.5 border-b border-gray-50 group hover:bg-gray-50/50 px-2 rounded-md transition-colors">
              <span className="text-[13px] text-gray-700 font-medium">{item.label}</span>
              <div className="flex gap-1 bg-gray-100/50 p-0.5 rounded-lg border border-gray-200 shrink-0 ml-4">
                {['Yes', 'No'].map((opt) => (
                  <label key={opt} className="cursor-pointer">
                    <input
                      type="radio"
                      name={`${item.key}-defect`}
                      className="sr-only peer"
                      checked={(opt === 'Yes' && formData[`${item.key}`] === 'Y') || (opt === 'No' && formData[`${item.key}`] === 'N')}
                      onChange={() => handleInputChange(item.key, opt === 'Yes' ? 'Y' : 'N')}
                    />
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
            value={formData['section2.explanation'] || ''}
            onChange={(e) => handleInputChange('section2.explanation', e.target.value)}
            className="w-full h-32 px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl text-[14px] text-gray-900 focus:bg-white focus:border-indigo-500/30 focus:shadow-lg focus:shadow-indigo-500/5 outline-none transition-all placeholder:text-gray-300 resize-none"
          />
        </div>
      </div>
    );
  }

  if (stepIdx === 2) {
    const knownConditions = [
      { label: "Aluminum Wiring", key: "section3.items.aluminumWiring" },
      { label: "Asbestos Components", key: "section3.items.asbestosComponents" },
      { label: "Diseased Trees", key: "section3.items.diseasedTrees" },
      { label: "Endangered Species/Habitat on Property", key: "section3.items.endangeredSpeciesHabitat" },
      { label: "Fault Lines", key: "section3.items.faultLines" },
      { label: "Hazardous or Toxic Waste", key: "section3.items.hazardousWaste" },
      { label: "Improper Drainage", key: "section3.items.improperDrainage" },
      { label: "Intermittent or Weather Springs", key: "section3.items.intermittentSprings" },
      { label: "Landfill", key: "section3.items.landfill" },
      { label: "Lead-Based Paint or Lead-Based Pt. Hazards", key: "section3.items.leadBasedPaint" },
      { label: "Encroachments onto the Property", key: "section3.items.encroachmentsOntoProperty" },
      { label: "Improvements encroaching on others’ property", key: "section3.items.improvementsEncroachingOthers" },
      { label: "Located in Historic District", key: "section3.items.locatedInHistoricDistrict" },
      { label: "Historic Property Designation", key: "section3.items.historicPropertyDesignation" },
      { label: "Previous Foundation Repairs", key: "section3.items.previousFoundationRepairs" },
      { label: "Radon Gas", key: "section3.items.radonGas" },
      { label: "Settling", key: "section3.items.settling" },
      { label: "Soil Movement", key: "section3.items.soilMovement" },
      { label: "Subsurface Structure or Pits", key: "section3.items.subsurfaceStructure" },
      { label: "Underground Storage Tanks", key: "section3.items.undergroundStorageTanks" },
      { label: "Unplatted Easements", key: "section3.items.unplattedEasements" },
      { label: "Unrecorded Easements", key: "section3.items.unrecordedEasements" },
      { label: "Urea-formaldehyde Insulation", key: "section3.items.ureaFormaldehydeInsulation" },
      { label: "Water Damage Not Due to a Flood Event", key: "section3.items.waterDamageNotFlood" },
      { label: "Wetlands on Property", key: "section3.items.wetlands" },
      { label: "Wood Rot", key: "section3.items.woodRot" },
      { label: "Active infestation of termites or other wood destroying insects (WDI)", key: "section3.items.activeWdiInfestation" },
      { label: "Previous treatment for termites or WDI", key: "section3.items.previousWdiTreatment" },
      { label: "Previous termite or WDI damage repaired", key: "section3.items.previousWdiDamageRepaired" },
      { label: "Previous Fires", key: "section3.items.previousFires" },
      { label: "Previous Roof Repairs", key: "section3.items.previousRoofRepairs" },
      { label: "Previous Other Structural Repairs", key: "section3.items.previousOtherStructuralRepairs" },
      { label: "Previous Use of Premises for Manufacture of Methamphetamine", key: "section3.items.previousUseForMethamphetamine" },
      { label: "Termite or WDI damage needing repair", key: "section3.items.termiteDamageNeedingRepair" },
      { label: "Single Blockable Main Drain in Pool/Hot Tub/Spa", key: "section3.items.singleBlockableMainDrain" }
    ];

    return (
      <div className="space-y-8 pb-10">
        <div className="flex items-center gap-4 border-b border-gray-100 pb-4 justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <Info className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-gray-900 uppercase tracking-tight">3. Known Property Conditions</h3>
              <p className="text-[12px] text-gray-500">Are you (Seller) aware of any of the following conditions?</p>
            </div>
          </div>
          <div class="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 self-start md:self-center shrink-0"><span class="text-[11px] font-black text-indigo-600">Y</span><span class="text-[10px] text-gray-400 font-bold">=Yes</span><span class="text-[10px] text-gray-300">|</span><span class="text-[11px] font-black text-indigo-600">N</span><span class="text-[10px] text-gray-400 font-bold">=No</span><span class="text-[10px] text-gray-300">|</span><span class="text-[11px] font-black text-indigo-600">U</span><span class="text-[10px] text-gray-400 font-bold">=Unknown</span></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
          {knownConditions.map(item => (
            <div key={item.key} className="flex items-center justify-between py-2.5 border-b border-gray-50 group hover:bg-gray-50/50 px-2 rounded-md transition-colors">
              <div className="space-y-0.5">
                <span className="text-[13px] text-gray-700 font-medium leading-tight">{item.label}</span>
                {item.label === "Diseased Trees" && <p className="text-[10px] text-indigo-500 font-bold uppercase tracking-wider">Oak Wilt Awareness</p>}
              </div>
              <div className="flex gap-1 bg-gray-100/50 p-0.5 rounded-lg border border-gray-200 shrink-0 ml-4">
                {(item.label === "Diseased Trees" || item.label === "Lead-Based Paint or Lead-Based Pt. Hazards") ? (
                  ['Y', 'N', 'U'].map((opt) => (
                    <label key={opt} className="cursor-pointer">
                      <input
                        type="radio"
                        name={`${item.key}-known`}
                        className="sr-only peer"
                        checked={formData[item.key] === opt}
                        onChange={() => handleInputChange(item.key, opt)}
                      />
                      <div className="w-12 h-8 flex items-center justify-center text-[11px] font-bold text-gray-400 peer-checked:bg-white peer-checked:text-indigo-600 peer-checked:shadow-sm rounded-md transition-all">
                        {opt}
                      </div>
                    </label>
                  ))
                ) : (
                  ['Y', 'N'].map((opt) => (
                    <label key={opt} className="cursor-pointer">
                      <input
                        type="radio"
                        name={`${item.key}-known`}
                        className="sr-only peer"
                        checked={formData[item.key] === opt}
                        onChange={() => handleInputChange(item.key, opt)}
                      />
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
            value={formData['section3.explanation'] || ''}
            onChange={(e) => handleInputChange('section3.explanation', e.target.value)}
            className="w-full h-32 px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl text-[14px] text-gray-900 focus:bg-white focus:border-indigo-500/30 focus:shadow-lg focus:shadow-indigo-500/5 outline-none transition-all placeholder:text-gray-300 resize-none"
          />
        </div>
      </div>
    );
  }

  if (stepIdx === 3) {
    const floodItemsSimple = [
      { label: "Present flood insurance coverage.", key: "section5.items.presentFloodInsuranceCoverage" },
      { label: "Previous flooding due to a failure or breach of a reservoir or a controlled or emergency release of water from a reservoir.", key: "section5.items.previousFloodingReservoirRelease" },
      { label: "Previous flooding due to a natural flood event.", key: "section5.items.previousFloodingNaturalEvent" },
      { label: "Previous water penetration into a structure on the Property due to a natural flood.", key: "section5.items.previousWaterPenetrationNaturalFlood" }
    ];

    const floodItemsComplex = [
      { label: "Located in a 100-year floodplain", desc: "(Special Flood Hazard Area-Zone A, V, A99, AE, AO, AH, VE, or AR)", key: "section5.items.locatedIn100YearFloodplain" },
      { label: "Located in a 500-year floodplain", desc: "(Moderate Flood Hazard Area-Zone X (shaded))", key: "section5.items.locatedIn500YearFloodplain" },
      { label: "Located in a floodway", desc: "", key: "section5.items.locatedInFloodway" },
      { label: "Located in a flood pool", desc: "", key: "section5.items.locatedInFloodPool" },
      { label: "Located in a reservoir", desc: "", key: "section5.items.locatedInReservoir" }
    ];

    return (
      <div className="space-y-8 pb-10">
        <div className="flex items-center gap-4 border-b border-gray-100 pb-4 justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <Waves className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-gray-900 uppercase tracking-tight">4. Repairs, Flooding & Assistance</h3>
              <p className="text-[12px] text-gray-500">Disclosure of repairs and flood-related history.</p>
            </div>
          </div>
          <div class="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 self-start md:self-center shrink-0"><span class="text-[11px] font-black text-indigo-600">Y</span><span class="text-[10px] text-gray-400 font-bold">=Yes</span><span class="text-[10px] text-gray-300">|</span><span class="text-[11px] font-black text-indigo-600">N</span><span class="text-[10px] text-gray-400 font-bold">=No</span><span class="text-[10px] text-gray-300">|</span><span class="text-[11px] font-black text-indigo-600">U</span><span class="text-[10px] text-gray-400 font-bold">=Unknown</span></div>
        </div>

        {/* Section 4: Repairs */}
        <div className="p-6 bg-white rounded-2xl border-2 border-gray-100 space-y-6">
          <ItemRow
            label="4. Are you (Seller) aware of any item, equipment, or system in or on the Property that is in need of repair, which has not been previously disclosed in this notice?"
            value={formData['section4.response']}
            onChange={(val: string) => handleInputChange('section4.response', val)}
            renderIfYes={
              <div className="space-y-2 mt-4">
                <label className="text-[12px] font-bold text-gray-400 uppercase tracking-wider">If yes, explain:</label>
                <textarea
                  placeholder="Provide explanation or additional details here..."
                  value={formData['section4.explanation'] || ''}
                  onChange={(e) => handleInputChange('section4.explanation', e.target.value)}
                  className="w-full h-24 px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl text-[14px] focus:bg-white focus:border-indigo-500/30 outline-none transition-all resize-none"
                />
              </div>
            }
          />
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
                <div key={item.key} className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-3 border-b border-blue-100/50">
                  <span className="text-[13px] text-gray-700 font-medium leading-snug max-w-xl">{item.label}</span>
                  <div className="flex gap-1 bg-white p-0.5 rounded-lg border border-blue-200 shrink-0">
                    {['Y', 'N', 'U'].map((opt) => (
                      <label key={opt} className="cursor-pointer">
                        <input
                          type="radio"
                          name={item.key}
                          className="sr-only peer"
                          checked={formData[item.key] === opt}
                          onChange={() => handleInputChange(item.key, opt)}
                        />
                        <div className="w-12 h-8 flex items-center justify-center text-[11px] font-bold text-gray-400 peer-checked:bg-blue-600 peer-checked:text-white rounded-md transition-all">
                          {opt}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              {floodItemsComplex.map((item) => (
                <FloodComplexRow
                  key={item.key}
                  item={item}
                  value={formData[item.key]}
                  onChange={(val: string) => handleInputChange(item.key, val)}
                  coverageValue={formData[`${item.key}.metadata.coverageType`]}
                  onCoverageChange={(val: string) => handleInputChange(`${item.key}.metadata.coverageType`, val)}
                />
              ))}
            </div>

            <div className="pt-4 space-y-2">
              <label className="text-[12px] font-bold text-blue-600 uppercase tracking-wider">If yes, explain:</label>
              <textarea
                placeholder="Provide explanation or additional details here..."
                value={formData['section5.explanation'] || ''}
                onChange={(e) => handleInputChange('section5.explanation', e.target.value)}
                className="w-full h-24 px-4 py-3 bg-white border-2 border-blue-100 rounded-2xl text-[14px] focus:border-blue-400 outline-none transition-all resize-none shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Section 6 & 7: Claims & Assistance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-3xl border-2 border-gray-100 space-y-4">
            <ItemRow
              label="6. Have you (Seller) ever filed a claim for flood damage to the Property?"
              value={formData['section5.items.previousFloodClaim']}
              onChange={(val: string) => handleInputChange('section5.items.previousFloodClaim', val)}
              renderIfYes={
                <textarea
                  placeholder="If yes, explain..."
                  value={formData['section6.explanation'] || ''}
                  onChange={(e) => handleInputChange('section6.explanation', e.target.value)}
                  className="w-full h-24 px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl text-[13px] focus:bg-white focus:border-indigo-500/30 outline-none transition-all resize-none mt-2"
                />
              }
            />
          </div>

          <div className="p-6 bg-white rounded-3xl border-2 border-gray-100 space-y-4">
            <ItemRow
              label="7. Have you (Seller) ever received assistance from FEMA or SBA for flood damage?"
              value={formData['section5.items.femaAssistance']}
              onChange={(val: string) => handleInputChange('section5.items.femaAssistance', val)}
              renderIfYes={
                <textarea
                  placeholder="If yes, explain..."
                  value={formData['section7.explanation'] || ''}
                  onChange={(e) => handleInputChange('section7.explanation', e.target.value)}
                  className="w-full h-24 px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl text-[13px] focus:bg-white focus:border-indigo-500/30 outline-none transition-all resize-none mt-2"
                />
              }
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
        <div className="flex items-center gap-3 md:gap-4 border-b border-gray-100 pb-3 md:pb-4 justify-between">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 shrink-0">
              <Settings className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div>
              <h3 className="text-[15px] md:text-[16px] font-bold text-gray-900 uppercase tracking-tight leading-tight">8. Additional Disclosures & Reports</h3>
              <p className="text-[11px] md:text-[12px] text-gray-500 mt-0.5">Other conditions and legal disclosures affecting the property.</p>
            </div>
          </div>
          <div class="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 self-start md:self-center shrink-0"><span class="text-[11px] font-black text-indigo-600">Y</span><span class="text-[10px] text-gray-400 font-bold">=Yes</span><span class="text-[10px] text-gray-300">|</span><span class="text-[11px] font-black text-indigo-600">N</span><span class="text-[10px] text-gray-400 font-bold">=No</span><span class="text-[10px] text-gray-300">|</span><span class="text-[11px] font-black text-indigo-600">U</span><span class="text-[10px] text-gray-400 font-bold">=Unknown</span></div>
        </div>
        <div className="space-y-6">
          {disclosureItems.map((item, idx) => {
            const section8Keys = [
              "section8.items.roomAdditionsOrModificationsWithoutPermits",
              "section8.items.homeownersAssociationFees",
              "section8.items.commonAreaCoOwned",
              "section8.items.noticesOfViolations",
              "section8.items.lawsuitsAffectingProperty",
              "section8.items.deathOnProperty",
              "section8.items.conditionAffectingHealthSafety",
              "section8.items.environmentalHazardRemediation",
              "section8.items.rainwaterHarvestingSystemOver500Gallons",
              "section8.items.locatedInPropaneServiceArea",
              "section8.items.locatedInGroundwaterOrSubsidenceDistrict"
            ];
            const itemKey = section8Keys[idx];

            return (
              <Section8Item
                key={idx}
                item={item}
                idx={idx}
                value={formData[itemKey]}
                onChange={(val: string) => handleInputChange(itemKey, val)}
                formData={formData}
                handleInputChange={handleInputChange}
              />
            );
          })}
        </div>

        {/* Note from user: the Section 8 text area is now moved into the Groundwater item to follow their logic, although technically they might have wanted it at the bottom. By putting it into the Groundwater `Yes` block as they said "if yes then show input with label If the answer...", this exactly respects their wish. */}

        {/* Section 9: Inspection Reports */}
        <div className="pt-8 md:pt-12 space-y-6 md:space-y-8">
          <div className="flex items-center gap-3 md:gap-4 border-b border-gray-100 pb-3 md:pb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 shrink-0">
              <Building2 className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div>
              <h3 className="text-[15px] md:text-[16px] font-bold text-gray-900 uppercase tracking-tight leading-tight">9. Written Inspection Reports</h3>
              <p className="text-[11px] md:text-[12px] text-gray-500 mt-0.5 italic">Within the last 4 years, written reports from licensed inspectors.</p>
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border-2 border-gray-100 space-y-6">
            <h4 className="text-[13px] font-semibold text-gray-500 uppercase tracking-wider mb-2 border-b border-gray-100 pb-2">Inspection Reports</h4>
            <Question
              label="9. Within the last 4 years, have you (Seller) received any written inspection reports from persons who regularly provide inspections and who are either licensed as inspectors or otherwise permitted by law to perform inspections?"
              options={['Yes', 'No']}
              value={formData['section9.response']}
              onChange={(val: string) => handleInputChange('section9.response', val)}
            />

            <div className="rounded-2xl border border-gray-100 bg-gray-50/30 mt-6 w-full overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[500px]">
                  <thead className="bg-gray-100/50 border-b border-gray-100">
                    <tr>
                      <th className="px-4 md:px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">Inspection Date</th>
                      <th className="px-4 md:px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">Type</th>
                      <th className="px-4 md:px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">Inspector Name</th>
                      <th className="px-4 md:px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest w-24 text-center whitespace-nowrap">Pages</th>
                      <th className="px-2 md:px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest w-12 md:w-16"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {(formData['section9.reports'] || []).map((report: any, idx: number) => (
                      <tr key={idx} className="bg-white hover:bg-gray-50/50 transition-colors group">
                        <td className="px-4 md:px-6 py-3 md:py-4">
                          <input
                            type="text"
                            placeholder="MM/DD/YYYY"
                            className="w-full bg-transparent text-[13px] outline-none"
                            value={report.date || ''}
                            onChange={(e) => {
                              const newReports = [...(formData['section9.reports'] || [])];
                              newReports[idx] = { ...report, date: e.target.value };
                              handleInputChange('section9.reports', newReports);
                            }}
                          />
                        </td>
                        <td className="px-4 md:px-6 py-3 md:py-4">
                          <input
                            type="text"
                            placeholder="Enter type"
                            className="w-full bg-transparent text-[13px] outline-none"
                            value={report.type || ''}
                            onChange={(e) => {
                              const newReports = [...(formData['section9.reports'] || [])];
                              newReports[idx] = { ...report, type: e.target.value };
                              handleInputChange('section9.reports', newReports);
                            }}
                          />
                        </td>
                        <td className="px-4 md:px-6 py-3 md:py-4">
                          <input
                            type="text"
                            placeholder="Enter name"
                            className="w-full bg-transparent text-[13px] outline-none"
                            value={report.name || ''}
                            onChange={(e) => {
                              const newReports = [...(formData['section9.reports'] || [])];
                              newReports[idx] = { ...report, name: e.target.value };
                              handleInputChange('section9.reports', newReports);
                            }}
                          />
                        </td>
                        <td className="px-4 md:px-6 py-3 md:py-4">
                          <input
                            type="text"
                            placeholder="0"
                            className="w-full bg-transparent text-[13px] outline-none text-center"
                            value={report.pages || ''}
                            onChange={(e) => {
                              const newReports = [...(formData['section9.reports'] || [])];
                              newReports[idx] = { ...report, pages: e.target.value };
                              handleInputChange('section9.reports', newReports);
                            }}
                          />
                        </td>
                        <td className="px-2 md:px-6 py-3 md:py-4 text-center">
                          <button
                            onClick={() => {
                              const newReports = (formData['section9.reports'] || []).filter((_: any, i: number) => i !== idx);
                              handleInputChange('section9.reports', newReports);
                            }}
                            className="opacity-100 md:opacity-0 md:group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 transition-all flex items-center justify-center mx-auto"
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                onClick={() => {
                  const newReports = [...(formData['section9.reports'] || []), { date: '', type: '', name: '', pages: '' }];
                  handleInputChange('section9.reports', newReports);
                }}
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
      { label: "Homestead", key: "section10.exemptions.homestead" },
      { label: "Senior Citizen", key: "section10.exemptions.seniorCitizen" },
      { label: "Disabled", key: "section10.exemptions.disabled" },
      { label: "Wildlife Management", key: "section10.exemptions.wildlifeManagement" },
      { label: "Agricultural", key: "section10.exemptions.agricultural" },
      { label: "Disabled Veteran", key: "section10.exemptions.disabledVeteran" },
      { label: "Unknown", key: "section10.exemptions.unknown" }
    ];

    const utilitiesList = [
      { label: "Electric", icon: <Zap className="w-4 h-4" />, key: "utilities.electric" },
      { label: "Sewer", icon: <Droplets className="w-4 h-4" />, key: "utilities.sewer" },
      { label: "Water", icon: <Droplets className="w-4 h-4" />, key: "utilities.water" },
      { label: "Cable", icon: <FileText className="w-4 h-4" />, key: "utilities.cable" },
      { label: "Trash", icon: <Wrench className="w-4 h-4" />, key: "utilities.trash" },
      { label: "Natural Gas", icon: <Zap className="w-4 h-4" />, key: "utilities.naturalGas" },
      { label: "Phone Company", icon: <FileText className="w-4 h-4" />, key: "utilities.phoneCompany" },
      { label: "Propane", icon: <Droplets className="w-4 h-4" />, key: "utilities.propane" },
      { label: "Internet", icon: <FileText className="w-4 h-4" />, key: "utilities.internet" }
    ];

    return (
      <div className="space-y-8 md:space-y-12 pb-10">
        <div className="flex items-center gap-3 md:gap-4 border-b border-gray-100 pb-3 md:pb-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-amber-500/20 shrink-0">
            <Zap className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <div>
            <h3 className="text-[15px] md:text-[16px] font-bold text-gray-900 uppercase tracking-tight leading-tight">Exemptions, Insurance & Utilities</h3>
            <p className="text-[11px] md:text-[12px] text-gray-500 mt-0.5 italic">Disclosures regarding tax exemptions, insurance claims, and service providers.</p>
          </div>
        </div>

        {/* Section 10: Tax Exemptions */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-[12px] font-bold border border-indigo-100">10</span>
            <label className="text-[14px] font-bold text-gray-900 leading-tight">Check any tax exemption(s) which you (Seller) currently claim for the Property:</label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 p-6 bg-gray-50 rounded-2xl border border-gray-100">
            {taxExemptions.map(item => (
              <CheckboxItem
                key={item.key}
                label={item.label}
                checked={formData[item.key]}
                onChange={(checked: boolean) => handleInputChange(item.key, checked)}
              />
            ))}
            <ExemptionOther
              value={formData['section10.exemptions.other']}
              onChange={(val: boolean) => handleInputChange('section10.exemptions.other', val)}
              otherValue={formData['section10.exemptions.otherExplanation']}
              onOtherChange={(val: string) => handleInputChange('section10.exemptions.otherExplanation', val)}
            />
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
                  <input
                    type="radio"
                    name="ins-claim-gen"
                    className="sr-only peer"
                    checked={formData['section11.response'] === opt}
                    onChange={() => handleInputChange('section11.response', opt)}
                  />
                  <div className="w-[80px] py-2.5 rounded-lg text-[12px] font-bold text-gray-400 peer-checked:bg-white peer-checked:text-indigo-600 peer-checked:shadow-sm transition-all uppercase text-center">
                    {opt}
                  </div>
                </label>
              ))}
            </div>
          </div>

          <Section12Card
            value={formData['section12.response']}
            onChange={(val: string) => handleInputChange('section12.response', val)}
            explanation={formData['section12.explanation']}
            onExplanationChange={(val: string) => handleInputChange('section12.explanation', val)}
          />
        </div>

        {/* Section 13: Smoke Detectors */}
        <Section13Card
          value={formData['section13']}
          onChange={(val: string) => handleInputChange('section13', val)}
          explanation={formData['section13.explanation']}
          onExplanationChange={(val: string) => handleInputChange('section13.explanation', val)}
        />

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
            {utilitiesList.map(util => (
              <div key={util.key} className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
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
                      value={formData[`${util.key}.provider`] || ''}
                      onChange={(e) => handleInputChange(`${util.key}.provider`, e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Phone #"
                      className="w-full px-4 py-2 bg-gray-50 border border-transparent rounded-xl text-[13px] focus:bg-white focus:border-indigo-500/30 outline-none transition-all"
                      value={formData[`${util.key}.phone`] || ''}
                      onChange={(e) => handleInputChange(`${util.key}.phone`, e.target.value)}
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
      <div className="space-y-8 md:space-y-12 pb-10">
        <div className="flex items-center gap-3 md:gap-4 border-b border-gray-100 pb-3 md:pb-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 shrink-0">
            <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <div>
            <h3 className="text-[15px] md:text-[16px] font-bold text-gray-900 uppercase tracking-tight leading-tight">Signatures & Acknowledgments</h3>
            <p className="text-[11px] md:text-[12px] text-gray-500 mt-0.5 italic">Final step: Authenticate and acknowledge the disclosure.</p>
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
            <SignatureBlock
              title="Seller 1 Signature"
              description="Please provide your signature and details below."
              name={formData['signature.seller1.name']}
              onNameChange={(val: string) => handleInputChange('signature.seller1.name', val)}
              date={formData['signature.seller1.date']}
              onDateChange={(val: string) => handleInputChange('signature.seller1.date', val)}
              signature={formData['signature.seller1.signature']}
              onSignatureChange={(val: string) => handleInputChange('signature.seller1.signature', val)}
            />
            <SignatureBlock
              title="Seller 2 Signature"
              description="Please provide your signature and details below."
              name={formData['signature.seller2.name']}
              onNameChange={(val: string) => handleInputChange('signature.seller2.name', val)}
              date={formData['signature.seller2.date']}
              onDateChange={(val: string) => handleInputChange('signature.seller2.date', val)}
              signature={formData['signature.seller2.signature']}
              onSignatureChange={(val: string) => handleInputChange('signature.seller2.signature', val)}
            />
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
        <div className="p-6 md:p-12 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-3xl text-white text-center shadow-2xl shadow-indigo-200 relative overflow-hidden hidden">
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

