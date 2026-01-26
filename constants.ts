
import { Destination, EventItem } from './types';

export const COLORS = {
  TEAL: '#002B2B',
  WHITE: '#F8F9FA',
  GOLD: '#C5A059',
};

export const DESTINATIONS: Destination[] = [
  {
    id: 'trieste-01',
    name: 'Trieste',
    location: 'Gulf of Trieste',
    description: 'A city where Viennese grandeur meets the salt of the Adriatic. Walk the Molo Audace and experience the Bora wind.',
    image: 'https://images.unsplash.com/photo-1565104169525-095598642398?auto=format&fit=crop&q=80&w=1200',
    category: 'Coastal'
  },
  {
    id: 'udine-02',
    name: 'Udine',
    location: 'Central Friuli',
    description: 'The city of Tiepolo. Elegant Venetian Gothic squares and the imposing castle overlooking the Alps.',
    image: 'https://images.unsplash.com/photo-1628109012431-7e3e2641f391?auto=format&fit=crop&q=80&w=1200',
    category: 'Mountain'
  },
  {
    id: 'grado-03',
    name: 'Grado',
    location: 'Lagoon of Grado',
    description: 'The Golden Island. A labyrinth of historic calli and sandy beaches that once served as the imperial retreat for the Austro-Hungarian elite.',
    image: 'https://images.unsplash.com/photo-1548175582-723f8c853f6b?auto=format&fit=crop&q=80&w=1200',
    category: 'Coastal'
  },
  {
    id: 'collio-04',
    name: 'Collio Vineyards',
    location: 'Gorizia Border',
    description: 'Rolling emerald hills producing the world\'s finest white wines. Secluded estates and sunset wine tastings.',
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b0ca3ef?auto=format&fit=crop&q=80&w=1200',
    category: 'Vineyard'
  },
  {
    id: 'tarvisio-05',
    name: 'Julian Alps',
    location: 'Tarvisio',
    description: 'Where three borders meet. Pristine glacial lakes and jagged peaks for the ultimate winter or summer escape.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200',
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
  }
];
