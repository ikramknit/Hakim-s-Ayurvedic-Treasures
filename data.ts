
import { Product } from './types.ts';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Kesar Chyawanprash Premium',
    description: 'Ancient immunity-boosting formula with silver and gold extracts. Rich in Vitamin C and 40+ powerful herbs.',
    price: 450,
    oldPrice: 599,
    category: 'Immunity',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop',
    stock: 120,
    tags: ['Best Seller', 'Traditional'],
    isOnSale: true
  },
  {
    id: '2',
    name: 'Himalayan Shilajit (Pure Resin)',
    description: 'Ethically sourced high-altitude resin for stamina, vitality, and cellular rejuvenation.',
    price: 1250,
    category: 'Energy',
    image: 'https://images.unsplash.com/photo-1615485240384-552e40030c14?q=80&w=800&auto=format&fit=crop',
    stock: 45,
    tags: ['Pure', 'Stamina'],
    isOnSale: false
  },
  {
    id: '3',
    name: 'Organic Ashwagandha Powder',
    description: 'Finely ground Withania somnifera roots for stress relief and cortisol management.',
    price: 350,
    oldPrice: 425,
    category: 'Stress & Sleep',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=800&auto=format&fit=crop',
    stock: 80,
    tags: ['Natural', 'Calm'],
    isOnSale: true
  },
  {
    id: '4',
    name: 'Amla & Mulethi Juice',
    description: 'Cold-pressed juice for digestive health, glowing skin, and natural detox.',
    price: 280,
    category: 'Digestion',
    image: 'https://images.unsplash.com/photo-1563483783225-fd532620756a?q=80&w=800&auto=format&fit=crop',
    stock: 200,
    tags: ['Vitamin C', 'Detox'],
    isOnSale: false
  },
  {
    id: '5',
    name: 'Brahmi Brain Revitalizer',
    description: 'Concentrated liquid extract to enhance memory, focus, and cognitive function.',
    price: 520,
    oldPrice: 650,
    category: 'Brain Health',
    image: 'https://images.unsplash.com/photo-1615485500704-8e990fdd9044?q=80&w=800&auto=format&fit=crop',
    stock: 60,
    tags: ['Memory', 'Focus'],
    isOnSale: true
  },
  {
    id: '6',
    name: 'Neem & Basil Cleansing Gel',
    description: 'Ayurvedic anti-bacterial formulation for acne-prone skin and deep pore cleansing.',
    price: 195,
    category: 'Skincare',
    image: 'https://images.unsplash.com/photo-1608639536836-e82006323d61?q=80&w=800&auto=format&fit=crop',
    stock: 150,
    tags: ['Herbal', 'Skin'],
    isOnSale: false
  },
  {
    id: '7',
    name: 'Triphala Churna Tablets',
    description: 'The balanced trio of Amla, Haritaki, and Bibhitaki for complete bowel health.',
    price: 240,
    category: 'Digestion',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop',
    stock: 300,
    tags: ['Digestion', 'Daily'],
    isOnSale: false
  },
  {
    id: '8',
    name: 'Saffron (Kesari) Premium Grade',
    description: 'Handpicked A++ Grade Kashmiri Saffron threads for pregnancy, skin, and culinary magic.',
    price: 3500,
    oldPrice: 4200,
    category: 'Herbs',
    image: 'https://images.unsplash.com/photo-1621263764491-7298e28bd329?q=80&w=800&auto=format&fit=crop',
    stock: 20,
    tags: ['Luxury', 'Pure'],
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
  'Skincare',
  'Energy'
];
