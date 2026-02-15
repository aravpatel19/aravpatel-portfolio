import { tool } from "ai";
import { z } from "zod";

export const getFun = tool({
  description:
    "Show Arav Patel's fun section: hobbies, adventures, and a highlight story. Use for queries like 'What do you do for fun?', 'hobbies', or 'craziest thing'.",
  parameters: z.object({}),
  execute: async () => {
    return "Here’s a peek into what I do for fun — see the section below (skiing, soccer, gym, and a favorite adventure story).";
  },
});


