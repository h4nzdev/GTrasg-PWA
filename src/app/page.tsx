'use client';

import { useState } from 'react';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { Header } from '@/components/layout/header';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { MapView } from '@/components/dashboard/map-view';
import { ScannerView } from '@/components/dashboard/scanner-view';
import { ReportsView } from '@/components/dashboard/reports-view';
import { LeaderboardView } from '@/components/dashboard/leaderboard-view';

export type View = 'dashboard' | 'scanner' | 'reports' | 'leaderboard';

const viewTitles: Record<View, string> = {
  dashboard: 'Live Waste Collection',
  scanner: 'AI Waste Scanner',
  reports: 'Community Reports',
  leaderboard: 'Eco-Points Leaderboard',
};

export default function Home() {
  const [activeView, setActiveView] = useState<View>('dashboard');

  return (
    <SidebarProvider>
      <AppSidebar activeView={activeView} setActiveView={setActiveView} />
      <SidebarInset>
        <Header title={viewTitles[activeView]} />
        <main className="p-4 pt-0 sm:p-6 sm:pt-0">
          {activeView === 'dashboard' && <MapView />}
          {activeView === 'scanner' && <ScannerView />}
          {activeView === 'reports' && <ReportsView />}
          {activeView === 'leaderboard' && <LeaderboardView />}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
