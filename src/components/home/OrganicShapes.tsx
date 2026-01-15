"use client";

import { motion } from 'motion/react';

export function OrganicShapes() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Top right blob */}
      <motion.div
        className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full opacity-30"
        style={{
          background: 'linear-gradient(135deg, #ffd7a1 0%, #f8b62d 100%)',
          filter: 'blur(60px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Middle left blob */}
      <motion.div
        className="absolute top-1/3 -left-32 w-[500px] h-[500px] rounded-full opacity-20"
        style={{
          background: 'linear-gradient(135deg, #d4a5a5 0%, #c89b9b 100%)',
          filter: 'blur(80px)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          x: [0, -30, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Bottom right blob */}
      <motion.div
        className="absolute bottom-0 right-1/4 w-[350px] h-[350px] rounded-full opacity-25"
        style={{
          background: 'linear-gradient(135deg, #a7c7e7 0%, #8eb3d6 100%)',
          filter: 'blur(70px)',
        }}
        animate={{
          scale: [1, 1.15, 1],
          x: [0, 20, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Center accent */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full opacity-15"
        style={{
          background: 'linear-gradient(135deg, #e8d5b5 0%, #d4c5aa 100%)',
          filter: 'blur(90px)',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}
