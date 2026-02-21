'use client';

import { AppLayout } from '@/components/layout/app-layout';
import { MapView } from '@/components/dashboard/map-view';
import { ScannerView } from '@/components/dashboard/scanner-view';
import { ReportsView } from '@/components/dashboard/reports-view';
import { ProfileView } from '@/components/dashboard/profile-view';
import { SettingsView } from '@/components/dashboard/settings-view';
import { ReportFormView } from '@/components/dashboard/report-form-view';
import { LeaderboardView } from '@/components/dashboard/leaderboard-view';
import { ReportProgressView } from '@/components/dashboard/report-progress-view';
import { HistoryView } from '@/components/dashboard/history-view';
import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import type { Report } from '@/lib/types';

export type View =
  | 'dashboard'
  | 'scanner'
  | 'reports'
  | 'profile'
  | 'settings'
  | 'report-form'
  | 'leaderboard'
  | 'report-progress'
  | 'history';

const viewTitles: Record<View, string> = {
  dashboard: 'Truck Tracker',
  scanner: 'AI Waste Scanner',
  reports: 'Community Feed',
  profile: 'Eco Stats & Badges',
  settings: 'Settings',
  'report-form': 'Community Report',
  leaderboard: 'Leaderboard',
  'report-progress': 'Report Progress',
  history: 'Disposal History',
};

export default function DashboardPage() {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const handleViewProgress = (report: Report) => {
    setSelectedReport(report);
    setActiveView('report-progress');
  };

  return (
    <AppLayout viewTitles={viewTitles} activeView={activeView} setActiveView={setActiveView}>
      {(activeView, setActiveView) => (
        <>
          {activeView === 'dashboard' && <MapView setActiveView={setActiveView} />}
          {activeView === 'scanner' && <ScannerView setActiveView={setActiveView} />}
          {activeView === 'reports' && (
            <ReportsView setActiveView={setActiveView} onViewProgress={handleViewProgress} />
          )}
          {activeView === 'profile' && <ProfileView setActiveView={setActiveView} />}
          {activeView === 'settings' && <SettingsView />}
          {activeView === 'report-form' && <ReportFormView setActiveView={setActiveView} />}
          {activeView === 'leaderboard' && <LeaderboardView />}
          {activeView === 'report-progress' && (
            <ReportProgressView report={selectedReport} setActiveView={setActiveView} />
          )}
          {activeView === 'history' && <HistoryView />}
        </>
      )}
    </AppLayout>
  );
}
