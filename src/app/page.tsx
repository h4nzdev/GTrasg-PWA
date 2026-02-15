'use client';

import { AppLayout } from '@/components/layout/app-layout';
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
  return (
    <AppLayout viewTitles={viewTitles}>
      {(activeView) => (
        <>
          {activeView === 'dashboard' && <MapView />}
          {activeView === 'scanner' && <ScannerView />}
          {activeView === 'reports' && <ReportsView />}
          {activeView === 'leaderboard' && <LeaderboardView />}
        </>
      )}
    </AppLayout>
  );
}
