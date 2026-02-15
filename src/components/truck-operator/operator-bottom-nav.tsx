'use client';
import type { Dispatch, SetStateAction } from 'react';
import { Map, MessageSquare, Plus, BarChart, User } from 'lucide-react';
import type { OperatorView } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

interface OperatorBottomNavProps {
  activeView: OperatorView;
  setActiveView: Dispatch<SetStateAction<OperatorView>>;
}

const navItems = [
  { view: 'dashboard', icon: Map, label: 'Route' },
  { view: 'feed', icon: MessageSquare, label: 'Feed' },
  { view: 'stats', icon: BarChart, label: 'Stats' },
  { view: 'profile', icon: User, label: 'Profile' },
];

export function OperatorBottomNav({ activeView, setActiveView }: OperatorBottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full h-20 bg-[#1A2C3A] border-t border-blue-400/20 md:hidden">
      <div className="grid h-full grid-cols-5 mx-auto font-medium">
        {navItems.slice(0, 2).map((item) => (
          <button
            key={item.view}
            type="button"
            className={cn(
              'inline-flex flex-col items-center justify-center px-5 group',
              activeView === item.view
                ? 'text-green-400'
                : 'text-gray-400 hover:text-white'
            )}
            onClick={() => setActiveView(item.view as OperatorView)}
          >
            <item.icon className="w-6 h-6 mb-1" />
            <span className="text-xs font-bold uppercase">{item.label}</span>
          </button>
        ))}

        <div className="flex items-center justify-center">
            <Button size="icon" className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 shadow-lg -translate-y-6 ring-4 ring-[#1A2C3A]">
                <Plus className="h-8 w-8" />
            </Button>
        </div>

        {navItems.slice(2).map((item) => (
          <button
            key={item.view}
            type="button"
            className={cn(
              'inline-flex flex-col items-center justify-center px-5 group',
              activeView === item.view
                ? 'text-green-400'
                : 'text-gray-400 hover:text-white'
            )}
            onClick={() => setActiveView(item.view as OperatorView)}
          >
            <item.icon className="w-6 h-6 mb-1" />
            <span className="text-xs font-bold uppercase">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
