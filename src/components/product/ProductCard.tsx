import { useState } from 'react';
import { Heart, ShoppingCart, Eye, Star, GitCompare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useCartStore, Product } from '@/store/cartStore';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'compare';
}

export const ProductCard = ({ product, variant = 'default' }: ProductCardProps) => {
  // Conversion rate: 1 USD = 150 KES
  const usdToKes = (usd: number) => `KES ${Math.round(usd * 150).toLocaleString()}`;
  const placeholderImg = '/api/placeholder/300/300';
  const [isImageLoading, setIsImageLoading] = useState(true);
  const { addToCart, addToWishlist, addToCompare, wishlist, compareList } = useCartStore();
  const { toast } = useToast();

  const isWishlisted = wishlist.some(item => item.id === product.id);
  const isInCompare = compareList.some(item => item.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!product.inStock) {
      toast({
        title: "Out of Stock",
        description: "This product is currently unavailable.",
        variant: "destructive"
      });
      return;
    }

    addToCart(product);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToWishlist(product);
    toast({
      title: "Added to Wishlist",
      description: `${product.name} has been added to your wishlist.`,
    });
  };

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (compareList.length >= 6) {
      toast({
        title: "Compare Limit Reached",
        description: "You can compare up to 6 products at once.",
        variant: "destructive"
      });
      return;
    }

    addToCompare(product);
    toast({
      title: "Added to Compare",
      description: `${product.name} has been added to compare.`,
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  if (variant === 'compare') {
    return (
      <Card className="h-full">
        <CardContent className="p-6">
          <div className="aspect-square mb-4 relative overflow-hidden rounded-lg bg-muted">
            {isImageLoading && (
              <div className="absolute inset-0 shimmer rounded-lg" />
            )}
            <img
              src={product.image || placeholderImg}
              alt={product.name}
              className="w-full h-full object-cover"
              onLoad={() => setIsImageLoading(false)}
              onError={e => { (e.currentTarget as HTMLImageElement).src = placeholderImg; }}
            />
          </div>
          
          <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
          
          <div className="flex items-center mb-2">
            {renderStars(product.rating)}
            <span className="ml-2 text-sm text-muted-foreground">({product.rating})</span>
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Price:</span>
              <div className="text-right">
                <span className="font-semibold text-primary">{usdToKes(product.price)}</span>
                {product.originalPrice && (
                  <span className="ml-2 text-sm text-muted-foreground line-through">
                    {usdToKes(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Category:</span>
              <span className="text-sm font-medium">{product.category}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Availability:</span>
              <Badge variant={product.inStock ? 'default' : 'destructive'}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </Badge>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <h4 className="font-medium text-sm">Key Features:</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              {product.features.slice(0, 4).map((feature, index) => (
                <li key={index}>• {feature}</li>
              ))}
            </ul>
          </div>

          <Button 
            onClick={handleAddToCart} 
            className="w-full" 
            disabled={!product.inStock}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Link to={`/product/${product.id}`}>
      <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
        <CardContent className="p-0">
          {/* Image */}
          <div className="aspect-square relative overflow-hidden rounded-t-lg bg-muted">
            {/* Loading Shimmer */}
            {isImageLoading && (
              <div className="absolute inset-0 shimmer rounded-t-lg" />
            )}
            
            <img
              src={product.image || placeholderImg}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onLoad={() => setIsImageLoading(false)}
              onError={e => { (e.currentTarget as HTMLImageElement).src = placeholderImg; }}
            />
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.originalPrice && (
                <Badge className="bg-destructive text-destructive-foreground">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </Badge>
              )}
              {!product.inStock && (
                <Badge variant="destructive">Out of Stock</Badge>
              )}
            </div>

            {/* Quick Actions */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                size="icon"
                variant="secondary"
                className="h-8 w-8"
                onClick={handleWishlist}
              >
                <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current text-red-500' : ''}`} />
              </Button>
              
              <Button
                size="icon"
                variant="secondary"
                className="h-8 w-8"
                onClick={handleCompare}
              >
                <GitCompare className={`h-4 w-4 ${isInCompare ? 'fill-current text-primary' : ''}`} />
              </Button>
              
              <Button
                size="icon"
                variant="secondary"
                className="h-8 w-8"
                asChild
              >
                <Link to={`/product/${product.id}`}>
                  <Eye className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Add to Cart Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button 
                onClick={handleAddToCart} 
                className="w-full" 
                size="sm"
                disabled={!product.inStock}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="flex items-center mb-2">
              {renderStars(product.rating)}
              <span className="ml-2 text-sm text-muted-foreground">({product.rating})</span>
            </div>

            <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {product.description}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-primary">{usdToKes(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    {usdToKes(product.originalPrice)}
                  </span>
                )}
              </div>
              
              <Badge variant="secondary" className="text-xs">
                {product.category}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};