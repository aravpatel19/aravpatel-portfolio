import { tool } from 'ai';
import { z } from 'zod';

export const getResume = tool({
  description:
    'Politely decline sharing the full resume publicly and guide users to reach out directly to request it.',
  parameters: z.object({}),
  execute: async () => {
    return (
      "I don’t share my full resume here. If you’d like a copy, please reach out via email (aravpatel2319@gmail.com) or message me on LinkedIn (linkedin.com/in/aravpatel-). I’m happy to send it over."
    );
  },
});
