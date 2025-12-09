export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  pricing: string;
  website: string;
  featured: boolean;
}

export interface Banner {
  id: number;
  isSpecial?: boolean;
  brand?: 'google' | 'openai';
  title: string;
  subtitle?: string;
  offerDescription?: string;
  cta: string;
  gradient: string;
  link: string;
  logo?: string;
  price?: string;
  oldPrice?: string;
}

export type ViewMode = 'grid' | 'compact';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
