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
    <div className="min-h-full bg-background p-4 sm:p-6 text-foreground space-y-6">
      {/* Header */}
      <header>
        <p className="text-xs font-bold uppercase text-primary">Current Session</p>
        <div className="flex items-center justify-between mt-1">
          <h1 className="text-3xl font-bold">Operator: Juan D.</h1>
          <Avatar className="h-12 w-12 border-2 border-primary">
            {operatorAvatar && <AvatarImage src={operatorAvatar.imageUrl} alt="Juan D." />}
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
          <Truck className="h-4 w-4" />
          <span>Truck ID: CEB-402 • South District</span>
        </div>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <Card className="bg-card border-border p-3">
          <p className="text-xs text-muted-foreground">DURATION</p>
          <p className="text-2xl font-bold text-primary">07:24:12</p>
          <p className="text-xs text-muted-foreground">Started 06:00 AM</p>
        </Card>
        <Card className="bg-card border-border p-3">
          <p className="text-xs text-muted-foreground">TONNAGE</p>
          <p className="text-2xl font-bold">14.2 t</p>
          <p className="text-xs text-muted-foreground">+12% vs avg.</p>
        </Card>
        <Card className="bg-card border-border p-3">
          <p className="text-xs text-muted-foreground">ROUTE</p>
          <p className="text-2xl font-bold">92%</p>
          <p className="text-xs text-muted-foreground">22 / 24 Zones</p>
        </Card>
      </div>

      {/* Route Map Summary */}
      <div>
        <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-bold tracking-wider text-muted-foreground">ROUTE MAP SUMMARY</h2>
            <div className="flex items-center gap-1 text-xs text-primary">
                <MapPin className="h-3 w-3" />
                <span>Cebu City</span>
            </div>
        </div>
        {mapImage && (
            <Card className="relative aspect-video w-full overflow-hidden border-border">
                <Image
                    src={mapImage.imageUrl}
                    alt="Route map"
                    data-ai-hint="route map"
                    fill
                    className="object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-3 flex gap-2">
                    <div className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">COMPLETED</div>
                    <div className="bg-muted text-muted-foreground text-xs font-bold px-3 py-1 rounded-full">2 PENDING</div>
                </div>
            </Card>
        )}
      </div>

      {/* Pre-logout checklist */}
      <div>
        <h2 className="text-sm font-bold tracking-wider text-muted-foreground mb-3">PRE-LOGOUT CHECKLIST</h2>
        <Card className="bg-card border-border">
            <CardContent className="p-0">
                <ul className="divide-y divide-border">
                    {checklistItems.map((item) => (
                         <li key={item.id} className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-4">
                                <div className="bg-primary/20 p-2 rounded-lg">
                                    <item.icon className="h-5 w-5 text-primary"/>
                                </div>
                                <Label htmlFor={item.id} className="font-semibold">{item.label}</Label>
                            </div>
                            <Checkbox id={item.id} defaultChecked={item.checked} className="h-6 w-6" />
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
      </div>

      {/* Shift notes */}
      <div>
        <Card className="bg-card border-border p-4">
            <div className="flex justify-between items-center">
                <p className="font-semibold">Shift Notes</p>
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground mt-1">Any mechanical issues or blockages?</p>
        </Card>
      </div>

      {/* Footer */}
      <div className="space-y-4 pt-4 text-center">
        <Button size="lg" className="w-full h-14 text-base font-bold bg-primary hover:bg-primary/90 text-black">
          <LogOut className="mr-2 h-5 w-5" />
          END SHIFT & CLOCK OUT
        </Button>
        <p className="text-xs text-muted-foreground">Current Location: 10.287N, 123.888E (Cebu City)</p>
      </div>
    </div>
  );
}
