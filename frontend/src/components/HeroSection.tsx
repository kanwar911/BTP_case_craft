import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export function HeroSection() {
  return (
    <div className="relative">
      {/* Hero background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="h-full w-full bg-gradient-to-br from-blue-100 to-indigo-100"></div>
      </div>
      
      {/* Hero content */}
      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 py-24 sm:px-6 sm:py-32 lg:flex-row lg:px-8">
        {/* Text content */}
        <div className="text-center lg:w-1/2 lg:text-left">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Premium Phone Cases &</span>
            <span className="block text-indigo-600">Accessories</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Discover our collection of stylish, durable phone cases and accessories designed to protect and enhance your device.
          </p>
          <div className="mt-8 flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 lg:justify-start">
            <Button asChild size="lg">
              <Link href="/products">Shop Collection</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/product/featured">Featured Product</Link>
            </Button>
          </div>
        </div>
        
        {/* Image */}
        <div className="mt-12 w-full lg:mt-0 lg:w-1/2">
          <div className="relative h-64 w-full overflow-hidden rounded-lg shadow-lg sm:h-80 lg:h-96">
            <Image
              src="/images/hero-image.jpg"
              alt="Phone cases and accessories display"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
} 