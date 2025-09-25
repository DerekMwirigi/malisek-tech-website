import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product/ProductCard';
import { Product } from '@/store/cartStore';

interface ProductSectionProps {
  title: string;
  products: Product[];
  autoScroll?: boolean;
}

export const ProductSection = ({ title, products, autoScroll = false }: ProductSectionProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320; // Width of one card plus gap
      const currentScroll = scrollRef.current.scrollLeft;
      const targetScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      scrollRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-8 sm:py-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-8 gap-2 sm:gap-0 px-2 sm:px-0">
        <h2 className="text-2xl sm:text-3xl font-bold">{title}</h2>
        {!autoScroll && (
          <div className="flex gap-2 sm:gap-2 mt-2 sm:mt-0">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('left')}
              className="hidden sm:inline-flex"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('right')}
              className="hidden sm:inline-flex"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      <div
        ref={scrollRef}
        className={`flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide px-2 sm:px-0 ${
          autoScroll ? 'animate-scroll' : 'scroll-smooth'
        }`}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {products.map((product) => (
          <div key={product.id} className="flex-none w-40 xs:w-48 sm:w-64 md:w-80">
            <ProductCard product={product} />
          </div>
        ))}
        {/* Repeat products for infinite scroll effect if autoScroll */}
        {autoScroll && products.map((product) => (
          <div key={`${product.id}-repeat`} className="flex-none w-40 xs:w-48 sm:w-64 md:w-80">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};