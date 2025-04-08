import api from './api';
import { jwtDecode } from 'jwt-decode';

interface LoginCredentials {
  username: string;
  password: string;
}

interface RegisterData {
  email: string;
  username: string;
  password: string;
  full_name?: string;
}

interface AuthResponse {
  access_token: string;
  token_type: string;
}

interface TokenPayload {
  sub: string; // username
  exp: number;
}

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  // Using URLSearchParams for form data as required by the backend
  const formData = new URLSearchParams();
  formData.append('username', credentials.username);
  formData.append('password', credentials.password);

  const response = await api.post<AuthResponse>('/auth/token', formData.toString(), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  
  // Store the token in localStorage for future requests
  if (response.data.access_token) {
    localStorage.setItem('token', response.data.access_token);
  }
  
  return response.data;
};

export const register = async (userData: RegisterData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login';
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/me');
    return response.data;
  } catch (error) {
    return null;
  }
};

export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const token = localStorage.getItem('token');
  if (!token) return false;
  
  try {
    const decoded = jwtDecode<TokenPayload>(token);
    const currentTime = Date.now() / 1000;
    
    // Check if token is expired
    if (decoded.exp < currentTime) {
      localStorage.removeItem('token');
      return false;
    }
    
    return true;
  } catch (error) {
    return false;
  }
}; 