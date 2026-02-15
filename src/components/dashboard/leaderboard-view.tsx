'use client';

import { ArrowLeft, Share2, Trophy } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { leaderboard } from '@/lib/data';
import type { Dispatch, SetStateAction } from 'react';
import type { View } from '@/app/page';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const podiumUsers = leaderboard.slice(0, 3).sort((a, b) => a.rank - b.rank);
const topUser = podiumUsers.find((u) => u.rank === 1);
const secondUser = podiumUsers.find((u) => u.rank === 2);
const thirdUser = podiumUsers.find((u) => u.rank === 3);

const otherUsers = leaderboard.slice(3);

export function LeaderboardView({
  setActiveView,
}: {
  setActiveView: Dispatch<SetStateAction<View>>;
}) {
  const currentUser = leaderboard.find((u) => u.isCurrentUser);
  return (
    <div className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-[#1C211F] text-white">
      <header className="sticky top-0 z-10 flex-shrink-0 bg-[#1C211F]/80 backdrop-blur-sm">
        <div className="flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setActiveView('dashboard')}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-lg font-semibold">Eco-Warrior Leaderboard</h1>
          <Button variant="ghost" size="icon">
            <Share2 className="h-6 w-6" />
          </Button>
        </div>
      </header>

      <div className="flex-1 space-y-8 p-4 pt-2">
        <Tabs defaultValue="local" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-[#2A312E] p-1">
            <TabsTrigger
              value="local"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Local (Barangay)
            </TabsTrigger>
            <TabsTrigger
              value="city-wide"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              City-wide (Cebu)
            </TabsTrigger>
          </TabsList>
          <TabsContent value="local">
            {/* Podium */}
            <div className="relative mt-8 mb-12 flex items-end justify-center gap-4">
              {secondUser && (
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <Avatar className="h-20 w-20 border-4 border-gray-400">
                      <AvatarImage
                        src={secondUser.avatar.imageUrl}
                        alt={secondUser.name}
                      />
                      <AvatarFallback>
                        {secondUser.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-gray-400 px-2 py-0.5 text-xs font-bold text-black">
                      2
                    </Badge>
                  </div>
                  <p className="mt-3 font-semibold">{secondUser.name}</p>
                  <p className="text-sm text-gray-300">
                    {secondUser.points.toLocaleString()} pts
                  </p>
                </div>
              )}
              {topUser && (
                <div className="order-first mx-4 flex flex-col items-center md:order-none">
                  <div className="relative">
                    <Trophy className="absolute -top-6 left-1/2 h-8 w-8 -translate-x-1/2 text-yellow-400" />
                    <Avatar className="h-28 w-28 border-4 border-yellow-400">
                      <AvatarImage
                        src={topUser.avatar.imageUrl}
                        alt={topUser.name}
                      />
                      <AvatarFallback>{topUser.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-yellow-400 px-2.5 py-1 text-sm font-bold text-black">
                      1
                    </Badge>
                  </div>
                  <p className="mt-3 text-lg font-bold">{topUser.name}</p>
                  <p className="text-base text-green-400">
                    {topUser.points.toLocaleString()} pts
                  </p>
                </div>
              )}
              {thirdUser && (
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <Avatar className="h-20 w-20 border-4 border-orange-400">
                      <AvatarImage
                        src={thirdUser.avatar.imageUrl}
                        alt={thirdUser.name}
                      />
                      <AvatarFallback>
                        {thirdUser.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-orange-400 px-2 py-0.5 text-xs font-bold text-black">
                      3
                    </Badge>
                  </div>
                  <p className="mt-3 font-semibold">{thirdUser.name}</p>
                  <p className="text-sm text-gray-300">
                    {thirdUser.points.toLocaleString()} pts
                  </p>
                </div>
              )}
            </div>

            {/* Recent Rankings */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase text-gray-400">
                  Recent Rankings
                </h3>
                <Button
                  variant="link"
                  className="h-auto p-0 text-xs text-green-400"
                >
                  View all &gt;
                </Button>
              </div>

              <ul className="space-y-3">
                {currentUser && (
                  <li
                    key={currentUser.rank}
                    className="flex items-center gap-4 rounded-lg bg-green-900/60 p-3"
                  >
                    <div className="w-8 text-center text-lg font-bold text-green-400">
                      {currentUser.rank}
                    </div>
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={currentUser.avatar.imageUrl}
                        alt={currentUser.name}
                      />
                      <AvatarFallback>
                        {currentUser.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-bold text-white">{currentUser.name}</p>
                      <p className="text-xs text-gray-400">
                        {currentUser.location}
                      </p>
                    </div>
                    <p className="font-bold text-green-400">
                      {currentUser.points.toLocaleString()}{' '}
                      <span className="text-xs text-gray-400">PTS</span>
                    </p>
                  </li>
                )}
                {otherUsers
                  .filter((u) => !u.isCurrentUser)
                  .map((user) => (
                    <li
                      key={user.rank}
                      className="flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-white/5"
                    >
                      <div className="w-8 text-center text-lg font-bold text-gray-400">
                        {user.rank}
                      </div>
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={user.avatar.imageUrl}
                          alt={user.name}
                        />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-white">
                            {user.name}
                          </p>
                          {user.tag && (
                            <Badge className="bg-gray-600 px-1.5 py-0 text-[10px] text-gray-200">
                              {user.tag}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-400">
                          {user.location}
                        </p>
                      </div>
                      <p className="font-bold text-white">
                        {user.points.toLocaleString()}{' '}
                        <span className="text-xs text-gray-400">PTS</span>
                      </p>
                    </li>
                  ))}
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="city-wide">
            <div className="mt-8 flex h-48 items-center justify-center rounded-lg border-2 border-dashed border-gray-700">
              <p className="text-center text-gray-500">
                City-wide rankings will be shown here.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
