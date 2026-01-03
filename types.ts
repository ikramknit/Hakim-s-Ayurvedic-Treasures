
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  category: string;
  image: string;
  stock: number;
  tags: string[];
  isOnSale: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  customerName: string;
  address: string;
  date: string;
  paymentMethod: string;
}

export interface Coupon {
  code: string;
  discount: number; // percentage
}
