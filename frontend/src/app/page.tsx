'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { getProducts } from '@/lib/api';
import { formatPrice } from '@/lib/utils';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import type { Product } from '@/types';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { addItem } = useCart();

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setIsLoading(true);
        // In a real app, you might have an API endpoint for featured products
        // Here we're just getting a few random products
        const products = await getProducts();
        // Get up to 4 random products
        const randomProducts = products
          .sort(() => 0.5 - Math.random())
          .slice(0, 4);
        setFeaturedProducts(randomProducts);
      } catch (error) {
        console.error('Failed to fetch featured products:', error);
        toast({
          title: 'Error',
          description: 'Failed to load featured products. Please try again later.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, [toast]);

  const handleAddToCart = (product: Product) => {
    addItem(product);
    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/images/hero.jpg"
            alt="Hero Background"
            fill
            priority
            className="object-cover opacity-40"
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 py-32 sm:px-6 lg:flex lg:items-center lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              <span className="block">Premium Phone Cases</span>
              <span className="block text-indigo-400">For Every Style</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-gray-300">
              Discover our collection of stylish and durable phone cases designed to protect your
              device while expressing your unique personality.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link href="/products">
                <Button size="lg" className="px-8">
                  Shop Now
                </Button>
              </Link>
              <Link
                href="/about"
                className="flex items-center text-sm font-semibold text-white hover:text-indigo-300"
              >
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Featured Products
            </h2>
            <p className="mt-4 max-w-2xl text-center text-lg text-gray-600">
              Check out our most popular cases and accessories
            </p>
          </div>

          <div className="mt-12">
            {isLoading ? (
              <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="group relative animate-pulse">
                    <div className="aspect-h-1 aspect-w-1 h-80 w-full overflow-hidden rounded-lg bg-gray-200" />
                    <div className="mt-4 h-4 w-3/4 rounded bg-gray-200" />
                    <div className="mt-2 h-4 w-1/2 rounded bg-gray-200" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
                {featuredProducts.map((product) => (
                  <div key={product.id} className="group relative">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200">
                      {product.image_url ? (
                        <Image
                          src={product.image_url}
                          alt={product.name}
                          width={300}
                          height={300}
                          className="h-full w-full object-cover object-center transition-opacity group-hover:opacity-75"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-500">
                          No image
                        </div>
                      )}
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          <Link href={`/product/${product.id}`}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {product.name}
                          </Link>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                    <div className="mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCart(product);
                        }}
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-12 text-center">
              <Link href="/products">
                <Button variant="outline" size="lg">
                  View All Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why Choose Our Cases
            </h2>
            <p className="mt-4 max-w-2xl text-center text-lg text-gray-600">
              Quality protection designed for your lifestyle
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Premium Protection',
                description:
                  'Our cases are engineered with military-grade materials to protect your phone from drops and impacts.',
                icon: '🛡️',
              },
              {
                title: 'Stylish Designs',
                description:
                  'Express your personality with our wide range of colors, patterns, and textures.',
                icon: '🎨',
              },
              {
                title: 'Perfect Fit',
                description:
                  'Each case is precisely designed for your specific phone model to ensure a perfect fit.',
                icon: '✨',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-md"
              >
                <div className="mb-4 text-4xl">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-base text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-indigo-600 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center lg:flex-row lg:justify-between">
            <div className="lg:w-2/5">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Join Our Newsletter
              </h2>
              <p className="mt-4 text-lg text-indigo-100">
                Stay updated with our latest products, exclusive deals, and phone case tips.
              </p>
            </div>
            <div className="mt-8 w-full lg:mt-0 lg:w-2/5">
              <form className="flex flex-col sm:flex-row sm:gap-2">
                <div className="flex-grow">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full rounded-md border-gray-300 px-4 py-3 focus:border-white focus:ring-white"
                  />
                </div>
                <Button className="mt-3 sm:mt-0">Subscribe</Button>
              </form>
              <p className="mt-3 text-sm text-indigo-100">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
