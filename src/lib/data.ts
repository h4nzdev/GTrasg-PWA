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
    name: 'Elena Cruz',
    points: 3450,
    avatar: getImage('user-avatar-2'),
    location: 'Lahug',
  },
  {
    rank: 2,
    name: 'Marco S.',
    points: 2940,
    avatar: getImage('user-avatar-3'),
    location: 'Guadalupe',
  },
  {
    rank: 3,
    name: 'Jovy F.',
    points: 2880,
    avatar: getImage('user-avatar-1'),
    location: 'Tisa',
  },
  {
    rank: 4,
    name: 'Sarah Lim',
    points: 2160,
    avatar: getImage('user-avatar-4'),
    location: 'Mabolo',
    tag: 'PRO',
  },
  {
    rank: 5,
    name: 'Danilo G.',
    points: 1980,
    avatar: getImage('user-avatar-5'),
    location: 'Talamban',
    tag: 'Expert',
  },
  {
    rank: 12,
    name: 'You',
    points: 1120,
    avatar: getImage('user-avatar-1'),
    location: 'Guadalupe, Cebu City',
    isCurrentUser: true,
  },
    {
    rank: 13,
    name: 'John Doe',
    points: 1050,
    avatar: getImage('user-avatar-2'),
    location: 'Cebu City',
  },
];
