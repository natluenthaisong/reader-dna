import { NextResponse } from 'next/server';
import questionsData from '../../../../content/questions.json';
import scoringConfig from '../../../../content/scoring-config.json';
import { scoreQuiz } from '../../../lib/scoring';

export async function POST(request: Request) {
  let body: any = {};
  try {
    body = await request.json();
    const { answers } = body;

    if (!answers || typeof answers !== 'object') {
      return NextResponse.json({ error: 'Invalid answers format' }, { status: 400 });
    }

    // Convert Record<string, number> to Array<{ question_id: string, value: number }>
    const formattedAnswers = Object.entries(answers).map(([question_id, value]) => ({
      question_id,
      value: Number(value),
    }));

    console.log(`Received ${formattedAnswers.length} answers:`, formattedAnswers.map(a => a.question_id));

    const result = scoreQuiz({
      answers: formattedAnswers,
      questionsData,
      scoringConfig,
      questionVersion: questionsData.question_version
    });

    return NextResponse.json({
      success: true,
      archetypeId: result.primary_type,
      secondaryId: result.secondary_type,
      derivedScores: result.derived_scores,
      highlights: result.share_highlights,
    });
  } catch (error: any) {
    console.error('Scoring error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: `${error.message || 'Internal server error'} (Received ${body?.answers ? Object.keys(body.answers).length : 0} answers)` 
      },
      { status: 500 }
    );
  }
}
