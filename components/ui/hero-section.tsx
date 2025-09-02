'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  heading?: string;
  subheading?: string;
  primaryCTA?: string;
  secondaryCTA?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

export default function HeroSection({
  heading = "Transform Your Ideas Into Reality",
  subheading = "Build stunning, modern applications with cutting-edge technology and beautiful design that converts visitors into customers.",
  primaryCTA = "Get Started",
  secondaryCTA = "Watch Demo",
  onPrimaryClick = () => console.log('Primary CTA clicked'),
  onSecondaryClick = () => console.log('Secondary CTA clicked')
}: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const lampX = useTransform(mouseX, [0, window?.innerWidth || 1200], [0, 1]);
  const lampY = useTransform(mouseY, [0, window?.innerHeight || 800], [0, 1]);
  
  const lampXSpring = useSpring(lampX, { damping: 30, stiffness: 200 });
  const lampYSpring = useSpring(lampY, { damping: 30, stiffness: 200 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, [mouseX, mouseY]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      filter: 'blur(10px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.25, 0.25, 0, 1]
      }
    }
  };

  const buttonVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.25, 0, 1]
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: [0.25, 0.25, 0, 1]
      }
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Lamp Background Effect */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main lamp beam */}
        <motion.div
          className="absolute top-0 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2"
          style={{
            x: useTransform(lampXSpring, [0, 1], [-100, 100]),
            y: useTransform(lampYSpring, [0, 1], [-50, 50]),
          }}
        >
          <div className="absolute inset-0 bg-gradient-conic from-blue-500 via-purple-500 to-pink-500 opacity-20 blur-3xl animate-pulse" />
          <div className="absolute inset-0 bg-gradient-radial from-blue-400/30 via-purple-500/20 to-transparent opacity-60 blur-2xl" />
        </motion.div>

        {/* Secondary glow effects */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-radial from-purple-500/20 to-transparent blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-gradient-radial from-blue-500/20 to-transparent blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />

        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center max-w-5xl mx-auto px-6 sm:px-8 lg:px-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Floating badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8 text-sm text-white/80"
        >
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span>Introducing our next-generation platform</span>
          <motion.div 
            className="w-2 h-2 rounded-full bg-green-400"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7] 
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
        </motion.div>

        {/* Main heading */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
        >
          <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
            {heading.split(' ').slice(0, -2).join(' ')}
          </span>
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            {heading.split(' ').slice(-2).join(' ')}
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl md:text-2xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          {subheading}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <motion.div variants={buttonVariants} whileHover="hover">
            <Button
              onClick={onPrimaryClick}
              size="lg"
              className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-2">
                {primaryCTA}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                layoutId="button-bg"
              />
            </Button>
          </motion.div>

          <motion.div variants={buttonVariants} whileHover="hover">
            <Button
              onClick={onSecondaryClick}
              variant="outline"
              size="lg"
              className="group relative bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30 px-8 py-4 text-lg font-medium rounded-full transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                {secondaryCTA}
              </span>
            </Button>
          </motion.div>
        </motion.div>

        {/* Hero visual element */}
        <motion.div
          variants={itemVariants}
          className="relative"
        >
          <motion.div
            className="relative w-full max-w-4xl mx-auto"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Main visual container */}
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl border border-white/20 p-8 md:p-12 shadow-2xl">
              {/* Floating orbs */}
              <motion.div
                className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-xl opacity-60"
                animate={{
                  y: [0, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <motion.div
                className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full blur-xl opacity-40"
                animate={{
                  y: [0, 10, 0],
                  scale: [1, 0.9, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />

              {/* Content placeholder */}
              <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl border border-white/10 flex items-center justify-center">
                <motion.div
                  className="text-center text-white/60"
                  animate={{
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  <p className="text-lg font-medium">Your Amazing Product</p>
                </motion.div>
              </div>
            </div>

            {/* Reflection effect */}
            <div className="absolute inset-x-0 -bottom-40 h-40 bg-gradient-to-t from-transparent to-white/5 mask-gradient-to-b opacity-30 blur-sm transform-gpu" />
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="flex flex-col items-center gap-2 text-white/50">
            <span className="text-sm font-medium">Scroll to explore</span>
            <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center">
              <motion.div
                className="w-1 h-3 bg-white/40 rounded-full mt-2"
                animate={{
                  y: [0, 12, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Additional ambient lighting */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/5 to-purple-900/10 pointer-events-none" />
      
      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}