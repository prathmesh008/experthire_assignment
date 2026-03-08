'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StoryNode } from '@/types/story';

interface CinematicEndingProps {
  node: StoryNode;
  storyTitle?: string;
  onRestart: () => void;
  onGoHome: () => void;
}

// Real statistics about women's challenges
const realWorldStats = [
  {
    value: '38%',
    description: 'of women report having to provide more evidence of competence than their male counterparts',
    source: 'McKinsey Women in the Workplace 2024',
    icon: '📊',
  },
  {
    value: '50%',
    description: 'of women in tech leave their companies by age 35, compared to 20% of men',
    source: 'Harvard Business Review',
    icon: '💼',
  },
  {
    value: '30%',
    description: 'longer women typically wait for promotions compared to their male peers at the same level',
    source: 'McKinsey 2024',
    icon: '⏳',
  },
  {
    value: '1 in 4',
    description: 'women consider leaving their careers after becoming mothers due to lack of support',
    source: 'Deloitte Women @ Work 2024',
    icon: '👶',
  },
  {
    value: '60%',
    description: 'of women have experienced microaggressions at work, compared to 49% of men',
    source: 'LeanIn.org 2024',
    icon: '🎯',
  },
  {
    value: '23%',
    description: 'gender pay gap still persists globally, meaning women earn 77 cents for every dollar men earn',
    source: 'World Economic Forum 2024',
    icon: '💰',
  },
];

// Empowering messages
const closingMessages = [
  "Every story shared breaks a silence.",
  "Change begins when we see through her eyes.",
  "Her struggles are not unique. Her strength is universal.",
  "Understanding is the first step toward change.",
];

