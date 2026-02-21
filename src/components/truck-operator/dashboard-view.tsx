'use client';

import {
  Navigation,
  VolumeX,
  MapPin,
  ChevronUp,
  Check,
  Clock,
  CircleDot,
  Route,
  AlertTriangle,
  Siren,
  Truck as TruckIcon,
  X,
  Link,
  Satellite,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

export function DashboardView() {
  const [mapTheme, setMapTheme] = useState('standard');
  const [selectedFleetTruck, setSelectedFleetTruck] = useState<{ id: string, name: string } | null>(null);
  const [isTrackingFleet, setIsTrackingFleet] = useState(false);
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

  const handleTrackFleet = () => {
    setIsTrackingFleet(true);
    toast({
      title: "Fleet Link Established! 🔗",
      description: `Telemetry feed from ${selectedFleetTruck?.name} is live. Monitoring sector overlap.`,
    });
  };

  const handleCloseFleet = () => {
    setSelectedFleetTruck(null);
    setIsTrackingFleet(false);
  };

  const otherTrucks = [
    { id: 'TR-002', top: '45%', left: '55%', name: 'Central-3' },
    { id: 'TR-003', top: '55%', left: '42%', name: 'South-2' },
  ];

  return (
    <div className="relative h-screen w-full bg-background text-foreground overflow-hidden">
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
          title="Operator Route Map"
        ></iframe>
      </div>

      {/* Map Markers Overlay */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        <TooltipProvider>
          {/* Current Operator Truck */}
          <div className="absolute top-[48%] left-[48%] z-10 transition-all duration-500 pointer-events-auto">
             <Tooltip>
                <TooltipTrigger asChild>
                  <div className="relative group cursor-crosshair">
                    <div className="absolute -inset-4 bg-primary/30 rounded-full animate-pulse" />
                    <div className="relative bg-primary text-primary-foreground p-3 rounded-full shadow-2xl border-4 border-background transform scale-125">
                      <Navigation className="h-5 w-5 rotate-45" />
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs font-bold">Your Location (TRK-8829-CEB)</p>
                </TooltipContent>
             </Tooltip>
          </div>

          {/* Other Trucks */}
          {otherTrucks.map((truck) => (
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
                      setSelectedFleetTruck({ id: truck.id, name: truck.name });
                      setIsTrackingFleet(false);
                    }}
                  >
                    <div className={cn(
                      "relative bg-muted text-muted-foreground p-2 rounded-full shadow-lg border-2 border-background opacity-80 group-hover:opacity-100 transition-opacity",
                      selectedFleetTruck?.id === truck.id && "ring-4 ring-primary ring-offset-2 opacity-100"
                    )}>
                      <TruckIcon className="h-4 w-4" />
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs font-bold">{truck.name}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          ))}
        </TooltipProvider>
      </div>

      {/* Top UI Elements */}
      <div className="absolute top-0 left-0 right-0 p-4 space-y-3 z-10 bg-gradient-to-b from-background/40 to-transparent pointer-events-none">
        <div className="flex items-start justify-between gap-3 pointer-events-auto">
          {/* Navigation Card */}
          <Card className="bg-card/90 border-primary/50 p-3 flex-1 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                <Navigation className="h-6 w-6 rotate-45" />
              </div>
              <div>
                <p className="text-3xl font-bold">450m</p>
                <p className="text-xs text-muted-foreground uppercase font-bold">Turn right onto Colon St.</p>
              </div>
            </div>
          </Card>
          {/* Speed Card */}
          <Card className="bg-card/90 border-border p-3 backdrop-blur-sm text-center">
             <p className="text-3xl font-bold">24</p>
             <p className="text-xs text-muted-foreground font-bold">km/h</p>
          </Card>
        </div>

        {/* High Priority Alert */}
        <Card className="bg-yellow-500/20 border border-yellow-400 text-yellow-700 dark:text-yellow-300 p-3 backdrop-blur-sm pointer-events-auto">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="bg-yellow-400/20 p-2 rounded-full">
                         <Siren className="h-5 w-5 text-yellow-600 dark:text-yellow-300" />
                    </div>
                    <div>
                        <p className="text-xs font-bold uppercase">High Priority Alert</p>
                        <p className="font-semibold text-foreground">Illegal Dumping: Archbishop Reyes Ave.</p>
                    </div>
                </div>
                <Button variant="ghost" size="icon" className="text-yellow-600 dark:text-yellow-300 hover:text-yellow-700 h-8 w-8">
                    <VolumeX className="h-5 w-5" />
                </Button>
            </div>
        </Card>
      </div>

      {/* Bottom Sheet */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-4 pointer-events-auto">
        {selectedFleetTruck && (
          <Card className={cn(
            "mb-4 border-primary/50 shadow-lg backdrop-blur-md animate-in slide-in-from-bottom-4 duration-300 overflow-hidden",
            isTrackingFleet ? "bg-slate-900 text-white" : "bg-primary/90 text-primary-foreground"
          )}>
            <CardContent className="p-4 relative">
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/10 text-white hover:bg-white/20"
                onClick={handleCloseFleet}
              >
                <X className="h-4 w-4" />
              </Button>

              {isTrackingFleet ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="absolute -inset-1 bg-blue-500 rounded-full animate-pulse blur-sm" />
                      <Satellite className="h-6 w-6 text-blue-400 relative" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold tracking-tight">Fleet Comms Active 📡</h3>
                      <p className="text-xs text-blue-400 font-mono uppercase tracking-widest animate-pulse">Telemetry: {selectedFleetTruck.name}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                      <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                        <Link className="h-3 w-3" />
                        <span>PROXIMITY</span>
                      </div>
                      <p className="text-xl font-bold">0.8 km</p>
                    </div>
                    <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                      <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                        <ShieldCheck className="h-3 w-3" />
                        <span>STATUS</span>
                      </div>
                      <p className="text-xl font-bold uppercase text-blue-400">Synced</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-gray-500 font-bold">
                      <span>DATA STREAM STRENGTH</span>
                      <span>HIGH</span>
                    </div>
                    <Progress value={95} className="h-1 bg-white/10 [&>div]:bg-blue-500" />
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-background/20 p-2">
                    <TruckIcon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold uppercase opacity-80">
                      Fleet Member: {selectedFleetTruck.name}
                    </p>
                    <p className="font-bold">Active in Sector 2 &bull; 0.8km away</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-full bg-black/20 px-4 text-xs font-bold hover:bg-black/40"
                    onClick={handleTrackFleet}
                  >
                    LINK COMMS
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

         {/* Route Info */}
        <Card className="bg-card/95 border-border p-3 mb-3 backdrop-blur-md">
            <div className="flex justify-around items-center text-center">
                <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary"/>
                    <span className="font-bold">14:20</span>
                </div>
                 <div className="flex items-center gap-2">
                    <CircleDot className="h-4 w-4 text-primary"/>
                    <span className="font-bold">12 mins</span>
                </div>
                 <div className="flex items-center gap-2">
                    <Route className="h-4 w-4 text-primary"/>
                    <span className="font-bold">3.2 km</span>
                </div>
            </div>
        </Card>
        
        {/* Active Route Card */}
        <Card className="bg-card/95 border-border overflow-hidden backdrop-blur-md shadow-2xl">
          <div className="flex justify-between items-center p-4">
            <div>
              <Badge className="bg-primary/20 text-primary border-transparent font-bold">ROUTE ACTIVE</Badge>
              <span className="text-xs text-muted-foreground ml-2 font-semibold">12 STOPS LEFT</span>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronUp />
            </Button>
          </div>
          <div className="p-4 pt-0">
            <h3 className="text-xl font-bold">Mabini Street, Barangay Luz</h3>
            <p className="text-sm text-muted-foreground mt-1">
              <span className="text-primary">•</span> Residential bins x14 - Expect narrow access
            </p>
            <Button size="lg" className="w-full h-14 text-base font-bold mt-4 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20">
              <Check className="mr-2 h-6 w-6" />
              Mark as Picked Up
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
