import { NextResponse } from 'next/server';

export async function GET() {
  // Check if the environment variables are loaded
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  
  // Mask the keys for security (only show first 8 and last 4 characters)
  const maskKey = (key: string | undefined) => {
    if (!key) return 'undefined';
    if (key.length <= 12) return '********';
    return `${key.substring(0, 8)}${'*'.repeat(key.length - 12)}${key.substring(key.length - 4)}`;
  };
  
  return NextResponse.json({
    status: 'success',
    environment: process.env.NODE_ENV || 'unknown',
    variables: {
      STRIPE_SECRET_KEY: stripeSecretKey ? 
        { exists: true, value: maskKey(stripeSecretKey) } : 
        { exists: false },
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: stripePublishableKey ? 
        { exists: true, value: maskKey(stripePublishableKey) } : 
        { exists: false },
      NEXT_PUBLIC_APP_URL: appUrl ? 
        { exists: true, value: appUrl } : 
        { exists: false },
    }
  });
} 