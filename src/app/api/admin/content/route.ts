import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const questionsPath = path.join(process.cwd(), 'content', 'questions.json');
    const archetypesPath = path.join(process.cwd(), 'content', 'archetypes.json');

    const questionsData = await fs.readFile(questionsPath, 'utf-8');
    const archetypesData = await fs.readFile(archetypesPath, 'utf-8');

    return NextResponse.json({
      questions: JSON.parse(questionsData),
      archetypes: JSON.parse(archetypesData),
    });
  } catch (error: any) {
    console.error('Error reading content:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { questions, archetypes } = body;

    if (!questions || !archetypes) {
      return NextResponse.json({ error: 'Missing questions or archetypes data' }, { status: 400 });
    }

    const questionsPath = path.join(process.cwd(), 'content', 'questions.json');
    const archetypesPath = path.join(process.cwd(), 'content', 'archetypes.json');

    // Write formatted JSON
    await fs.writeFile(questionsPath, JSON.stringify(questions, null, 2), 'utf-8');
    await fs.writeFile(archetypesPath, JSON.stringify(archetypes, null, 2), 'utf-8');

    return NextResponse.json({ success: true, message: 'Content saved successfully' });
  } catch (error: any) {
    console.error('Error saving content:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
