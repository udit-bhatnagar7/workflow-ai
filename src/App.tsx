import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { WeatherCanvas } from './components/WeatherCanvas';
import { VendorsCanvas } from './components/VendorsCanvas';
import { TemplatesCanvas } from './components/TemplatesCanvas';
import { SchedulerCanvas } from './components/SchedulerCanvas';

export default function App() {
  const [activePage, setActivePage] = useState('scheduler');

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#FAFAFA] font-sans text-[13px]">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      {activePage === 'weather' && <WeatherCanvas />}
      {activePage === 'vendors' && <VendorsCanvas />}
      {activePage === 'templates' && <TemplatesCanvas />}
      {activePage === 'scheduler' && <SchedulerCanvas />}
    </div>
  );
}
