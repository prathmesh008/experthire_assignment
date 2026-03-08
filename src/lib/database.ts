// Mock Global Database for tracking user decisions
// In production, this would be a real database like Prisma/MongoDB/Redis

interface GlobalDatabase {
  totalPlays: number;
  choiceStats: Record<string, number>;
  endingStats: Record<string, number>;
  lastUpdated: string;
}

// In-memory mock database (resets on server restart)
// In production, use a real database
let mockDatabase: GlobalDatabase = {
  totalPlays: 847293,
  choiceStats: {
    'choice_confident': 42891,
    'choice_anxious': 31456,
    'choice_prepared': 28734,
    'choice_arrive_early': 18923,
    'choice_text_friend': 24012,
    'choice_confront': 35678,
    'choice_silent': 28901,
    'choice_research': 22456,
    'choice_speak': 41234,
    'choice_leave': 29876,
    'choice_accept_loss': 18765,
  },
  endingStats: {
    'empowered': 234567,
    'resilient': 189234,
    'silenced': 156789,
  },
  lastUpdated: new Date().toISOString(),
};

export function getDatabase(): GlobalDatabase {
  return { ...mockDatabase };
}

export function incrementChoice(choiceId: string): GlobalDatabase {
  mockDatabase.choiceStats[choiceId] = (mockDatabase.choiceStats[choiceId] || 0) + 1;
  mockDatabase.totalPlays += 1;
  mockDatabase.lastUpdated = new Date().toISOString();
  return { ...mockDatabase };
}

export function incrementEnding(endingType: string): GlobalDatabase {
  mockDatabase.endingStats[endingType] = (mockDatabase.endingStats[endingType] || 0) + 1;
  mockDatabase.lastUpdated = new Date().toISOString();
  return { ...mockDatabase };
}

export function getChoicePercentage(choiceId: string): number {
  const total = Object.values(mockDatabase.choiceStats).reduce((a, b) => a + b, 0);
  if (total === 0) return 0;
  return Math.round((mockDatabase.choiceStats[choiceId] || 0) / total * 100);
}

export function getEndingPercentage(endingType: string): number {
  const total = Object.values(mockDatabase.endingStats).reduce((a, b) => a + b, 0);
  if (total === 0) return 0;
  return Math.round((mockDatabase.endingStats[endingType] || 0) / total * 100);
}
