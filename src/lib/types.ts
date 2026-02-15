import type { ImagePlaceholder } from './placeholder-images';

export type Report = {
  id: string;
  title: string;
  description: string;
  location: string;
  status: 'Reported' | 'In Progress' | 'Resolved';
  reportedAt: string;
  image: ImagePlaceholder;
  likes: number;
  comments: number;
};

export type LeaderboardUser = {
  rank: number;
  name: string;
  points: number;
  avatar: ImagePlaceholder;
  location: string;
  tag?: 'PRO' | 'Expert';
  isCurrentUser?: boolean;
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
