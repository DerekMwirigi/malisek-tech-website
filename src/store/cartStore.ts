import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  description: string;
  features: string[];
  inStock: boolean;
  variations?: Array<{
    name: string;
    options: string[];
  }>;
  images?: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedVariations?: Record<string, string>;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  wishlist: Product[];
  compareList: Product[];
  addToCart: (product: Product, quantity?: number, variations?: Record<string, string>) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setCartOpen: (open: boolean) => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      wishlist: [],
      compareList: [],

      addToCart: (product, quantity = 1, variations) => {
        const cartItem: CartItem = {
          ...product,
          quantity,
          selectedVariations: variations,
        };
        
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === product.id && 
            JSON.stringify(item.selectedVariations) === JSON.stringify(variations)
          );
          
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id && 
                JSON.stringify(item.selectedVariations) === JSON.stringify(variations)
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          
          return { items: [...state.items, cartItem] };
        });
        
        // Trigger cart bounce animation
        document.dispatchEvent(new CustomEvent('cart-updated'));
      },

      removeFromCart: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        })),

      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        })),

      clearCart: () => set({ items: [] }),

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      
      setCartOpen: (open) => set({ isOpen: open }),

      addToWishlist: (product) =>
        set((state) => {
          if (state.wishlist.find((item) => item.id === product.id)) {
            return state;
          }
          return { wishlist: [...state.wishlist, product] };
        }),

      removeFromWishlist: (productId) =>
        set((state) => ({
          wishlist: state.wishlist.filter((item) => item.id !== productId),
        })),

      addToCompare: (product) =>
        set((state) => {
          if (state.compareList.length >= 6) {
            return state; // Max 6 products for comparison
          }
          if (state.compareList.find((item) => item.id === product.id)) {
            return state;
          }
          return { compareList: [...state.compareList, product] };
        }),

      removeFromCompare: (productId) =>
        set((state) => ({
          compareList: state.compareList.filter((item) => item.id !== productId),
        })),

      clearCompare: () => set({ compareList: [] }),

      getTotalPrice: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getTotalItems: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: 'malisek-cart-storage',
    }
  )
);