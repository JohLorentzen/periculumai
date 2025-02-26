'use client'

import { useState, useEffect } from 'react';
import { Hero } from '@/components/Hero'; 
import { Feature1 } from '@/components/Feature1';
import { Feature2 } from '@/components/Feature2';


export default function HomePage() {
  // Use client-side only rendering
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Only render after client-side mount
  if (!mounted) {
    return <div className="min-h-screen"></div>; // Empty placeholder with height
  }

  return (
    <div>
      <Hero />
      <Feature1 />
      <Feature2 />
    </div>
  );
}