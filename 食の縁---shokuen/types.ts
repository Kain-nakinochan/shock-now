
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string; // Optional: for user profile image
  followedProducers: string[]; // IDs of followed producers, initialized as empty array if none
}

export interface Post {
  id: string;
  producerId: string; // Link to the producer
  producerName: string; // Denormalized for easier display
  producerProfileImage?: string; // Denormalized
  title: string;
  content: string;
  imageUrl?: string; // Optional image for the post
  createdAt: string; // ISO date string
  likes?: number;
}

export interface Notification {
  id: string;
  type: 'new_post' | 'reservation_update' | 'system';
  title: string;
  message: string;
  createdAt: string; // ISO date string
  read: boolean;
  linkTo?: string; // Optional link for navigation
  relatedPostId?: string;
  relatedProducerId?: string;
}

export interface Producer {
  id: string;
  name: string;
  tagline: string;
  location: string;
  storySummary: string;
  specialty: string[];
  profileImage: string;
  coverImage: string;
  philosophy: string;
  visitInfo?: string;
  products?: Product[];
  followerCount: number; // Added follower count
  // posts?: Post[]; // Optionally embed posts or fetch separately
}

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price?: string;
}

export enum AppRoute {
  Home = '/',
  Login = '/login',
  ProducersList = '/producers',
  ProducerDetail = '/producers/:id',
  PostsFeed = '/posts', // Could be same as Home or separate
  PostDetail = '/posts/:postId',
  Reservation = '/reservation/:postId', // Example: reserve based on a post
  Notifications = '/notifications',
}