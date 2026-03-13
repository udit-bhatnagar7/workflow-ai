import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { WeatherCanvas } from './components/WeatherCanvas';
import { VendorsCanvas } from './components/VendorsCanvas';
import { TemplatesCanvas } from './components/TemplatesCanvas';
import { SchedulerCanvas } from './components/SchedulerCanvas';
import { DashboardCanvas } from './components/DashboardCanvas';
import { SellerWorkflowCanvas, SellerWorkspace } from './components/SellerWorkflowCanvas';
import { SellerDisclosure } from './components/SellerDisclosure';
import { ListingAgreement } from './components/ListingAgreement';
import { FormsDashboard } from './components/FormsDashboard';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');

  // Handle mock magic link navigation
  if (window.location.pathname.startsWith('/seller/')) {
    const id = window.location.pathname.split('/')[2] || 'preview';
    return <SellerWorkspace id={id} />;
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#FAFAFA] font-sans text-[13px]">
      {activePage !== 'listing-agreement' && <Sidebar activePage={activePage} setActivePage={setActivePage} />}
      {activePage === 'dashboard' && <DashboardCanvas setActivePage={setActivePage} />}
      {activePage === 'seller-workflow' && <SellerWorkflowCanvas />}
      {activePage === 'weather' && <WeatherCanvas />}
      {activePage === 'vendors' && <VendorsCanvas />}
      {activePage === 'templates' && <TemplatesCanvas />}
      {activePage === 'scheduler' && <SchedulerCanvas />}
      {activePage === 'listing-agreement' && <ListingAgreement setActivePage={setActivePage} />}
      {activePage === 'seller-disclosure' && <SellerDisclosure />}
      {activePage === 'forms-manager' && <FormsDashboard setActivePage={setActivePage} />}
    </div>
  );
}
