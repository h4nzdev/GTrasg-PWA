import type { Metadata } from 'next';
import { SidebarProvider } from '@/components/ui/sidebar';

export const metadata: Metadata = {
  title: 'GTrash: Operator Dashboard',
  description: 'Truck Operator Dashboard for GTrash.',
};

export default function TruckOperatorRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
        {children}
    </SidebarProvider>
  );
}
