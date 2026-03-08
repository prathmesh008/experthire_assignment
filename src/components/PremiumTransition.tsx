'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface PremiumTransitionProps {
  isActive: boolean;
  choiceText?: string;
  onComplete: () => void;
  transitionDuration?: number;
}

export default function PremiumTransition({
  isActive,
  choiceText,
  onComplete,
  transitionDuration = 2500,
}: PremiumTransitionProps) {
  const [phase, setPhase] = useState(0);
  const [glowPoints, setGlowPoints] = useState<Array<{x: number; y: number; delay: number}>>([]);

  useEffect(() => {
    if (!isActive) {
      setPhase(0);
      return;
    }

    // Generate random glow points
    setGlowPoints(
      Array.from({ length: 12 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 0.5,
      }))
    );

    // Phase progression
    const timers = [
      setTimeout(() => setPhase(1), 100),      // Sweep begins
      setTimeout(() => setPhase(2), 400),      // Text appears
      setTimeout(() => setPhase(3), 1200),     // Text fades, lines appear
      setTimeout(() => setPhase(4), 1800),     // Reveal begins
      setTimeout(() => {
        setPhase(5);
        onComplete();
      }, transitionDuration),
    ];

    return () => timers.forEach(clearTimeout);
  }, [isActive, onComplete, transitionDuration]);

  if (!isActive && phase === 0) return null;

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 z-[100] pointer-events-none overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Main wipe effect - horizontal sweep */}
          <motion.div
            className="absolute inset-0 bg-black"
            initial={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' }}
            animate={{
              clipPath: phase >= 1
                ? phase >= 4
                  ? 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)'
                  : 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                : 'polygon(0 0, 0 0, 0 100%, 0 100%)',
            }}
            transition={{
              duration: phase >= 4 ? 0.6 : 0.5,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            {/* Inner gradient */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)',
              }}
            />

            {/* Animated glow points */}
            {glowPoints.map((point, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-purple-500"
                style={{
                  left: `${point.x}%`,
                  top: `${point.y}%`,
                  boxShadow: '0 0 20px 10px rgba(168, 85, 247, 0.3)',
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: phase >= 2 ? [0, 1.5, 0] : 0,
                  opacity: phase >= 2 ? [0, 0.8, 0] : 0,
                }}
                transition={{
                  duration: 1,
                  delay: point.delay,
                  ease: 'easeOut',
                }}
              />
            ))}
          </motion.div>

          {/* Leading edge glow line */}
          <motion.div
            className="absolute top-0 bottom-0 w-[3px]"
            style={{
              background: 'linear-gradient(to bottom, transparent, #a855f7, #ec4899, #a855f7, transparent)',
              boxShadow: '0 0 30px 10px rgba(168, 85, 247, 0.5), 0 0 60px 20px rgba(236, 72, 153, 0.3)',
            }}
            initial={{ left: '-5%', opacity: 0 }}
            animate={{
              left: phase >= 1
                ? phase >= 4
                  ? '105%'
                  : '50%'
                : '-5%',
              opacity: phase >= 1 && phase < 5 ? 1 : 0,
            }}
            transition={{
              duration: phase >= 4 ? 0.6 : 0.5,
              ease: [0.76, 0, 0.24, 1],
            }}
          />

          {/* Choice text display */}
          <AnimatePresence>
            {phase >= 2 && phase < 4 && choiceText && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center px-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="max-w-4xl text-center">
                  {/* Decorative line above */}
                  <motion.div
                    className="w-16 h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mb-8"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  />

                  {/* Main choice text */}
                  <motion.p
                    className="text-3xl md:text-5xl lg:text-6xl font-extralight tracking-wide text-white leading-tight"
                    style={{
                      textShadow: '0 0 40px rgba(168, 85, 247, 0.5)',
                    }}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {choiceText}
                  </motion.p>

                  {/* Decorative line below */}
                  <motion.div
                    className="w-16 h-[1px] bg-gradient-to-r from-transparent via-pink-500 to-transparent mx-auto mt-8"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Horizontal accent lines during transition */}
          {phase >= 3 && (
            <>
              <motion.div
                className="absolute h-[1px] left-0 right-0"
                style={{
                  top: '35%',
                  background: 'linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.6), transparent)',
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: phase >= 4 ? 0 : 1 }}
                transition={{ duration: 0.4 }}
              />
              <motion.div
                className="absolute h-[1px] left-0 right-0"
                style={{
                  top: '65%',
                  background: 'linear-gradient(90deg, transparent, rgba(236, 72, 153, 0.6), transparent)',
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: phase >= 4 ? 0 : 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              />
            </>
          )}

          {/* Corner brackets */}
          <motion.div
            className="absolute top-[15%] left-[10%]"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 2 && phase < 4 ? 0.6 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-12 h-[1px] bg-white/50" />
            <div className="w-[1px] h-12 bg-white/50" />
          </motion.div>
          <motion.div
            className="absolute top-[15%] right-[10%]"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 2 && phase < 4 ? 0.6 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-12 h-[1px] bg-white/50 ml-auto" />
            <div className="w-[1px] h-12 bg-white/50 ml-auto" />
          </motion.div>
          <motion.div
            className="absolute bottom-[15%] left-[10%]"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 2 && phase < 4 ? 0.6 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-[1px] h-12 bg-white/50" />
            <div className="w-12 h-[1px] bg-white/50" />
          </motion.div>
          <motion.div
            className="absolute bottom-[15%] right-[10%]"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 2 && phase < 4 ? 0.6 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-[1px] h-12 bg-white/50 ml-auto" />
            <div className="w-12 h-[1px] bg-white/50 ml-auto" />
          </motion.div>

          {/* Particle burst at center */}
          {phase >= 3 && (
            <div className="absolute inset-0 flex items-center justify-center">
              {[...Array(24)].map((_, i) => {
                const angle = (i / 24) * Math.PI * 2;
                const distance = 300 + Math.random() * 200;
                return (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-white"
                    initial={{ x: 0, y: 0, opacity: 1 }}
                    animate={{
                      x: Math.cos(angle) * distance,
                      y: Math.sin(angle) * distance,
                      opacity: 0,
                      scale: [1, 0],
                    }}
                    transition={{
                      duration: 1,
                      ease: 'easeOut',
                      delay: i * 0.02,
                    }}
                  />
                );
              })}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
