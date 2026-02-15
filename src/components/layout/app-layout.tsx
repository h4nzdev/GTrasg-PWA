'use client';

import { useState, type ReactNode, type Dispatch, type SetStateAction } from 'react';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { Header } from '@/components/layout/header';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { BottomNav } from './bottom-nav';
import { useIsMobile } from '@/hooks/use-mobile';
import type { View } from '@/app/page';

interface AppLayoutProps {
  children: (activeView: View, setActiveView: Dispatch<SetStateAction<View>>) => ReactNode;
  activeView: View;
  setActiveView: Dispatch<SetStateAction<View>>;
  viewTitles: Record<View, string>;
}

export function AppLayout({
  children,
  activeView,
  setActiveView,
  viewTitles,
}: AppLayoutProps) {
  const isMobile = useIsMobile();

  if (activeView === 'scanner' || activeView === 'report-form' || activeView === 'profile' || activeView === 'leaderboard') {
    return children(activeView, setActiveView);
  }

  return (
    <SidebarProvider>
      {!isMobile && (
        <AppSidebar activeView={activeView} setActiveView={setActiveView} />
      )}
      <SidebarInset>
        <Header title={viewTitles[activeView]} setActiveView={setActiveView} />
        <main className="p-4 pt-0 sm:p-6 sm:pt-0 pb-20 md:pb-6">
          {children(activeView, setActiveView)}
        </main>
      </SidebarInset>
      {isMobile && (
        <BottomNav activeView={activeView} setActiveView={setActiveView} />
      )}
    </SidebarProvider>
  );
}
