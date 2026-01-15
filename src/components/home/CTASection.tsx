"use client";

import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sparkles } from 'lucide-react';

export function CTASection() {
  return (
    <section className="relative z-10 py-24">
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative bg-gradient-to-br from-[#f8b62d]/20 via-white/60 to-[#a7c7e7]/20 backdrop-blur-sm rounded-[40px] p-12 border border-white/40 shadow-xl overflow-hidden">
            {/* Decorative blobs */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#f8b62d]/30 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#a7c7e7]/30 rounded-full blur-3xl" />

            <div className="relative text-center">
              <motion.div
                className="inline-flex items-center gap-2 bg-[#f8b62d]/20 px-4 py-2 rounded-full mb-6"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-5 h-5 text-[#f8b62d]" />
                <span className="text-sm text-[#2d2d2d]">Limited Early Access</span>
              </motion.div>

              <h2 className="text-5xl mb-4 text-[#2d2d2d]">
                Don't Miss the Launch!
              </h2>
              <p className="text-xl text-[#6a6a6a] mb-8 max-w-2xl mx-auto">
                Sign up to get early access along with our exclusive
                roadmap to learn, launch and grow. Let's get this party started!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                <Input
                  type="email"
                  placeholder="you@example.com"
                  className="flex-1 bg-white border-gray-200 rounded-xl h-12"
                />
                <Button
                  className="bg-[#f8b62d] hover:bg-[#e5a520] text-[#2d2d2d] px-8 h-12 rounded-xl shadow-md transition-all hover:shadow-lg"
                >
                  Notify Me
                </Button>
              </div>

              <p className="text-sm text-[#6a6a6a] mt-6">
                Join 1,000+ teams already on the waitlist
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
