'use client';

import {
  Settings,
  Thermometer,
  CheckCircle2,
  Phone,
  Gauge,
  Pause,
} from 'lucide-react';
import Image from 'next/image';
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ChartContainer, type ChartConfig } from '@/components/ui/chart';

// Data for the radial chart
const chartData = [
  {
    name: 'Fill Level',
    value: 75,
  },
];

const chartConfig = {
  value: {
    label: 'Fill Level',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;


const HydraulicPressureIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const StableIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);


export function StatsView() {
  const mapImage = PlaceHolderImages.find((img) => img.id === 'map');

  return (
    <div className="min-h-full bg-background text-foreground p-4 sm:p-6 space-y-6">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-wider">TRK-8829-CEB</h1>
          <p className="text-xs text-primary font-semibold flex items-center">
            <span className="h-2 w-2 bg-primary rounded-full mr-2"></span>
            ACTIVE - ROUTE 4 (CEBU CITY)
          </p>
        </div>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Settings className="h-6 w-6" />
        </Button>
      </header>

      {/* Fill Level Chart */}
      <div className="relative h-56 w-56 mx-auto">
        <ChartContainer config={chartConfig} className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
                innerRadius="80%"
                outerRadius="100%"
                data={chartData}
                startAngle={90}
                endAngle={-270}
            >
                <PolarAngleAxis
                type="number"
                domain={[0, 100]}
                angleAxisId={0}
                tick={false}
                />
                <RadialBar
                    background
                    dataKey="value"
                    cornerRadius={10}
                    fill="var(--color-value)"
                />
            </RadialBarChart>
            </ResponsiveContainer>
        </ChartContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-5xl font-bold">75%</p>
          <p className="text-sm text-muted-foreground tracking-widest">FILL LEVEL</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-card border-border p-4">
          <CardContent className="p-0">
            <p className="text-xs text-muted-foreground uppercase">Remaining Cap.</p>
            <p className="text-2xl font-bold mt-1">1.5 <span className="text-base font-normal text-muted-foreground">tons</span></p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border p-4">
          <CardContent className="p-0">
            <div className="flex justify-between items-baseline">
                <p className="text-xs text-muted-foreground uppercase">Fuel Level</p>
                <p className="text-xs font-bold text-yellow-400">80%</p>
            </div>
            <Progress value={80} className="h-1 mt-2 bg-muted [&>div]:bg-yellow-400" />
            <p className="text-xs text-muted-foreground mt-1">Est. full tank use</p>
          </CardContent>
        </Card>
      </div>

      {/* Truck Health Diagnostics */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
            <h2 className="text-sm font-bold tracking-wider text-muted-foreground">TRUCK HEALTH DIAGNOSTICS</h2>
            <Button variant="link" className="text-primary p-0 h-auto text-xs">ALL SYSTEMS OK</Button>
        </div>
        
        <Card className="bg-card border-border">
            <CardContent className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Gauge className="h-6 w-6 text-primary"/>
                    <div>
                        <p className="text-sm text-muted-foreground">Tire Pressure</p>
                        <p className="font-bold">105 PSI <span className="text-sm font-normal text-green-500">Normal</span></p>
                    </div>
                </div>
                <Pause className="h-6 w-6 text-green-500 rotate-90"/>
            </CardContent>
        </Card>

        <Card className="bg-card border-border">
            <CardContent className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Thermometer className="h-6 w-6 text-primary"/>
                    <div>
                        <p className="text-sm text-muted-foreground">Engine Temp.</p>
                        <p className="font-bold">182°F <span className="text-sm font-normal text-green-500">Operating</span></p>
                    </div>
                </div>
                <CheckCircle2 className="h-6 w-6 text-green-500"/>
            </CardContent>
        </Card>

        <Card className="bg-card border-border">
            <CardContent className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <HydraulicPressureIcon className="h-6 w-6 text-primary"/>
                    <div>
                        <p className="text-sm text-muted-foreground">Hydraulic Pressure</p>
                        <p className="font-bold">2,450 PSI <span className="text-sm font-normal text-green-500">Stable</span></p>
                    </div>
                </div>
                <StableIcon className="h-6 w-6 text-green-500" />
            </CardContent>
        </Card>
      </div>

       {/* Next Collection Point */}
      {mapImage && (
         <Card className="bg-card border-border overflow-hidden relative aspect-[16/6]">
            <Image 
                src={mapImage.imageUrl} 
                alt="map"
                data-ai-hint="dark map"
                fill
                className="object-cover opacity-20"
            />
            <div className="absolute inset-0 p-4 flex justify-between items-end">
                <div>
                    <p className="text-xs text-muted-foreground uppercase">Next Collection Point</p>
                    <p className="font-bold">Colon St, Cebu City</p>
                </div>
                 <Button className="bg-primary hover:bg-primary/90 text-primary-foreground h-auto text-xs px-2 py-1">4 MIN AWAY</Button>
            </div>
         </Card>
      )}

      {/* Footer Button and Text */}
      <div className="space-y-4 pt-4 text-center">
         <Button size="lg" className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground">
            <Phone className="mr-2 h-5 w-5"/>
            CONTACT DISPATCH CENTER
         </Button>
         <p className="text-xs text-muted-foreground tracking-wider">CEBU WASTE MANAGEMENT OFFICE • GLOBAL COMMMS</p>
      </div>
    </div>
  );
}
