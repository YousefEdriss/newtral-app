import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }

  const cartToken = localStorage.getItem('cart_token');
  if (cartToken) {
    config.headers['X-Cart-Token'] = cartToken;
  }

  return config;
});

// Auth
export const register = (data: { username: string; email: string; password: string; first_name?: string; last_name?: string }) =>
  api.post('/auth/register/', data);

export const login = (data: { username: string; password: string }) =>
  api.post('/auth/login/', data);

export const logout = () => api.post('/auth/logout/');

export const getCurrentUser = () => api.get('/auth/user/');

// Products
export const getProducts = (params?: { category?: string; collection?: string; featured?: boolean; search?: string }) =>
  api.get('/products/', { params });

export const getProduct = (slug: string) => api.get(`/products/${slug}/`);

export const getCategories = () => api.get('/categories/');

export const getCollections = () => api.get('/collections/');

// Cart
export const getCart = () => api.get('/cart/');

export const addToCart = (data: { product_id: number; size: string; quantity?: number }) =>
  api.post('/cart/add/', data);

export const updateCartItem = (itemId: number, data: { quantity: number }) =>
  api.patch(`/cart/items/${itemId}/`, data);

export const removeCartItem = (itemId: number) =>
  api.delete(`/cart/items/${itemId}/remove/`);

export const clearCart = () => api.post('/cart/clear/');

// Orders
export const getOrders = () => api.get('/orders/');

export const createOrder = (data: {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  notes?: string;
}) => api.post('/orders/create/', data);

// Contact
export const submitContact = (data: { name: string; email: string; subject: string; message: string }) =>
  api.post('/contact/', data);

export default api;
