/**
 * Product interface
 */
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url?: string;
  stock: number;
  featured?: boolean;
}

/**
 * User interface
 */
export interface User {
  id: string;
  username: string;
  email: string;
  full_name?: string;
}

/**
 * Cart Item interface
 */
export interface CartItem extends Product {
  quantity: number;
}

/**
 * Order interface
 */
export interface Order {
  id: string;
  user_id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  created_at: string;
  updated_at: string;
  shipping_address?: Address;
  payment_method?: string;
}

/**
 * Address interface
 */
export interface Address {
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
} 