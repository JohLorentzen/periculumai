"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, MoveRight, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import ModeToggle from "@/components/ui/mode-toggle";
import { navigationLinks } from "@/constants/index";

export const Header = () => {
  const navigationItems = navigationLinks;

  const [isOpen, setOpen] = useState(false);

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
    const bytes = new Uint8Array(digest);
    const base64 = btoa(String.fromCharCode.apply(null, Array.from(bytes)));
    
    return base64
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  };

  const handleLogin = async () => {
    // Generate PKCE code verifier and challenge
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    
    // Store the code verifier as a cookie for the server to use
    document.cookie = `pkce_code_verifier=${codeVerifier}; path=/`;
    
    // Construct the Signicat authorization URL with required parameters
    const signicatBaseUrl = process.env.NEXT_PUBLIC_SIGNICAT_BASE_URL || 'https://fehirde.sandbox.signicat.com/auth/open/connect/authorize';
    const clientId = process.env.NEXT_PUBLIC_SIGNICAT_CLIENT_ID || 'sandbox-smoggy-throat-119';
    const redirectUri = process.env.NEXT_PUBLIC_SIGNICAT_REDIRECT_URI || 'http://localhost:3000/api/auth/callback';
    
    // Use a simplified scope that is likely to be permitted
    // Start with just "openid" which is the basic required scope
    const scope = 'openid';
    
    // Generate a simple random state parameter
    // Instead of using JSON encoding which might cause issues
    const stateValue = Math.random().toString(36).substring(2, 15);
    
    // Store the state in a cookie for validation during callback
    document.cookie = `auth_state=${stateValue}; path=/`;
    
    // Manual URL construction to ensure exact format matching documentation
    const authUrl = `${signicatBaseUrl}?` +
      `client_id=${encodeURIComponent(clientId)}` +
      `&response_type=code` +
      `&scope=${encodeURIComponent(scope)}` +
      `&prompt=login` +
      `&acr_values=${encodeURIComponent('idp:nbid nbid_idp:BID')}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&code_challenge=${encodeURIComponent(codeChallenge)}` +
      `&code_challenge_method=S256` +
      `&state=${encodeURIComponent(stateValue)}`;
    
    console.log(`Redirecting to: ${authUrl}`);
    
    // Redirect to the authorization URL
    window.location.href = authUrl;
  };

  return (
    <header className="w-full z-40 sticky top-0 left-0 bg-background">
      <div className="container relative mx-auto min-h-20 flex gap-4 flex-row lg:grid lg:grid-cols-3 items-center">
        <div className="justify-start items-center gap-4 lg:flex hidden flex-row">
          <NavigationMenu className="flex justify-start items-start">
            <NavigationMenuList className="flex justify-start gap-4 flex-row">
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {item.href ? (
                    <>
                      <NavigationMenuLink asChild>
                        <Link href={item.href}>
                          <Button variant="ghost">{item.title}</Button>
                        </Link>
                      </NavigationMenuLink>
                    </>
                  ) : (
                    <>
                      <NavigationMenuTrigger className="font-medium text-sm">
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="!w-[450px] p-4">
                        <div className="flex flex-col lg:grid grid-cols-2 gap-4">
                          <div className="flex flex-col h-full justify-between">
                            <div className="flex flex-col">
                              <p className="text-base">{item.title}</p>
                              <p className="text-muted-foreground text-sm">
                                {item.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col text-sm h-full justify-end">
                            {item.items?.map((subItem) => (
                              <NavigationMenuLink
                                href={subItem.href}
                                key={subItem.title}
                                className="flex flex-row justify-between items-center hover:bg-muted py-2 px-4 rounded"
                              >
                                <span>{subItem.title}</span>
                                <MoveRight className="w-4 h-4 text-muted-foreground" />
                              </NavigationMenuLink>
                            ))}
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex lg:justify-center">  
        </div>
        <div className="flex justify-end w-full gap-4">
          <ModeToggle />
          <div className="border-r hidden md:inline"></div>
          <Button variant="outline" onClick={handleLogin}>Logg inn</Button>
          <Button>Kom i gang</Button>
        </div>
        <div className="flex w-12 shrink lg:hidden items-end justify-end">
          <Button variant="ghost" onClick={() => setOpen(!isOpen)}>
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          {isOpen && (
            <div className="absolute top-20 border-t flex flex-col w-full right-0 bg-background shadow-lg py-4 container gap-8">
              {navigationItems.map((item) => (
                <div key={item.title}>
                  <div className="flex flex-col gap-2">
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="flex justify-between items-center"
                        onClick={() => setOpen(false)}
                      >
                        <span className="text-lg">{item.title}</span>
                        <MoveRight className="w-4 h-4 stroke-1 text-muted-foreground" />
                      </Link>
                    ) : (
                      <p className="text-lg">{item.title}</p>
                    )}
                    {item.items &&
                      item.items.map((subItem) => (
                        <Link
                          key={subItem.title}
                          href={subItem.href}
                          className="flex justify-between items-center"
                          onClick={() => setOpen(false)}
                        >
                          <span className="text-muted-foreground">
                            {subItem.title}
                          </span>
                          <MoveRight className="w-4 h-4 stroke-1" />
                        </Link>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
