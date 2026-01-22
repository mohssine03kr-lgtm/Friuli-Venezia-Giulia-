
export interface Destination {
  id: string;
  name: string;
  location: string;
  description: string;
  image: string;
  category: 'Villa' | 'Vineyard' | 'Coastal' | 'Mountain';
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
  image: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}
