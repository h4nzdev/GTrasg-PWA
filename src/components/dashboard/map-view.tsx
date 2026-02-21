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
  Truck as TruckIcon,
  X,
  Radio,
  Timer,
  Zap,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import type { View } from '@/app/dashboard/page';
import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Truck } from '@/lib/types';
import { Progress } from '@/components/ui/progress';

export function MapView({
  setActiveView,
}: {
  setActiveView: Dispatch<SetStateAction<View>>;
}) {
  const [mapTheme, setMapTheme] = useState('standard');
  const [selectedTruck, setSelectedTruck] = useState<Truck | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const updateTheme = () => {
      const theme = localStorage.getItem('map-theme') || 'standard';
      setMapTheme(theme);
    };

    updateTheme();
    window.addEventListener('storage', updateTheme);
    return () => window.removeEventListener('storage', updateTheme);
  }, []);

  const handleTrackClick = () => {
    setIsTracking(true);
    toast({
      title: "Eco-Radar Online! 📡",
      description: `Synchronizing with ${selectedTruck?.name}... Get your bins ready!`,
    });
  };

  const handleCloseTruck = () => {
    setSelectedTruck(null);
    setIsTracking(false);
  };

  const truckMarkers = [
    { id: 'TR-001', top: '40%', left: '45%', name: 'North-1', status: 'On Route', eta: '5 min' },
    { id: 'TR-002', top: '60%', left: '35%', name: 'South-2', status: 'On Route', eta: '12 min' },
    { id: 'TR-003', top: '35%', left: '60%', name: 'Central-3', status: 'Idle', eta: '25 min' },
  ];

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

      {/* Map Markers Overlay */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        <TooltipProvider>
          {truckMarkers.map((truck) => (
            <div
              key={truck.id}
              className="absolute transition-all duration-1000 ease-in-out pointer-events-auto"
              style={{ top: truck.top, left: truck.left }}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <div 
                    className="relative cursor-pointer group"
                    onClick={() => {
                      setSelectedTruck({
                        id: truck.id,
                        name: truck.name,
                        status: truck.status as any,
                        eta: truck.eta,
                        location: { lat: 0, lng: 0 }
                      });
                      setIsTracking(false);
                    }}
                  >
                    <div className="absolute -inset-2 bg-primary/20 rounded-full animate-ping group-hover:bg-primary/40" />
                    <div className={cn(
                      "relative bg-primary text-primary-foreground p-2 rounded-full shadow-lg border-2 border-background transform transition-transform group-hover:scale-110",
                      selectedTruck?.id === truck.id && "ring-4 ring-primary ring-offset-2"
                    )}>
                      <TruckIcon className="h-4 w-4" />
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs font-bold">{truck.name} ({truck.eta})</p>
                </TooltipContent>
              </Tooltip>
            </div>
          ))}
        </TooltipProvider>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/40 pointer-events-none" />

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
          {selectedTruck && (
            <Card className={cn(
              "mb-4 border-primary/50 shadow-lg backdrop-blur-md animate-in slide-in-from-bottom-4 duration-300 overflow-hidden",
              isTracking ? "bg-black/90 text-white" : "bg-primary/90 text-primary-foreground"
            )}>
              <CardContent className="p-4 relative">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/10 text-white hover:bg-white/20"
                  onClick={handleCloseTruck}
                >
                  <X className="h-4 w-4" />
                </Button>

                {isTracking ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="absolute -inset-1 bg-green-500 rounded-full animate-pulse blur-sm" />
                        <Radio className="h-6 w-6 text-green-400 relative" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold tracking-tight">Mission: Clean Cebu 🌿</h3>
                        <p className="text-xs text-green-400 font-mono animate-pulse uppercase">Live Feed Enabled &bull; {selectedTruck.name}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                        <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                          <Timer className="h-3 w-3" />
                          <span>ARRIVAL</span>
                        </div>
                        <p className="text-xl font-bold">{selectedTruck.eta}</p>
                      </div>
                      <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                        <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                          <Zap className="h-3 w-3" />
                          <span>ENERGY</span>
                        </div>
                        <p className="text-xl font-bold">OPTIMAL</p>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-gray-500 font-bold">
                        <span>INTERCEPT PROGRESS</span>
                        <span>85% SYNCED</span>
                      </div>
                      <Progress value={85} className="h-1 bg-white/10 [&>div]:bg-green-500" />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-background/20 p-2">
                      <TruckIcon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold uppercase opacity-80">
                        Eco-Truck: {selectedTruck.name}
                      </p>
                      <p className="font-bold">{selectedTruck.status === 'Idle' ? 'Refueling' : 'Intercepting your zone'} &bull; {selectedTruck.eta}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-full bg-black/20 px-4 text-xs font-bold hover:bg-black/40"
                      onClick={handleTrackClick}
                    >
                      TRACK MISSION
                    </Button>
                  </div>
                )}
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
          className="h-12 w-12 rounded-lg bg-background/80 backdrop-blur-sm shadow-md border border-border/50 pointer-events-auto"
        >
          <Navigation className="h-6 w-6" />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          className="h-12 w-12 rounded-lg bg-background/80 backdrop-blur-sm shadow-md border border-border/50 pointer-events-auto"
        >
          <Layers className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
