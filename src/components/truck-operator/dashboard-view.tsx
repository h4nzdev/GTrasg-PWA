'use client';

import Image from 'next/image';
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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function DashboardView() {
  const mapImage = PlaceHolderImages.find((img) => img.id === 'map');

  return (
    <div className="relative h-screen w-full bg-[#131A21] text-white">
      {/* Map Background */}
      {mapImage && (
        <Image
          src={mapImage.imageUrl}
          alt="Map of Cebu City"
          data-ai-hint="dark map"
          fill
          className="object-cover opacity-30"
        />
      )}

      {/* Top UI Elements */}
      <div className="absolute top-0 left-0 right-0 p-4 space-y-3 z-10 bg-gradient-to-b from-black/60 to-transparent">
        <div className="flex items-start justify-between gap-3">
          {/* Navigation Card */}
          <Card className="bg-[#1C2C3A]/90 border-blue-400/50 p-3 flex-1">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500 p-2 rounded-lg">
                <Navigation className="h-6 w-6 rotate-45" />
              </div>
              <div>
                <p className="text-3xl font-bold">450m</p>
                <p className="text-xs text-gray-400 uppercase">Turn right onto Colon St.</p>
              </div>
            </div>
          </Card>
          {/* Speed Card */}
          <Card className="bg-[#1C2C3A]/90 border-gray-700 p-3">
             <p className="text-3xl font-bold">24</p>
             <p className="text-xs text-gray-400">km/h</p>
          </Card>
        </div>

        {/* High Priority Alert */}
        <Card className="bg-yellow-500/20 border border-yellow-400 text-yellow-300 p-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="bg-yellow-400/20 p-2 rounded-full">
                         <Siren className="h-5 w-5 text-yellow-300" />
                    </div>
                    <div>
                        <p className="text-xs font-bold uppercase">High Priority Alert</p>
                        <p className="font-semibold text-white">Illegal Dumping: Archbishop Reyes Ave.</p>
                    </div>
                </div>
                <Button variant="ghost" size="icon" className="text-yellow-300 hover:text-white h-8 w-8">
                    <VolumeX className="h-5 w-5" />
                </Button>
            </div>
        </Card>
      </div>

       {/* Map Markers (Static for UI) */}
      <div className="absolute top-[35%] left-[20%] z-10 text-xs text-center">
         <p className="font-bold bg-black/50 px-2 py-1 rounded">NEXT: BRGY. LUZ</p>
      </div>

      <div className="absolute top-1/2 right-8 z-10 flex flex-col items-center gap-2">
         <Card className="bg-red-600/90 border-red-400/50 p-3 flex items-center gap-2 shadow-lg">
            <AlertTriangle className="h-5 w-5" />
            <p className="font-bold text-sm">HIGH VOLUME PICKUP</p>
         </Card>
         <Button variant="secondary" size="icon" className="bg-white/90 text-black rounded-full h-12 w-12 shadow-lg">
            <MapPin className="h-6 w-6"/>
         </Button>
      </div>
      
      <div className="absolute bottom-[320px] right-4 z-10">
        <div className="bg-red-600 rounded-full h-10 w-10 flex items-center justify-center shadow-lg border-2 border-white">
            <AlertTriangle className="h-6 w-6 text-white"/>
        </div>
      </div>


      {/* Bottom Sheet */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-4">
         {/* Route Info */}
        <Card className="bg-[#1C2C3A]/95 border-gray-700 p-3 mb-3">
            <div className="flex justify-around items-center text-center">
                <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-400"/>
                    <span className="font-semibold">14:20</span>
                </div>
                 <div className="flex items-center gap-2">
                    <CircleDot className="h-4 w-4 text-blue-400"/>
                    <span className="font-semibold">12 mins</span>
                </div>
                 <div className="flex items-center gap-2">
                    <Route className="h-4 w-4 text-blue-400"/>
                    <span className="font-semibold">3.2 km</span>
                </div>
            </div>
        </Card>
        
        {/* Active Route Card */}
        <Card className="bg-[#1C2C3A]/95 border-gray-700 overflow-hidden">
          <div className="flex justify-between items-center p-4">
            <div>
              <Badge className="bg-blue-500/20 text-blue-300 border-transparent">ROUTE ACTIVE</Badge>
              <span className="text-xs text-gray-400 ml-2">12 stops left</span>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronUp />
            </Button>
          </div>
          <div className="p-4 pt-0">
            <h3 className="text-xl font-bold">Mabini Street, Barangay Luz</h3>
            <p className="text-sm text-gray-400 mt-1">
              <span className="text-green-400">•</span> Residential bins x14 - Expect narrow access
            </p>
            <Button size="lg" className="w-full h-14 text-base font-bold mt-4 bg-blue-500 hover:bg-blue-600 text-white">
              <Check className="mr-2 h-6 w-6" />
              Mark as Picked Up
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
