'use client';

import Image from 'next/image';
import { Medal } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { leaderboard } from '@/lib/data';

const rankColors = {
  1: 'text-yellow-400',
  2: 'text-gray-400',
  3: 'text-orange-400',
};

export function LeaderboardView() {
  return (
    <Card className="mx-auto max-w-2xl">
      <CardHeader>
        <CardTitle>Eco-Points Leaderboard</CardTitle>
        <CardDescription>Top contributors to a cleaner city.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {leaderboard.map((user, index) => (
            <li
              key={user.rank}
              className="flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-muted/50"
            >
              <div className="flex w-10 items-center justify-center">
                {user.rank <= 3 ? (
                  <Medal
                    className={`h-6 w-6 ${(rankColors as any)[user.rank]}`}
                  />
                ) : (
                  <span className="text-lg font-bold text-muted-foreground">
                    {user.rank}
                  </span>
                )}
              </div>

              <Avatar>
                <AvatarImage src={user.avatar.imageUrl} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <p className="font-semibold">{user.name}</p>
              </div>

              <div className="text-right">
                <p className="font-bold text-accent">
                  {user.points.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">Points</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
