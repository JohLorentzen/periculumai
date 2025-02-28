"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect, useCallback } from "react";

/**
 * This component helps debug Signicat BankID integration issues.
 * It provides a direct test link using the exact format from documentation.
 */
export const ScanQRCode = () => {
  const [debugInfo, setDebugInfo] = useState<string | null>(null);
  const [registeredUri, setRegisteredUri] = useState<string>('http://localhost:3000/api/auth/callback');
  const [codeVerifier, setCodeVerifier] = useState<string>('');
  const [codeChallenge, setCodeChallenge] = useState<string>('');
  const [customScope, setCustomScope] = useState<string>('openid');

  // Generate a random string for the code verifier
  const generateCodeVerifier = (): string => {
    // Generate a random string of 43-128 characters (we're using 64)
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    let result = '';
    const charactersLength = characters.length;
    
    for (let i = 0; i < 64; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    
    return result;
  };

  // Create a code challenge from the verifier (SHA-256 method)
  const generateCodeChallenge = async (verifier: string): Promise<string> => {
    // Convert verifier to a SHA-256 hash
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    
    // Convert to base64 URL encoded string
    // Use Array.from instead of spread operator to avoid TypeScript downlevel iteration error
    return btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(digest))))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  };

  const generatePKCE = useCallback(async () => {
    try {
      const verifier = generateCodeVerifier();
      const challenge = await generateCodeChallenge(verifier);
      
      setCodeVerifier(verifier);
      setCodeChallenge(challenge);
      
      // Also store in localStorage for the callback
      localStorage.setItem('pkce_code_verifier', verifier);
      
      setDebugInfo(`PKCE generated\nVerifier: ${verifier.substring(0, 10)}...\nChallenge: ${challenge.substring(0, 10)}...`);
    } catch (error) {
      setDebugInfo(`Error generating PKCE: ${error}`);
    }
  }, []);

  useEffect(() => {
    // Generate a code verifier and challenge on component mount
    generatePKCE();
  }, [generatePKCE]);

  const handleDirectTest = () => {
    // Set a cookie with the code verifier (the server needs this)
    document.cookie = `pkce_code_verifier=${codeVerifier}; path=/`;
    
    // Generate a simple state parameter and save it in a cookie
    const stateValue = Math.random().toString(36).substring(2, 15);
    document.cookie = `auth_state=${stateValue}; path=/`;
    
    // Use the exact URL format from the Signicat documentation, now with PKCE
    const testUrl = 'https://fehirde.sandbox.signicat.com/auth/open/connect/authorize?' +
      'client_id=sandbox-smoggy-throat-119' +
      '&response_type=code' +
      '&scope=openid' +
      '&prompt=login' +
      '&acr_values=idp:nbid' +
      '&redirect_uri=' + encodeURIComponent(registeredUri) +
      '&code_challenge=' + encodeURIComponent(codeChallenge) +
      '&code_challenge_method=S256' +
      '&state=' + encodeURIComponent(stateValue);
    
    setDebugInfo(`Redirecting to: ${testUrl}`);
    window.location.href = testUrl;
  };

  const handleSimplifiedTest = () => {
    // Set a cookie with the code verifier
    document.cookie = `pkce_code_verifier=${codeVerifier}; path=/`;
    
    // Generate a simple state parameter and save it in a cookie
    const stateValue = Math.random().toString(36).substring(2, 15);
    document.cookie = `auth_state=${stateValue}; path=/`;
    
    // Create a simplified test with minimal parameters
    const testUrl = 'https://fehirde.sandbox.signicat.com/auth/open/connect/authorize?' +
      'client_id=sandbox-smoggy-throat-119' +
      '&response_type=code' +
      '&scope=openid' +
      '&redirect_uri=' + encodeURIComponent(registeredUri) +
      '&code_challenge=' + encodeURIComponent(codeChallenge) +
      '&code_challenge_method=S256' +
      '&state=' + encodeURIComponent(stateValue);
    
    setDebugInfo(`Simplified test: ${testUrl}`);
    window.location.href = testUrl;
  };

  const handleRedirectUriTest = () => {
    // Set a cookie with the code verifier
    document.cookie = `pkce_code_verifier=${codeVerifier}; path=/`;
    
    // Generate a simple state parameter and save it in a cookie
    const stateValue = Math.random().toString(36).substring(2, 15);
    document.cookie = `auth_state=${stateValue}; path=/`;
    
    // Test with the user-provided redirect URI
    const testUrl = 'https://fehirde.sandbox.signicat.com/auth/open/connect/authorize?' +
      'client_id=sandbox-smoggy-throat-119' +
      '&response_type=code' +
      '&scope=openid' +
      '&redirect_uri=' + encodeURIComponent(registeredUri) +
      '&code_challenge=' + encodeURIComponent(codeChallenge) +
      '&code_challenge_method=S256' +
      '&state=' + encodeURIComponent(stateValue);
    
    setDebugInfo(`Testing with redirect URI: ${registeredUri}`);
    window.location.href = testUrl;
  };

  const handleScopeTest = () => {
    // Set a cookie with the code verifier
    document.cookie = `pkce_code_verifier=${codeVerifier}; path=/`;
    
    // Generate a simple state parameter and save it in a cookie
    const stateValue = Math.random().toString(36).substring(2, 15);
    document.cookie = `auth_state=${stateValue}; path=/`;
    
    // Test with user-provided scope
    const testUrl = 'https://fehirde.sandbox.signicat.com/auth/open/connect/authorize?' +
      'client_id=sandbox-smoggy-throat-119' +
      '&response_type=code' +
      `&scope=${encodeURIComponent(customScope)}` +
      '&prompt=login' +
      '&acr_values=idp:nbid' +
      '&redirect_uri=' + encodeURIComponent(registeredUri) +
      '&code_challenge=' + encodeURIComponent(codeChallenge) +
      '&code_challenge_method=S256' +
      '&state=' + encodeURIComponent(stateValue);
    
    setDebugInfo(`Testing with scope: ${customScope}`);
    window.location.href = testUrl;
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Test Norwegian BankID</CardTitle>
        <CardDescription>
          Use these options to test Signicat BankID integration.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-md mb-2">
          <p className="text-sm font-medium text-green-800 dark:text-green-300">PKCE Enabled Test</p>
          <p className="text-xs text-green-700 dark:text-green-400">
            The test now includes code challenge required by Signicat.
          </p>
        </div>
        
        <p className="text-sm text-muted-foreground">
          If you&apos;re encountering errors with Signicat, try these direct test links.
          They use different formats to help identify the issue.
        </p>
        
        {debugInfo && (
          <div className="bg-muted p-3 rounded-md text-xs break-all">
            <p className="font-semibold">Debug Info:</p>
            <p>{debugInfo}</p>
          </div>
        )}
        
        {/* Redirect URI Test Section */}
        <div className="border rounded-md p-3">
          <h3 className="text-sm font-medium mb-2">Fix &quot;Invalid redirect_uri&quot; Error</h3>
          <p className="text-xs text-muted-foreground mb-2">
            Enter the exact redirect URI registered in your Signicat dashboard, or try these common variations:
          </p>
          
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={registeredUri}
              onChange={(e) => setRegisteredUri(e.target.value)}
              className="flex h-8 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
            />
            <Button size="sm" onClick={handleRedirectUriTest}>Test</Button>
          </div>
          
          <div className="grid grid-cols-1 gap-1">
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-xs justify-start"
              onClick={() => setRegisteredUri('http://localhost:3000/api/auth/callback')}
            >
              Without trailing slash
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-xs justify-start"
              onClick={() => setRegisteredUri('http://localhost:3000/api/auth/callback/')}
            >
              With trailing slash
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-xs justify-start"
              onClick={() => setRegisteredUri('https://localhost:3000/api/auth/callback')}
            >
              With https
            </Button>
          </div>
        </div>
        
        {/* Scope Test Section */}
        <div className="border rounded-md p-3 mt-4">
          <h3 className="text-sm font-medium mb-2">Fix &quot;Invalid scope&quot; Error</h3>
          <p className="text-xs text-muted-foreground mb-2">
            Try different scope combinations to find what&apos;s permitted for your Signicat client:
          </p>
          
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={customScope}
              onChange={(e) => setCustomScope(e.target.value)}
              className="flex h-8 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
            />
            <Button size="sm" onClick={handleScopeTest}>Test</Button>
          </div>
          
          <div className="grid grid-cols-1 gap-1">
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-xs justify-start"
              onClick={() => setCustomScope('openid')}
            >
              Basic: openid
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-xs justify-start"
              onClick={() => setCustomScope('openid profile')}
            >
              Standard: openid profile
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-xs justify-start"
              onClick={() => setCustomScope('openid profile idp-id')}
            >
              Extended: openid profile idp-id
            </Button>
          </div>
        </div>
        
        <Button onClick={generatePKCE} variant="outline" size="sm" className="w-full">
          Regenerate PKCE Values
        </Button>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="flex gap-2 w-full">
          <Button 
            variant="default" 
            className="flex-1"
            onClick={handleDirectTest}
          >
            Test Documentation Format
          </Button>
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={handleSimplifiedTest}
          >
            Test Simplified Auth
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Check the browser console and network tab for more debugging information.
        </p>
      </CardFooter>
    </Card>
  );
}; 