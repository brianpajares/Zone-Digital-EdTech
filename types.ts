export interface Product {
  id: string;
  category: string;
  title: string;
  price: number;
  currency: string;
  pages: number | null;
  formats: string[];
  coverImage: string;
  tagline: string;
  highlights: string[];
  longDescription: string;
  gumroadUrl?: string;
}

export interface Bundle {
  id: string;
  title: string;
  description: string;
  productIds: string[];
  discount: number; // Percentage (e.g., 0.20)
  coverImage: string;
  gumroadUrl?: string;
}

export interface CartItem {
  productId: string; // can be bundle ID or product ID
  type: 'product' | 'bundle';
  title: string;
  price: number;
  image: string;
}

export interface Lead {
  name: string;
  email: string;
  interest: string;
  consent: boolean;
}

export interface AnalyticsEvent {
  event: 'view_item' | 'begin_checkout' | 'purchase' | 'lead' | 'add_to_cart';
  data: Record<string, any>;
}