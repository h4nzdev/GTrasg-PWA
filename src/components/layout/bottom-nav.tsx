'use client';

import type { Dispatch, SetStateAction } from 'react';
import { Map, ScanLine, MessageCircleWarning, Trophy, Settings, History } from 'lucide-react';
import type { View } from '@/app/dashboard/page';
import { cn } from '@/lib/utils';

interface BottomNavProps {
  activeView: View;
  setActiveView: Dispatch<SetStateAction<View>>;
}

const navItems = [
  { view: 'dashboard', icon: Map, label: 'Map' },
  { view: 'history', icon: History, label: 'History' },
  { view: 'scanner', icon: ScanLine, label: 'Scanner' },
  { view: 'leaderboard', icon: Trophy, label: 'Ranking' },
  { view: 'settings', icon: Settings, label: 'Settings' },
];

export function BottomNav({ activeView, setActiveView }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t border-border md:hidden">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
        {navItems.map((item) => {
          if (item.view === 'scanner') {
            return (
              <div key={item.view} className="flex items-center justify-center">
                <button
                  type="button"
                  aria-label={item.label}
                  className={cn(
                    'inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg -translate-y-4 ring-4 ring-background transition-transform hover:scale-110',
                    activeView === item.view && 'ring-primary'
                  )}
                  onClick={() => setActiveView(item.view as View)}
                >
                  <item.icon className="w-7 h-7" />
                </button>
              </div>
            );
          }

          return (
            <button
              key={item.view}
              type="button"
              className={cn(
                'inline-flex flex-col items-center justify-center px-1 hover:bg-muted/50 group',
                activeView === item.view
                  ? 'text-primary'
                  : 'text-muted-foreground'
              )}
              onClick={() => setActiveView(item.view as View)}
            >
              <item.icon className="w-5 h-5 mb-1" />
              <span className="text-[10px]">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
