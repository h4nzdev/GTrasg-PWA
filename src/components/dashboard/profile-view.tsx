'use client';
import {
  ArrowLeft,
  Settings,
  Gem,
  ScanLine,
  FileCheck2,
  CheckCircle2,
  Lock,
  Flag,
  Trash2,
  Sun,
} from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Dispatch, SetStateAction } from 'react';
import type { View } from '@/app/page';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

const badges = [
  { name: 'River Guardian', icon: 'river', unlocked: true },
  { name: 'Consistent Segregator', icon: 'bins', unlocked: true },
  { name: 'Early Bird Tracker', icon: 'sun', unlocked: true },
  { name: 'Forest Protector', icon: 'forest', unlocked: false },
];

const BadgeIcon = ({ icon, className }: { icon: string; className?: string }) => {
  switch (icon) {
    case 'river':
      return (
        <svg
          className={className}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 29C12 29 14 24 24 24C34 24 36 29 36 29"
            stroke="#90E0EF"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 37C12 37 14 32 24 32C34 32 36 37 36 37"
            stroke="#90E0EF"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 14L10 16V40H38V16L44 14"
            stroke="#90E0EF"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'bins':
      return (
        <div className={cn('flex items-center justify-center gap-1', className)}>
          <Trash2 className="h-6 w-6 text-blue-400" />
          <Trash2 className="h-6 w-6 text-yellow-400" />
          <Trash2 className="h-6 w-6 text-green-400" />
        </div>
      );
    case 'sun':
      return <Sun className={cn('text-yellow-300', className)} />;
    default:
      return null;
  }
};

const userAvatar = PlaceHolderImages.find((img) => img.id === 'user-avatar-3');

export function ProfileView({
  setActiveView,
}: {
  setActiveView: Dispatch<SetStateAction<View>>;
}) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-[#1C211F] text-white">
      <header className="sticky top-0 z-10 flex-shrink-0 bg-[#1C211F]/80 backdrop-blur-sm">
        <div className="flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setActiveView('dashboard')}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-lg font-semibold">Eco Stats & Badges</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setActiveView('settings')}
          >
            <Settings className="h-6 w-6" />
          </Button>
        </div>
      </header>

      <div className="flex-1 space-y-6 p-4 pt-0">
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <Avatar className="h-24 w-24 border-4 border-green-400">
              {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="Carlos Cebuano" />}
              <AvatarFallback>CC</AvatarFallback>
            </Avatar>
          </div>
          <h2 className="mt-4 text-2xl font-bold">Carlos Cebuano</h2>
          <div className="mt-1 flex items-center gap-1 text-green-400">
            <Gem className="h-4 w-4" />
            <p className="font-semibold">Eco-Warrior Rank</p>
          </div>
          <p className="mt-1 text-xs text-gray-400">
            Protecting Cebu since Oct 2023
          </p>
        </div>

        <Card className="border-green-600/50 bg-green-900/40 text-white">
          <CardContent className="p-4">
            <div className="flex justify-between text-xs font-semibold uppercase text-gray-400">
              <span>Current Level</span>
              <span>750 / 1000 XP</span>
            </div>
            <h3 className="text-lg font-bold text-white">
              Next: Green Guardian
            </h3>
            <Progress
              value={75}
              className="mt-2 h-2 bg-gray-600 [&>div]:bg-green-400"
            />
            <p className="mt-2 text-xs text-green-300">► 250 XP to level up!</p>
          </CardContent>
        </Card>

        <div>
          <h3 className="mb-2 text-sm font-semibold uppercase text-gray-400">
            Weekly Stats
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-[#2A312E]">
              <CardContent className="flex flex-col items-center justify-center p-4 text-center">
                <ScanLine className="h-6 w-6 text-green-400" />
                <p className="mt-2 text-2xl font-bold">42</p>
                <p className="text-xs text-gray-400">Trash Scanned</p>
              </CardContent>
            </Card>
            <Card className="bg-[#2A312E]">
              <CardContent className="flex flex-col items-center justify-center p-4 text-center">
                <FileCheck2 className="h-6 w-6 text-green-400" />
                <p className="mt-2 text-2xl font-bold">12</p>
                <p className="text-xs text-gray-400">Reports Confirmed</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase text-gray-400">
              Unlocked Badges
            </h3>
            <Button variant="link" className="h-auto p-0 text-xs text-green-400">
              View all
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {badges.map((badge, index) => (
              <Card
                key={index}
                className={cn(
                  'relative aspect-square overflow-hidden',
                  badge.unlocked
                    ? 'bg-gradient-to-br from-green-800/50 to-green-900/30'
                    : 'bg-gray-800/50'
                )}
              >
                <CardContent className="flex h-full flex-col items-center justify-center p-4 text-center">
                  {badge.unlocked ? (
                    <>
                      <div className="flex h-12 w-12 items-center justify-center">
                        <BadgeIcon icon={badge.icon} className="h-10 w-10" />
                      </div>
                      <p className="mt-2 font-semibold text-white">
                        {badge.name}
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-black/50" />
                      <Lock className="h-10 w-10 text-gray-500" />
                      <p className="mt-2 font-semibold text-gray-500">
                        {badge.name}
                      </p>
                    </>
                  )}
                </CardContent>
                {badge.unlocked && (
                  <CheckCircle2 className="absolute right-2 top-2 h-5 w-5 fill-gray-900 text-green-400" />
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>

      <footer className="sticky bottom-0 flex-shrink-0 bg-[#1C211F] p-4 pt-2">
        <Button
          size="lg"
          className="h-14 w-full bg-green-500 text-base font-bold text-black hover:bg-green-600"
          onClick={() => setActiveView('report-form')}
        >
          <Flag className="mr-2 h-5 w-5" />
          Report Illegal Dumping
        </Button>
      </footer>
    </div>
  );
}
