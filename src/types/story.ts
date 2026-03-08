// Branching Story Schema with Video Transitions

export interface Choice {
  id: string;
  label: string;
  nextNodeId: string;
  // Frame segment to play when this choice is selected (legacy Lottie support)
  frameSegment?: [number, number]; // [startFrame, endFrame]
  // Video URL to play as transition (optional - falls back to animated transition)
  videoUrl?: string;
  // Transition type if no video
  transitionType?: 'sweep' | 'zoom' | 'dissolve' | 'reveal';
}

export interface StoryNode {
  id: string;
  speaker?: string;
  text: string;
  choices?: Choice[];
  isEnding?: boolean;
  endingType?: string; // Any ending type string
  statistic?: string; // Simple string for reflection/statistic
  // Initial frame to display when this node is active (before any choice)
  initialFrame?: number;
  // Background video for this scene (loops)
  backgroundVideoUrl?: string;
  // Scene mood for dynamic background
  mood?: 'hopeful' | 'tense' | 'neutral' | 'triumphant' | 'somber';
  // Canvas scene type for visual illustration
  sceneType?: 'mirror' | 'bedroom' | 'commute' | 'office' | 'meeting' | 'desk' | 'conversation' | 'presentation' | 'celebration' | 'reflection' | 'default';
}

export interface StoryData {
  id: string;
  title: string;
  description: string;
  lottieUrl: string; // URL to the Lottie JSON file
  nodes: Record<string, StoryNode>;
  startNodeId: string;
}

export interface GameState {
  currentNodeId: string;
  isTransitioning: boolean;
  isLottiePlaying: boolean;
  uiVisible: boolean;
  choiceHistory: string[];
}

export interface GlobalStats {
  totalPlays: number;
  choiceStats: Record<string, number>;
  endingStats: Record<string, number>;
}
