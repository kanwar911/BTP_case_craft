'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems } = useCart();
  const { isAuthenticated, logout, user } = useAuth();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex flex-shrink-0 items-center">
            <Link href="/" className="text-xl font-bold text-indigo-600">
              CaseCraft
            </Link>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            <Link
              href="/"
              className={`px-3 py-2 text-sm font-medium ${
                pathname === '/' ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
              }`}
            >
              Home
            </Link>
            <Link
              href="/products"
              className={`px-3 py-2 text-sm font-medium ${
                pathname === '/products' || pathname.startsWith('/product/')
                  ? 'text-indigo-600'
                  : 'text-gray-700 hover:text-indigo-600'
              }`}
            >
              Products
            </Link>
            <Link
              href="/about"
              className={`px-3 py-2 text-sm font-medium ${
                pathname === '/about' ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`px-3 py-2 text-sm font-medium ${
                pathname === '/contact' ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center">
            <Link href="/cart" className="relative mr-4 p-1">
              <ShoppingCart className="h-6 w-6 text-gray-700" />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-xs font-medium text-white">
                  {totalItems}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="hidden md:flex md:items-center">
                <Link href="/account">
                  <Button variant="ghost" className="flex items-center">
                    <User className="mr-2 h-5 w-5" />
                    {user?.username || 'Account'}
                  </Button>
                </Link>
                <Button variant="ghost" onClick={logout} className="ml-2">
                  Logout
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex md:items-center">
                <Link href="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link href="/register">
                  <Button variant="default" className="ml-2">
                    Register
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              type="button"
              className="ml-2 rounded-md p-2 text-gray-700 md:hidden"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            <Link
              href="/"
              className={`block px-3 py-2 text-base font-medium ${
                pathname === '/' ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/products"
              className={`block px-3 py-2 text-base font-medium ${
                pathname === '/products' ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/about"
              className={`block px-3 py-2 text-base font-medium ${
                pathname === '/about' ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`block px-3 py-2 text-base font-medium ${
                pathname === '/contact' ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>

            <div className="mt-4 border-t border-gray-200 pt-4">
              {isAuthenticated ? (
                <>
                  <Link
                    href="/account"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Account
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full px-3 py-2 text-left text-base font-medium text-gray-700 hover:text-indigo-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 