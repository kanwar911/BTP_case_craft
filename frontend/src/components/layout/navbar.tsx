import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, User, Package, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { isAuthenticated, logout } from '@/services/auth';

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Check authentication status on client side only
    setIsLoggedIn(isAuthenticated());
  }, [pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-900">CaseCraft</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-6">
            <Link
              href="/products"
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Products
            </Link>
            <Link
              href="/cart"
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Cart
            </Link>
            {isLoggedIn ? (
              <>
                <Link
                  href="/profile"
                  className="text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Profile
                </Link>
                <Button variant="ghost" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Login
                </Link>
                <Link href="/register">
                  <Button variant="default" size="sm">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Navigation Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <Link href="/cart" className="text-gray-700 hover:text-gray-900">
              <ShoppingCart className="h-6 w-6" />
            </Link>
            <button
              className="text-gray-700 hover:text-gray-900"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="border-t border-gray-200 bg-white md:hidden">
          <div className="space-y-1 px-4 py-2">
            <Link
              href="/products"
              className="block py-2 text-base font-medium text-gray-700 hover:text-gray-900"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/cart"
              className="block py-2 text-base font-medium text-gray-700 hover:text-gray-900"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Cart
            </Link>
            {isLoggedIn ? (
              <>
                <Link
                  href="/profile"
                  className="block py-2 text-base font-medium text-gray-700 hover:text-gray-900"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start px-0" 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    logout();
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block py-2 text-base font-medium text-gray-700 hover:text-gray-900"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block py-2 text-base font-medium text-gray-700 hover:text-gray-900"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
} 