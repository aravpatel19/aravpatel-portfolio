import { tool } from 'ai';
import { z } from 'zod';

export const getContact = tool({
  description:
    'This tool show\' Arav Patel\'s contact informations.',
  parameters: z.object({}),
  execute: async () => {
    return "Here are my contact details — see the card below. Feel free to reach out, I’ll be happy to respond. 😉";
  },
});
