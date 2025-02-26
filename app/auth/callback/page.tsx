'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SignicatService } from '@/lib/services/signicat';

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');
      const state = searchParams.get('state');

      if (!code) {
        console.error('No code received');
        router.push('/');
        return;
      }

      try {
        const tokenResponse = await SignicatService.exchangeCodeForToken(code);
        // Store the token in your preferred way (localStorage, cookies, etc.)
        localStorage.setItem('auth_token', tokenResponse.access_token);
        router.push('/dashboard'); // or wherever you want to redirect after successful login
      } catch (error) {
        console.error('Authentication error:', error);
        router.push('/');
      }
    };

    handleCallback();
  }, [router, searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Logging you in...</p>
    </div>
  );
} 