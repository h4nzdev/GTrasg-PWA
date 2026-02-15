'use client';

import { AppLayout } from '@/components/layout/app-layout';
import { MapView } from '@/components/dashboard/map-view';
import { ScannerView } from '@/components/dashboard/scanner-view';
import { ReportsView } from '@/components/dashboard/reports-view';
import { LeaderboardView } from '@/components/dashboard/leaderboard-view';
import type { Dispatch, SetStateAction } from 'react';

export type View = 'dashboard' | 'scanner' | 'reports' | 'leaderboard';

const viewTitles: Record<View, string> = {
  dashboard: 'Truck Tracker',
  scanner: 'AI Waste Scanner',
  reports: 'Community Reports',
  leaderboard: 'Eco-Points Leaderboard',
};

export default function Home() {
  return (
    <AppLayout viewTitles={viewTitles}>
      {(activeView, setActiveView) => (
        <>
          {activeView === 'dashboard' && <MapView setActiveView={setActiveView} />}
          {activeView === 'scanner' && <ScannerView />}
          {activeView === 'reports' && <ReportsView />}
          {activeView === 'leaderboard' && <LeaderboardView />}
        </>
      )}
    </AppLayout>
  );
}
