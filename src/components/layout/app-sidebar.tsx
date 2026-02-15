'use client';

import type { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Map,
  MessageCircleWarning,
  Recycle,
  ScanLine,
  LogOut,
  Settings,
  User,
  Trophy,
} from 'lucide-react';

import type { View } from '@/app/dashboard/page';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '../ui/button';

interface AppSidebarProps {
  activeView: View;
  setActiveView: Dispatch<SetStateAction<View>>;
}

export function AppSidebar({ activeView, setActiveView }: AppSidebarProps) {
  const userAvatar = PlaceHolderImages.find((img) => img.id === 'user-avatar-1');
  const router = useRouter();

  return (
    <Sidebar>
      <SidebarHeader className="group-data-[collapsible=icon]:-ml-1.5">
        <Recycle className="size-8 text-accent" />
        <div className="duration-200 group-data-[collapsible=icon]:opacity-0">
          <h1 className="text-xl font-semibold">GTrash</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => setActiveView('dashboard')}
              isActive={activeView === 'dashboard'}
              tooltip="Dashboard"
            >
              <Map />
              <span>Live Map</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => setActiveView('scanner')}
              isActive={activeView === 'scanner'}
              tooltip="Scanner"
            >
              <ScanLine />
              <span>AI Scanner</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => setActiveView('reports')}
              isActive={activeView === 'reports'}
              tooltip="Community Feed"
            >
              <MessageCircleWarning />
              <span>Community Feed</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => setActiveView('leaderboard')}
              isActive={activeView === 'leaderboard'}
              tooltip="Leaderboard"
            >
              <Trophy />
              <span>Leaderboard</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => setActiveView('settings')}
              isActive={activeView === 'settings'}
              tooltip="Settings"
            >
              <Settings />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarSeparator />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-auto w-full justify-start gap-2 p-2">
              <Avatar className="size-8">
                {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="User avatar" />}
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start duration-200 group-data-[collapsible=icon]:opacity-0">
                <span className="text-sm font-medium">Juan Dela Cruz</span>
                <span className="text-xs text-muted-foreground">
                  juan@email.com
                </span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="start">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setActiveView('profile')}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push('/')}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
