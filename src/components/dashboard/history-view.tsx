'use client';

import { wasteHistory } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Recycle, Trash2, Leaf, Gem, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

const categoryConfig = {
  recyclable: {
    icon: Recycle,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    label: 'Recyclable',
  },
  biodegradable: {
    icon: Leaf,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    label: 'Biodegradable',
  },
  residual: {
    icon: Trash2,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    label: 'Residual',
  },
};

export function HistoryView() {
  const totalPoints = wasteHistory.reduce((acc, curr) => acc + curr.pointsEarned, 0);

  return (
    <div className="space-y-6 p-4 sm:p-6 pb-24">
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <Gem className="h-6 w-6 text-primary mb-2" />
            <p className="text-2xl font-bold">{totalPoints}</p>
            <p className="text-xs text-muted-foreground">Total XP Gained</p>
          </CardContent>
        </Card>
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <Recycle className="h-6 w-6 text-primary mb-2" />
            <p className="text-2xl font-bold">{wasteHistory.length}</p>
            <p className="text-xs text-muted-foreground">Items Scanned</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold uppercase text-muted-foreground tracking-wider">
          Recent Disposals
        </h3>
        <div className="space-y-3">
          {wasteHistory.map((item) => {
            const config = categoryConfig[item.category];
            const Icon = config.icon;

            return (
              <Card key={item.id} className="overflow-hidden border-border/50 hover:border-primary/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className={cn("p-3 rounded-full", config.bgColor)}>
                      <Icon className={cn("h-6 w-6", config.color)} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-0.5">
                        <h4 className="font-bold text-base leading-none">{item.itemName}</h4>
                        <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                          +{item.pointsEarned} XP
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {item.disposedAt}
                        </span>
                        <span className="flex items-center gap-1 capitalize">
                          <span className={cn("h-1.5 w-1.5 rounded-full", config.color.replace('text', 'bg'))} />
                          {config.label}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
