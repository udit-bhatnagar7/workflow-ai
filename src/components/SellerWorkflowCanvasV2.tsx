import React, { useState, useEffect } from 'react';
import {
  Search, MapPin, User, Mail, Phone, GripVertical, X, Plus, Clock,
  ChevronRight, CheckCircle2, Eye, Send, Camera, MessageSquare,
  Settings2, LayoutGrid, FileText, Image as ImageIcon, ShieldCheck, FileSignature
} from 'lucide-react';
import { motion, AnimatePresence, Reorder } from 'motion/react';

// Types and Constants
export type Property = { id: string, address: string, city: string, state: string, zip: string, beds: number, baths: number, sqft: number, thumbnail: string };
export type FormTemplate = { id: string, title: string, description: string, estimatedTime: string };
export type SellerInfo = { name: string, email: string, phone: string };
export type WorkflowSettings = { allowPhotoUpload: boolean, allowChangeRequests: boolean, enableMessaging: boolean };

const SAMPLE_PROPERTIES: Property[] = [
  { id: '1', address: '4521 Barton Creek Blvd', city: 'Austin', state: 'TX', zip: '78735', beds: 4, baths: 3, sqft: 3200, thumbnail: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=400' },
  { id: '2', address: '1890 Ocean Way', city: 'Santa Monica', state: 'CA', zip: '90405', beds: 3, baths: 2, sqft: 2400, thumbnail: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=400' }
];

const FORM_LIBRARY: FormTemplate[] = [
  { id: 'prop-details', title: 'Confirm Property Details', description: 'Review and confirm basic property specs, year built, and lot size.', estimatedTime: '2 mins' },
  { id: 'home-features', title: 'Highlight Home Features', description: 'Select key selling points and recent upgrades.', estimatedTime: '5 mins' },
  { id: 'seller-disclosure', title: 'Complete Seller Disclosure', description: 'Standard state-required property condition disclosure form.', estimatedTime: '15 mins' },
  { id: 'photo-upload', title: 'Upload Initial Photos', description: 'Securely upload photos of the home for agent review.', estimatedTime: '10 mins' },
];

export function SellerWorkflowCanvas() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [sellerInfo, setSellerInfo] = useState<SellerInfo>({ name: '', email: '', phone: '' });
  const [selectedForms, setSelectedForms] = useState<FormTemplate[]>([]);
  const [settings, setSettings] = useState<WorkflowSettings>({ allowPhotoUpload: true, allowChangeRequests: true, enableMessaging: true });

  const filteredProperties = SAMPLE_PROPERTIES.filter(p =>
    p.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddForm = (form: FormTemplate) => {
    if (!selectedForms.find(f => f.id === form.id)) {
      setSelectedForms([...selectedForms, { ...form, id: `${form.id}-${Date.now()}` }]);
    }
  };

  const handleRemoveForm = (id: string) => {
    setSelectedForms(selectedForms.filter(f => f.id !== id));
  };

  const addStandardForms = () => {
    const standard = FORM_LIBRARY.filter(f => ['prop-details', 'home-features', 'seller-disclosure'].includes(f.id));
    const newForms = standard.map(f => ({ ...f, id: `${f.id}-${Date.now()}` }));
    setSelectedForms([...selectedForms, ...newForms]);
  };

  const totalTime = selectedForms.reduce((acc, curr) => {
    const mins = parseInt(curr.estimatedTime.split(' ')[0]);
    return acc + mins;
  }, 0);

  const [isSending, setIsSending] = useState(false);
  const [magicLink, setMagicLink] = useState<string | null>(null);

  // Off-canvas state
  const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false);
  const [editingForm, setEditingForm] = useState<FormTemplate | null>(null);

  const openFormEditor = (form?: FormTemplate) => {
    setEditingForm(form || null);
    setIsOffCanvasOpen(true);
  };

  const handleSendMagicLink = async () => {
    if (!selectedProperty || !sellerInfo.name || selectedForms.length === 0) {
      alert('Please select a property, enter seller info, and add at least one form.');
      return;
    }
    setIsSending(true);
    setTimeout(() => {
      const link = `${window.location.origin}/seller/123`;
      setMagicLink(link);
      setIsSending(false);
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#FAFAFA] relative">
      {/* Top Bar */}
      <div className="h-12 border-b border-[#EAEAEA] bg-white flex items-center px-6 justify-between flex-shrink-0">
        <div className="flex items-center text-gray-500 space-x-2 text-[13px]">
          <span>Operations</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 font-medium">Listing Setup Workflow</span>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center gap-1.5 text-gray-400 hover:text-gray-600 font-medium text-[13px]">
            <Eye className="w-4 h-4" />
            <span>Preview Seller Experience</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 mx-auto w-full space-y-8">
        {/* Success Modal */}
        <AnimatePresence>
          {magicLink && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-gray-900/60 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl border border-[#EAEAEA]"
              >
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center mb-6 mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-[20px] font-bold text-center text-gray-900 mb-2">Magic Link Sent!</h3>
                <p className="text-[14px] text-gray-500 text-center mb-8">
                  The invitation has been sent to <strong>{sellerInfo.email}</strong>. You can also copy the link below.
                </p>

                <div className="bg-[#FAFAFA] border border-[#EAEAEA] rounded-md p-3 mb-8 flex items-center justify-between gap-4">
                  <code className="text-[12px] text-gray-600 truncate flex-1">{magicLink}</code>
                  <button
                    onClick={() => { navigator.clipboard.writeText(magicLink); alert('Copied to clipboard!'); }}
                    className="text-[11px] font-bold text-indigo-600 hover:text-indigo-700 uppercase tracking-widest flex-shrink-0"
                  >
                    Copy
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => window.open(magicLink, '_blank')}
                    className="w-full py-3 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 text-[14px]"
                  >
                    <Eye className="w-5 h-5" />
                    View as Seller
                  </button>
                  <button
                    onClick={() => setMagicLink(null)}
                    className="w-full py-3 bg-[#FAFAFA] text-gray-600 border border-[#EAEAEA] rounded-md font-medium hover:bg-[#F2F2F2] transition-all text-[14px]"
                  >
                    Back to Workspace
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Off-canvas Form Editor */}
          {isOffCanvasOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex justify-end bg-gray-900/20 backdrop-blur-sm"
              onClick={() => setIsOffCanvasOpen(false)}
            >
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-[#EAEAEA]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between p-6 border-b border-[#EAEAEA] bg-[#FAFAFA]">
                  <h3 className="text-[16px] font-semibold text-gray-900 flex items-center gap-2">
                    {editingForm ? (
                      <>
                        <FileSignature className="w-5 h-5 text-indigo-600" />
                        Form Preview
                      </>
                    ) : (
                      'Add Custom Form'
                    )}
                  </h3>
                  <button onClick={() => setIsOffCanvasOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto bg-gray-100 p-6 flex flex-col items-center">
                  {editingForm ? (
                    // PDF Preview Mode
                    <div className="w-full max-w-sm bg-white shadow-md border border-gray-200 rounded text-left p-8 min-h-[500px] flex flex-col relative before:absolute before:top-0 before:left-0 before:w-full before:h-1.5 before:bg-indigo-600">
                      <div className="border-b-2 border-gray-900 pb-4 mb-6">
                        <h2 className="text-[20px] font-serif font-bold text-gray-900 leading-tight uppercase tracking-wide">
                          {editingForm.title}
                        </h2>
                        <p className="text-[11px] text-gray-500 font-medium tracking-widest uppercase mt-2">Standard Real Estate Form</p>
                      </div>

                      <div className="space-y-6 flex-1">
                        <div className="space-y-1.5">
                          <div className="h-3 w-3/4 bg-gray-200 rounded"></div>
                          <div className="h-3 w-full bg-gray-100 rounded"></div>
                          <div className="h-3 w-5/6 bg-gray-100 rounded"></div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4">
                          <div className="border border-gray-300 rounded p-2 h-10 w-full relative">
                            <span className="absolute -top-2 left-2 bg-white px-1 text-[9px] text-gray-500 font-medium">Property Address</span>
                          </div>
                          <div className="border border-gray-300 rounded p-2 h-10 w-full relative">
                            <span className="absolute -top-2 left-2 bg-white px-1 text-[9px] text-gray-500 font-medium">City, State Zip</span>
                          </div>
                        </div>
                        
                        <div className="space-y-1.5 pt-4">
                          <div className="h-3 w-full bg-gray-100 rounded"></div>
                          <div className="h-3 w-1/2 bg-gray-100 rounded"></div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 pt-4">
                           <div className="border border-gray-300 rounded p-2 min-h-[80px] w-full relative">
                            <span className="absolute -top-2 left-2 bg-white px-1 text-[9px] text-gray-500 font-medium">Additional Comments</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 pt-8 border-t border-gray-200 grid grid-cols-2 gap-6 opacity-60">
                         <div>
                            <div className="border-b border-gray-400 h-6 w-full mb-1"></div>
                            <span className="text-[9px] text-gray-500 uppercase">Seller Signature</span>
                         </div>
                         <div>
                            <div className="border-b border-gray-400 h-6 w-full mb-1"></div>
                            <span className="text-[9px] text-gray-500 uppercase">Date</span>
                         </div>
                      </div>
                    </div>
                  ) : (
                    // Form Builder Mode
                    <div className="w-full space-y-5 bg-white p-6 rounded-xl border border-[#EAEAEA] shadow-sm">
                      <div>
                        <label className="text-[12px] font-semibold text-gray-700 block mb-1.5">Form Title</label>
                        <input type="text" placeholder="e.g. HOA Addendum" className="w-full px-3 py-2 bg-[#FAFAFA] border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-[13px] text-gray-900" />
                      </div>
                      <div>
                        <label className="text-[12px] font-semibold text-gray-700 block mb-1.5">Description</label>
                        <textarea placeholder="Briefly describe what this form requires..." className="w-full px-3 py-2 bg-[#FAFAFA] border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-[13px] text-gray-900 h-24 resize-none" />
                      </div>
                      <div>
                        <label className="text-[12px] font-semibold text-gray-700 block mb-1.5">Estimated Time</label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input type="text" defaultValue="5 mins" className="w-full pl-9 pr-3 py-2 bg-[#FAFAFA] border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-[13px] text-gray-900" />
                        </div>
                      </div>
                      <div className="pt-4 border-t border-[#EAEAEA]">
                        <label className="text-[12px] font-semibold text-gray-700 block mb-3">Form Fields Builder</label>
                        <div className="border border-dashed border-[#EAEAEA] rounded-xl p-8 bg-[#FAFAFA] text-center flex flex-col items-center justify-center">
                          <FileText className="w-8 h-8 text-gray-300 mb-2" />
                          <p className="text-[13px] font-medium text-gray-500">Form Builder Canvas</p>
                          <p className="text-[11px] text-gray-400 mt-1">Drag and drop fields here</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-6 border-t border-[#EAEAEA] bg-white flex gap-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                  {editingForm ? (
                    <>
                      <button onClick={() => setIsOffCanvasOpen(false)} className="flex-1 py-2.5 bg-white border border-[#EAEAEA] text-gray-700 rounded-lg text-[13px] font-semibold hover:bg-gray-50 transition-colors">
                        Close Preview
                      </button>
                      <button 
                        onClick={() => { handleAddForm(editingForm); setIsOffCanvasOpen(false); }} 
                        className="flex-1 py-2.5 bg-indigo-600 text-white rounded-lg text-[13px] font-semibold hover:bg-indigo-700 transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Plus className="w-4 h-4" /> Add to Workflow
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => setIsOffCanvasOpen(false)} className="flex-1 py-2.5 bg-white border border-[#EAEAEA] text-gray-700 rounded-lg text-[13px] font-semibold hover:bg-gray-50 transition-colors">
                        Cancel
                      </button>
                      <button onClick={() => setIsOffCanvasOpen(false)} className="flex-1 py-2.5 bg-indigo-600 text-white rounded-lg text-[13px] font-semibold hover:bg-indigo-700 transition-colors shadow-sm cursor-pointer">
                        Create Custom Form
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}

        </AnimatePresence>

        <div className="mb-2 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-[28px] font-semibold tracking-tight text-gray-900 mb-2">
              Prepare Seller Workflow
            </h1>
            <p className="text-[14px] text-gray-500">
              Build and send an intelligent listing setup workflow customized for your client.
            </p>
          </div>
          <button
            onClick={handleSendMagicLink} disabled={isSending}
            className="py-2.5 px-6 bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-indigo-400 text-[13px] rounded-lg font-bold shadow-sm transition-all flex items-center justify-center gap-2 flex-shrink-0"
          >
            {isSending ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <Send className="w-4 h-4" />}
            {isSending ? 'Sending...' : 'Send Magic Link'}
          </button>
        </div>

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="bg-white border border-[#EAEAEA] rounded-xl p-5 shadow-sm col-span-1 md:col-span-2">
            <h3 className="text-[14px] font-semibold text-gray-900 mb-4">Property & Seller Details</h3>

            <div>
              {/* Search Property */}

              {/* Seller Contact */}
              <div>
                <div>
                  <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Search Property</label>
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by address, MLS number..."
                      className="w-full pl-9 pr-4 py-2 bg-[#FAFAFA] border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-[13px] text-gray-900"
                      value={searchQuery}
                      onChange={(e) => { setSearchQuery(e.target.value); setShowSearchResults(true); }}
                      onFocus={() => setShowSearchResults(true)}
                    />
                    <AnimatePresence>
                      {showSearchResults && searchQuery && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#EAEAEA] rounded-lg shadow-lg z-40 overflow-hidden"
                        >
                          {filteredProperties.length > 0 ? (
                            filteredProperties.map(p => (
                              <button
                                key={p.id}
                                className="w-full flex items-center gap-3 p-3 hover:bg-[#FAFAFA] transition-colors text-left border-b border-[#EAEAEA] last:border-0"
                                onClick={() => { setSelectedProperty(p); setSearchQuery(''); setShowSearchResults(false); }}
                              >
                                <div className="w-10 h-10 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                                  <img src={p.thumbnail} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                </div>
                                <div>
                                  <p className="font-medium text-[13px] text-gray-900">{p.address}</p>
                                  <p className="text-[11px] text-gray-500">{p.city}, {p.state} {p.zip}</p>
                                </div>
                              </button>
                            ))
                          ) : (
                            <div className="p-4 text-center text-[13px] text-gray-500">No properties found.</div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {selectedProperty && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-4 border-t border-[#EAEAEA]">
                      <div className="flex items-start gap-4">
                        <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                          <img src={selectedProperty.thumbnail} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h2 className="text-[16px] font-semibold text-gray-900">{selectedProperty.address}</h2>
                              <p className="text-[13px] text-gray-500">{selectedProperty.city}, {selectedProperty.state} {selectedProperty.zip}</p>
                            </div>
                            <button onClick={() => setSelectedProperty(null)} className="p-1 hover:bg-[#FAFAFA] rounded text-gray-400">
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex gap-4 mt-3 text-[12px]">
                            <div><span className="text-gray-400 font-medium">Beds:</span> <span className="text-gray-900">{selectedProperty.beds}</span></div>
                            <div><span className="text-gray-400 font-medium">Baths:</span> <span className="text-gray-900">{selectedProperty.baths}</span></div>
                            <div><span className="text-gray-400 font-medium">SqFt:</span> <span className="text-gray-900">{selectedProperty.sqft.toLocaleString()}</span></div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
                <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Seller Contact Information</label>
                <div className="space-y-4">
                  <div>
                    <label className="text-[11px] font-semibold text-gray-500 mb-1 block">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input type="text" placeholder="John Doe" className="w-full pl-9 pr-4 py-2 bg-[#FAFAFA] border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-[13px] text-gray-900" value={sellerInfo.name} onChange={(e) => setSellerInfo({ ...sellerInfo, name: e.target.value })} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-semibold text-gray-500 mb-1 block">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="email" placeholder="john@example.com" className="w-full pl-9 pr-4 py-2 bg-[#FAFAFA] border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-[13px] text-gray-900" value={sellerInfo.email} onChange={(e) => setSellerInfo({ ...sellerInfo, email: e.target.value })} />
                      </div>
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-gray-500 mb-1 block">Phone</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="tel" placeholder="(555) 000-0000" className="w-full pl-9 pr-4 py-2 bg-[#FAFAFA] border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-[13px] text-gray-900" value={sellerInfo.phone} onChange={(e) => setSellerInfo({ ...sellerInfo, phone: e.target.value })} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>
        </div>

        {/* Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-10">
          {/* Settings & Final Actions */}
          <div className="lg:col-span-3 space-y-6">
            <section className="bg-white border border-[#EAEAEA] rounded-xl p-5 shadow-sm">
              <h3 className="text-[14px] font-semibold text-gray-900 mb-4">Workflow Settings</h3>
              <div className="space-y-4">
                <OptionToggle icon={<Camera />} label="Allow Photo Upload" value={settings.allowPhotoUpload} onChange={(v) => setSettings({ ...settings, allowPhotoUpload: v })} />
                <OptionToggle icon={<Settings2 />} label="Enable Revisions" value={settings.allowChangeRequests} onChange={(v) => setSettings({ ...settings, allowChangeRequests: v })} />
                <OptionToggle icon={<MessageSquare />} label="Direct Messaging" value={settings.enableMessaging} onChange={(v) => setSettings({ ...settings, enableMessaging: v })} />
              </div>
            </section>

            <section className="bg-indigo-600 rounded-xl p-6 text-white shadow-sm border border-indigo-700">
              <h3 className="text-[12px] font-medium text-indigo-100 uppercase tracking-wider mb-4">Final Review</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-[13px]"><span className="text-indigo-200">Total Forms</span><span className="font-semibold">{selectedForms.length}</span></div>
                <div className="flex justify-between text-[13px]"><span className="text-indigo-200">Est. Time</span><span className="font-semibold">{totalTime} mins</span></div>
              </div>
            </section>
          </div>

          {/* Workflow Builder */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[14px] font-semibold text-gray-900">Seller Custom Workflow</h3>
              <div className="flex items-center gap-2 bg-[#FAFAFA] px-2 py-1 rounded-md border border-[#EAEAEA]">
                <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Est. Time:</span>
                <span className="text-[12px] font-semibold text-indigo-600">{totalTime} mins</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={addStandardForms} className="px-3 py-1.5 bg-white border border-[#EAEAEA] rounded text-[12px] font-medium text-gray-600 hover:bg-[#FAFAFA] transition-colors flex items-center gap-1.5 shadow-sm">
                <LayoutGrid className="w-3.5 h-3.5" /> Standard Focus
              </button>
              <button className="px-3 py-1.5 bg-white border border-[#EAEAEA] rounded text-[12px] font-medium text-gray-600 hover:bg-[#FAFAFA] transition-colors flex items-center gap-1.5 shadow-sm">
                <Camera className="w-3.5 h-3.5" /> Photography
              </button>
            </div>

            <div className="min-h-[300px] bg-[#FAFAFA] p-4 border border-[#EAEAEA] border-dashed rounded-xl">
              {selectedForms.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[280px] text-center text-gray-500">
                  <div className="w-12 h-12 bg-white rounded flex items-center justify-center shadow-sm mb-3">
                    <Plus className="w-6 h-6 text-gray-300" />
                  </div>
                  <p className="font-medium text-[13px]">Add forms to build workflow</p>
                  <p className="text-[11px] text-gray-400 mt-1">Select from the library on the left</p>
                </div>
              ) : (
                <Reorder.Group axis="y" values={selectedForms} onReorder={setSelectedForms} className="space-y-2">
                  {selectedForms.map((form, index) => (
                    <Reorder.Item
                      key={form.id} value={form}
                      className="bg-white border border-[#EAEAEA] rounded-lg p-3 flex items-center gap-3 shadow-sm cursor-grab active:cursor-grabbing"
                    >
                      <div className="flex items-center gap-2 flex-shrink-0 text-gray-400">
                        <GripVertical className="w-4 h-4" />
                        <span className="w-5 h-5 rounded-full bg-gray-100 text-[10px] font-semibold flex items-center justify-center text-gray-600">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-[13px]">{form.title}</h4>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-[11px] text-gray-400 font-medium flex items-center"><Clock className="w-3 h-3 mr-1" /> {form.estimatedTime}</div>
                        <button onClick={() => handleRemoveForm(form.id)} className="p-1 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded"><X className="w-4 h-4" /></button>
                      </div>
                    </Reorder.Item>
                  ))}
                </Reorder.Group>
              )}
            </div>
          </div>


          {/* Form Library */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[14px] font-semibold text-gray-900">Form Library</h3>
              <button onClick={() => openFormEditor()} className="text-[12px] font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                <Plus className="w-3.5 h-3.5" /> New
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-3 max-h-[360px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {FORM_LIBRARY.map((form) => (
                <motion.div
                  key={form.id} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                  className="bg-white border border-[#EAEAEA] rounded-lg p-4 cursor-pointer hover:border-indigo-300 transition-colors shadow-sm relative group"
                  onClick={() => openFormEditor(form)}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-[13px] font-semibold text-gray-900 pr-4">{form.title}</h4>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleAddForm(form); }}
                      className="p-1 rounded hover:bg-indigo-50 hover:text-indigo-600 text-gray-400 opacity-0 group-hover:opacity-100 transition-all absolute top-3 right-3"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-[11px] text-gray-500 mb-3">{form.description}</p>
                  <div className="flex items-center gap-1.5 text-[10px] font-medium text-gray-400 uppercase">
                    <Clock className="w-3 h-3" /> {form.estimatedTime}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OptionToggle({ icon, label, value, onChange }: any) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-gray-700">
        {React.cloneElement(icon, { className: 'w-4 h-4 text-gray-400' })}
        <span className="text-[12px] font-medium">{label}</span>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" checked={value} onChange={(e) => onChange(e.target.checked)} />
        <div className="w-7 h-4 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-indigo-600"></div>
      </label>
    </div>
  );
}

// Below is the mock Seller Workspace App renderer for the demo.
export function SellerWorkspace({ id }: { id: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAFAFA] font-sans text-center px-4">
      <div>
        <div className="w-16 h-16 bg-white border border-[#EAEAEA] rounded-xl flex items-center justify-center mx-auto mb-4 text-indigo-600 shadow-sm">
          <FileSignature className="w-8 h-8" />
        </div>
        <h2 className="text-[24px] font-semibold text-gray-900 mb-2">Seller Experience View</h2>
        <p className="text-[14px] text-gray-500 max-w-sm mx-auto">
          This mock link ({id}) would navigate the seller to a standalone portal away from the operational dashboard.
        </p>
        <button onClick={() => window.close()} className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg text-[13px] font-medium shadow-sm">
          Close Preview
        </button>
      </div>
    </div>
  );
}
