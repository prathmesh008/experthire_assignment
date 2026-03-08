'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';

interface PremiumTypewriterProps {
  text: string;
  speaker?: string;
  onComplete?: () => void;
  speed?: number;
}

export default function PremiumTypewriter({
  text,
  speaker,
  onComplete,
  speed = 1,
}: PremiumTypewriterProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const indexRef = useRef(0);
  const textKeyRef = useRef(text);
  const hasCalledComplete = useRef(false);

  // Reset when text changes
  useEffect(() => {
    if (text !== textKeyRef.current) {
      textKeyRef.current = text;
      setDisplayedText('');
      setIsComplete(false);
      indexRef.current = 0;
      hasCalledComplete.current = false;
    }
  }, [text]);

  // Typewriter effect
  useEffect(() => {
    if (indexRef.current >= text.length) {
      if (!hasCalledComplete.current) {
        hasCalledComplete.current = true;
        setIsComplete(true);
        // Small delay before calling onComplete for dramatic effect
        setTimeout(() => {
          onComplete?.();
        }, 300);
      }
      return;
    }

    const char = text[indexRef.current];
    
    // Variable timing based on punctuation
    let delay = 30 / speed;
    if (['.', '!', '?'].includes(char)) delay = 500 / speed;
    else if ([',', ';', ':'].includes(char)) delay = 250 / speed;
    else if (['"', "'", '—'].includes(char)) delay = 150 / speed;
    else if (char === ' ') delay = 20 / speed;
    else if (char === '\n') delay = 400 / speed;

    const timer = setTimeout(() => {
      setDisplayedText(prev => prev + char);
      indexRef.current += 1;
    }, delay);

    return () => clearTimeout(timer);
  }, [displayedText, text, speed, onComplete]);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(v => !v);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Skip to end on click
  const handleSkip = useCallback(() => {
    if (!isComplete) {
      setDisplayedText(text);
      indexRef.current = text.length;
      setIsComplete(true);
      if (!hasCalledComplete.current) {
        hasCalledComplete.current = true;
        onComplete?.();
      }
    }
  }, [isComplete, text, onComplete]);

  // Split text for word-by-word animation effect
  const words = displayedText.split(' ');

  return (
    <motion.div
      className="relative cursor-pointer select-none"
      onClick={handleSkip}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Speaker name */}
      {speaker && (
        <motion.div
          className="mb-4 text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium tracking-wider uppercase"
            style={{
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              color: 'rgba(255, 255, 255, 0.9)',
              textShadow: '0 0 10px rgba(168, 85, 247, 0.5)',
            }}
          >
            {speaker}
          </span>
        </motion.div>
      )}

      {/* Main text container */}
      <div className="relative text-center">
        {/* Text display */}
        <p
          className="text-xl md:text-2xl lg:text-[1.65rem] font-light leading-relaxed md:leading-loose tracking-wide text-white/95 max-w-3xl mx-auto"
          style={{
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            textShadow: '0 2px 20px rgba(0, 0, 0, 0.8)',
          }}
        >
          {displayedText}
          {/* Cursor */}
          <motion.span
            className="inline-block w-[2px] h-[1.2em] ml-1 align-middle"
            style={{
              background: 'linear-gradient(to bottom, #a855f7, #ec4899)',
              boxShadow: '0 0 10px rgba(168, 85, 247, 0.8)',
            }}
            animate={{
              opacity: cursorVisible && !isComplete ? 1 : 0,
            }}
            transition={{ duration: 0.1 }}
          />
        </p>

        {/* Click to skip hint */}
        <AnimatePresence>
          {!isComplete && displayedText.length > 20 && (
            <motion.div
              className="mt-4 text-xs text-white/30 tracking-wider text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              Click to skip
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress indicator */}
      <motion.div
        className="mt-6 h-[2px] mx-auto max-w-md bg-white/10 rounded-full overflow-hidden"
      >
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500/70 to-pink-500/70"
          initial={{ width: '0%' }}
          animate={{ width: `${(displayedText.length / text.length) * 100}%` }}
          transition={{ duration: 0.1 }}
        />
      </motion.div>
    </motion.div>
  );
}
