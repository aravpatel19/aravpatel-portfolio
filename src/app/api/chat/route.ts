import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { SYSTEM_PROMPT } from './prompt';
import { getContact } from './tools/getContact';
import { getFun } from './tools/getFun';
import { getJob } from './tools/getJob';
import { getPresentation } from './tools/getPresentation';
import { getProjects } from './tools/getProjects';
import { getResume } from './tools/getResume';
import { getSkills } from './tools/getSkills';
// import { getSports } from './tools/getSport';
// getQA disabled: Q&A embedded into system prompt
// import fs from 'fs/promises';
// import path from 'path';

export const maxDuration = 30;

// ❌ No need for export here, Next.js doesn't like it
function errorHandler(error: unknown) {
  if (error == null) {
    return 'Unknown error';
  }
  if (typeof error === 'string') {
    return error;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return JSON.stringify(error);
}

// loadQAIndex disabled

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    console.log('[CHAT-API] Incoming messages:', messages);

    const preparedMessages = [SYSTEM_PROMPT, ...messages];

    // Determine intent from the latest user message
    const lastUser = [...messages].reverse().find((m: { role?: string; content?: string }) => m.role === 'user');
    const content: string = (lastUser?.content || '').toLowerCase();

    type ToolsMap = {
      getProjects: typeof getProjects;
      getPresentation: typeof getPresentation;
      getResume: typeof getResume;
      getContact: typeof getContact;
      getSkills: typeof getSkills;
      // getSports: typeof getSports;
      getFun: typeof getFun;
      getJob: typeof getJob;
    };
    type ToolKey = keyof ToolsMap;
    const toolIntents: Array<{ key: ToolKey; pattern: RegExp }> = [
      { key: 'getProjects', pattern: /(project|portfolio|client projects)/ },
      { key: 'getSkills', pattern: /(skill|stack)/ },
      { key: 'getContact', pattern: /(contact|reach|email|linkedin|how can i (reach|contact))/ },
      { key: 'getResume', pattern: /(resume|cv)/ },
      { key: 'getJob', pattern: /(job|opportunit(y|ies)|hire)/ },
      // sports disabled
      { key: 'getFun', pattern: /(fun|hobb(y|ies)|craziest|crazy|wild)/ },
      { key: 'getPresentation', pattern: /(who are you|about you|about arav|presentation)/ },
    ];

    const matched: ToolKey[] = [];
    for (const t of toolIntents) {
      if (t.pattern.test(content)) matched.push(t.key);
    }

    // Build a constrained toolset to enforce "at most one tool per response"
    const fullTools: ToolsMap = {
      getProjects,
      getPresentation,
      getResume,
      getContact,
      getSkills,
      // getSports,
      getFun,
      getJob,
    };

    let constrainedTools: Partial<ToolsMap> = fullTools;
    const extraSystem: { role: 'system'; content: string }[] = [];

    // Q&A forced-tool heuristic disabled
    const forcedTool: ToolKey | null = null;

    if (forcedTool) {
      // no-op (disabled)
    } else if (matched.length === 0) {
      // No clear tool intent → allow tools but model decides; keep guidance in prompt
      constrainedTools = fullTools;
    } else if (matched.length === 1) {
      // Single tool intent → only expose that tool
      const only = matched[0];
      const selected: Partial<ToolsMap> = {};
      // Assign using a typed switch to avoid unsafe casts
      switch (only) {
        case 'getProjects': selected.getProjects = fullTools.getProjects; break;
        case 'getPresentation': selected.getPresentation = fullTools.getPresentation; break;
        case 'getResume': selected.getResume = fullTools.getResume; break;
        case 'getContact': selected.getContact = fullTools.getContact; break;
        case 'getSkills': selected.getSkills = fullTools.getSkills; break;
        // case 'getSports': selected.getSports = fullTools.getSports; break;
        case 'getFun': selected.getFun = fullTools.getFun; break;
        case 'getJob': selected.getJob = fullTools.getJob; break;
      }
      constrainedTools = selected;
    } else {
      // Multi-intent → text-only reply; ask a follow-up instead of calling tools
      constrainedTools = {};
      extraSystem.push({
        role: 'system',
        content:
          'Multi-intent detected. Respond briefly without calling tools; ask the user to pick one topic (e.g., projects or skills) for the next turn.',
      });
    }

    if (extraSystem.length) {
      preparedMessages.splice(1, 0, ...extraSystem);
    }

    const result = streamText({
      model: openai('gpt-4o-mini'),
      messages: preparedMessages,
      toolCallStreaming: true,
      tools: constrainedTools,
      maxSteps: 2,
    });

    return result.toDataStreamResponse({
      getErrorMessage: errorHandler,
    });
  } catch (err) {
    console.error('Global error:', err);
    const errorMessage = errorHandler(err);
    return new Response(errorMessage, { status: 500 });
  }
}
