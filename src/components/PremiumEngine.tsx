'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { StoryData, StoryNode, Choice, GameState } from '@/types/story';
import PremiumTransition from './PremiumTransition';
import PremiumOverlay from './PremiumOverlay';
import CinematicEnding from './CinematicEnding';

interface PremiumEngineProps {
  story: StoryData;
}

// Map mood to gradient colors
const moodGradients: Record<string, string> = {
  hopeful: 'from-amber-900/40 via-orange-900/30 to-yellow-900/20',
  tense: 'from-red-900/40 via-rose-900/30 to-pink-900/20',
  neutral: 'from-slate-900/40 via-zinc-900/30 to-neutral-900/20',
  triumphant: 'from-emerald-900/40 via-teal-900/30 to-cyan-900/20',
  somber: 'from-purple-900/40 via-violet-900/30 to-indigo-900/20',
};

export default function PremiumEngine({ story }: PremiumEngineProps) {
  // Game state
  const [gameState, setGameState] = useState<GameState>({
    currentNodeId: story.startNodeId,
    isTransitioning: false,
    isLottiePlaying: false,
    uiVisible: true,
    choiceHistory: [],
  });

  // UI state
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [showTransition, setShowTransition] = useState(false);
  const [showCinematicEnding, setShowCinematicEnding] = useState(false);

  // Current node
  const currentNode: StoryNode = story.nodes[gameState.currentNodeId];

  // Ref to track pending transition
  const pendingNodeRef = useRef<string | null>(null);

  // Reset typing state when node changes
  useEffect(() => {
    setIsTypingComplete(false);
  }, [gameState.currentNodeId]);

  // Check for ending and trigger cinematic ending after typing completes
  useEffect(() => {
    if (currentNode?.isEnding && isTypingComplete) {
      // Delay before showing cinematic ending
      const timer = setTimeout(() => {
        setShowCinematicEnding(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentNode?.isEnding, isTypingComplete]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState.isTransitioning || !isTypingComplete || !currentNode?.choices) {
        return;
      }

      const num = parseInt(e.key);
      if (num >= 1 && num <= currentNode.choices.length) {
        handleChoiceSelect(currentNode.choices[num - 1]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState.isTransitioning, isTypingComplete, currentNode]);

  // Handle choice selection
  const handleChoiceSelect = useCallback((choice: Choice) => {
    if (gameState.isTransitioning) return;

    setSelectedChoice(choice);
    pendingNodeRef.current = choice.nextNodeId;

    // Record choice (fire and forget)
    fetch('/api/choice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        choiceId: choice.id,
        storyId: story.id,
        nodeId: gameState.currentNodeId,
      }),
    }).catch(console.error);

    // Start transition
    setGameState(prev => ({
      ...prev,
      isTransitioning: true,
      uiVisible: false,
    }));

    // Trigger transition overlay after UI fades
    setTimeout(() => {
      setShowTransition(true);
      setSceneIndex(prev => prev + 1);
    }, 300);
  }, [gameState.isTransitioning, gameState.currentNodeId, story.id]);

  // Handle transition complete
  const handleTransitionComplete = useCallback(() => {
    const nextNodeId = pendingNodeRef.current;
    if (!nextNodeId) return;

    setGameState(prev => ({
      ...prev,
      currentNodeId: nextNodeId,
      isTransitioning: false,
      uiVisible: true,
      choiceHistory: [...prev.choiceHistory, selectedChoice?.id || ''],
    }));

    setSelectedChoice(null);
    setShowTransition(false);
    pendingNodeRef.current = null;
  }, [selectedChoice]);

  // Handle typing complete
  const handleTypingComplete = useCallback(() => {
    setIsTypingComplete(true);
  }, []);

  // Handle restart (same story, different choices)
  const handleRestart = useCallback(() => {
    setGameState({
      currentNodeId: story.startNodeId,
      isTransitioning: false,
      isLottiePlaying: false,
      uiVisible: true,
      choiceHistory: [],
    });
    setShowCinematicEnding(false);
    setIsTypingComplete(false);
    setSelectedChoice(null);
    setSceneIndex(0);
  }, [story.startNodeId]);

  // Handle go home (back to story selection)
  const handleGoHome = useCallback(() => {
    window.location.href = '/';
  }, []);

  // Safety check
  if (!currentNode) {
    return (
      <div className="w-screen h-screen bg-black flex items-center justify-center text-white">
        <p>Error: Story node not found</p>
      </div>
    );
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      {/* Atmospheric Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${moodGradients[currentNode.mood || 'neutral'] || moodGradients.neutral}`}>
        {/* Ambient particles - using deterministic values */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/5"
              style={{
                width: (i % 4) + 2,
                height: (i % 4) + 2,
                left: `${(i * 13) % 100}%`,
                top: `${(i * 19) % 100}%`,
                animation: `float ${15 + (i % 10)}s linear infinite`,
                animationDelay: `${i % 8}s`,
              }}
            />
          ))}
        </div>
        {/* Vignette effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      </div>

      {/* Premium Transition Overlay */}
      <PremiumTransition
        isActive={showTransition}
        choiceText={selectedChoice?.label}
        onComplete={handleTransitionComplete}
      />

      {/* Premium Story Overlay - hide when cinematic ending is showing */}
      {!showCinematicEnding && (
        <PremiumOverlay
          node={currentNode}
          visible={gameState.uiVisible}
          onChoiceSelect={handleChoiceSelect}
          selectedChoiceId={selectedChoice?.id}
          isTypingComplete={isTypingComplete}
          onTypingComplete={handleTypingComplete}
          storyTitle={story.title}
        />
      )}

      {/* Cinematic Ending - movie-style credits with statistics */}
      {showCinematicEnding && currentNode.isEnding && (
        <CinematicEnding
          node={currentNode}
          storyTitle={story.title}
          onRestart={handleRestart}
          onGoHome={handleGoHome}
        />
      )}
    </div>
  );
}
