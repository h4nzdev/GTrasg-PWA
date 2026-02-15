'use client';

import Image from 'next/image';
import { MapPin, Truck as TruckIcon } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { trucks } from '@/lib/data';

export function MapView() {
  const mapImage = PlaceHolderImages.find((img) => img.id === 'map');

  return (
    <div className="grid auto-rows-fr gap-6 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardContent className="p-0">
          {mapImage && (
            <Image
              src={mapImage.imageUrl}
              alt={mapImage.description}
              data-ai-hint={mapImage.imageHint}
              width={1200}
              height={800}
              className="h-full w-full object-cover"
            />
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Proximity Alerts</CardTitle>
          <CardDescription>Trucks near your location.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {trucks.map((truck) => (
              <li key={truck.id} className="flex items-center gap-4">
                <div className="rounded-full bg-accent/20 p-3 text-accent">
                  <TruckIcon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{truck.name}</p>
                  <p className="text-sm text-muted-foreground">{truck.status}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-accent">{truck.eta}</p>
                  <p className="text-sm text-muted-foreground">ETA</p>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
