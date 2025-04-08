import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
          <div>
            <h2 className="mb-4 text-lg font-semibold text-gray-900">CaseCraft</h2>
            <p className="text-sm text-gray-600">
              Your one-stop shop for premium phone cases and accessories.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase text-gray-900">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-sm text-gray-600 hover:text-gray-900">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products?category=phone-cases" className="text-sm text-gray-600 hover:text-gray-900">
                  Phone Cases
                </Link>
              </li>
              <li>
                <Link href="/products?category=accessories" className="text-sm text-gray-600 hover:text-gray-900">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase text-gray-900">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-gray-600 hover:text-gray-900">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-sm text-gray-600 hover:text-gray-900">
                  Shipping
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-sm text-gray-600 hover:text-gray-900">
                  Returns
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase text-gray-900">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-gray-900">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-center text-sm text-gray-600">
            &copy; {currentYear} CaseCraft. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 