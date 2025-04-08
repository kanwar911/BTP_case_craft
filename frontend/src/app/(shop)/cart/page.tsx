'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash, MinusCircle, PlusCircle, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulating a checkout process
    setTimeout(() => {
      clearCart();
      setIsCheckingOut(false);
      alert('Thank you for your purchase! This is a demo, so no actual payment was processed.');
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-2xl font-bold text-gray-900 sm:text-3xl">Your Cart</h1>
        <div className="flex flex-col items-center justify-center py-12">
          <ShoppingBag className="h-16 w-16 text-gray-300" />
          <h2 className="mt-4 text-lg font-semibold text-gray-900">Your cart is empty</h2>
          <p className="mt-2 text-gray-600">Looks like you haven't added any products to your cart yet.</p>
          <Link href="/products">
            <Button className="mt-6">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-2xl font-bold text-gray-900 sm:text-3xl">Your Cart</h1>
      
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            <ul className="divide-y divide-gray-200">
              {items.map((item) => (
                <li key={item.id} className="p-6">
                  <div className="flex flex-col items-start sm:flex-row">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      {item.image_url ? (
                        <Image
                          src={item.image_url}
                          alt={item.name}
                          width={96}
                          height={96}
                          className="h-full w-full object-cover object-center"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-500 text-xs">
                          No image
                        </div>
                      )}
                    </div>

                    <div className="mt-4 flex-1 sm:ml-6 sm:mt-0">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-base font-medium text-gray-900">
                            <Link href={`/product/${item.id}`} className="hover:underline">
                              {item.name}
                            </Link>
                          </h3>
                          {item.category && (
                            <p className="mt-1 text-sm text-gray-500">Category: {item.category}</p>
                          )}
                          <p className="mt-1 text-sm font-medium text-gray-900">
                            {formatPrice(item.price)}
                          </p>
                        </div>
                        <button
                          type="button"
                          className="text-sm text-red-600 hover:text-red-500"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="mt-4 flex items-center">
                        <button
                          type="button"
                          className="text-gray-500 hover:text-gray-600"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <MinusCircle className="h-5 w-5" />
                        </button>
                        <span className="mx-2 w-8 text-center text-gray-900">{item.quantity}</span>
                        <button
                          type="button"
                          className="text-gray-500 hover:text-gray-600"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= 10}
                        >
                          <PlusCircle className="h-5 w-5" />
                        </button>
                        <div className="ml-auto text-right">
                          <p className="text-sm font-medium text-gray-900">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-between border-t border-gray-200 p-6">
              <Link href="/products">
                <Button variant="outline">Continue Shopping</Button>
              </Link>
              <button
                type="button"
                className="text-sm text-red-600 hover:text-red-500"
                onClick={() => {
                  if (window.confirm('Are you sure you want to clear your cart?')) {
                    clearCart();
                  }
                }}
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
            
            <div className="mt-6 space-y-4">
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Subtotal ({totalItems} items)</p>
                <p className="text-sm font-medium text-gray-900">{formatPrice(totalPrice)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Shipping</p>
                <p className="text-sm font-medium text-gray-900">Free</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Tax</p>
                <p className="text-sm font-medium text-gray-900">{formatPrice(totalPrice * 0.1)}</p>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between">
                  <p className="text-base font-medium text-gray-900">Order Total</p>
                  <p className="text-base font-medium text-gray-900">
                    {formatPrice(totalPrice + totalPrice * 0.1)}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Button
                className="w-full"
                onClick={handleCheckout}
                isLoading={isCheckingOut}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? 'Processing...' : 'Checkout'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 