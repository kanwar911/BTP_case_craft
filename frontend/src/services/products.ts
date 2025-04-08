import api from './api';

export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  image_url: string | null;
  category: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProductCreateData {
  name: string;
  description?: string;
  price: number;
  stock: number;
  image_url?: string;
  category?: string;
}

export interface ProductUpdateData {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  image_url?: string;
  category?: string;
}

export const getProducts = async (category?: string, skip = 0, limit = 10) => {
  const params = new URLSearchParams();
  if (category) params.append('category', category);
  params.append('skip', skip.toString());
  params.append('limit', limit.toString());
  
  const response = await api.get<Product[]>(`/products/?${params.toString()}`);
  return response.data;
};

export const getProduct = async (id: number) => {
  const response = await api.get<Product>(`/products/${id}`);
  return response.data;
};

export const createProduct = async (productData: ProductCreateData) => {
  const response = await api.post<Product>('/products/', productData);
  return response.data;
};

export const updateProduct = async (id: number, productData: ProductUpdateData) => {
  const response = await api.put<Product>(`/products/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id: number) => {
  const response = await api.delete<Product>(`/products/${id}`);
  return response.data;
}; 