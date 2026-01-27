"use client";

import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Hero() {
  return (
    <section className="relative z-10 min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Animated background blob */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#ffd7a1]/40 to-[#f8b62d]/30 blur-3xl -z-10"
        animate={{
          borderRadius: [
            "40% 60% 70% 30% / 40% 50% 60% 50%",
            "60% 40% 30% 70% / 60% 30% 70% 40%",
            "30% 60% 70% 40% / 50% 60% 30% 60%",
            "40% 60% 70% 30% / 40% 50% 60% 50%"
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-6xl lg:text-7xl mb-6 text-[#2d2d2d]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Priowise
            </motion.h1>

            <motion.div
              className="space-y-2 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <p className="text-2xl text-[#4a4a4a]">Prioritize smarter.</p>
              <p className="text-2xl text-[#4a4a4a]">Decide wiser.</p>
            </motion.div>

            <motion.div
              className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/40"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <h2 className="text-xl mb-4 text-[#2d2d2d]">
                Be the First to Know When We Launch
              </h2>
              <p className="text-sm text-[#6a6a6a] mb-6 leading-relaxed">
                Join our waitlist and get priority access to Priowise. We'll notify you when we launch and share exclusive early-bird benefits that cannot be missed!
              </p>
              <div className="flex gap-3">
                <Input
                  type="email"
                  placeholder="name@example.com"
                  className="flex-1 bg-white border-gray-200 rounded-xl"
                />
                <Button
                  className="bg-[#f8b62d] hover:bg-[#e5a520] text-[#2d2d2d] px-8 rounded-xl shadow-md transition-all hover:shadow-lg"
                >
                  Join Now
                </Button>
              </div>
            </motion.div>
          </motion.div>

          {/* Right illustration */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            <div className="relative">
              {/* Illustration container */}
              <div className="relative flex items-center justify-center">
                <motion.img
                  src="/header.png"
                  alt="Person thinking with idea"
                  className="w-full max-w-lg relative z-10"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
