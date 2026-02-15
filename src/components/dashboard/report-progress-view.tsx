'use client';

import type { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import {
  ArrowLeft,
  Share,
  MessageSquarePlus,
  CheckCircle,
  Truck,
  Flag,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { View } from '@/app/page';
import type { Report } from '@/lib/types';
import { cn } from '@/lib/utils';

const timelineEvents = [
  {
    status: 'Resolved',
    date: 'June 18, 2024',
    description:
      'The area has been cleared by the collection crew. Thank you for your report!',
    icon: CheckCircle,
    isCurrent: true,
  },
  {
    status: 'Truck Dispatched',
    date: 'June 17, 2024',
    description: 'A garbage truck has been dispatched to the location.',
    icon: Truck,
  },
  {
    status: 'Under Review',
    date: 'June 17, 2024',
    description:
      'Your report is being reviewed by the local barangay officials.',
    icon: MessageSquarePlus,
  },
  {
    status: 'Reported',
    date: 'June 17, 2024',
    description: 'You successfully submitted the report.',
    icon: Flag,
  },
];

export function ReportProgressView({
  report,
  setActiveView,
}: {
  report: Report | null;
  setActiveView: Dispatch<SetStateAction<View>>;
}) {
  if (!report) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1C211F] text-white">
        <p>No report selected.</p>
        <Button onClick={() => setActiveView('reports')} className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#1C211F] text-white">
      {/* Header */}
      <header className="flex-shrink-0">
        <div className="flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setActiveView('reports')}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-lg font-semibold">Report Progress</h1>
          <div className="w-10"></div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Image */}
        <div className="relative h-56 w-full">
          <Image
            src={report.image.imageUrl}
            alt={report.image.description}
            data-ai-hint={report.image.imageHint}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <Badge className="bg-primary/80 text-primary-foreground">
              {report.status}
            </Badge>
            <h2 className="mt-2 text-2xl font-bold">{report.title}</h2>
            <p className="text-sm text-gray-300">{report.location}</p>
          </div>
        </div>

        {/* Timeline */}
        <div className="p-4 sm:p-6">
          <h3 className="mb-4 text-sm font-semibold uppercase text-gray-400">
            Resolution Timeline
          </h3>
          <div className="relative flex flex-col gap-8 pl-6">
            <div className="absolute left-[34px] top-4 h-full border-l-2 border-dashed border-gray-600" />
            {timelineEvents.map((event, index) => (
              <div key={index} className="relative flex items-start gap-6">
                <div
                  className={cn(
                    'flex h-12 w-12 items-center justify-center rounded-full',
                    event.isCurrent ? 'bg-primary' : 'bg-gray-700'
                  )}
                >
                  <event.icon className="h-6 w-6 text-white" />
                </div>
                <div className="pt-1">
                  <p
                    className={cn(
                      'font-semibold',
                      event.isCurrent ? 'text-primary' : 'text-white'
                    )}
                  >
                    {event.status}
                  </p>
                  <p className="text-xs text-gray-400">{event.date}</p>
                  <p className="mt-1 text-sm text-gray-300">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="flex-shrink-0 border-t border-gray-700 p-4 pt-0">
        <div className="flex gap-4 pt-4">
          <Button
            variant="outline"
            className="h-14 w-full border-gray-600 bg-transparent text-white hover:bg-gray-700 hover:text-white"
          >
            <Share className="mr-2 h-5 w-5" />
            Share Update
          </Button>
          <Button size="lg" className="h-14 w-full text-base font-bold">
            <MessageSquarePlus className="mr-2 h-5 w-5" />
            Follow Up
          </Button>
        </div>
      </footer>
    </div>
  );
}
