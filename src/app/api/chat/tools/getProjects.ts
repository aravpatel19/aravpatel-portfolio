
import { tool } from "ai";
import { z } from "zod";


export const getProjects = tool({
  description:
    "Shows Arav's projects, including personal work and client/freelance sites",
  parameters: z.object({}),
  execute: async () => {
    return "Here are my projects — personal builds plus a separate section for client/freelance websites (with SEO and DNS handled). See the cards below."
  },
});