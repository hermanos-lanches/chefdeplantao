export type UserRole = 'freelancer' | 'restaurant';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  photoUrl: string;
  rating?: number;
  specialties?: string[];
  bio?: string;
}

export interface Job {
  id: string;
  restaurantName: string;
  restaurantLogo?: string;
  role: string;
  price: number;
  date: string;
  duration: string;
  location: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  urgentBoolean: boolean;
  status: 'available' | 'booked' | 'completed' | 'cancelled';
  requirements?: string[];
  specialty?: string;
}

export interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  date: string;
  status: 'completed' | 'processing' | 'pending';
  description: string;
  restaurantName?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'job' | 'system' | 'payment';
}