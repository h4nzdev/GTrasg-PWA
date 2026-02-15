'use client';

import type { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import {
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
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <p>No report selected.</p>
        <Button onClick={() => setActiveView('reports')} className="mt-4">
          Go Back to Reports
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
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
          <h3 className="mb-4 text-sm font-semibold uppercase text-muted-foreground">
            Resolution Timeline
          </h3>
          <div className="relative flex flex-col gap-8 pl-6">
            <div className="absolute left-[34px] top-4 h-full border-l-2 border-dashed border-border" />
            {timelineEvents.map((event, index) => (
              <div key={index} className="relative flex items-start gap-6">
                <div
                  className={cn(
                    'flex h-12 w-12 items-center justify-center rounded-full',
                    event.isCurrent ? 'bg-primary' : 'bg-muted'
                  )}
                >
                  <event.icon
                    className={cn(
                      'h-6 w-6',
                      event.isCurrent
                        ? 'text-primary-foreground'
                        : 'text-muted-foreground'
                    )}
                  />
                </div>
                <div className="pt-1">
                  <p
                    className={cn(
                      'font-semibold',
                      event.isCurrent ? 'text-primary' : 'text-foreground'
                    )}
                  >
                    {event.status}
                  </p>
                  <p className="text-xs text-muted-foreground">{event.date}</p>
                  <p className="mt-1 text-sm text-foreground/80">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border p-4">
        <div className="flex gap-4">
          <Button variant="outline" className="h-14 w-full">
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
