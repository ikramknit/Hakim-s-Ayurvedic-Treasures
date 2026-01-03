
import { Product } from './types.ts';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Ashwagandha Premium Extract',
    description: 'Vitality and stress management formula crafted using traditional extraction methods.',
    price: 24.99,
    oldPrice: 35.00,
    category: 'Stress & Sleep',
    image: 'https://images.unsplash.com/photo-1615485240384-552e40030c14?q=80&w=800&auto=format&fit=crop',
    stock: 50,
    tags: ['Best Seller', 'Vitality'],
    isOnSale: true
  },
  {
    id: '2',
    name: 'Brahmi Brain Booster',
    description: 'Enhance focus and mental clarity with our pure Brahmi leaf concentrate.',
    price: 18.50,
    category: 'Brain Health',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=800&auto=format&fit=crop',
    stock: 30,
    tags: ['Natural', 'Memory'],
    isOnSale: false
  },
  {
    id: '3',
    name: 'Triphala Digestive Tonic',
    description: 'A balanced blend of three fruits for optimal digestive harmony and detoxification.',
    price: 15.00,
    oldPrice: 19.99,
    category: 'Digestion',
    image: 'https://images.unsplash.com/photo-1563483783225-fd532620756a?q=80&w=800&auto=format&fit=crop',
    stock: 100,
    tags: ['Detox', 'Wellness'],
    isOnSale: true
  },
  {
    id: '4',
    name: 'Saffron (Kesar) Grade A+',
    description: 'Pure organic saffron from the fields of Kashmir. Hand-picked for purity.',
    price: 45.00,
    category: 'Herbs',
    image: 'https://images.unsplash.com/photo-1608639536836-e82006323d61?q=80&w=800&auto=format&fit=crop',
    stock: 15,
    tags: ['Luxury', 'Pure'],
    isOnSale: false
  },
  {
    id: '5',
    name: 'Turmeric Latte Blend',
    description: 'Golden milk powder with black pepper and ginger for maximum absorption.',
    price: 12.99,
    category: 'Immunity',
    image: 'https://images.unsplash.com/photo-1615485500704-8e990fdd9044?q=80&w=800&auto=format&fit=crop',
    stock: 80,
    tags: ['Immunity', 'Golden Milk'],
    isOnSale: false
  },
  {
    id: '6',
    name: 'Neem & Basil Skin Care',
    description: 'Anti-bacterial formulation for glowing skin and acne reduction.',
    price: 22.00,
    oldPrice: 28.00,
    category: 'Skincare',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop',
    stock: 45,
    tags: ['Organic', 'Skincare'],
    isOnSale: true
  }
];

export const CATEGORIES = [
  'All',
  'Stress & Sleep',
  'Brain Health',
  'Digestion',
  'Herbs',
  'Immunity',
  'Skincare'
];
