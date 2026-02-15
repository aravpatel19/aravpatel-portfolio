import { tool } from 'ai';
import { z } from 'zod';

export const getJob = tool({
  description:
    "Gives a summary of what kind of job John Patel is looking for, plus his contact info and how to reach him. Use this tool when the user asks about his job search or how to contact him for opportunities.",
  parameters: z.object({}),
  execute: async () => {
    return `Here’s what I’m looking for 👇

- 📅 **Timeline**: Open to full-time opportunities starting **Winter 2025**
- 🌍 **Location**: Ideally looking for **San Francisco**, but also very excited about **New York**. Open to any location though, including outside the US (London, Dubai, etc.)
- 🧑‍💻 **Focus**: AI/ML engineering, cloud infrastructure, SaaS products, and agentic workflows
- 🛠️ **Stack**: Python, PyTorch, LangChain, RAG, Terraform, Kubernetes, AWS, React/Next.js, TypeScript
- ✅ **What I bring**: Hands-on experience with AI agents, scalable RAG systems, cloud-native apps, and client-facing web projects. Internship experience at **Mindgrasp AI** and **Fidelity Investments**, plus multiple freelance builds.
- 🔥 I move fast, learn faster, and I’m all about building things that are actually used by people

📬 **Contact me** via:
- Email: aravpatel2319@gmail.com
- LinkedIn: [linkedin.com/in/aravpatel-](https://www.linkedin.com/in/aravpatel-/)
- GitHub: [github.com/aravpatel19](https://github.com/aravpatel19)
- Website: [aravpatel.com](https://aravpatel.com)

Let’s build something great 🚀
    `;
  },
});
