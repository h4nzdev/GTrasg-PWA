'use client';

import { useState, type Dispatch, type SetStateAction } from 'react';
import Image from 'next/image';
import { ArrowLeft, Camera, Trash2, Archive, UserX, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import type { View } from '@/app/page';

export function ReportFormView({
  setActiveView,
}: {
  setActiveView: Dispatch<SetStateAction<View>>;
}) {
  const [category, setCategory] = useState('illegal-dumping');
  const mapImage = PlaceHolderImages.find((img) => img.id === 'map');

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
          <h1 className="text-lg font-semibold">Community Report</h1>
          <div className="w-10"></div>
        </div>
      </header>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto p-4 pt-0">
        {/* Site Preview */}
        <div className="relative mb-6 aspect-[4/3] w-full overflow-hidden rounded-lg">
          {mapImage && (
            <Image
              src={mapImage.imageUrl}
              alt="Map preview"
              data-ai-hint={mapImage.imageHint}
              fill
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <div className="rounded-full bg-primary/80 px-3 py-1 text-xs font-bold uppercase">
              Site Preview
            </div>
            <h2 className="mt-2 text-xl font-bold">Illegal Dumping Site</h2>
          </div>
          <Button
            variant="secondary"
            size="icon"
            className="absolute bottom-4 right-4 h-12 w-12 rounded-full bg-black/30"
          >
            <Camera className="h-6 w-6" />
          </Button>
        </div>

        {/* Report Category */}
        <div className="mb-6">
          <Label className="text-xs font-semibold uppercase text-gray-400">
            Report Category
          </Label>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <Button
              variant={category === 'illegal-dumping' ? 'default' : 'outline'}
              className={cn(
                'h-auto justify-start py-3',
                category === 'illegal-dumping'
                  ? 'border-primary bg-primary/20 text-primary-foreground'
                  : 'border-gray-600 bg-transparent text-gray-300'
              )}
              onClick={() => setCategory('illegal-dumping')}
            >
              <Trash2 className="mr-3 h-5 w-5" />
              <span className="font-semibold">Illegal Dumping</span>
            </Button>
            <Button
              variant={category === 'overflowing-bin' ? 'default' : 'outline'}
              className={cn(
                'h-auto justify-start py-3',
                category === 'overflowing-bin'
                  ? 'border-primary bg-primary/20 text-primary-foreground'
                  : 'border-gray-600 bg-transparent text-gray-300'
              )}
              onClick={() => setCategory('overflowing-bin')}
            >
              <Archive className="mr-3 h-5 w-5" />
              <span className="font-semibold">Overflowing Bin</span>
            </Button>
          </div>
        </div>

        {/* Location & Details */}
        <div className="mb-6">
          <Label
            htmlFor="details"
            className="text-xs font-semibold uppercase text-gray-400"
          >
            Location & Details
          </Label>
          <Textarea
            id="details"
            placeholder="Provide the street name, landmarks, or specific details of the waste disposal issue..."
            className="mt-2 min-h-[100px] border-gray-600 bg-[#2A312E] text-white placeholder:text-gray-500"
          />
        </div>

        {/* Anonymous Report */}
        <div className="mb-8 flex items-center justify-between rounded-lg bg-[#2A312E] p-4">
          <div className="flex items-center gap-4">
            <UserX className="h-6 w-6 text-gray-400" />
            <div>
              <p className="font-semibold">Anonymous Report</p>
              <p className="text-sm text-gray-400">
                Hide your identity from public records
              </p>
            </div>
          </div>
          <Switch id="anonymous-report" />
        </div>
      </div>

      {/* Footer */}
      <footer className="flex-shrink-0 p-4 pt-0">
        <Button size="lg" className="h-14 w-full text-base font-bold">
          <Send className="mr-2 h-5 w-5" />
          Submit Report
        </Button>
        <p className="mt-3 text-center text-xs text-gray-500">
          By submitting, you agree to provide accurate information to the Cebu
          Waste Management Office.
        </p>
      </footer>
    </div>
  );
}
