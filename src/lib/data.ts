import type { Report, LeaderboardUser, Truck } from './types';
import { PlaceHolderImages } from './placeholder-images';

function getImage(id: string) {
  const image = PlaceHolderImages.find((img) => img.id === id);
  if (!image) {
    throw new Error(`Image with id ${id} not found`);
  }
  return image;
}

export const trucks: Truck[] = [
  {
    id: 'TR-001',
    name: 'North-1',
    location: { lat: 10.3157, lng: 123.8854 },
    status: 'On Route',
    eta: '5 min',
  },
  {
    id: 'TR-002',
    name: 'South-2',
    location: { lat: 10.2925, lng: 123.8821 },
    status: 'On Route',
    eta: '12 min',
  },
  {
    id: 'TR-003',
    name: 'Central-3',
    location: { lat: 10.308, lng: 123.9056 },
    status: 'Idle',
    eta: '25 min',
  },
];

export const reports: Report[] = [
  {
    id: 'REP-001',
    title: 'Cleanup successful at Guadalupe Sapa',
    description:
      'Huge thanks to the volunteers! The illegal dumping site near the bridge has been cleared.',
    location: 'Brgy. Guadalupe',
    status: 'Resolved',
    reportedAt: '2h ago',
    image: getImage('report-2'), // Using 'garbage pile' to represent the cleared site
    likes: 124,
    comments: 18,
  },
  {
    id: 'REP-002',
    title: 'Overflowing Bins near Market',
    description:
      'Bins have not been emptied for 3 days. Smell is becoming an issue for the nearby street food...',
    location: 'Labangon Proper',
    status: 'In Progress',
    reportedAt: '5h ago',
    image: getImage('report-1'), // Overflowing trash can
    likes: 42,
    comments: 7,
  },
  {
    id: 'REP-003',
    title: 'Clogged Drainage - JY Area',
    description:
      'Heavy rain caused flooding because of plastic waste blocking the drainage inlet. Needs urgent attention.',
    location: 'Brgy. Lahug',
    status: 'Reported',
    reportedAt: '12h ago',
    image: getImage('report-3'), // Using 'garbage bags' as a substitute for clogged drainage
    likes: 88,
    comments: 24,
  },
];

export const leaderboard: LeaderboardUser[] = [
  {
    rank: 1,
    name: 'Maria Clara',
    points: 10250,
    avatar: getImage('user-avatar-1'),
  },
  {
    rank: 2,
    name: 'Jose Rizal',
    points: 9870,
    avatar: getImage('user-avatar-2'),
  },
  {
    rank: 3,
    name: 'Andres Bonifacio',
    points: 9500,
    avatar: getImage('user-avatar-3'),
  },
  {
    rank: 4,
    name: 'Gabriela Silang',
    points: 8900,
    avatar: getImage('user-avatar-4'),
  },
  {
    rank: 5,
    name: 'Apolinario Mabini',
    points: 8210,
    avatar: getImage('user-avatar-5'),
  },
];
