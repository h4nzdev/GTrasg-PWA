'use client';
import { useState, type ReactNode, type Dispatch, type SetStateAction } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import type { OperatorView } from '@/lib/types';
import { DashboardView } from '@/components/truck-operator/dashboard-view';
import { TaskFeedView } from '@/components/truck-operator/task-feed-view';
import { StatsView } from '@/components/truck-operator/stats-view';
import { ProfileView } from '@/components/truck-operator/profile-view';
import { OperatorSidebar } from '@/components/truck-operator/operator-sidebar';
import { OperatorHeader } from '@/components/truck-operator/operator-header';
import { OperatorBottomNav } from '@/components/truck-operator/operator-bottom-nav';
import { SidebarInset } from '@/components/ui/sidebar';

const viewTitles: Record<OperatorView, string> = {
  dashboard: 'Live Route',
  feed: 'Task Feed',
  stats: 'Vehicle Stats',
  settings: 'Settings',
  profile: 'My Profile',
};

export default function TruckOperatorPage() {
  const [activeView, setActiveView] = useState<OperatorView>('stats');
  const isMobile = useIsMobile();

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView />;
      case 'feed':
        return <TaskFeedView />;
      case 'stats':
        return <StatsView />;
      case 'profile':
        return <ProfileView />;
      // Other cases for other views can be added here
      default:
        return (
          <div className="p-4 sm:p-6">
            <h2 className="text-2xl font-bold">{viewTitles[activeView]}</h2>
            <p className="text-muted-foreground">
              Content for this view is not yet implemented.
            </p>
          </div>
        );
    }
  };

  return (
    <>
      {!isMobile && <OperatorSidebar activeView={activeView} setActiveView={setActiveView} />}
      <SidebarInset>
        {activeView !== 'feed' && activeView !== 'stats' && activeView !== 'profile' && (
          <OperatorHeader title={viewTitles[activeView]} setActiveView={setActiveView} />
        )}
        <main className="flex-1 overflow-y-auto pb-20 md:pb-0 bg-[#131A21]">
          {renderContent()}
        </main>
      </SidebarInset>
      {isMobile && <OperatorBottomNav activeView={activeView} setActiveView={setActiveView} />}
    </>
  );
}
