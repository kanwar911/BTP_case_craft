import { Product } from '@/types';

// Mock product data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Case',
    description: 'Premium protective case for iPhone 15 Pro with military-grade drop protection.',
    price: 29.99,
    category: 'Phone Cases',
    image_url: 'https://placehold.co/300x300/3b82f6/FFFFFF/png?text=iPhone+15+Pro+Case',
    stock: 25,
    featured: true,
  },
  {
    id: '2',
    name: 'Samsung Galaxy S23 Case',
    description: 'Slim profile case for Samsung Galaxy S23 with antimicrobial protection.',
    price: 24.99,
    category: 'Phone Cases',
    image_url: 'https://placehold.co/300x300/10b981/FFFFFF/png?text=Galaxy+S23+Case',
    stock: 18,
    featured: true,
  },
  {
    id: '3',
    name: 'Tempered Glass Screen Protector',
    description: '9H hardness tempered glass screen protector, compatible with most smartphones.',
    price: 14.99,
    category: 'Screen Protectors',
    image_url: 'https://placehold.co/300x300/a855f7/FFFFFF/png?text=Screen+Protector',
    stock: 50,
    featured: false,
  },
  {
    id: '4',
    name: 'Wireless Charging Pad',
    description: 'Fast wireless charging pad compatible with Qi-enabled devices.',
    price: 39.99,
    category: 'Chargers',
    image_url: 'https://placehold.co/300x300/ec4899/FFFFFF/png?text=Charging+Pad',
    stock: 12,
    featured: true,
  },
  {
    id: '5',
    name: 'Phone Grip Stand',
    description: 'Collapsible grip and stand for secure handling of your smartphone.',
    price: 9.99,
    category: 'Accessories',
    image_url: 'https://placehold.co/300x300/f59e0b/FFFFFF/png?text=Phone+Grip',
    stock: 35,
    featured: false,
  },
  {
    id: '6',
    name: 'USB-C Fast Charging Cable',
    description: 'Durable 6ft USB-C cable with fast charging capability.',
    price: 19.99,
    category: 'Chargers',
    image_url: 'https://placehold.co/300x300/84cc16/FFFFFF/png?text=USB-C+Cable',
    stock: 40,
    featured: false,
  },
  {
    id: '7',
    name: 'AirPods Pro Case',
    description: 'Protective silicone case for AirPods Pro with carabiner.',
    price: 15.99,
    category: 'Accessories',
    image_url: 'https://placehold.co/300x300/14b8a6/FFFFFF/png?text=AirPods+Case',
    stock: 22,
    featured: true,
  },
  {
    id: '8',
    name: 'Pixel 7 Case',
    description: 'Slim protective case for Google Pixel 7 with enhanced corner protection.',
    price: 27.99,
    category: 'Phone Cases',
    image_url: 'https://placehold.co/300x300/8b5cf6/FFFFFF/png?text=Pixel+7+Case',
    stock: 15,
    featured: false,
  },
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Get all products
 */
export async function getProducts(category?: string): Promise<Product[]> {
  // Simulate API delay
  await delay(800);
  
  // Return filtered products if category is provided
  if (category && category.toLowerCase() !== 'all products') {
    return mockProducts.filter(
      product => product.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  return mockProducts;
}

/**
 * Get a single product by ID
 */
export async function getProduct(id: string): Promise<Product | null> {
  // Simulate API delay
  await delay(500);
  
  const product = mockProducts.find(p => p.id === id);
  return product || null;
}

/**
 * Get featured products
 */
export async function getFeaturedProducts(): Promise<Product[]> {
  // Simulate API delay
  await delay(600);
  
  return mockProducts.filter(product => product.featured);
}

/**
 * Search products by query string
 */
export async function searchProducts(query: string): Promise<Product[]> {
  // Simulate API delay
  await delay(500);
  
  const normalizedQuery = query.toLowerCase();
  
  return mockProducts.filter(product => 
    product.name.toLowerCase().includes(normalizedQuery) || 
    product.description.toLowerCase().includes(normalizedQuery) ||
    product.category.toLowerCase().includes(normalizedQuery)
  );
} 