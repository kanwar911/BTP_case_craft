import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { formatPrice, truncateText } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { id, name, description, price, image_url, stock } = product;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the button
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const isOutOfStock = stock <= 0;

  return (
    <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
      <Link href={`/product/${id}`} className="block overflow-hidden">
        <div className="aspect-square overflow-hidden bg-gray-100">
          {image_url ? (
            <Image
              src={image_url}
              alt={name}
              width={300}
              height={300}
              className="h-full w-full object-cover object-center transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-500">
              No image
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/product/${id}`} className="block">
          <h3 className="mb-1 text-lg font-medium text-gray-900">{name}</h3>
        </Link>
        {description && (
          <p className="mb-2 text-sm text-gray-500">
            {truncateText(description, 80)}
          </p>
        )}
        <div className="mt-2 flex items-center justify-between">
          <span className="text-lg font-semibold text-gray-900">
            {formatPrice(price)}
          </span>
          <Button
            size="sm"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={isOutOfStock ? 'bg-gray-300 hover:bg-gray-300' : ''}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {isOutOfStock ? 'Out of stock' : 'Add to cart'}
          </Button>
        </div>
      </div>
    </div>
  );
} 