
import { Destination, EventItem } from './types';

export const COLORS = {
  TEAL: '#002B2B',
  WHITE: '#F8F9FA',
  GOLD: '#C5A059',
};

export const DESTINATIONS: Destination[] = [
  {
    id: '1',
    name: 'Villa di Colloredo',
    location: 'San Daniele del Friuli',
    description: 'A 16th-century masterpiece overlooking the gentle hills of Friuli.',
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=800',
    category: 'Villa'
  },
  {
    id: '2',
    name: 'Borgo Enoteca',
    location: 'Cormons',
    description: 'Boutique vineyard stay in the heart of the Collio wine region.',
    image: 'https://images.unsplash.com/photo-1505944270255-bd2b68af644d?auto=format&fit=crop&q=80&w=800',
    category: 'Vineyard'
  },
  {
    id: '3',
    name: 'Trieste Grand Palace',
    location: 'Piazza Unità d\'Italia',
    description: 'Neoclassical opulence with sweeping views of the Adriatic Sea.',
    image: 'https://images.unsplash.com/photo-1520175480921-4edfa0683001?auto=format&fit=crop&q=80&w=800',
    category: 'Coastal'
  },
  {
    id: '4',
    name: 'Alps Refuge Resort',
    location: 'Tarvisio',
    description: 'Ultra-modern luxury architecture nestled in the Julian Alps.',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800',
    category: 'Mountain'
  }
];

export const EVENTS: EventItem[] = [
  {
    id: '1',
    title: 'Barcolana Regatta',
    date: 'October 12, 2025',
    category: 'Maritime',
    description: 'The world\'s largest sailing race takes over the Gulf of Trieste.',
    image: 'https://images.unsplash.com/photo-1512412086113-146399c23577?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    title: 'Aria di Festa',
    date: 'June 22, 2025',
    category: 'Gastronomy',
    description: 'A celebration of the legendary Prosciutto di San Daniele.',
    image: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    title: 'Mittelfest',
    date: 'July 15, 2025',
    category: 'Culture',
    description: 'International festival of theatre and dance in Cividale del Friuli.',
    image: 'https://images.unsplash.com/photo-1514525253361-bee8718a74a2?auto=format&fit=crop&q=80&w=800'
  }
];
