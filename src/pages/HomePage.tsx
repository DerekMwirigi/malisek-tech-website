import { useState } from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HeroCarousel } from '@/components/home/HeroCarousel';
import { ProductSection } from '@/components/home/ProductSection';
import { ProductCard } from '@/components/product/ProductCard';
import { FilterSidebar } from '@/components/layout/FilterSidebar';
import { sampleProducts } from '@/data/products';

interface FilterState {
  categories: string[];
  brands: string[];
  priceRange: [number, number];
  rating: number;
  inStock: boolean;
}

const HomePage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    brands: [],
    priceRange: [0, 5000],
    rating: 0,
    inStock: false
  });

  // Filter products based on current filters
  const filteredProducts = sampleProducts.filter((product) => {
    if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
      return false;
    }
    
    if (filters.priceRange[0] > product.price || filters.priceRange[1] < product.price) {
      return false;
    }
    
    if (filters.rating > 0 && product.rating < filters.rating) {
      return false;
    }
    
    if (filters.inStock && !product.inStock) {
      return false;
    }
    
    return true;
  });

  const popularProducts = sampleProducts.slice(0, 4);
  const featuredProducts = sampleProducts.filter(p => p.originalPrice).slice(0, 4);
  const promotedProducts = sampleProducts.slice(2, 6);

  return (
    <div className="min-h-screen">
      {/* Filter Sidebar */}
      <FilterSidebar
        isOpen={isFilterOpen}
        onToggle={() => setIsFilterOpen(!isFilterOpen)}
        filters={filters}
        onFiltersChange={setFilters}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Hero Carousel */}
        <section className="mb-12">
          <HeroCarousel />
        </section>

        {/* Popular Products - Auto Scrolling */}
        <ProductSection
          title="🔥 Popular Products"
          products={popularProducts}
          autoScroll={true}
        />

        {/* Featured Products */}
        <ProductSection
          title="⭐ Featured Products"
          products={featuredProducts}
        />

        {/* Promoted Products */}
        <ProductSection
          title="🎯 Promoted Products"
          products={promotedProducts}
        />

        {/* All Products Grid */}
        <section className="py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">All Products</h2>
            
            <Button
              variant="outline"
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No products found matching your filters.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setFilters({
                  categories: [],
                  brands: [],
                  priceRange: [0, 5000],
                  rating: 0,
                  inStock: false
                })}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default HomePage;