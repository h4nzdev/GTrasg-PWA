'use client';
import type { Dispatch, SetStateAction } from 'react';
import { Map, MessageCircleWarning, Truck, Settings } from 'lucide-react';
import type { OperatorView } from '@/lib/types';
import { cn } from '@/lib/utils';

interface OperatorBottomNavProps {
  activeView: OperatorView;
  setActiveView: Dispatch<SetStateAction<OperatorView>>;
}

const navItems = [
  { view: 'dashboard', icon: Map, label: 'Route' },
  { view: 'reports', icon: MessageCircleWarning, label: 'Reports' },
  { view: 'vehicle', icon: Truck, label: 'Vehicle' },
  { view: 'settings', icon: Settings, label: 'Settings' },
];

export function OperatorBottomNav({ activeView, setActiveView }: OperatorBottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t border-border md:hidden">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
        {navItems.map((item) => (
          <button
            key={item.view}
            type="button"
            className={cn(
              'inline-flex flex-col items-center justify-center px-5 hover:bg-muted/50 group',
              activeView === item.view ? 'text-primary' : 'text-muted-foreground'
            )}
            onClick={() => setActiveView(item.view as OperatorView)}
          >
            <item.icon className="w-5 h-5 mb-1" />
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
