'use client';

import HeroSection from '@/components/ui/hero-section';
import DemoSection from '@/components/sections/demo-section';
import SmoothScrollProvider from '@/components/providers/smooth-scroll-provider';

export default function Home() {
  const handlePrimaryClick = () => {
    console.log('Get Started clicked');
    // Add your navigation logic here
  };

  const handleSecondaryClick = () => {
    console.log('Watch Demo clicked');
    // Add your demo logic here
  };

  return (
    <SmoothScrollProvider>
      <main className="relative">
        <HeroSection 
          heading="Transform Your Ideas Into Reality"
          subheading="Build stunning, modern applications with cutting-edge technology and beautiful design that converts visitors into customers."
          primaryCTA="Get Started"
          secondaryCTA="Watch Demo"
          onPrimaryClick={handlePrimaryClick}
          onSecondaryClick={handleSecondaryClick}
        />
        <DemoSection />
      </main>
    </SmoothScrollProvider>
  );
}