export default function CinematicEnding({
  node,
  storyTitle,
  onRestart,
  onGoHome,
}: CinematicEndingProps) {
  const [phase, setPhase] = useState<'story-stat' | 'real-stats' | 'message' | 'actions'>('story-stat');
  const [currentStatIndex, setCurrentStatIndex] = useState(0);
  const [showAllStats, setShowAllStats] = useState(false);

  // Progress through phases
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    // Phase 1: Show story-specific stat (already showing)
    timers.push(setTimeout(() => setPhase('real-stats'), 4000));
    
    // Phase 2: Cycle through real stats
    timers.push(setTimeout(() => setCurrentStatIndex(1), 6500));
    timers.push(setTimeout(() => setCurrentStatIndex(2), 9000));
    timers.push(setTimeout(() => setPhase('message'), 11500));
    
    // Phase 3: Show closing message and actions
    timers.push(setTimeout(() => setPhase('actions'), 14000));

    return () => timers.forEach(clearTimeout);
  }, []);

  // Use deterministic message based on node id
  const messageIndex = node.id.length % closingMessages.length;
  const selectedMessage = closingMessages[messageIndex];

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden">
      {/* Cinematic bars */}
      <div className="absolute top-0 left-0 right-0 h-[8%] bg-black z-20" />
      <div className="absolute bottom-0 left-0 right-0 h-[8%] bg-black z-20" />

      {/* Background gradient */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        style={{
          background: 'radial-gradient(ellipse at center, rgba(88, 28, 135, 0.15) 0%, rgba(0,0,0,1) 70%)',
        }}
      />

      {/* Floating particles - deterministic positions */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${(i * 17) % 100}%`,
              top: `${(i * 23) % 100}%`,
              backgroundColor: i % 2 === 0 ? '#a855f7' : '#ec4899',
              opacity: 0.3,
            }}
            animate={{
              y: [-20, -100],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 6 + (i % 5),
              repeat: Infinity,
              delay: (i % 8) * 0.6,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
        
        {/* Phase 1: Story-specific statistic */}
        <AnimatePresence mode="wait">
          {phase === 'story-stat' && node.statistic && (
            <motion.div
              key="story-stat"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              {/* Ending type badge */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <span
                  className="inline-block px-6 py-2 rounded-full text-sm font-medium tracking-widest uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30"
                >
                  {node.endingType ? `✨ ${node.endingType.charAt(0).toUpperCase() + node.endingType.slice(1)} Ending` : '✨ Your Ending'}
                </span>
              </motion.div>

              {/* Story reflection text */}
              <motion.p
                className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                "{node.statistic}"
              </motion.p>
            </motion.div>
          )}

          {/* Phase 2: Real-world statistics carousel */}
          {phase === 'real-stats' && (
            <motion.div
              key="real-stats"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              <motion.p
                className="text-white/50 text-sm tracking-[0.3em] uppercase mb-12"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
              >
                The Reality Women Face Every Day
              </motion.p>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStatIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div className="text-6xl mb-4">
                    {realWorldStats[currentStatIndex].icon}
                  </div>
                  <div
                    className="text-7xl md:text-8xl font-bold"
                    style={{
                      background: 'linear-gradient(135deg, #f472b6 0%, #a855f7 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {realWorldStats[currentStatIndex].value}
                  </div>
                  <p className="text-xl text-white/70 max-w-xl mx-auto">
                    {realWorldStats[currentStatIndex].description}
                  </p>
                  <p className="text-white/30 text-xs">
                    — {realWorldStats[currentStatIndex].source}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Progress dots */}
              <div className="flex justify-center gap-2 mt-8">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i === currentStatIndex ? 'bg-purple-400' : 'bg-white/20'
                    }`}
                    animate={i === currentStatIndex ? { scale: [1, 1.3, 1] } : {}}
                    transition={{ duration: 0.5 }}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Phase 3: Closing message */}
          {phase === 'message' && (
            <motion.div
              key="message"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="space-y-8"
            >
              <motion.div
                className="text-3xl md:text-5xl font-light text-white leading-relaxed italic"
                style={{ textShadow: '0 0 60px rgba(168, 85, 247, 0.3)' }}
              >
                "{selectedMessage}"
              </motion.div>

              <motion.div
                className="w-24 h-[1px] mx-auto bg-gradient-to-r from-transparent via-purple-500 to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />

              <motion.p
                className="text-white/40 text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                International Women's Day 2026
              </motion.p>
            </motion.div>
          )}

          {/* Phase 4: Actions */}
          {phase === 'actions' && (
            <motion.div
              key="actions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="space-y-12"
            >
              {/* All stats summary (optional click to expand) */}
              <motion.button
                className="text-white/40 text-sm hover:text-white/60 transition-colors"
                onClick={() => setShowAllStats(!showAllStats)}
              >
                {showAllStats ? 'Hide Statistics' : 'View All Statistics ↓'}
              </motion.button>

              <AnimatePresence>
                {showAllStats && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 overflow-hidden"
                  >
                    {realWorldStats.map((stat, i) => (
                      <motion.div
                        key={i}
                        className="p-4 rounded-xl bg-white/5 border border-white/10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <div className="text-2xl mb-1">{stat.icon}</div>
                        <div className="text-2xl font-bold text-purple-400">{stat.value}</div>
                        <p className="text-xs text-white/50 mt-1">{stat.description.slice(0, 50)}...</p>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button
                  className="px-8 py-4 rounded-full text-white font-medium text-lg"
                  style={{
                    background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.3) 0%, rgba(236, 72, 153, 0.3) 100%)',
                    border: '1px solid rgba(168, 85, 247, 0.5)',
                    boxShadow: '0 0 30px rgba(168, 85, 247, 0.2)',
                  }}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(168, 85, 247, 0.4)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onRestart}
                >
                  <span className="flex items-center gap-3">
                    <span>🔄</span>
                    <span>Experience Another Path</span>
                  </span>
                </motion.button>

                <motion.button
                  className="px-8 py-4 rounded-full text-white/70 hover:text-white font-medium text-lg transition-colors"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onGoHome}
                >
                  <span className="flex items-center gap-3">
                    <span>📚</span>
                    <span>Choose Another Story</span>
                  </span>
                </motion.button>
              </div>

              {/* Share prompt */}
              <motion.div
                className="pt-8 border-t border-white/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-white/30 text-sm mb-4">Share this experience</p>
                <div className="flex justify-center gap-4">
                  {['Twitter', 'LinkedIn', 'Copy Link'].map((platform) => (
                    <motion.button
                      key={platform}
                      className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white/80 text-sm transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {platform}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Credits */}
              <motion.div
                className="text-white/20 text-xs space-y-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <p>Built with 💜 for International Women's Day 2026</p>
                <p>These stories are inspired by real experiences shared by women worldwide</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Skip button */}
      {phase !== 'actions' && (
        <motion.button
          className="absolute bottom-12 right-8 z-30 text-white/30 hover:text-white/60 text-sm transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          onClick={() => setPhase('actions')}
        >
          Skip →
        </motion.button>
      )}
    </div>
  );
}
