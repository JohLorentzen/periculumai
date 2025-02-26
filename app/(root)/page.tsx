'use client'

import { useState, useEffect } from 'react';
import { Hero } from '@/components/Hero'; 
import { Feature1 } from '@/components/Feature1';
import { Feature2 } from '@/components/Feature2';
import { FeatureBeam } from '@/components/FeatureBeam';

export default function HomePage() {
  // Initialize state properly before using it
  const [mounted, setMounted] = useState(false);
  
  // Use useEffect to handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Only render components after mounting on client
  if (!mounted) {
    return null; // Return empty during SSR
  }

  return (
    <div>
      <Hero />
      <Feature1 />
      <Feature2 />
      <FeatureBeam />
    </div>
  );
}