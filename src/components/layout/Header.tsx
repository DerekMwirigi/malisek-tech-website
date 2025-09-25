import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Heart, User, Menu, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCartStore } from '@/store/cartStore';
import { Badge } from '@/components/ui/badge';
import { useTheme } from 'next-themes';

const AdStrip = () => (
  <div className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground py-2 text-center text-sm font-medium">
    <div className="container mx-auto px-4">
      🎉 Free shipping on orders over $500 | 30-day return policy | 24/7 customer support
    </div>
  </div>
);

const Navigation = () => {
  const { theme, setTheme } = useTheme();
  const { getTotalItems, toggleCart, wishlist } = useCartStore();
  const totalItems = getTotalItems();

  const categories = [
    { name: 'Electronics', href: '/category/electronics' },
    { name: 'Smartphones', href: '/category/smartphones' },
    { name: 'Computers', href: '/category/computers' },
    { name: 'Wearables', href: '/category/wearables' },
    { name: 'Office Tech', href: '/category/office' },
    { name: 'Accessories', href: '/category/accessories' }
  ];

  return (
    <nav className="bg-card shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/assets/malisek-logo.jpg" 
              alt="Malisek Tech Solutions" 
              className="h-10 w-auto"
            />
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search for electronics, phones, computers..."
                className="pl-10 pr-4 w-full"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <Button variant="ghost" size="icon" className="relative">
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {wishlist.length}
                </Badge>
              )}
            </Button>

            <Button variant="ghost" size="icon" onClick={toggleCart} className="relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs cart-bounce">
                  {totalItems}
                </Badge>
              )}
            </Button>

            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>

            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Categories */}
        <div className="hidden md:flex items-center space-x-8 py-3 border-t">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export const Header = () => {
  return (
    <header className="sticky top-0 z-50">
      <AdStrip />
      <Navigation />
    </header>
  );
};