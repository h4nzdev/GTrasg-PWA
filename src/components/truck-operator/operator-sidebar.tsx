'use client';
import type { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/navigation';
import {
  Map,
  ListTodo,
  Truck,
  Settings,
  LogOut,
  User,
  BarChart,
} from 'lucide-react';
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
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import type { OperatorView } from '@/lib/types';

export function OperatorSidebar({
  activeView,
  setActiveView,
}: {
  activeView: OperatorView;
  setActiveView: Dispatch<SetStateAction<OperatorView>>;
}) {
  const router = useRouter();

  return (
    <Sidebar>
      <SidebarHeader className="group-data-[collapsible=icon]:-ml-1.5">
        <Truck className="size-8 text-accent" />
        <div className="duration-200 group-data-[collapsible=icon]:opacity-0">
          <h1 className="text-xl font-semibold">GTrash Operator</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => setActiveView('dashboard')}
              isActive={activeView === 'dashboard'}
              tooltip="Live Route"
            >
              <Map />
              <span>Live Route</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => setActiveView('feed')}
              isActive={activeView === 'feed'}
              tooltip="Task Feed"
            >
              <ListTodo />
              <span>Task Feed</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => setActiveView('stats')}
              isActive={activeView === 'stats'}
              tooltip="Vehicle Stats"
            >
              <BarChart />
              <span>Vehicle Stats</span>
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
                <AvatarFallback>OP</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start duration-200 group-data-[collapsible=icon]:opacity-0">
                <span className="text-sm font-medium">Truck Operator</span>
                <span className="text-xs text-muted-foreground">
                  operator@gtrash.com
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
