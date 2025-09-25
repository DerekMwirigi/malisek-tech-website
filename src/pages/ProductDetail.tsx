import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, GitCompare, ShoppingCart, Star, Truck, Shield, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCartStore } from '@/store/cartStore';
import { sampleProducts } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { useToast } from '@/hooks/use-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariations, setSelectedVariations] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart, addToWishlist, addToCompare, wishlist, compareList } = useCartStore();
  const { toast } = useToast();

  const product = sampleProducts.find(p => p.id === id);
  const relatedProducts = sampleProducts.filter(p => p.category === product?.category && p.id !== id).slice(0, 4);

  const isWishlisted = wishlist.some(item => item.id === product?.id);
  const isInCompare = compareList.some(item => item.id === product?.id);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [id]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link to="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images || [product.image, product.image, product.image];
  
  const handleAddToCart = () => {
    if (!product.inStock) {
      toast({
        title: "Out of Stock",
        description: "This product is currently unavailable.",
        variant: "destructive"
      });
      return;
    }

    addToCart(product, quantity, selectedVariations);
    toast({
      title: "Added to Cart",
      description: `${quantity} ${product.name} added to your cart.`,
    });
  };

  const handleWishlist = () => {
    addToWishlist(product);
    toast({
      title: "Added to Wishlist",
      description: `${product.name} has been added to your wishlist.`,
    });
  };

  const handleCompare = () => {
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
        className={`h-5 w-5 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery Skeleton */}
          <div className="space-y-4">
            <div className="aspect-square bg-muted shimmer rounded-lg" />
            <div className="flex gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-20 h-20 bg-muted shimmer rounded" />
              ))}
            </div>
          </div>

          {/* Product Info Skeleton */}
          <div className="space-y-6">
            <div className="h-8 bg-muted shimmer rounded w-3/4" />
            <div className="h-4 bg-muted shimmer rounded w-1/2" />
            <div className="h-6 bg-muted shimmer rounded w-1/4" />
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-4 bg-muted shimmer rounded" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-8">
        <Link to="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Button>
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square relative overflow-hidden rounded-lg bg-muted">
            <img
              src={images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            
            {product.originalPrice && (
              <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </Badge>
            )}
          </div>

          <div className="flex gap-4 overflow-x-auto">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-none w-20 h-20 rounded overflow-hidden border-2 ${
                  selectedImage === index ? 'border-primary' : 'border-transparent'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <Badge variant="secondary">{product.category}</Badge>
              {!product.inStock && (
                <Badge variant="destructive">Out of Stock</Badge>
              )}
            </div>
            
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                {renderStars(product.rating)}
                <span className="ml-2 text-sm text-muted-foreground">
                  ({product.rating} stars)
                </span>
              </div>
            </div>

            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-4xl font-bold text-primary">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
          </div>

          <p className="text-lg text-muted-foreground">{product.description}</p>

          {/* Variations */}
          {product.variations && (
            <div className="space-y-4">
              {product.variations.map((variation) => (
                <div key={variation.name}>
                  <label className="block text-sm font-medium mb-2">
                    {variation.name}:
                  </label>
                  <Select
                    value={selectedVariations[variation.name] || ''}
                    onValueChange={(value) =>
                      setSelectedVariations(prev => ({
                        ...prev,
                        [variation.name]: value
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={`Choose ${variation.name}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {variation.options.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          )}

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium mb-2">Quantity:</label>
            <Select
              value={quantity.toString()}
              onValueChange={(value) => setQuantity(parseInt(value))}
            >
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[...Array(10)].map((_, i) => (
                  <SelectItem key={i + 1} value={(i + 1).toString()}>
                    {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <Button 
              onClick={handleAddToCart} 
              className="flex-1" 
              size="lg"
              disabled={!product.inStock}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={handleWishlist}
            >
              <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current text-red-500' : ''}`} />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={handleCompare}
            >
              <GitCompare className={`h-5 w-5 ${isInCompare ? 'fill-current text-primary' : ''}`} />
            </Button>
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t">
            <div className="text-center">
              <Truck className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium">Free Shipping</p>
              <p className="text-xs text-muted-foreground">On orders over $500</p>
            </div>
            <div className="text-center">
              <Shield className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium">2 Year Warranty</p>
              <p className="text-xs text-muted-foreground">Full protection</p>
            </div>
            <div className="text-center">
              <RefreshCw className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium">30-Day Returns</p>
              <p className="text-xs text-muted-foreground">No questions asked</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="details" className="mb-16">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="mt-6">
          <div className="prose max-w-none">
            <h3 className="text-xl font-semibold mb-4">Product Details</h3>
            <p className="text-muted-foreground mb-4">{product.description}</p>
            <p className="text-muted-foreground">
              This premium {product.category.toLowerCase()} device offers exceptional performance 
              and reliability. Designed with the latest technology and built to last, it's perfect 
              for both professional and personal use.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="features" className="mt-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">Key Features</h3>
            <ul className="space-y-3">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </TabsContent>
        
        <TabsContent value="reviews" className="mt-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="border-b pb-6">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="flex items-center">
                      {renderStars(5 - i)}
                    </div>
                    <span className="font-medium">Customer {i + 1}</span>
                    <span className="text-sm text-muted-foreground">2 days ago</span>
                  </div>
                  <p className="text-muted-foreground">
                    Great product! The quality is excellent and it works exactly as described. 
                    Highly recommend for anyone looking for a reliable {product.category.toLowerCase()}.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <h3 className="text-2xl font-bold mb-8">Related Products</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;