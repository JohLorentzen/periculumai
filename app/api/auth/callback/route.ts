import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

/**
 * This route handler receives the callback from Signicat after user authentication
 * and exchanges the authorization code for tokens.
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');
  const error_description = searchParams.get('error_description');
  
  // Log the received parameters for debugging
  console.log('Callback received:', { 
    code: code?.substring(0, 10) + '...', 
    state, 
    error, 
    error_description 
  });
  
  // If there's an error, redirect to login page with error message
  if (error) {
    console.error('Authentication error from Signicat:', error, error_description);
    return NextResponse.redirect(new URL(`/?error=${error}&description=${encodeURIComponent(error_description || '')}`, request.url));
  }
  
  // If there's no code, redirect to login page
  if (!code) {
    console.error('No authorization code received');
    return NextResponse.redirect(new URL('/?error=no_code', request.url));
  }

  // Get the PKCE code verifier from the cookie
  const cookieStore = cookies();
  const pkceCodeVerifier = request.cookies.get('pkce_code_verifier')?.value;
  
  // Validate state parameter
  const storedState = request.cookies.get('auth_state')?.value;
  
  if (!storedState || storedState !== state) {
    console.error('Invalid state parameter', { received: state, stored: storedState });
    return NextResponse.redirect(new URL('/?error=invalid_state', request.url));
  }

  if (!pkceCodeVerifier) {
    console.error('No PKCE code verifier found in cookies');
    return NextResponse.redirect(new URL('/?error=missing_code_verifier', request.url));
  }
  
  try {
    // 1. Exchange the authorization code for tokens
    const tokenEndpoint = process.env.SIGNICAT_TOKEN_ENDPOINT || 'https://fehirde.sandbox.signicat.com/auth/open/connect/token';
    const clientId = process.env.SIGNICAT_CLIENT_ID || '';
    const clientSecret = process.env.SIGNICAT_CLIENT_SECRET || '';
    const redirectUri = process.env.NEXT_PUBLIC_SIGNICAT_REDIRECT_URI || 'http://localhost:3000/api/auth/callback';
    
    if (!clientId || !clientSecret) {
      throw new Error('Missing client credentials in environment variables');
    }
    
    console.log('Exchanging code for tokens...');
    
    // Create Basic Auth header for client authentication
    const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    
    // Exchange code for tokens with PKCE verifier
    const tokenResponse = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${basicAuth}`
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        code_verifier: pkceCodeVerifier
      })
    });
    
    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      console.error('Token exchange failed:', tokenResponse.status, errorData);
      throw new Error(`Token exchange failed: ${tokenResponse.status} ${errorData}`);
    }
    
    const tokens = await tokenResponse.json();
    console.log('Tokens received successfully');
    
    // Clear the PKCE code verifier cookie and state cookie
    cookieStore.delete('pkce_code_verifier');
    cookieStore.delete('auth_state');
    
    // 2. Store tokens in HTTP-only cookies
    // Store access token
    cookieStore.set('access_token', tokens.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: tokens.expires_in,
      path: '/'
    });
    
    // Store ID token (contains user information)
    cookieStore.set('id_token', tokens.id_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: tokens.expires_in,
      path: '/'
    });
    
    // Store token type
    cookieStore.set('token_type', tokens.token_type, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: tokens.expires_in,
      path: '/'
    });
    
    // Set user authenticated flag (non-httpOnly so client-side JS can check auth status)
    cookieStore.set('authenticated', 'true', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      maxAge: tokens.expires_in,
      path: '/'
    });
    
    // Redirect to dashboard
    const redirectPath = '/dashboard';
    console.log(`Redirecting to ${redirectPath}`);
    return NextResponse.redirect(new URL(redirectPath, request.url));
  } catch (error) {
    console.error('Authentication error:', error);
    return NextResponse.redirect(new URL('/?error=authentication_failed', request.url));
  }
} 