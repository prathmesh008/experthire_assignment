import { NextRequest, NextResponse } from 'next/server';
import { 
  incrementChoice, 
  incrementEnding, 
  getDatabase,
  getChoicePercentage,
  getEndingPercentage 
} from '@/lib/database';

export interface ChoicePayload {
  choiceId: string;
  storyId: string;
  nodeId: string;
  isEnding?: boolean;
  endingType?: string;
}

export interface ChoiceResponse {
  success: boolean;
  choiceId: string;
  globalStats: {
    totalPlays: number;
    choicePercentage: number;
    endingPercentage?: number;
  };
  message: string;
}

// POST /api/choice - Record a user's choice
export async function POST(request: NextRequest): Promise<NextResponse<ChoiceResponse>> {
  try {
    const body: ChoicePayload = await request.json();
    const { choiceId, storyId, nodeId, isEnding, endingType } = body;

    // Validate required fields
    if (!choiceId || !storyId || !nodeId) {
      return NextResponse.json(
        {
          success: false,
          choiceId: choiceId || '',
          globalStats: { totalPlays: 0, choicePercentage: 0 },
          message: 'Missing required fields: choiceId, storyId, nodeId',
        },
        { status: 400 }
      );
    }

    // Increment the choice counter
    incrementChoice(choiceId);

    // If this is an ending, also track the ending type
    if (isEnding && endingType) {
      incrementEnding(endingType);
    }

    // Get updated stats
    const database = getDatabase();
    const choicePercentage = getChoicePercentage(choiceId);
    const endingPercentage = endingType ? getEndingPercentage(endingType) : undefined;

    // Log for debugging (would be analytics in production)
    console.log(`[Choice Recorded] Story: ${storyId}, Node: ${nodeId}, Choice: ${choiceId}`);
    if (isEnding) {
      console.log(`[Ending Reached] Type: ${endingType}`);
    }

    return NextResponse.json({
      success: true,
      choiceId,
      globalStats: {
        totalPlays: database.totalPlays,
        choicePercentage,
        endingPercentage,
      },
      message: `Choice recorded. ${choicePercentage}% of players made this choice.`,
    });
  } catch (error) {
    console.error('[API Error]', error);
    return NextResponse.json(
      {
        success: false,
        choiceId: '',
        globalStats: { totalPlays: 0, choicePercentage: 0 },
        message: 'Internal server error',
      },
      { status: 500 }
    );
  }
}

// GET /api/choice - Get global statistics
export async function GET(): Promise<NextResponse> {
  try {
    const database = getDatabase();
    
    return NextResponse.json({
      success: true,
      data: database,
    });
  } catch (error) {
    console.error('[API Error]', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
