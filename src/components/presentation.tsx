'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

export function Presentation() {
  // Personal information
  const profile = {
    name: 'John Patel',
    age: '22 years old',
    location: 'Princeton, New Jersey',
    // Add a newline character after the emoji
    description:
      "Hey 👋\nI'm John — I build AI things, ship fast, and keep it simple. Think agentic RAG systems, clean cloud infra (AWS/Terraform/Kubernetes), and vibecoded frontends with Next.js + TypeScript. Off the laptop, I’m skiing black diamonds, playing soccer, or chasing a new idea. If it’s fun and useful, I’m in.",
    src: '/arav-images/ski-arav.jpg',
    fallbackSrc:
      'https://images.unsplash.com/photo-1519681393-5cd7f39ab806?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3',
  };

  // Animation variants for text elements
  const textVariants: {
    hidden: { opacity: number; y: number };
    visible: { opacity: number; y: number; transition: { duration: number; ease: [number, number, number, number] } };
  } = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] },
    },
  };

  // Animation for the entire paragraph rather than word-by-word
  const paragraphAnimation: {
    hidden: { opacity: number; y: number };
    visible: { opacity: number; y: number; transition: { duration: number; ease: [number, number, number, number]; delay: number } };
  } = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.19, 1, 0.22, 1],
        delay: 0.2,
      },
    },
  };

  return (
    <div className="mx-auto w-full max-w-5xl py-6 font-sans">
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
        {/* Image section (show full image, no crop) */}
        <div className="relative mx-auto w-full max-w-sm">
          <div className="relative h-full w-full">
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
              className="h-full w-full"
            >
              <Image
                src={profile.src}
                alt={profile.name}
                width={500}
                height={500}
                className="h-auto w-full rounded-2xl object-contain"
                onError={(e) => {
                  // Fallback to placeholder if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.src = profile.fallbackSrc;
                }}
              />
            </motion.div>
          </div>
        </div>

        {/* Text content section */}
        <div className="flex flex-col space-y">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <h1 className="from-foreground to-muted-foreground bg-gradient-to-r bg-clip-text text-xl font-semibold text-transparent md:text-3xl">
              {profile.name}
            </h1>
            <div className="mt-1 flex flex-col gap-1 md:flex-row md:items-center md:gap-4">
              <p className="text-neutral-800 drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]">{profile.age}</p>
              <div className="bg-neutral-300 hidden h-1.5 w-1.5 rounded-full md:block" />
              <p className="text-neutral-800 drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]">{profile.location}</p>
            </div>
          </motion.div>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={paragraphAnimation}
            className="text-foreground mt-6 leading-relaxed whitespace-pre-line"
          >
            {profile.description}
          </motion.p>

          {/* Tags/Keywords */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-4 flex flex-wrap gap-2"
          >
            {['AI/ML', 'Cloud', 'Full‑stack', 'SaaS'].map(
              (tag) => (
                <span
                  key={tag}
                  className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm"
                >
                  {tag}
                </span>
              )
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Presentation;
