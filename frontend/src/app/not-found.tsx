'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
      <h1 className="text-9xl font-bold text-indigo-600">404</h1>
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Page not found</h2>
      <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved, deleted,
        or never existed.
      </p>
      <div className="mt-10 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <Link href="/">
          <Button size="lg">Return Home</Button>
        </Link>
        <Link href="/products">
          <Button variant="outline" size="lg">
            View Products
          </Button>
        </Link>
      </div>
    </div>
  );
} 