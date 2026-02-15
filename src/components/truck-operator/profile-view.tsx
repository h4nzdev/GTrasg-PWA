'use client';

import Image from 'next/image';
import {
  Truck,
  MapPin,
  Fuel,
  Download,
  Trash2,
  LogOut,
  ChevronDown,
  Wrench,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const checklistItems = [
  { id: 'fuel', label: 'Fuel Level Verified', checked: true, icon: Fuel },
  { id: 'tire', label: 'Tire Pressure Check', checked: true, icon: Wrench },
  { id: 'hopper', label: 'Empty Hopper & Cleaned', checked: false, icon: Trash2 },
  { id: 'dashcam', label: 'Dashcam Footage Saved', checked: false, icon: Download },
];

export function ProfileView() {
  const operatorAvatar = PlaceHolderImages.find((img) => img.id === 'user-avatar-3');
  const mapImage = PlaceHolderImages.find((img) => img.id === 'map');

  return (
    <div className="min-h-full bg-[#131A21] p-4 sm:p-6 text-white space-y-6">
      {/* Header */}
      <header>
        <p className="text-xs font-bold uppercase text-green-400">Current Session</p>
        <div className="flex items-center justify-between mt-1">
          <h1 className="text-3xl font-bold">Operator: Juan D.</h1>
          <Avatar className="h-12 w-12 border-2 border-green-400">
            {operatorAvatar && <AvatarImage src={operatorAvatar.imageUrl} alt="Juan D." />}
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
          <Truck className="h-4 w-4" />
          <span>Truck ID: CEB-402 • South District</span>
        </div>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <Card className="bg-[#1C2C3A] border-gray-700 p-3">
          <p className="text-xs text-gray-400">DURATION</p>
          <p className="text-2xl font-bold text-green-400">07:24:12</p>
          <p className="text-xs text-gray-500">Started 06:00 AM</p>
        </Card>
        <Card className="bg-[#1C2C3A] border-gray-700 p-3">
          <p className="text-xs text-gray-400">TONNAGE</p>
          <p className="text-2xl font-bold">14.2 t</p>
          <p className="text-xs text-gray-500">+12% vs avg.</p>
        </Card>
        <Card className="bg-[#1C2C3A] border-gray-700 p-3">
          <p className="text-xs text-gray-400">ROUTE</p>
          <p className="text-2xl font-bold">92%</p>
          <p className="text-xs text-gray-500">22 / 24 Zones</p>
        </Card>
      </div>

      {/* Route Map Summary */}
      <div>
        <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-bold tracking-wider text-gray-400">ROUTE MAP SUMMARY</h2>
            <div className="flex items-center gap-1 text-xs text-green-400">
                <MapPin className="h-3 w-3" />
                <span>Cebu City</span>
            </div>
        </div>
        {mapImage && (
            <Card className="relative aspect-video w-full overflow-hidden border-gray-700">
                <Image
                    src={mapImage.imageUrl}
                    alt="Route map"
                    data-ai-hint="route map"
                    fill
                    className="object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-3 flex gap-2">
                    <div className="bg-green-500 text-black text-xs font-bold px-3 py-1 rounded-full">COMPLETED</div>
                    <div className="bg-gray-700/80 text-white text-xs font-bold px-3 py-1 rounded-full">2 PENDING</div>
                </div>
            </Card>
        )}
      </div>

      {/* Pre-logout checklist */}
      <div>
        <h2 className="text-sm font-bold tracking-wider text-gray-400 mb-3">PRE-LOGOUT CHECKLIST</h2>
        <Card className="bg-[#1C2C3A] border-gray-700">
            <CardContent className="p-0">
                <ul className="divide-y divide-gray-700">
                    {checklistItems.map((item) => (
                         <li key={item.id} className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-4">
                                <div className="bg-green-500/20 p-2 rounded-lg">
                                    <item.icon className="h-5 w-5 text-green-400"/>
                                </div>
                                <Label htmlFor={item.id} className="font-semibold">{item.label}</Label>
                            </div>
                            <Checkbox id={item.id} defaultChecked={item.checked} className="h-6 w-6 border-gray-500 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-400" />
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
      </div>

      {/* Shift notes */}
      <div>
        <Card className="bg-[#1C2C3A] border-gray-700 p-4">
            <div className="flex justify-between items-center">
                <p className="font-semibold">Shift Notes</p>
                <ChevronDown className="h-5 w-5 text-gray-400" />
            </div>
            <p className="text-sm text-gray-400 mt-1">Any mechanical issues or blockages?</p>
        </Card>
      </div>

      {/* Footer */}
      <div className="space-y-4 pt-4 text-center">
        <Button size="lg" className="w-full h-14 text-base font-bold bg-green-500 hover:bg-green-600 text-black">
          <LogOut className="mr-2 h-5 w-5" />
          END SHIFT & CLOCK OUT
        </Button>
        <p className="text-xs text-gray-500">Current Location: 10.287N, 123.888E (Cebu City)</p>
      </div>
    </div>
  );
}
