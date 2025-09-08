import { tool } from 'ai';
import { z } from 'zod';
import fs from 'fs/promises';
import path from 'path';

// Parses docs/Q&A.md for entries of the form:
// **Q: question** on one line, followed by one or more lines beginning with A:
async function loadQA(): Promise<Record<string, string>> {
  const filePath = path.join(process.cwd(), 'docs', 'Q&A.md');
  const content = await fs.readFile(filePath, 'utf8');
  const lines = content.split(/\r?\n/);

  const qaMap: Record<string, string> = {};
  let currentQ: string | null = null;
  let currentA: string[] = [];

  const flush = () => {
    if (currentQ) {
      const answer = currentA.join('\n').trim();
      if (answer) qaMap[currentQ] = answer;
    }
    currentQ = null;
    currentA = [];
  };

  for (const raw of lines) {
    const line = raw.trim();
    const qMatch = line.match(/^\*\*Q:\s*(.+?)\*\*/i);
    if (qMatch) {
      flush();
      currentQ = qMatch[1].trim();
      continue;
    }
    if (/^A:\s*/.test(line)) {
      const cleaned = line.replace(/^A:\s*/i, '');
      currentA.push(cleaned);
      continue;
    }
    if (currentQ) {
      // Continue accumulating answer paragraphs until the next Q or section delimiter
      if (/^---$/.test(line) || /^##\s/.test(line) || /^\*\*Q:/.test(line)) {
        flush();
      } else if (line.length > 0) {
        currentA.push(line);
      }
    }
  }
  flush();
  return qaMap;
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Lightweight alias routing to canonical Q&A keys in docs/Q&A.md
const ALIASES: Array<{ match: (q: string) => boolean; canonical: string }> = [
  {
    match: (q) => /\beks\b/.test(q) || (/kubernetes/.test(q) && /node/.test(q)),
    canonical: 'What about your Enterprise-Grade AWS EKS Deployment for Node.js Application?',
  },
  {
    match: (q) => /clinical/.test(q) && /rag/.test(q),
    canonical: 'Can you tell me about your Multimodal Clinical RAG Fact-Checker?',
  },
  {
    match: (q) => /voice/.test(q) && /translation/.test(q),
    canonical: 'Can you walk me through your Multilingual Voice Translation App?',
  },
  {
    match: (q) => /agentic/.test(q) && /crawler|rag/.test(q),
    canonical: 'Tell me about your Agentic RAG Crawler.',
  },
  {
    match: (q) => /tetris/.test(q) || (/deep/.test(q) && /q[- ]?learning/.test(q)),
    canonical: 'And what about the Deep Q-Learning Tetris Agent?',
  },
  {
    match: (q) => /where (are|r) you (located|based)/.test(q),
    canonical: 'Where are you located?',
  },
];

export const getQA = tool({
  description:
    'Returns a curated answer from docs/Q&A.md for a given question. Use for personal/professional Q&A.',
  parameters: z.object({ question: z.string().describe('Exact user question or closest phrasing') }),
  execute: async ({ question }) => {
    try {
      const qa = await loadQA();
      // Exact match first
      if (qa[question]) return qa[question];
      // Alias routing
      const nq = normalize(question);
      const alias = ALIASES.find((a) => a.match(nq));
      if (alias && qa[alias.canonical]) return qa[alias.canonical];
      // Fuzzy fallback: case-insensitive contains
      const qLower = question.toLowerCase();
      // Prefer the longest key that matches partially to bias toward specific entries
      const key = Object.keys(qa)
        .filter((k) => k.toLowerCase().includes(qLower) || qLower.includes(k.toLowerCase()))
        .sort((a, b) => b.length - a.length)[0];
      if (key) return qa[key];
      return "I don’t have a curated answer for that yet, but I’m happy to explain — ask me with more detail.";
    } catch {
      return 'I could not load the Q&A knowledge right now. Please try again later.';
    }
  },
});


