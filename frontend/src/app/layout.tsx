import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { CartProvider } from '@/hooks/useCart';

export const metadata: Metadata = {
  title: 'CaseCraft - Premium Phone Cases & Accessories',
  description: 'Premium phone cases and accessories for all your devices.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
