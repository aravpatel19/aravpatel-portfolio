import fs from 'fs/promises';
import path from 'path';

type QASection = { id: string; name: string; questions: string[] };

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export async function GET() {
  try {
    // Read Q&A directly from the system prompt so the ellipses menu mirrors it exactly
    const promptPath = path.join(process.cwd(), 'src', 'app', 'api', 'chat', 'prompt.ts');
    const file = await fs.readFile(promptPath, 'utf8');

    // Extract the template literal content inside content: ` ... `
    const contentMatch = file.match(/content:\s*`([\s\S]*?)`\s*,\s*\}\s*;/);
    const rawContent = contentMatch ? contentMatch[1] : '';
    const lines = rawContent.split(/\r?\n/);

    const sections: QASection[] = [];
    let current: QASection | null = null;
    let inQA = false;

    for (const raw of lines) {
      const line = raw.trim();
      if (/^##\s+Potential Questions and Answers/i.test(line)) {
        inQA = true;
        continue;
      }
      if (!inQA) continue;

      // Headings for categories use ###
      const h3 = line.match(/^###\s+(.+)/);
      if (h3) {
        const name = h3[1].trim();
        current = { id: slugify(name), name, questions: [] };
        sections.push(current);
        continue;
      }

      const q = line.match(/^\*\*Q:\s*(.+?)\*\*/);
      if (q && current) {
        current.questions.push(q[1].trim());
      }

      // Stop when we hit a new top-level section like '## Background Information'
      if (/^##\s+Background Information/i.test(line)) {
        break;
      }
    }

    return new Response(JSON.stringify({ sections }), {
      headers: { 'content-type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ sections: [] }), {
      headers: { 'content-type': 'application/json' },
      status: 200,
    });
  }
}


