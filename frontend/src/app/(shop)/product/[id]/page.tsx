'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getProduct } from '@/lib/api';
import { formatPrice } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { useCart } from '@/hooks/useCart';
import type { Product } from '@/types';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();
  const { addItem } = useCart();

  const productId = params.id as string;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const data = await getProduct(productId);
        setProduct(data);
      } catch (error) {
        console.error('Failed to fetch product:', error);
        toast({
          title: 'Error',
          description: 'Failed to load product details. Please try again later.',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    } else {
      router.push('/products');
    }
  }, [productId, router, toast]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(Number(e.target.value));
  };

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addItem(product);
      }
      toast({
        title: 'Added to cart',
        description: `${quantity} ${product.name}${quantity > 1 ? 's' : ''} added to your cart.`
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-6 w-40 rounded bg-gray-200"></div>
          <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="aspect-square h-96 rounded bg-gray-200"></div>
            <div className="space-y-4">
              <div className="h-8 w-3/4 rounded bg-gray-200"></div>
              <div className="h-6 w-1/4 rounded bg-gray-200"></div>
              <div className="h-4 w-full rounded bg-gray-200"></div>
              <div className="h-4 w-full rounded bg-gray-200"></div>
              <div className="h-4 w-2/3 rounded bg-gray-200"></div>
              <div className="mt-8 h-10 w-full rounded bg-gray-200"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Product Not Found</h1>
          <p className="mt-2 text-gray-600">The product you're looking for doesn't exist.</p>
          <Link href="/products">
            <Button className="mt-4">View All Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const isOutOfStock = product.stock <= 0;

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/products" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Products
      </Link>

      <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover object-center"
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-500">
              No image available
            </div>
          )}
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{product.name}</h1>
          <div className="mt-2">
            <span className="text-2xl font-semibold text-gray-900">{formatPrice(product.price)}</span>
          </div>

          <div className="mt-4 flex items-center">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5"
                  fill={i < 4 ? 'currentColor' : 'none'}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">4.0 (24 reviews)</span>
          </div>

          {product.description && (
            <div className="mt-4 prose prose-sm text-gray-600">
              <p>{product.description}</p>
            </div>
          )}

          <div className="mt-6 border-t border-gray-200 pt-6">
            <div className="flex items-center">
              <h3 className="text-sm font-medium text-gray-900">Availability:</h3>
              <span
                className={`ml-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  isOutOfStock
                    ? 'bg-red-100 text-red-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {isOutOfStock ? 'Out of stock' : `In stock (${product.stock} available)`}
              </span>
            </div>

            {!isOutOfStock && (
              <div className="mt-4 flex items-center">
                <h3 className="text-sm font-medium text-gray-900">Quantity:</h3>
                <select
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="ml-2 rounded-md border-gray-300 py-1.5 text-sm text-gray-900 focus:border-indigo-500 focus:ring-indigo-500"
                >
                  {[...Array(Math.min(10, product.stock))].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="mt-6">
              <Button
                className="w-full"
                onClick={handleAddToCart}
                disabled={isOutOfStock}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
              </Button>
            </div>
          </div>

          <div className="mt-6 border-t border-gray-200 pt-6">
            <h3 className="text-sm font-medium text-gray-900">Product Details</h3>
            <div className="mt-2 space-y-2 text-sm text-gray-600">
              <p>SKU: {product.id}</p>
              <p>Category: {product.category || 'Uncategorized'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 