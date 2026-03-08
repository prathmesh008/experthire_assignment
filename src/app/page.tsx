'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PremiumEngine from "@/components/PremiumEngine";
import { allStories } from "@/data/storyData";
import { storyPreviews, womensDayStats, StoryPreview } from "@/data/stories";

export default function Home() {
  const [selectedStory, setSelectedStory] = useState<StoryPreview | null>(null);
  const [isStarting, setIsStarting] = useState(false);
  const [started, setStarted] = useState(false);
  const [currentStatIndex, setCurrentStatIndex] = useState(0);

  // Rotate statistics
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatIndex((prev) => (prev + 1) % womensDayStats.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Add/remove story-mode class on body for overflow control
  useEffect(() => {
    if (started) {
      document.body.classList.add('story-mode');
    } else {
      document.body.classList.remove('story-mode');
    }
    return () => document.body.classList.remove('story-mode');
  }, [started]);

  const handleStorySelect = (story: StoryPreview) => {
    if (!story.available) return;
    setSelectedStory(story);
  };

  const handleStart = () => {
    if (!selectedStory) return;
    setIsStarting(true);
    setTimeout(() => setStarted(true), 1200);
  };

  const handleBack = () => {
    setSelectedStory(null);
  };

  if (started && selectedStory) {
    const story = allStories[selectedStory.id];
    if (!story) {
      return (
        <main className="w-screen h-screen flex items-center justify-center bg-black text-white">
          <p>Story not found. Please go back and select a story.</p>
        </main>
      );
    }
    return (
      <main className="w-screen h-screen overflow-hidden bg-black">
        <PremiumEngine story={story} />
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen overflow-y-auto overflow-x-hidden bg-[#0a0a0f] text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <motion.div
          className="absolute w-[1000px] h-[1000px] rounded-full blur-[200px] opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.5) 0%, transparent 70%)',
            top: '-30%',
            right: '-20%',
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full blur-[180px] opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.5) 0%, transparent 70%)',
            bottom: '-20%',
            left: '-15%',
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full blur-[150px] opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(251, 146, 60, 0.4) 0%, transparent 70%)',
            top: '40%',
            left: '30%',
          }}
          animate={{
            scale: [1, 1.4, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        />

        {/* Floating particles - using deterministic positions */}
        {[...Array(60)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${(i * 17) % 100}%`,
              top: `${(i * 23) % 100}%`,
              backgroundColor: ['#ec4899', '#a855f7', '#f472b6', '#c084fc'][i % 4],
              opacity: 0.3,
            }}
            animate={{
              y: [-30, -100, -30],
              opacity: [0.1, 0.5, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 5 + (i % 5),
              repeat: Infinity,
              delay: (i % 10) * 0.5,
            }}
          />
        ))}

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="pt-8 pb-4 px-8">
          <motion.div
            className="flex items-center justify-between max-w-7xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">♀</span>
              <span className="text-sm font-light tracking-widest text-white/60">1 DAY AS HER</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/40">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
              <span>International Women's Day 2026</span>
            </div>
          </motion.div>
        </header>

        {/* Hero Section */}
        <section className="px-8 pt-12 pb-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Badge */}
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 mb-8"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <span className="text-pink-400">✦</span>
                <span className="text-sm text-pink-300/80">An Interactive Empathy Experience</span>
                <span className="text-pink-400">✦</span>
              </motion.div>

              {/* Title */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tight mb-6">
                <span className="text-white">Walk </span>
                <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  In Her Shoes
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-white/50 font-light max-w-3xl mx-auto leading-relaxed mb-8">
                Experience the invisible challenges women face every day. 
                <br className="hidden md:block" />
                Choose a story. Make her decisions. Feel her reality.
              </p>

              {/* Rotating Statistics */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStatIndex}
                  className="flex flex-col items-center gap-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-4xl md:text-5xl font-light bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                    {womensDayStats[currentStatIndex].value}
                  </span>
                  <span className="text-white/40 text-sm max-w-md">
                    {womensDayStats[currentStatIndex].label}
                  </span>
                  <span className="text-white/20 text-xs mt-1">
                    — {womensDayStats[currentStatIndex].source}
                  </span>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Story Cards */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {storyPreviews.map((story, index) => (
                <motion.div
                  key={story.id}
                  className={`group relative rounded-2xl overflow-hidden cursor-pointer ${
                    !story.available ? 'opacity-60' : ''
                  }`}
                  onClick={() => handleStorySelect(story)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  whileHover={story.available ? { y: -8, scale: 1.02 } : {}}
                >
                  {/* Card Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${story.gradient} opacity-80`} />
                  
                  {/* Hover Glow */}
                  {story.available && (
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        boxShadow: `inset 0 0 60px ${story.accentColor}40`,
                      }}
                    />
                  )}

                  {/* Content */}
                  <div className="relative p-6 h-full min-h-[320px] flex flex-col">
                    {/* Icon */}
                    <div className="text-4xl mb-4">{story.icon}</div>

                    {/* Title */}
                    <h3 className="text-xl font-medium text-white mb-1">{story.title}</h3>
                    <p className="text-white/60 text-sm mb-4">{story.subtitle}</p>

                    {/* Description */}
                    <p className="text-white/70 text-sm leading-relaxed flex-grow">
                      {story.description}
                    </p>

                    {/* Footer */}
                    <div className="mt-6 pt-4 border-t border-white/10">
                      <div className="flex items-center justify-between text-xs text-white/50">
                        <span>{story.character}</span>
                        <span>{story.location && story.year ? `${story.location}, ${story.year}` : story.duration}</span>
                      </div>
                    </div>

                    {/* Coming Soon Badge */}
                    {!story.available && (
                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm text-xs text-white/60">
                        Coming Soon
                      </div>
                    )}

                    {/* Play indicator */}
                    {story.available && (
                      <motion.div
                        className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        whileHover={{ scale: 1.1 }}
                      >
                        <span className="text-white text-lg ml-0.5">▶</span>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-8 py-12 border-t border-white/5">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-sm">
              Built with 💜 for International Women's Day 2026
            </p>
            <p className="text-white/20 text-xs">
              These stories are inspired by real experiences shared by women worldwide
            </p>
          </div>
        </footer>
      </div>

      {/* Story Detail Modal */}
      <AnimatePresence>
        {selectedStory && !isStarting && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={handleBack}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal */}
            <motion.div
              className="relative w-full max-w-2xl rounded-3xl overflow-hidden"
              initial={{ scale: 0.9, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 40 }}
              transition={{ type: 'spring', damping: 25 }}
            >
              {/* Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${selectedStory.gradient}`} />
              <div className="absolute inset-0 bg-black/40" />

              {/* Content */}
              <div className="relative p-8 md:p-12">
                {/* Close button */}
                <button
                  onClick={handleBack}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
                >
                  <span className="text-white text-xl">×</span>
                </button>

                {/* Icon */}
                <div className="text-6xl mb-6">{selectedStory.icon}</div>

                {/* Title */}
                <h2 className="text-4xl md:text-5xl font-light text-white mb-2">
                  {selectedStory.title}
                </h2>
                <p className="text-xl text-white/60 mb-6">{selectedStory.subtitle}</p>

                {/* Character info */}
                <div className="flex items-center gap-4 mb-8 p-4 rounded-xl bg-white/5">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center text-2xl">
                    👩
                  </div>
                  <div>
                    <p className="text-white font-medium">{selectedStory.character}</p>
                    <p className="text-white/50 text-sm">{selectedStory.role}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-white/80 text-lg leading-relaxed mb-8">
                  {selectedStory.description}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-6 mb-8 text-sm text-white/50">
                  <span className="flex items-center gap-2">
                    <span>🎭</span> {selectedStory.theme}
                  </span>
                  <span className="flex items-center gap-2">
                    <span>⏱</span> {selectedStory.duration}
                  </span>
                </div>

                {/* CTA */}
                <motion.button
                  onClick={handleStart}
                  className="w-full py-5 rounded-2xl bg-white text-black font-medium text-lg hover:bg-white/90 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Begin Her Story
                </motion.button>

                <p className="text-center text-white/30 text-sm mt-4">
                  Your choices shape her day. Choose wisely.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Starting Transition */}
      <AnimatePresence>
        {isStarting && (
          <motion.div
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="text-6xl mb-6"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                {selectedStory?.icon}
              </motion.div>
              <p className="text-white/60 text-lg">Entering {selectedStory?.character}'s world...</p>
              <motion.div
                className="mt-8 w-48 h-1 bg-white/10 rounded-full mx-auto overflow-hidden"
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1 }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
