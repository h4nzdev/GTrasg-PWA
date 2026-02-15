'use client';

import Image from 'next/image';
import {
  Search,
  MapPin,
  Navigation,
  Layers,
  ScanLine,
  MessageCircleWarning,
  ArrowRight,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { trucks } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { View } from '@/app/page';
import type { Dispatch, SetStateAction } from 'react';

export function MapView({
  setActiveView,
}: {
  setActiveView: Dispatch<SetStateAction<View>>;
}) {
  const mapImage = PlaceHolderImages.find((img) => img.id === 'map');
  const firstTruck = trucks[0];

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search your area (e.g., Cebu City)"
          className="pl-10"
        />
      </div>

      <Card className="overflow-hidden rounded-2xl">
        <CardContent className="relative p-0">
          {mapImage && (
            <Image
              src={mapImage.imageUrl}
              alt={mapImage.description}
              data-ai-hint={mapImage.imageHint}
              width={1200}
              height={800}
              className="aspect-[4/3] h-full w-full object-cover"
            />
          )}
          <div className="absolute right-4 top-4 flex flex-col gap-2">
            <Button
              size="icon"
              variant="secondary"
              className="h-12 w-12 rounded-lg bg-background/80 backdrop-blur-sm"
            >
              <Navigation className="h-6 w-6" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="h-12 w-12 rounded-lg bg-background/80 backdrop-blur-sm"
            >
              <Layers className="h-6 w-6" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {firstTruck && (
        <Card className="border-yellow-500/30 bg-yellow-400/10">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-full bg-yellow-500/20 p-3 text-yellow-700">
              <MapPin className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-yellow-900">Truck is 5km away</p>
              <p className="text-sm text-yellow-800/80">
                Estimated arrival: {firstTruck.eta}
              </p>
            </div>
            <Button variant="ghost" size="sm" className="text-yellow-900 hover:bg-yellow-500/20">
              View Details <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-2 gap-4">
        <Button
          size="lg"
          className="h-16 text-base"
          onClick={() => setActiveView('scanner')}
        >
          <ScanLine className="mr-2 h-6 w-6" />
          Scan Trash
        </Button>
        <Button
          variant="secondary"
          size="lg"
          className="h-16 text-base"
          onClick={() => setActiveView('reports')}
        >
          <MessageCircleWarning className="mr-2 h-6 w-6" />
          Report Issue
        </Button>
      </div>
    </div>
  );
}
