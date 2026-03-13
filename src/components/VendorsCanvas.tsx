import {
  CalendarDays,
  Check,
  ChevronRight,
  Mail,
  MoreHorizontal,
  Phone,
  Search,
  Sparkles,
  Star,
  X,
  MapPin,
  MessageSquare,
  Clock,
  Calendar,
  Camera,
  Globe,
  Brush,
  Wrench,
  Leaf
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const categoryConfig: Record<string, { icon: any, color: string }> = {
  'Photographer': { icon: Camera, color: 'text-indigo-600 bg-indigo-50 border-indigo-100' },
  'Drone': { icon: Globe, color: 'text-blue-600 bg-blue-50 border-blue-100' },
  'Stager': { icon: Brush, color: 'text-purple-600 bg-purple-50 border-purple-100' },
  'Cleaner': { icon: Sparkles, color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
  'Inspector': { icon: Search, color: 'text-amber-600 bg-orange-50 border-orange-100' },
  'Handyman': { icon: Wrench, color: 'text-orange-600 bg-orange-50 border-orange-100' },
  'Landscaper': { icon: Leaf, color: 'text-green-600 bg-green-50 border-green-100' },
};

const categoryMapping: Record<string, string> = {
  'Photographers': 'Photographer',
  'Stagers': 'Stager',
  'Cleaners': 'Cleaner',
  'Inspectors': 'Inspector',
  'Handymen': 'Handyman'
};

export function VendorsCanvas() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const [isAddVendorOpen, setIsAddVendorOpen] = useState(false);
  const categories = ['All', 'Photographers', 'Stagers', 'Cleaners', 'Inspectors', 'Handymen'];

  const vendors = [
    {
      id: 1,
      name: "Tyler Brooks",
      company: "ATX Visual Studios",
      categories: ["Photographer", "Drone"],
      rating: 4.9,
      jobs: 312,
      reliability: "98%",
      nextAvailable: "Mar 4",
      availability: [
        { date: "Mar 4", status: "available" },
        { date: "Mar 5", status: "available" },
        { date: "Mar 6", status: "unavailable" },
      ],
      badge: "Top Rated Vendor",
      avatar: "TB",
      sla: "48h delivery",
      responseTime: "< 2 hours",
      priceRange: "$350–$650"
    },
    {
      id: 2,
      name: "Sarah Jenkins",
      company: "Elite Home Staging",
      categories: ["Stager"],
      rating: 4.8,
      jobs: 184,
      reliability: "95%",
      nextAvailable: "Mar 6",
      availability: [
        { date: "Mar 4", status: "unavailable" },
        { date: "Mar 5", status: "unavailable" },
        { date: "Mar 6", status: "available" },
      ],
      badge: "Most Reliable",
      avatar: "SJ",
      sla: "24h quote",
      responseTime: "< 1 hour",
      priceRange: "$500–$1,200"
    },
    {
      id: 3,
      name: "Marcus Chen",
      company: "Sparkle Cleaners",
      categories: ["Cleaner"],
      rating: 4.7,
      jobs: 420,
      reliability: "99%",
      nextAvailable: "Mar 4",
      availability: [
        { date: "Mar 4", status: "available" },
        { date: "Mar 5", status: "available" },
        { date: "Mar 6", status: "available" },
      ],
      badge: "Fastest Response",
      avatar: "MC",
      sla: "Same day service",
      responseTime: "< 30 mins",
      priceRange: "$150–$300"
    }
  ];

  const filteredVendors = activeCategory === 'All' 
    ? vendors 
    : vendors.filter(vendor => 
        vendor.categories.some(cat => {
          const mappedCategory = categoryMapping[activeCategory] || activeCategory;
          return cat === mappedCategory;
        })
      );

  return (
    <div className="flex-1 flex flex-col h-full bg-white relative">
      {/* Top Bar */}
      <div className="h-12 border-b border-[#EAEAEA] flex items-center px-6 justify-between flex-shrink-0">
        <div className="flex items-center text-gray-500 space-x-2 text-[13px]">
          <span>Operations</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 font-medium">Vendor Network</span>
        </div>
        <div className="flex items-center space-x-3">
          <Search className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
          <MoreHorizontal className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 mx-auto w-full">
        <div className="mb-6 flex justify-between items-end">
          <div>
            <h1 className="text-[28px] font-semibold tracking-tight text-gray-900 mb-2">
              Vendor Network
            </h1>
            <p className="text-[14px] text-gray-500">
              Manage and schedule service providers for your listing preparations.
            </p>
          </div>
          <button 
            onClick={() => setIsAddVendorOpen(true)}
            className="px-3 py-1.5 text-[13px] font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-sm transition-colors"
          >
            Add Vendor
          </button>
        </div>

        {/* Category Navigation */}
        <div className="flex space-x-1 mb-8 border-b border-[#EAEAEA] pb-px">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 text-[13px] font-medium border-b-2 transition-colors ${
                activeCategory === category 
                  ? 'border-indigo-600 text-indigo-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid of Vendors */}
        {filteredVendors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVendors.map(vendor => (
              <VendorCard key={vendor.id} vendor={vendor} onOpenModal={() => setSelectedVendor(vendor)} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-6">
              <Search className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-[18px] font-semibold text-gray-900 mb-2">No vendors found</h3>
            <p className="text-[14px] text-gray-500 max-w-sm mb-8">
              We couldn't find any vendors in the "{activeCategory}" category. Try selecting a different category or add a new vendor to your network.
            </p>
            <div className="flex space-x-3">
              <button 
                onClick={() => setActiveCategory('All')}
                className="px-4 py-2 text-[13px] font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-md transition-colors"
              >
                Clear Filters
              </button>
              <button 
                onClick={() => setIsAddVendorOpen(true)}
                className="px-4 py-2 text-[13px] font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-sm transition-colors"
              >
                Add Vendor
              </button>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedVendor && (
          <ScheduleModal vendor={selectedVendor} onClose={() => setSelectedVendor(null)} />
        )}
        {isAddVendorOpen && (
          <AddVendorOffcanvas onClose={() => setIsAddVendorOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function VendorCard({ vendor, onOpenModal }: { vendor: any, onOpenModal: () => void, key?: any }) {
  return (
    <motion.div 
      whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)" }}
      className="border border-[#EAEAEA] rounded-xl p-5 bg-white shadow-sm transition-all flex flex-col"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-[14px]">
            {vendor.avatar}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-[15px] tracking-tight leading-tight">{vendor.name}</h3>
            <p className="text-gray-500 text-[12px]">{vendor.company}</p>
          </div>
        </div>
        <MoreHorizontal className="w-4 h-4 text-gray-400 cursor-pointer" />
      </div>

      {/* Categories & Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        {vendor.categories.map((cat: string) => {
          const config = categoryConfig[cat] || { icon: Sparkles, color: 'text-gray-600 bg-gray-100 border-gray-200' };
          const Icon = config.icon;
          return (
            <span key={cat} className={`text-[10px] font-medium ${config.color} px-3 py-1 rounded-full flex items-center transition-all hover:opacity-80 border`}>
              <Icon className="w-3.5 h-3.5 mr-1.5" />
              {cat}
            </span>
          );
        })}
        {vendor.badge && (
          <span className="text-[10px] font-medium text-amber-700 bg-amber-50 border border-amber-100 px-3 py-1 rounded-full flex items-center">
            <Star className="w-3 h-3 mr-1.5 fill-amber-500 text-amber-500" /> {vendor.badge}
          </span>
        )}
      </div>
      
      {/* Performance Row */}
      <div className="flex items-center text-[12px] text-gray-500 mb-4 pb-4 border-b border-gray-100">
        <Star className="w-3.5 h-3.5 text-amber-400 mr-1.5 fill-amber-400" />
        <span className="font-medium text-gray-900 mr-1">{vendor.rating} Rating</span>
        <span className="mx-2 text-gray-300">|</span>
        <span>{vendor.jobs} Jobs</span>
        <span className="mx-2 text-gray-300">|</span>
        <span>{vendor.reliability} On-time</span>
      </div>

      {/* Availability */}
      <div className="mb-6">
        <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center">
          <CalendarDays className="w-3.5 h-3.5 mr-1.5" /> Next Available
        </div>
        <div className="flex space-x-2">
          {vendor.availability.map((day: any, idx: number) => (
            <div key={idx} className={`flex items-center text-[11px] px-2 py-1.5 rounded transition-colors ${day.status === 'available' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-gray-50 text-gray-400 border border-gray-100'}`}>
              {day.date} 
              {day.status === 'available' ? <Check className="w-3 h-3 ml-1" /> : <X className="w-3 h-3 ml-1" />}
            </div>
          ))}
        </div>
      </div>

      {/* Refined Details Grid */}
      <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-6 pt-2">
        {/* Row 1 */}
        <div className="flex items-center text-[13px] text-gray-500 whitespace-nowrap">
          <Clock className="w-4 h-4 mr-2 text-gray-400" />
          <span>SLA: {vendor.sla}</span>
        </div>
        <div className="flex items-center text-[13px] text-gray-500 whitespace-nowrap">
          <MessageSquare className="w-4 h-4 mr-2 text-gray-400" />
          <span>Responds in {vendor.responseTime}</span>
        </div>
        
        {/* Row 2 */}
        <div className="text-[15px] font-semibold text-gray-700">
          {vendor.priceRange}
        </div>
        <div className="flex items-center text-[13px] text-gray-500 whitespace-nowrap">
          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
          <span>Next available: {vendor.nextAvailable}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-2 mt-auto pt-4 border-t border-[#EAEAEA]">
        <button 
          onClick={onOpenModal}
          className="flex-1 px-3 py-2 text-[14px] font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-all active:scale-[0.98]"
        >
          Schedule Vendor
        </button>
        <button className="p-2 text-gray-500 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors border border-[#EAEAEA]">
          <Phone className="w-4 h-4" />
        </button>
        <button className="p-2 text-gray-500 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors border border-[#EAEAEA]">
          <Mail className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

function ScheduleModal({ vendor, onClose }: { vendor: any, onClose: () => void }) {
  const [selectedDate, setSelectedDate] = useState('Mar 4');
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [commMethod, setCommMethod] = useState('sms');

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
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header / Vendor Summary */}
        <div className="px-6 py-5 border-b border-[#EAEAEA] bg-[#FAFAFA] flex items-start justify-between z-10">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-[16px]">
              {vendor.avatar}
            </div>
            <div>
              <h2 className="text-[18px] font-semibold text-gray-900 leading-tight">{vendor.name}</h2>
              <p className="text-[13px] text-gray-500 mb-1">{vendor.company} • {vendor.categories.join(', ')}</p>
              <div className="flex items-center text-[12px] text-gray-600">
                <Star className="w-3.5 h-3.5 text-amber-400 mr-1 fill-amber-400" />
                <span className="font-medium text-gray-900 mr-1">{vendor.rating} rating</span>
                <span className="mx-1">·</span>
                <span>{vendor.jobs} jobs</span>
                <span className="mx-1">·</span>
                <span className="text-emerald-600 font-medium">Next available: {vendor.nextAvailable}</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* Listing Selection */}
          <div>
            <label className="block text-[12px] font-semibold text-gray-900 uppercase tracking-wider mb-3">Select Listing</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="w-4 h-4 text-gray-400" />
              </div>
              <select className="block w-full pl-10 pr-10 py-2.5 text-[14px] border border-[#EAEAEA] rounded-lg focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white shadow-sm">
                <option>4521 Barton Creek Blvd</option>
                <option>1209 Riverside Dr, Unit 4B</option>
                <option>8804 Highland Ave</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ChevronRight className="w-4 h-4 text-gray-400 rotate-90" />
              </div>
            </div>
            <p className="mt-2 text-[11px] text-gray-500 flex items-center">
              <Sparkles className="w-3 h-3 mr-1 text-indigo-500" /> Recommended Vendor: Used in 12 previous listings in this area.
            </p>
          </div>

          {/* Task Selection */}
          <div>
            <label className="block text-[12px] font-semibold text-gray-900 uppercase tracking-wider mb-3">Task</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {['Photography', 'Drone Photography', 'Cleaning', 'Staging'].map(task => (
                <div 
                  key={task}
                  className={`border rounded-lg p-3 text-center cursor-pointer transition-all ${task === 'Photography' ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-500' : 'border-[#EAEAEA] hover:border-gray-300 text-gray-700'}`}
                >
                  <div className="text-[13px] font-medium">{task}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Availability Selection */}
          <div>
            <label className="block text-[12px] font-semibold text-gray-900 uppercase tracking-wider mb-3">Availability</label>
            
            {/* Dates */}
            <div className="flex space-x-3 mb-4 overflow-x-auto pb-2 hide-scrollbar">
              {['Mar 4', 'Mar 5', 'Mar 6', 'Mar 7'].map(date => {
                const isAvailable = date !== 'Mar 6';
                const isSelected = selectedDate === date;
                return (
                  <button
                    key={date}
                    disabled={!isAvailable}
                    onClick={() => setSelectedDate(date)}
                    className={`flex-shrink-0 flex flex-col items-center justify-center w-16 h-16 rounded-lg border transition-all ${
                      !isAvailable ? 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed' :
                      isSelected ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-500' :
                      'border-[#EAEAEA] hover:border-gray-300 bg-white text-gray-700'
                    }`}
                  >
                    <span className="text-[11px] uppercase">{date.split(' ')[0]}</span>
                    <span className="text-[16px] font-semibold">{date.split(' ')[1]}</span>
                    {isAvailable ? <Check className={`w-3 h-3 mt-1 ${isSelected ? 'text-indigo-600' : 'text-emerald-500'}`} /> : <X className="w-3 h-3 mt-1 text-gray-400" />}
                  </button>
                );
              })}
            </div>

            {/* Times */}
            <div className="grid grid-cols-3 gap-3">
              {['10:00 AM', '12:00 PM', '2:00 PM'].map(time => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`py-2 text-[13px] font-medium rounded-md border transition-all ${
                    selectedTime === time 
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-sm' 
                      : 'border-[#EAEAEA] bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Communication Options */}
          <div>
            <label className="block text-[12px] font-semibold text-gray-900 uppercase tracking-wider mb-3">Send Request Via</label>
            <div className="flex bg-gray-100 p-1 rounded-lg w-full max-w-xs">
              <button 
                onClick={() => setCommMethod('sms')}
                className={`flex-1 flex items-center justify-center py-2 text-[13px] font-medium rounded-md transition-all ${commMethod === 'sms' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                SMS
              </button>
              <button 
                onClick={() => setCommMethod('email')}
                className={`flex-1 flex items-center justify-center py-2 text-[13px] font-medium rounded-md transition-all ${commMethod === 'email' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Mail className="w-4 h-4 mr-2" />
                Email
              </button>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-[#EAEAEA] bg-[#FAFAFA] flex justify-end space-x-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-[13px] font-medium text-gray-700 bg-white border border-[#EAEAEA] hover:bg-gray-50 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button className="px-6 py-2 text-[13px] font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-sm transition-colors">
            Send Request
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function AddVendorOffcanvas({ onClose }: { onClose: () => void }) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (cat: string) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter(c => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-[#EAEAEA]"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#EAEAEA] bg-[#FAFAFA] flex items-start justify-between z-10">
          <div>
            <h2 className="text-[18px] font-semibold text-gray-900 leading-tight">Add New Vendor</h2>
            <p className="text-[13px] text-gray-500 mt-1">Invite a service provider to your network.</p>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* Vendor Details */}
          <div>
            <label className="block text-[12px] font-semibold text-gray-900 uppercase tracking-wider mb-4">Vendor Details</label>
            <div className="space-y-4">
              <div>
                <label className="block text-[13px] font-medium text-gray-700 mb-1.5">Full Name</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 text-[13px] border border-[#EAEAEA] rounded-md focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors shadow-sm" 
                  placeholder="e.g. Jane Doe" 
                />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-gray-700 mb-1.5">Company Name</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 text-[13px] border border-[#EAEAEA] rounded-md focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors shadow-sm" 
                  placeholder="e.g. Elite Staging" 
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <label className="block text-[12px] font-semibold text-gray-900 uppercase tracking-wider mb-4">Contact Information</label>
            <div className="space-y-4">
              <div>
                <label className="block text-[13px] font-medium text-gray-700 mb-1.5">Email Address</label>
                <input 
                  type="email" 
                  className="w-full px-3 py-2 text-[13px] border border-[#EAEAEA] rounded-md focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors shadow-sm" 
                  placeholder="jane@example.com" 
                />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-gray-700 mb-1.5">Phone Number</label>
                <input 
                  type="tel" 
                  className="w-full px-3 py-2 text-[13px] border border-[#EAEAEA] rounded-md focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors shadow-sm" 
                  placeholder="(555) 123-4567" 
                />
              </div>
            </div>
          </div>

          {/* Service Categories */}
          <div>
            <label className="block text-[12px] font-semibold text-gray-900 uppercase tracking-wider mb-4">Service Categories</label>
            <div className="flex flex-wrap gap-2">
              {['Photographer', 'Drone', 'Cleaner', 'Stager', 'Inspector', 'Handyman', 'Landscaper'].map(cat => {
                const isSelected = selectedCategories.includes(cat);
                return (
                  <button 
                    key={cat} 
                    onClick={() => toggleCategory(cat)}
                    className={`px-3 py-1.5 text-[10px] font-medium rounded-md transition-all border ${
                      isSelected 
                        ? 'bg-indigo-50 border-indigo-200 text-indigo-700' 
                        : 'bg-white border-[#EAEAEA] text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Notes */}
          <div>
            <label className="block text-[13px] font-medium text-gray-700 mb-1.5">Internal Notes (Optional)</label>
            <textarea 
              className="w-full px-3 py-2 text-[13px] border border-[#EAEAEA] rounded-md focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors shadow-sm min-h-[80px] resize-none" 
              placeholder="Add any specific details about this vendor..." 
            />
          </div>

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-[#EAEAEA] bg-[#FAFAFA] flex justify-end space-x-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-[13px] font-medium text-gray-700 bg-white border border-[#EAEAEA] hover:bg-gray-50 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button className="px-6 py-2 text-[13px] font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-sm transition-colors">
            Add Vendor
          </button>
        </div>
      </motion.div>
    </div>
  );
}
