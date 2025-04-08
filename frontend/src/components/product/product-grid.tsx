import { Product } from '@/types';
import { ProductCard } from './product-card';

interface ProductGridProps {
  products: Product[];
  onAddToCart?: (product: Product) => void;
}

export function ProductGrid({ products, onAddToCart }: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <div className="flex h-40 w-full items-center justify-center rounded-md border border-dashed border-gray-300 p-8 text-center">
        <div>
          <p className="text-lg font-medium text-gray-500">No products found</p>
          <p className="mt-1 text-sm text-gray-400">
            Try changing your filters or check back later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
} 