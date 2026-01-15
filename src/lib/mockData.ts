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
    restaurantName: 'La Forneria',
    role: 'Pizzaiolo(a)',
    price: 220,
    date: '2023-10-24T18:00:00',
    duration: '6h',
    location: 'Jardins, SP',
    urgentBoolean: true,
    status: 'available',
    restaurantLogo: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=100&h=100&fit=crop',
    specialty: 'Massas'
  },
  {
    id: 'j2',
    restaurantName: 'The Pub',
    role: 'Bartender (Barman/Barmaid)',
    price: 180,
    date: '2023-10-27T19:00:00',
    duration: '7h',
    location: 'Vila Madalena, SP',
    urgentBoolean: false,
    status: 'available',
    restaurantLogo: 'https://images.unsplash.com/photo-1514362545857-3bc16549766b?w=100&h=100&fit=crop',
    specialty: 'Drinks'
  },
  {
    id: 'j3',
    restaurantName: 'Oceano Sushi',
    role: 'Sushiman/Sushiwoman',
    price: 280,
    date: '2023-10-25T11:00:00',
    duration: '8h',
    location: 'Leblon, RJ',
    urgentBoolean: false,
    status: 'available',
    restaurantLogo: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=100&h=100&fit=crop',
    specialty: 'Cozinha Japonesa'
  },
  {
    id: 'j4',
    restaurantName: 'Bistrô Paris 6',
    role: 'Garçom/Garçonete',
    price: 150,
    date: '2023-10-24T19:00:00',
    duration: '5h',
    location: 'Jardins, SP',
    urgentBoolean: true,
    status: 'available',
    restaurantLogo: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=100&h=100&fit=crop',
    specialty: 'Salão'
  },
  {
    id: 'j5',
    restaurantName: 'Cantina do Nono',
    role: 'Serviços Gerais (Louça/Limpeza)',
    price: 130,
    date: '2023-10-26T17:00:00',
    duration: '6h',
    location: 'Moema, SP',
    urgentBoolean: false,
    status: 'available',
    restaurantLogo: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100&h=100&fit=crop',
    specialty: 'Limpeza'
  },
  {
    id: 'j6',
    restaurantName: 'Padaria Artesanal',
    role: 'Padeiro(a)',
    price: 190,
    date: '2023-10-25T04:00:00',
    duration: '8h',
    location: 'Botafogo, RJ',
    urgentBoolean: true,
    status: 'available',
    restaurantLogo: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100&h=100&fit=crop',
    specialty: 'Fermentação Natural'
  },
  {
    id: 'j7',
    restaurantName: 'Burger Joint',
    role: 'Caixa',
    price: 140,
    date: '2023-10-28T17:00:00',
    duration: '6h',
    location: 'Paulista, SP',
    urgentBoolean: false,
    status: 'available',
    restaurantLogo: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=100&h=100&fit=crop',
    specialty: 'Atendimento'
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
  },
  {
    id: 'j5',
    restaurantName: 'Burger King',
    role: 'Chef de Fila',
    price: 125,
    date: '2023-10-24T12:00:00',
    duration: '5h',
    location: 'Copacabana, RJ',
    urgentBoolean: false,
    status: 'completed',
    restaurantLogo: 'https://picsum.photos/id/48/100/100',
    specialty: 'Chapa/Lanches'
  }
];

export const transactions: Transaction[] = [
  {
    id: 't1',
    type: 'credit',
    amount: 150.00,
    date: '2023-10-24T19:30:00',
    status: 'completed',
    description: 'Plantão Bistro 55',
    restaurantName: 'Bistro 55'
  },
  {
    id: 't2',
    type: 'credit',
    amount: 200.00,
    date: '2023-10-23T21:00:00',
    status: 'processing',
    description: 'Plantão Cantina Roma',
    restaurantName: 'Cantina Roma'
  },
  {
    id: 't3',
    type: 'debit',
    amount: 500.00,
    date: '2023-10-20T10:45:00',
    status: 'completed',
    description: 'Saque para Conta'
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
  },
  {
    id: 'n2',
    title: 'Pagamento Confirmado',
    message: 'A fatura #4023 foi processada com sucesso.',
    date: '2023-10-24T13:45:00',
    read: false,
    type: 'payment'
  }
];