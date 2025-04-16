"use client"

// Using Sonner for toast notifications instead of shadcn/ui toast
import { Toaster as SonnerToaster } from 'sonner';

export function Toaster() {
  return (
    <SonnerToaster 
      position="top-right"
      toastOptions={{
        duration: 4000,
        className: 'rounded-md shadow-md',
        style: {
          background: 'white',
          color: 'black',
          border: '1px solid #e2e8f0',
        },
      }}
    />
  );
} 