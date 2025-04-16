'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const resetPasswordSchema = z.object({
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [resetComplete, setResetComplete] = useState(false);
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);
  
  const token = searchParams.get('token');
  
  useEffect(() => {
    if (!token) {
      toast.error('Reset token is missing');
      setTokenValid(false);
      return;
    }
    
    // Here you would validate the token with your API
    // For demo purposes, we'll assume it's valid
    const validateToken = async () => {
      try {
        // Mock API call: await validateResetToken(token);
        await new Promise(resolve => setTimeout(resolve, 500));
        setTokenValid(true);
      } catch (error) {
        console.error('Invalid reset token:', error);
        toast.error('Invalid or expired reset token');
        setTokenValid(false);
      }
    };
    
    validateToken();
  }, [token]);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema)
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) {
      toast.error('Reset token is missing');
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Here you would call your API endpoint to reset the password
      // For example: await resetPassword(token, data.password);
      
      // Mock API call for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setResetComplete(true);
      toast.success('Password has been reset successfully');
    } catch (error: any) {
      console.error('Password reset error:', error);
      
      let errorMsg = 'Failed to reset password. Please try again.';
      
      if (error.response?.data?.detail) {
        const detail = error.response.data.detail;
        errorMsg = typeof detail === 'string' ? detail : JSON.stringify(detail);
      }
      
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  if (tokenValid === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 text-center">
          <h2 className="text-xl font-medium">Validating reset token...</h2>
        </div>
      </div>
    );
  }

  if (tokenValid === false) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Invalid Reset Link
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              The password reset link is invalid or has expired.
            </p>
          </div>
          <div className="text-center">
            <Link href="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
              Request a new password reset
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (resetComplete) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Password Reset Complete
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Your password has been reset successfully.
            </p>
          </div>
          <div className="text-center">
            <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in with your new password
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Reset Your Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your new password below
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <div className="mt-1">
                <Input
                  id="password"
                  {...register('password')}
                  type="password"
                  autoComplete="new-password"
                  className="block w-full rounded-md"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message?.toString()}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <div className="mt-1">
                <Input
                  id="confirmPassword"
                  {...register('confirmPassword')}
                  type="password"
                  autoComplete="new-password"
                  className="block w-full rounded-md"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message?.toString()}</p>
                )}
              </div>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Resetting...
                </>
              ) : (
                'Reset Password'
              )}
            </Button>
          </div>
        </form>
        
        <div className="text-center">
          <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
} 