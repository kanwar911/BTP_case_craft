'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductGrid } from '@/components/product/product-grid';
import { getProducts } from '@/lib/api';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Filter, Search, X } from 'lucide-react';
import type { Product } from '@/types';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const searchParams = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    // Check if there's a category in the URL
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }

    fetchProducts(categoryParam || 'All Products');
  }, [searchParams]);

  const fetchProducts = async (category: string) => {
    try {
      setLoading(true);
      const data = await getProducts(category !== 'All Products' ? category : undefined);
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      toast({
        title: 'Error',
        description: 'Failed to load products. Please try again later.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    // This will be implemented with the cart context later
    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart.`
    });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    fetchProducts(category);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setProducts(filteredProducts);
  };

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Products');
    fetchProducts('All Products');
  };

  // Category list for filtering
  const categories = [
    'All Products',
    'Phone Cases',
    'Accessories',
    'Screen Protectors',
    'Chargers'
  ];

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Products</h1>
          <p className="mt-1 text-gray-500">Browse our collection of phone cases and accessories</p>
        </div>

        {/* Mobile filter button */}
        <div className="flex items-center md:hidden">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleToggleFilters}
            className="flex items-center"
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
            {showFilters && <X className="ml-2 h-4 w-4" />}
          </Button>
        </div>

        {/* Desktop filters */}
        <div className="hidden md:flex md:items-center md:space-x-4">
          <div className="flex space-x-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </Button>
            ))}
          </div>
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full md:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button 
              type="submit" 
              size="sm" 
              variant="ghost" 
              className="absolute right-0 top-0 h-full"
            >
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>

      {/* Mobile filters */}
      {showFilters && (
        <div className="mt-4 rounded-md border border-gray-200 bg-white p-4 shadow-sm md:hidden">
          <div className="mb-4">
            <h3 className="mb-2 font-semibold text-gray-900">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button 
              type="submit" 
              size="sm" 
              variant="ghost" 
              className="absolute right-0 top-0 h-full"
            >
              <Search className="h-4 w-4" />
            </Button>
          </form>
          {(selectedCategory !== 'All Products' || searchQuery) && (
            <Button 
              variant="link" 
              size="sm" 
              onClick={handleClearFilters}
              className="mt-2"
            >
              Clear all filters
            </Button>
          )}
        </div>
      )}

      <div className="mt-6">
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="h-72 animate-pulse rounded-md bg-gray-200"></div>
            ))}
          </div>
        ) : (
          <ProductGrid products={products} onAddToCart={handleAddToCart} />
        )}
      </div>
    </div>
  );
} 