import { User, Job, Transaction, Notification } from '../types/index.ts';

export const currentUser: User = {
  id: 'u1',
  name: 'Chef Thiago',
  role: 'freelancer',
  email: 'thiago.chef@email.com',
  photoUrl: 'https://i.pravatar.cc/150?u=thiago',
  rating: 4.9,
  specialties: ['Cozinha Quente', 'Garde Manger'],
  bio: 'Chef apaixonado com 8 anos de experiência em alta gastronomia.'
};

export const availableJobs: Job[] = [
  {
    id: 'j1',
    restaurantName: 'Le Cordon Bleu',
    role: 'Chef de Partie • Cozinha Quente',
    price: 250,
    date: 'HOJE • 18:00',
    duration: '6h Duração',
    location: 'Botafogo, RJ',
    urgentBoolean: true,
    status: 'available',
    restaurantLogo: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=100&h=100&fit=crop',
    specialty: 'Alta Gastronomia'
  },
  {
    id: 'j2',
    restaurantName: 'Sushi Leblon',
    role: 'Auxiliar de Sushi • Frios',
    price: 180,
    date: 'AMANHÃ • 11:00',
    duration: '8h Duração',
    location: 'Leblon, RJ',
    urgentBoolean: false,
    status: 'available',
    restaurantLogo: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=100&h=100&fit=crop',
    specialty: 'Japonês'
  }
];

export const myShifts: Job[] = [
  {
    id: 'j4',
    restaurantName: 'Le Petit Bistro',
    role: 'Sub Chef',
    price: 180,
    date: '2023-10-28T16:00:00',
    duration: '6h',
    location: 'Centro, RJ',
    urgentBoolean: false,
    status: 'booked',
    restaurantLogo: 'https://picsum.photos/id/45/100/100',
    specialty: 'Cozinha Quente'
  }
];

export const transactions: Transaction[] = [
  {
    id: 't1',
    type: 'credit',
    amount: 150.00,
    date: '2023-10-24T19:30:00',
    status: 'completed',
    description: 'Bistro 55',
    restaurantName: 'Bistro 55'
  },
  {
    id: 't2',
    type: 'credit',
    amount: 200.00,
    date: '2023-10-23T21:00:00',
    status: 'processing',
    description: 'Cantina Roma',
    restaurantName: 'Cantina Roma'
  },
  {
    id: 't3',
    type: 'debit',
    amount: 500.00,
    date: '2023-10-20T10:45:00',
    status: 'completed',
    description: 'Saque para Conta'
  },
  {
    id: 't4',
    type: 'credit',
    amount: 320.00,
    date: '2023-10-18T18:00:00',
    status: 'completed',
    description: 'Oki Sushi',
    restaurantName: 'Oki Sushi'
  }
];

export const notifications: Notification[] = [
  {
    id: 'n1',
    title: 'Novo Candidato',
    message: 'João Silva aplicou para a vaga de Chef de Partie.',
    date: '2023-10-24T14:00:00',
    read: false,
    type: 'job'
  }
];
