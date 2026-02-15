import type { ImagePlaceholder } from './placeholder-images';

export type Report = {
  id: string;
  title: string;
  location: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
  reportedAt: string;
  image: ImagePlaceholder;
};

export type LeaderboardUser = {
  rank: number;
  name: string;
  points: number;
  avatar: ImagePlaceholder;
};

export type Truck = {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  status: 'On Route' | 'Idle' | 'At Depot';
  eta: string;
};
