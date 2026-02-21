'use client';

import {
  Search,
  Navigation,
  Layers,
  ScanLine,
  MessageCircleWarning,
  Bell,
  TrendingUp,
  Gem,
  Leaf,
  Truck,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { trucks } from '@/lib/data';
import { Button } from '@/components/ui/button';
import type { View } from '@/app/dashboard/page';
import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export function MapView({
  setActiveView,
}: {
  setActiveView: Dispatch<SetStateAction<View>>;
}) {
  const firstTruck = trucks[0];
  const [mapTheme, setMapTheme] = useState('standard');

  useEffect(() => {
    const updateTheme = () => {
      const theme = localStorage.getItem('map-theme') || 'standard';
      setMapTheme(theme);
    };

    updateTheme();
    window.addEventListener('storage', updateTheme);
    return () => window.removeEventListener('storage', updateTheme);
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Actual Map - OpenStreetMap Embed */}
      <div className="absolute inset-0 z-0">
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight={0}
          marginWidth={0}
          src="https://www.openstreetmap.org/export/embed.html?bbox=123.83403778076173%2C10.264102927962885%2C123.95763397216798%2C10.367295874226164&amp;layer=mapnik"
          className={cn(
            "opacity-100 transition-all duration-500",
            mapTheme === 'gray' && "map-grayscale"
          )}
          title="Cebu City Map"
        ></iframe>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/60 pointer-events-none" />

      <div className="relative z-10 flex h-full flex-col justify-between p-4 pointer-events-none">
        {/* Top Section */}
        <div className="pointer-events-auto">
          <header className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase text-primary drop-shadow-sm">
                CEBU CITY
              </p>
              <h1 className="text-2xl font-bold text-foreground drop-shadow-md">
                Eco Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-card/80 backdrop-blur-sm border border-border/50"
              >
                <Search className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-card/80 backdrop-blur-sm border border-border/50"
              >
                <Bell className="h-5 w-5" />
              </Button>
            </div>
          </header>

          <div className="my-4 grid grid-cols-3 gap-3">
            <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
              <CardContent className="space-y-1 p-3">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span>km Total</span>
                </div>
                <p className="text-lg font-bold">12.4</p>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
              <CardContent className="space-y-1 p-3">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Gem className="h-4 w-4 text-yellow-500" />
                  <span>Points</span>
                </div>
                <p className="text-lg font-bold">650</p>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
              <CardContent className="space-y-1 p-3">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Leaf className="h-4 w-4 text-primary" />
                  <span>kg CO2</span>
                </div>
                <p className="text-lg font-bold">4.2</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pointer-events-auto">
          {firstTruck && (
            <Card className="mb-4 border-primary/50 bg-primary/90 text-primary-foreground shadow-lg backdrop-blur-md">
              <CardContent className="flex items-center gap-4 p-3">
                <div className="rounded-full bg-background/20 p-2">
                  <Truck className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase opacity-80">
                    Next Pickup
                  </p>
                  <p className="font-bold">5km away &bull; 15m</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full bg-black/20 px-4 text-xs font-bold hover:bg-black/40"
                >
                  TRACK
                </Button>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-2 gap-4">
            <Button
              size="lg"
              className="h-14 text-base shadow-xl"
              onClick={() => setActiveView('scanner')}
            >
              <ScanLine className="mr-2 h-6 w-6" />
              Scan Trash
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="h-14 bg-card/80 text-base text-foreground backdrop-blur-sm hover:bg-card/90 shadow-xl border border-border/50"
              onClick={() => setActiveView('reports')}
            >
              <MessageCircleWarning className="mr-2 h-6 w-6" />
              Report Issue
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute right-4 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-2">
        <Button
          size="icon"
          variant="secondary"
          className="h-12 w-12 rounded-lg bg-background/80 backdrop-blur-sm shadow-md border border-border/50"
        >
          <Navigation className="h-6 w-6" />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          className="h-12 w-12 rounded-lg bg-background/80 backdrop-blur-sm shadow-md border border-border/50"
        >
          <Layers className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}