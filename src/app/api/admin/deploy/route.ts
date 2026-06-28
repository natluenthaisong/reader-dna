import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import util from 'util';

const execAsync = util.promisify(exec);

export async function POST() {
  try {
    const cwd = process.cwd();
    
    // 1. Add changes
    await execAsync('git add content/questions.json content/archetypes.json', { cwd });
    
    // 2. Commit changes
    // Check if there are changes to commit first to avoid error if no changes
    try {
      await execAsync('git commit -m "content: update via admin UI"', { cwd });
    } catch (commitError: any) {
      // If error contains "nothing to commit", we can ignore or report it
      if (commitError.stdout && commitError.stdout.includes('nothing to commit')) {
         return NextResponse.json({ success: false, message: 'No changes detected to commit.' });
      }
      throw commitError;
    }
    
    // 3. Push changes
    const { stdout, stderr } = await execAsync('git push', { cwd });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Changes committed and pushed successfully!',
      details: { stdout, stderr }
    });
  } catch (error: any) {
    console.error('Deploy error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
