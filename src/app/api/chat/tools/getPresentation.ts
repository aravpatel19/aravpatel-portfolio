import { tool } from 'ai';
import { z } from 'zod';

export const getPresentation = tool({
  description:
    'This tool returns a concise personal introduction of Arav Patel. It is used to answer the question "Who are you?" or "Tell me about yourself".',
  parameters: z.object({}),
  execute: async () => {
    return {
      presentation:
        "I'm Arav — I build AI things, ship fast, and try to keep it simple. I’ve worked across AI engineering, web, and cloud (Fidelity, Mindgrasp, and client work). I love putting real products in people’s hands, tinkering with agentic RAG systems, and dialing in clean infra. Off the laptop, I’m skiing black diamonds, playing soccer, or chasing a new idea.",
    };
  },
});
