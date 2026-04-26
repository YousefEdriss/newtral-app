import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { Cart } from '../types';
import { getCart, addToCart as apiAddToCart, updateCartItem as apiUpdateCartItem, removeCartItem as apiRemoveCartItem, clearCart as apiClearCart } from '../services/api';

// Ensure cart_token exists in localStorage
function ensureCartToken(): string {
  let token = localStorage.getItem('cart_token');
  if (!token) {
    token = crypto.randomUUID();
    localStorage.setItem('cart_token', token);
  }
  return token;
}

interface CartContextType {
  cart: Cart | null;
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (productId: number, size: string, quantity?: number) => Promise<void>;
  updateItem: (itemId: number, quantity: number) => Promise<void>;
  removeItem: (itemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
  loading: boolean;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const refreshCart = useCallback(async () => {
    ensureCartToken();
    try {
      const res = await getCart();
      setCart(res.data);
    } catch {
      setCart(null);
    }
  }, []);

  useEffect(() => {
    ensureCartToken();
    refreshCart();
  }, [refreshCart]);

  const addToCart = async (productId: number, size: string, quantity = 1) => {
    setLoading(true);
    try {
      await apiAddToCart({ product_id: productId, size, quantity });
      await refreshCart();
      setCartOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (itemId: number, quantity: number) => {
    setLoading(true);
    try {
      await apiUpdateCartItem(itemId, { quantity });
      await refreshCart();
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (itemId: number) => {
    setLoading(true);
    try {
      await apiRemoveCartItem(itemId);
      await refreshCart();
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    setLoading(true);
    try {
      await apiClearCart();
      await refreshCart();
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider value={{
      cart,
      cartOpen,
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
      addToCart,
      updateItem,
      removeItem,
      clearCart,
      refreshCart,
      loading,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
