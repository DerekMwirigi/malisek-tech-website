import { useState } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { categories, brands, priceRanges } from '@/data/products';

interface FilterState {
  categories: string[];
  brands: string[];
  priceRange: [number, number];
  rating: number;
  inStock: boolean;
}

interface FilterSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export const FilterSidebar = ({ isOpen, onToggle, filters, onFiltersChange }: FilterSidebarProps) => {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    brands: true,
    price: true,
    rating: true,
    availability: true
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, category]
      : filters.categories.filter(c => c !== category);
    
    onFiltersChange({ ...filters, categories: newCategories });
  };

  const handleBrandChange = (brand: string, checked: boolean) => {
    const newBrands = checked
      ? [...filters.brands, brand]
      : filters.brands.filter(b => b !== brand);
    
    onFiltersChange({ ...filters, brands: newBrands });
  };

  const clearFilters = () => {
    onFiltersChange({
      categories: [],
      brands: [],
      priceRange: [0, 5000],
      rating: 0,
      inStock: false
    });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onToggle}
      />
      
      {/* Sidebar */}
      <div className="fixed lg:sticky top-0 left-0 lg:top-[140px] w-80 h-screen lg:h-[calc(100vh-140px)] bg-card border-r shadow-lg lg:shadow-none z-50 overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Filters</h2>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
              <Button variant="ghost" size="icon" onClick={onToggle} className="lg:hidden">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Categories */}
          <div className="mb-6">
            <Button
              variant="ghost"
              className="w-full justify-between p-0 h-auto font-medium text-left"
              onClick={() => toggleSection('categories')}
            >
              Categories
              {expandedSections.categories ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
            
            {expandedSections.categories && (
              <div className="mt-3 space-y-3">
                {categories.slice(1).map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={filters.categories.includes(category)}
                      onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                    />
                    <Label htmlFor={`category-${category}`} className="text-sm">
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Separator className="my-4" />

          {/* Brands */}
          <div className="mb-6">
            <Button
              variant="ghost"
              className="w-full justify-between p-0 h-auto font-medium text-left"
              onClick={() => toggleSection('brands')}
            >
              Brands
              {expandedSections.brands ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
            
            {expandedSections.brands && (
              <div className="mt-3 space-y-3">
                {brands.map((brand) => (
                  <div key={brand} className="flex items-center space-x-2">
                    <Checkbox
                      id={`brand-${brand}`}
                      checked={filters.brands.includes(brand)}
                      onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
                    />
                    <Label htmlFor={`brand-${brand}`} className="text-sm">
                      {brand}
                    </Label>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Separator className="my-4" />

          {/* Price Range */}
          <div className="mb-6">
            <Button
              variant="ghost"
              className="w-full justify-between p-0 h-auto font-medium text-left"
              onClick={() => toggleSection('price')}
            >
              Price Range
              {expandedSections.price ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
            
            {expandedSections.price && (
              <div className="mt-4">
                <div className="px-2">
                  <Slider
                    value={filters.priceRange}
                    onValueChange={(value) => onFiltersChange({ ...filters, priceRange: value as [number, number] })}
                    max={5000}
                    step={50}
                    className="mb-4"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${filters.priceRange[0]}</span>
                    <span>${filters.priceRange[1]}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Separator className="my-4" />

          {/* Rating */}
          <div className="mb-6">
            <Button
              variant="ghost"
              className="w-full justify-between p-0 h-auto font-medium text-left"
              onClick={() => toggleSection('rating')}
            >
              Minimum Rating
              {expandedSections.rating ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
            
            {expandedSections.rating && (
              <div className="mt-3 space-y-2">
                {[4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center space-x-2">
                    <Checkbox
                      id={`rating-${rating}`}
                      checked={filters.rating === rating}
                      onCheckedChange={(checked) => 
                        onFiltersChange({ ...filters, rating: checked ? rating : 0 })
                      }
                    />
                    <Label htmlFor={`rating-${rating}`} className="text-sm flex items-center">
                      {rating}+ ⭐
                    </Label>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Separator className="my-4" />

          {/* Availability */}
          <div className="mb-6">
            <Button
              variant="ghost"
              className="w-full justify-between p-0 h-auto font-medium text-left"
              onClick={() => toggleSection('availability')}
            >
              Availability
              {expandedSections.availability ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
            
            {expandedSections.availability && (
              <div className="mt-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="in-stock"
                    checked={filters.inStock}
                    onCheckedChange={(checked) => 
                      onFiltersChange({ ...filters, inStock: checked as boolean })
                    }
                  />
                  <Label htmlFor="in-stock" className="text-sm">
                    In Stock Only
                  </Label>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};