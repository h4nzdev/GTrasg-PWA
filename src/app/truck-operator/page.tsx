'use client';
import { useState, type ReactNode, type Dispatch, type SetStateAction } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import type { OperatorView } from '@/lib/types';
import { DashboardView } from '@/components/truck-operator/dashboard-view';
import { OperatorSidebar } from '@/components/truck-operator/operator-sidebar';
import { OperatorHeader } from '@/components/truck-operator/operator-header';
import { OperatorBottomNav } from '@/components/truck-operator/operator-bottom-nav';
import { SidebarInset } from '@/components/ui/sidebar';

const viewTitles: Record<OperatorView, string> = {
  dashboard: 'Live Route',
  reports: 'Active Reports',
  vehicle: 'Vehicle Status',
  settings: 'Settings',
  profile: 'My Profile',
};

export default function TruckOperatorPage() {
  const [activeView, setActiveView] = useState<OperatorView>('dashboard');
  const isMobile = useIsMobile();

  const renderContent = () => {
    switch(activeView) {
      case 'dashboard':
        return <DashboardView />;
      // Other cases for other views can be added here
      default:
        return (
            <div className="p-4 sm:p-6">
                <h2 className="text-2xl font-bold">{viewTitles[activeView]}</h2>
                <p className="text-muted-foreground">Content for this view is not yet implemented.</p>
            </div>
        );
    }
  }

  if (isMobile && activeView === 'dashboard') {
    return <DashboardView />;
  }
  
  return (
    <>
        {!isMobile && (
            <OperatorSidebar activeView={activeView} setActiveView={setActiveView} />
        )}
        <SidebarInset>
            <OperatorHeader title={viewTitles[activeView]} setActiveView={setActiveView} />
            <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
                {renderContent()}
            </main>
        </SidebarInset>
        {isMobile && (
            <OperatorBottomNav activeView={activeView} setActiveView={setActiveView} />
        )}
    </>
  )
}
