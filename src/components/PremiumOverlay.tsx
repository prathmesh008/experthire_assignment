'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { StoryNode, Choice } from '@/types/story';
import PremiumTypewriter from './PremiumTypewriter';
import PremiumChoices from './PremiumChoices';

interface PremiumOverlayProps {
  node: StoryNode;
  visible: boolean;
  onChoiceSelect: (choice: Choice) => void;
  selectedChoiceId?: string | null;
  isTypingComplete: boolean;
  onTypingComplete: () => void;
  storyTitle?: string;
}

export default function PremiumOverlay({
  node,
  visible,
  onChoiceSelect,
  selectedChoiceId,
  isTypingComplete,
  onTypingComplete,
  storyTitle,
}: PremiumOverlayProps) {
  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key={node.id}
          className="fixed inset-0 z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Top header area */}
          <motion.div
            className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="px-8 md:px-12 pt-8 md:pt-12">
              {/* Story title */}
              {storyTitle && (
                <div className="flex items-center gap-4">
                  <motion.div
                    className="w-8 h-[1px] bg-gradient-to-r from-transparent to-purple-500/50"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  />
                  <h1 className="text-sm md:text-base font-light tracking-[0.3em] uppercase text-white/40">
                    {storyTitle}
                  </h1>
                </div>
              )}
            </div>
          </motion.div>

          {/* Main content area - centered vertically */}
          <div className="absolute inset-0 flex flex-col justify-center pointer-events-none">
            {/* Gradient backdrop */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.3) 100%)',
              }}
            />

            {/* Content container */}
            <motion.div
              className="relative w-4xl mx-auto px-8 md:px-12 py-8"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Dialogue section */}
              <div className="mb-8 pointer-events-auto text-center">
                <PremiumTypewriter
                  text={node.text}
                  speaker={node.speaker}
                  onComplete={onTypingComplete}
                />
              </div>

              {/* Choices section */}
              <AnimatePresence>
                {isTypingComplete && node.choices && node.choices.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <PremiumChoices
                      choices={node.choices}
                      onSelect={onChoiceSelect}
                      selectedId={selectedChoiceId}
                      disabled={selectedChoiceId !== null}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Ending display */}
              <AnimatePresence>
                {isTypingComplete && node.isEnding && (
                  <motion.div
                    className="text-center mt-12 pointer-events-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    {/* Ending type badge */}
                    <motion.div
                      className="inline-block mb-8"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, delay: 0.8 }}
                    >
                      <span
                        className={`
                          px-6 py-3 rounded-full text-lg font-medium tracking-wide
                          ${node.endingType === 'empowered' ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-purple-200 border border-purple-400/30' : ''}
                          ${node.endingType === 'resilient' ? 'bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-cyan-200 border border-cyan-400/30' : ''}
                          ${node.endingType === 'silenced' ? 'bg-gradient-to-r from-gray-500/30 to-slate-500/30 text-gray-200 border border-gray-400/30' : ''}
                        `}
                        style={{
                          boxShadow: node.endingType === 'empowered'
                            ? '0 0 30px rgba(168, 85, 247, 0.3)'
                            : node.endingType === 'resilient'
                            ? '0 0 30px rgba(34, 211, 238, 0.3)'
                            : '0 0 30px rgba(100, 116, 139, 0.3)',
                        }}
                      >
                        {node.endingType === 'empowered' && '✨ Empowered Ending'}
                        {node.endingType === 'resilient' && '💎 Resilient Ending'}
                        {node.endingType === 'silenced' && '🌑 Silenced Ending'}
                      </span>
                    </motion.div>

                    {/* Statistic card */}
                    {node.statistic && (
                      <motion.div
                        className="max-w-lg mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 }}
                      >
                        <div
                          className="rounded-3xl p-8 backdrop-blur-xl"
                          style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                            border: '1px solid rgba(255,255,255,0.1)',
                          }}
                        >
                          <p className="text-white/80 text-lg mb-3 leading-relaxed">
                            {node.statistic}
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {/* Play again button */}
                    <motion.button
                      className="mt-10 px-8 py-4 rounded-full text-white/80 hover:text-white transition-all duration-300 group"
                      style={{
                        background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)',
                        border: '1px solid rgba(168, 85, 247, 0.3)',
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.8 }}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: '0 0 30px rgba(168, 85, 247, 0.4)',
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => window.location.reload()}
                    >
                      <span className="flex items-center gap-3">
                        <span>Experience Another Path</span>
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </span>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
