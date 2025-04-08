import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Link href="/" className="text-2xl font-bold text-white">
              CaseCraft
            </Link>
            <p className="max-w-xs text-base leading-6">
              Stylish and protective cases for all your devices, designed with quality and durability in mind.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                  Shop
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/products" className="text-base hover:text-white">
                      All Products
                    </Link>
                  </li>
                  <li>
                    <Link href="/products?category=phone-cases" className="text-base hover:text-white">
                      Phone Cases
                    </Link>
                  </li>
                  <li>
                    <Link href="/products?category=screen-protectors" className="text-base hover:text-white">
                      Screen Protectors
                    </Link>
                  </li>
                  <li>
                    <Link href="/products?category=accessories" className="text-base hover:text-white">
                      Accessories
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                  Company
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/about" className="text-base hover:text-white">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-base hover:text-white">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link href="/careers" className="text-base hover:text-white">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="text-base hover:text-white">
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                  Support
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/faq" className="text-base hover:text-white">
                      FAQs
                    </Link>
                  </li>
                  <li>
                    <Link href="/shipping" className="text-base hover:text-white">
                      Shipping
                    </Link>
                  </li>
                  <li>
                    <Link href="/returns" className="text-base hover:text-white">
                      Returns
                    </Link>
                  </li>
                  <li>
                    <Link href="/warranty" className="text-base hover:text-white">
                      Warranty
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                  Contact Us
                </h3>
                <ul className="mt-4 space-y-4">
                  <li className="flex items-center">
                    <Mail className="mr-2 h-5 w-5 text-gray-400" />
                    <a href="mailto:info@casecraft.com" className="text-base hover:text-white">
                      info@casecraft.com
                    </a>
                  </li>
                  <li className="flex items-center">
                    <Phone className="mr-2 h-5 w-5 text-gray-400" />
                    <a href="tel:+11234567890" className="text-base hover:text-white">
                      +1 (123) 456-7890
                    </a>
                  </li>
                  <li className="flex items-start">
                    <MapPin className="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-gray-400" />
                    <span className="text-base">
                      123 Market Street, San Francisco, CA 94103, USA
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="text-base text-gray-400">
              &copy; {currentYear} CaseCraft. All rights reserved.
            </p>
            <div className="mt-4 flex space-x-6 md:mt-0">
              <Link href="/privacy" className="text-sm text-gray-400 hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-gray-400 hover:text-white">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-sm text-gray-400 hover:text-white">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 