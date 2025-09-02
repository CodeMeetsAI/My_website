'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Shield, Rocket, Sparkles, Users, Globe } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized performance with cutting-edge technology for instant loading times."
  },
  {
    icon: Shield,
    title: "Secure by Design",
    description: "Enterprise-grade security with end-to-end encryption and advanced protection."
  },
  {
    icon: Rocket,
    title: "Scalable Architecture",
    description: "Built to grow with your business from startup to enterprise scale."
  },
  {
    icon: Sparkles,
    title: "AI-Powered",
    description: "Intelligent features powered by machine learning and artificial intelligence."
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Real-time collaboration tools for seamless teamwork and productivity."
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Worldwide infrastructure with edge computing for optimal performance."
  }
];

export default function DemoSection() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.25, 0, 1] }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Badge variant="outline" className="mb-4 bg-white/5 border-white/20 text-white/80">
            Features
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Powerful Features for
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"> Modern Teams</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Discover the tools and capabilities that make our platform the choice for ambitious teams worldwide.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, staggerChildren: 0.1 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: [0.25, 0.25, 0, 1] 
              }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:scale-110 transition-transform duration-200">
                      <feature.icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                  </div>
                  <p className="text-white/70 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}