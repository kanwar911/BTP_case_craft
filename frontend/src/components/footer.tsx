'use client';

import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-indigo-600">
                CaseCraft
              </Link>
            </div>
            <p className="mt-4 text-gray-600">
              Premium phone cases and accessories. Stylish protection for your devices with quality materials and designs.
            </p>
            <div className="mt-6">
              <div className="flex space-x-6">
                <a
                  href="#"
                  className="text-gray-400 hover:text-gray-500"
                  aria-label="Facebook"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-gray-500"
                  aria-label="Instagram"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465.668.25 1.29.638 1.846 1.215.577.577.965 1.199 1.215 1.847.247.636.416 1.363.465 2.427.048 1.024.06 1.379.06 3.808v.6c0 2.43-.013 2.784-.06 3.808-.049 1.064-.218 1.791-.465 2.427a4.903 4.903 0 01-1.215 1.846c-.577.577-1.199.965-1.847 1.215-.636.247-1.363.416-2.427.465-1.024.048-1.379.06-3.808.06h-.6c-2.43 0-2.784-.013-3.808-.06-1.064-.049-1.791-.218-2.427-.465-.668-.25-1.29-.638-1.846-1.215-.577-.577-.965-1.199-1.215-1.847-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.379-.06-3.808v-.6c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.903 4.903 0 011.215-1.846c.577-.577 1.199-.965 1.847-1.215.636-.247 1.363-.416 2.427-.465 1.024-.048 1.379-.06 3.808-.06h.6z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M12 15a3 3 0 100-6 3 3 0 000 6zm0 2a5 5 0 100-10 5 5 0 000 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-gray-500"
                  aria-label="Twitter"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53a8.348 8.348 0 002.048-2.124 8.19 8.19 0 01-2.36.648 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.606.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase text-gray-900">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products?category=Phone Cases" className="text-sm text-gray-600 hover:text-indigo-600">
                  Phone Cases
                </Link>
              </li>
              <li>
                <Link href="/products?category=Screen Protectors" className="text-sm text-gray-600 hover:text-indigo-600">
                  Screen Protectors
                </Link>
              </li>
              <li>
                <Link href="/products?category=Chargers" className="text-sm text-gray-600 hover:text-indigo-600">
                  Chargers
                </Link>
              </li>
              <li>
                <Link href="/products?category=Accessories" className="text-sm text-gray-600 hover:text-indigo-600">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase text-gray-900">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-indigo-600">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-gray-600 hover:text-indigo-600">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-sm text-gray-600 hover:text-indigo-600">
                  Shipping
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-sm text-gray-600 hover:text-indigo-600">
                  Returns
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase text-gray-900">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-indigo-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray-600 hover:text-indigo-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-600 hover:text-indigo-600">
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