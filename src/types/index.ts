export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export interface Collection {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export interface ProductImage {
  id: number;
  image_url: string;
  alt_text: string;
  is_primary: boolean;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: string;
  compare_price: string | null;
  category: Category | null;
  collection: Collection | null;
  in_stock: boolean;
  inventory_count: number;
  featured: boolean;
  created_at: string;
  images: ProductImage[];
  primary_image: { image_url: string; alt_text: string } | null;
  hover_image: { image_url: string; alt_text: string } | null;
  discount_percent: number | null;
}

export interface CartItem {
  id: number;
  product: Product;
  size: string;
  quantity: number;
  subtotal: string;
}

export interface Cart {
  id: number;
  cart_token: string;
  items: CartItem[];
  total: string;
  item_count: number;
}

export interface Order {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  total: string;
  status: string;
  notes: string;
  created_at: string;
  items: OrderItem[];
}

export interface OrderItem {
  id: number;
  product_name: string;
  size: string;
  quantity: number;
  price: string;
  subtotal: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}
