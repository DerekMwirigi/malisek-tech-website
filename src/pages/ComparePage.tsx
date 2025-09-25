import { Link } from 'react-router-dom';
import { ArrowLeft, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cartStore';
import { ProductCard } from '@/components/product/ProductCard';

const ComparePage = () => {
  const { compareList, removeFromCompare, clearCompare } = useCartStore();

  if (compareList.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Button>
          </Link>
        </div>

        <div className="text-center py-16">
          <h1 className="text-3xl font-bold mb-4">Compare Products</h1>
          <p className="text-muted-foreground mb-8">
            You haven't added any products to compare yet.
          </p>
          <Link to="/">
            <Button>Browse Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Compare Products</h1>
            <p className="text-muted-foreground">
              Compare up to 6 products side by side
            </p>
          </div>
        </div>

        <Button variant="outline" onClick={clearCompare}>
          Clear All
        </Button>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {compareList.map((product) => (
          <div key={product.id} className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10 bg-white/80 backdrop-blur-sm hover:bg-white"
              onClick={() => removeFromCompare(product.id)}
            >
              <X className="h-4 w-4" />
            </Button>
            <ProductCard product={product} variant="compare" />
          </div>
        ))}

        {/* Empty Slots */}
        {compareList.length < 6 && (
          <>
            {[...Array(6 - compareList.length)].map((_, index) => (
              <div
                key={`empty-${index}`}
                className="border-2 border-dashed border-muted rounded-lg p-8 flex flex-col items-center justify-center text-center min-h-[400px]"
              >
                <div className="text-4xl mb-4">+</div>
                <p className="text-muted-foreground mb-4">
                  Add another product to compare
                </p>
                <Link to="/">
                  <Button variant="outline" size="sm">
                    Browse Products
                  </Button>
                </Link>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Comparison Tips */}
      <div className="mt-12 p-6 bg-muted/50 rounded-lg">
        <h3 className="font-semibold mb-2">Comparison Tips</h3>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Compare products from the same category for best results</li>
          <li>• Check key features, pricing, and availability</li>
          <li>• Add products to your cart directly from the comparison</li>
          <li>• You can compare up to 6 products at once</li>
        </ul>
      </div>
    </div>
  );
};

export default ComparePage;