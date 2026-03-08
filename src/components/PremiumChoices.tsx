'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Choice } from '@/types/story';

interface PremiumChoicesProps {
  choices: Choice[];
  onSelect: (choice: Choice) => void;
  disabled?: boolean;
  selectedId?: string | null;
}

export default function PremiumChoices({
  choices,
  onSelect,
  disabled = false,
  selectedId = null,
}: PremiumChoicesProps) {
  return (
    <motion.div
      className="flex flex-col gap-4 w-full max-w-2xl mx-auto pointer-events-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {choices.map((choice, index) => {
        const isSelected = selectedId === choice.id;
        const isOther = selectedId !== null && !isSelected;

        return (
          <motion.button
            key={choice.id}
            onClick={() => !disabled && !isOther && onSelect(choice)}
            disabled={disabled || isOther}
            className="group relative text-left w-full overflow-hidden"
            initial={{ opacity: 0, x: -40, y: 20 }}
            animate={{
              opacity: isOther ? 0 : 1,
              x: 0,
              y: 0,
              scale: isSelected ? 1.02 : 1,
            }}
            exit={{ opacity: 0, x: 40 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={!disabled && !isOther ? { scale: 1.02, x: 8 } : {}}
            whileTap={!disabled && !isOther ? { scale: 0.98 } : {}}
          >
            {/* Background layers */}
            <div className="relative rounded-2xl overflow-hidden">
              {/* Base background */}
              <div
                className={`
                  absolute inset-0 transition-all duration-500
                  ${isSelected
                    ? 'bg-gradient-to-r from-purple-600/40 via-pink-600/30 to-purple-600/40'
                    : 'bg-white/[0.03]'
                  }
                `}
              />

              {/* Hover gradient */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(236, 72, 153, 0.1) 50%, rgba(168, 85, 247, 0.15) 100%)',
                }}
              />

              {/* Border glow effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.3) 0%, rgba(236, 72, 153, 0.3) 100%)',
                  padding: '1px',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                }}
              />

              {/* Selection pulse ring */}
              {isSelected && (
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    border: '2px solid rgba(168, 85, 247, 0.8)',
                    boxShadow: '0 0 20px rgba(168, 85, 247, 0.4), inset 0 0 20px rgba(168, 85, 247, 0.1)',
                  }}
                  animate={{
                    opacity: [1, 0.5, 1],
                    scale: [1, 1.01, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                />
              )}

              {/* Content */}
              <div className="relative p-5 md:p-6 flex items-center gap-5">
                {/* Number indicator */}
                <motion.div
                  className={`
                    flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center
                    text-lg font-semibold transition-all duration-300
                    ${isSelected
                      ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30'
                      : 'bg-white/[0.08] text-white/50 group-hover:bg-white/[0.12] group-hover:text-white/80'
                    }
                  `}
                  animate={isSelected ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  {index + 1}
                </motion.div>

                {/* Choice text */}
                <span
                  className={`
                    flex-1 text-base md:text-lg font-medium leading-relaxed transition-colors duration-300
                    ${isSelected ? 'text-white' : 'text-white/75 group-hover:text-white'}
                  `}
                >
                  {choice.label}
                </span>

                {/* Arrow indicator */}
                <motion.div
                  className={`
                    flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                    transition-all duration-300
                    ${isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-white/[0.05] text-white/30 group-hover:bg-white/[0.1] group-hover:text-white/60'
                    }
                  `}
                  animate={isSelected ? { x: [0, 5, 0] } : {}}
                  transition={{ duration: 0.5, repeat: isSelected ? Infinity : 0 }}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </motion.div>
              </div>
            </div>
          </motion.button>
        );
      })}

      {/* Keyboard hint */}
      <motion.div
        className="flex items-center justify-center gap-2 mt-2 text-white/25 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <span>Press</span>
        {choices.map((_, i) => (
          <kbd
            key={i}
            className="px-2 py-1 rounded bg-white/[0.05] border border-white/[0.1] text-white/40 text-xs"
          >
            {i + 1}
          </kbd>
        ))}
        <span>to choose</span>
      </motion.div>
    </motion.div>
  );
}
