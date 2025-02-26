'use client'
import {Hero} from '@/components/Hero'; 
import {Feature1} from '@/components/Feature1';
import {Feature2} from '@/components/Feature2';
import { FeatureBeam } from '@/components/FeatureBeam';
export default function HomePage() {

  return (
    <div>
      <Hero />
      <Feature1 />
      <Feature2 />
      <FeatureBeam />
    </div>

  );
}