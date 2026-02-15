'use client';
import Image from 'next/image';
import {
  Truck,
  ChevronRight,
  Navigation,
  Expand,
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { tasks } from '@/lib/data';
import { cn } from '@/lib/utils';

export function TaskFeedView() {
  return (
    <div className="w-full bg-[#131A21] text-white min-h-full">
      {/* Header */}
      <header className="p-4 space-y-4 bg-[#1C2C3A]">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Task Feed</h1>
          <Button variant="ghost" size="icon">
            <Truck className="h-6 w-6" />
          </Button>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">ROUTE: CEBU NORTH - SECTOR 4</span>
          <ChevronRight className="h-4 w-4 text-gray-500" />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1 text-xs font-medium text-gray-300">
            <span>ROUTE PROGRESS</span>
            <span>8/12 Cleared</span>
          </div>
          <Progress value={(8 / 12) * 100} className="h-2 bg-gray-700 [&>div]:bg-green-500" />
        </div>
      </header>
      
      {/* Filters */}
      <div className="p-4 flex gap-2 overflow-x-auto">
          <Button className="bg-green-500/20 text-green-300 hover:bg-green-500/30 border border-green-500/30">Near You</Button>
          <Button variant="outline" className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white">Priority (3)</Button>
          <Button variant="outline" className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white">Overflowing Bins</Button>
      </div>

      {/* Task List */}
      <div className="p-4 space-y-4">
        {tasks.map((task) => (
          <Card key={task.id} className="bg-[#1C2C3A] border-gray-700 overflow-hidden">
            <CardContent className="p-0">
              <div className="flex gap-4 p-4">
                <Image
                  src={task.image.imageUrl}
                  alt={task.image.description}
                  data-ai-hint={task.image.imageHint}
                  width={80}
                  height={80}
                  className="rounded-lg object-cover w-20 h-20"
                />
                <div className="flex-1">
                  {task.status === 'CRITICAL' && (
                     <Badge className="bg-red-500/20 text-red-300 border-red-500/30 mb-1">CRITICAL</Badge>
                  )}
                  <h3 className="font-bold text-lg">{task.title}</h3>
                  <p className="text-sm text-gray-400 line-clamp-2">{task.description}</p>
                  <div className="text-xs text-gray-500 mt-1 flex items-center gap-4">
                     <span>▼ {task.distance}</span>
                     <span>• {task.time}</span>
                  </div>
                </div>
              </div>
              <div className="bg-black/20 px-4 py-3 flex justify-between items-center">
                  <Button variant="ghost" className="text-green-400 hover:text-green-300 p-0 h-auto">
                      <Navigation className="h-4 w-4 mr-2"/>
                      <span className="font-semibold">NAVIGATE</span>
                  </Button>
                  <div className="flex items-center space-x-2">
                    <Checkbox id={`task-${task.id}`} className="border-gray-500 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-400"/>
                    <Label htmlFor={`task-${task.id}`} className="text-gray-400 font-semibold text-sm">MARK CLEARED</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Cluster View Card */}
        <Card className="bg-[#1C2C3A] border-gray-700 overflow-hidden relative aspect-[16/7]">
             <Image
                src={getImage('map').imageUrl}
                alt={getImage('map').description}
                data-ai-hint="dark map"
                fill
                className="object-cover opacity-20"
             />
             <div className="absolute inset-0 p-4 flex justify-between items-end">
                <div>
                    <h3 className="font-bold text-lg">Cluster View</h3>
                    <p className="text-sm text-gray-400">2 more tasks found nearby</p>
                </div>
                <Button size="icon" className="bg-green-500/20 hover:bg-green-500/30 text-green-300">
                    <Expand className="h-5 w-5"/>
                </Button>
             </div>
        </Card>
        
        <p className="text-center text-gray-600 font-bold text-xs py-4">END OF FEED</p>
      </div>
    </div>
  );
}

function getImage(id: string) {
  const image = tasks.map(t => t.image).find(i => i.id === id) 
    ?? PlaceHolderImages.find(i => i.id === id);
  if (!image) {
    throw new Error(`Image with id ${id} not found`);
  }
  return image;
}

// Dummy import to satisfy compiler, data comes from lib/data
import { PlaceHolderImages } from '@/lib/placeholder-images';
