'use client';

import Image from 'next/image';
import {
  Heart,
  MessageSquare,
  MapPin,
  ListFilter,
  Camera,
  Truck,
  ArrowRight,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { reports } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Report } from '@/lib/types';
import type { View } from '@/app/page';
import type { Dispatch, SetStateAction } from 'react';

const statusVariants: Record<Report['status'], string> = {
  Resolved: 'bg-primary border-transparent text-primary-foreground',
  'In Progress': 'bg-yellow-400/80 border-transparent text-yellow-900',
  Reported: 'bg-muted border-transparent text-muted-foreground',
};

const ctaText: Record<Report['status'], string> = {
  Resolved: 'View Progress',
  'In Progress': 'Track Truck',
  Reported: 'Support Report',
};

const ctaIcon: Record<Report['status'], React.ReactNode> = {
  Resolved: <ArrowRight className="h-4 w-4" />,
  'In Progress': <Truck className="h-4 w-4" />,
  Reported: null,
};

export function ReportsView({
  setActiveView,
}: {
  setActiveView: Dispatch<SetStateAction<View>>;
}) {
  return (
    <div className="relative space-y-4">
      <div className="flex items-center justify-between">
        <Tabs defaultValue="recent" className="w-full">
          <div className="flex items-center gap-2">
            <TabsList>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="nearby">Nearby</TabsTrigger>
            </TabsList>
            <Button variant="outline" size="icon" className="h-9 w-9">
              <ListFilter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </div>
          <TabsContent value="recent" className="mt-4">
            <ReportList reports={reports} />
          </TabsContent>
          <TabsContent value="nearby" className="mt-4">
            <div className="flex h-48 items-center justify-center rounded-lg border-2 border-dashed">
              <p className="text-center text-muted-foreground">
                Nearby reports will be shown here.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <Button
        size="icon"
        className="fixed bottom-20 right-5 z-40 h-16 w-16 rounded-full shadow-lg md:hidden"
        onClick={() => setActiveView('report-form')}
      >
        <Camera className="h-8 w-8" />
        <span className="sr-only">New Report</span>
      </Button>
    </div>
  );
}

function ReportList({ reports }: { reports: Report[] }) {
  return (
    <div className="space-y-6 pb-16 md:pb-0">
      {reports.map((report) => (
        <Card
          key={report.id}
          className="overflow-hidden rounded-2xl shadow-md transition-shadow hover:shadow-xl"
        >
          <div className="relative">
            <Image
              alt={report.image.description}
              data-ai-hint={report.image.imageHint}
              className="aspect-[4/3] w-full object-cover"
              height={300}
              src={report.image.imageUrl}
              width={400}
            />
            <div className="absolute left-4 top-4">
              <Badge
                variant="secondary"
                className="bg-black/50 text-white backdrop-blur-sm"
              >
                <MapPin className="mr-1.5 h-3.5 w-3.5" />
                {report.location}
              </Badge>
            </div>
            <div className="absolute right-4 top-4">
              <Badge className={cn(statusVariants[report.status])}>
                {report.status}
              </Badge>
            </div>
          </div>
          <CardContent className="space-y-3 p-4">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-lg font-bold leading-tight">
                {report.title}
              </h3>
              <p className="flex-shrink-0 text-sm text-muted-foreground">
                {report.reportedAt}
              </p>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {report.description}
            </p>
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Heart className="h-5 w-5" />
                  <span className="text-sm font-medium">{report.likes}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MessageSquare className="h-5 w-5" />
                  <span className="text-sm font-medium">{report.comments}</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="font-semibold text-primary"
              >
                {ctaText[report.status]}
                {ctaIcon[report.status]}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
