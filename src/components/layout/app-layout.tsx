'use client';

import { useState, type ReactNode } from 'react';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { Header } from '@/components/layout/header';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { BottomNav } from './bottom-nav';
import { useIsMobile } from '@/hooks/use-mobile';
import type { View } from '@/app/page';

interface AppLayoutProps {
  children: (activeView: View) => ReactNode;
  initialView?: View;
  viewTitles: Record<View, string>;
}

export function AppLayout({
  children,
  initialView = 'dashboard',
  viewTitles,
}: AppLayoutProps) {
  const [activeView, setActiveView] = useState<View>(initialView);
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      {!isMobile && (
        <AppSidebar activeView={activeView} setActiveView={setActiveView} />
      )}
      <SidebarInset>
        <Header title={viewTitles[activeView]} />
        <main className="p-4 pt-0 sm:p-6 sm:pt-0 pb-20 md:pb-6">
          {children(activeView)}
        </main>
      </SidebarInset>
      {isMobile && (
        <BottomNav activeView={activeView} setActiveView={setActiveView} />
      )}
    </SidebarProvider>
  );
}
