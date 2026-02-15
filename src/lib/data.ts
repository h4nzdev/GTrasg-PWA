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
    title: 'Overflowing Bin',
    location: 'Fuente Osmeña Circle',
    status: 'Resolved',
    reportedAt: '2 days ago',
    image: getImage('report-1'),
  },
  {
    id: 'REP-002',
    title: 'Illegal Dumping',
    location: 'Near Colon St.',
    status: 'In Progress',
    reportedAt: '1 day ago',
    image: getImage('report-2'),
  },
  {
    id: 'REP-003',
    title: 'Missed Pickup',
    location: 'Banilad, Cebu City',
    status: 'Pending',
    reportedAt: '3 hours ago',
    image: getImage('report-3'),
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
