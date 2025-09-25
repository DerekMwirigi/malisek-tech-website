  // Conversion rate: 1 USD = 150 KES
  const usdToKes = (usd: number) => Math.round(usd * 150);
import { useState, useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { FilterSidebar } from './FilterSidebar';
import { CartSidebar } from './CartSidebar';
import { useCartStore } from '@/store/cartStore';
import { ThemeProvider } from 'next-themes';

interface FilterState {
  categories: string[];
  brands: string[];
  priceRange: [number, number];
  rating: number;
  inStock: boolean;
}

interface LayoutProps {
  children: React.ReactNode;
  showFilters?: boolean;
}

export const Layout = ({ children, showFilters = false }: LayoutProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    brands: [],
  priceRange: [0, 750000],
    rating: 0,
    inStock: false
  });

  const { isOpen: isCartOpen } = useCartStore();

  // Handle cart animation trigger
  useEffect(() => {
    const handleCartUpdate = () => {
      const cartBadge = document.querySelector('.cart-bounce') as HTMLElement;
      if (cartBadge) {
        cartBadge.classList.remove('cart-bounce');
        void cartBadge.offsetWidth; // Trigger reflow
        cartBadge.classList.add('cart-bounce');
      }
    };

    document.addEventListener('cart-updated', handleCartUpdate);
    return () => document.removeEventListener('cart-updated', handleCartUpdate);
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <div className="flex flex-1">
          {showFilters && (
            <FilterSidebar
              isOpen={isFilterOpen}
              onToggle={() => setIsFilterOpen(!isFilterOpen)}
              filters={filters}
              onFiltersChange={setFilters}
            />
          )}
          
          <main className="flex-1">
            {children}
          </main>
        </div>
        
        <Footer />
        <CartSidebar />
      </div>
    </ThemeProvider>
  );
};