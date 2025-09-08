import Image from 'next/image';
import { ChevronRight, Link } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

// Arav Patel projects
const PROJECT_CONTENT = [
  {
    title: 'Multimodal Clinical RAG',
    description:
      "This project was all about making sense of pharmaceutical claims, but man, parsing PDFs is no joke. Every file was different. Some had one column, some had two, some had three, and the text order would get all jumbled. Tables were a mess too, especially the ones with nested headers, and images would show up in the weirdest spots. Honestly, the hardest part of the whole project wasn’t the RAG pipeline itself, it was just getting clean data out of those PDFs.\n\nOnce I finally wrangled the data, I used Docling to structure the output into markdown. That was a game-changer because it gave me clear headers for sections and paragraphs. I chunked the documents based on those sections, making small chunks tied to paragraphs or section headers, not full chapters, so the retrieval would stay tight and relevant. For embeddings, I used OpenAI’s models and stored everything in Milvus. On top of that, the pipeline handled extras like table repair and image captioning, which made the system actually usable across different types of content.\n\nAt the end of the day, the big win for me wasn’t just that the fact-checker worked, but that I pushed through all the messy, real-world problems of multimodal data. It taught me that building these systems is just as much about cleaning and structuring data as it is about the flashy AI part.",
    techStack: [
      'Next.js', 'TypeScript', 'Docling', 'Milvus', 'OpenAI GPT‑4o', 'LangChain', 'Supabase'
    ],
    date: '2025',
    links: [
      { name: 'GitHub', url: 'https://github.com/aravpatel19' }
    ],
    images: [],
  },
  {
    title: 'EKS Platform with Terraform',
    description:
      "This one actually started because of a job interview. They told me I needed to understand Kubernetes and Infrastructure as Code with Terraform. So I thought, what better way to learn than to just dive in and build a full infrastructure myself. And so began the journey of my “cloud-enterprise playground.\n\nI already had some background in networking concepts from school, so I had a base to work with. From there, I spent hours on YouTube and digging through documentation to really understand how Kubernetes works. Then I jumped into architecting an infrastructure with Terraform. That meant setting up the AWS provider, learning how to deal with ports, security groups, ingresses and egresses, Terraform states and drifts — all stuff that was brand new to me. Honestly, it felt like I was back in school with how much I was learning every day.\n\nBut learning only goes so far, so I wanted to make it real. I quickly vibecoded a simple Node.js app with an asset for S3 and a MySQL backend database where you could add or delete items. Nothing crazy, but enough to make it feel like a legit app. I containerized it with Docker, built the image, and got it ready for deployment.\n\nThen came the Terraform fun. I created the infra as code, spun up an EC2 server, connected it to S3 for assets and RDS for the database, wrapped it all in a VPC, and set up the necessary security groups and ports. I followed AWS docs closely but tweaked configs where I needed to. After that, I wrote out the Kubernetes YAML files and deployed the whole thing on EKS. I started with two pods, then dropped to one because of cost, and used kubectl to initialize the infra. BOOM — I had a scalable application running on AWS. I even tested it on the public URL AWS gave me, and everything just worked. That was a crazy satisfying moment.\n\nTo make it cleaner, I added a CI/CD pipeline with a YAML config so any time I pushed changes to the Node.js app, the code would go through tests, health checks, infra checks, and then redeploy automatically to production. Felt pretty professional, not gonna lie.\n\nAnd then came the bill. Turns out keeping this up was about $120 a month, which wasn’t exactly pocket change. So I destroyed the whole thing and wrote shell scripts for different versions: one script to deploy the full-blown EKS app (the $120/month one), one for a simpler EC2 + RDS setup, and the simplest, a $0 localhost or Docker-only version on my own machine.\n\nThe whole project was me proving to myself I could build a production-ready, scalable app from scratch. The biggest takeaway? I now know that if (really when) I need to scale something I build in the future, I’ve already got the playbook written.",
    techStack: [
      'AWS EKS', 'Terraform', 'Kubernetes', 'Docker', 'GitHub Actions', 'IAM/VPC'
    ],
    date: '2025',
    links: [
      { name: 'GitHub', url: 'https://github.com/aravpatel19' }
    ],
    images: [],
  },
  {
    title: 'Multilingual Voice Translation App',
    description:
      "This one came from my time studying abroad. I didn’t always understand what people were saying since they spoke all kinds of languages like Spanish, German, French, and more. I’d try to speak in their language, but I’d mess up over and over. For fun, I wanted to see what it would be like if I actually sounded fluent. So I built an app that cloned my voice with ElevenLabs and used GPT for translations. It’s a pretty simple app, not gonna lie, but it was fun to make and cool to hear myself speaking different languages. To push myself further, I deployed it on Azure, which gave me a much better understanding of Azure’s services and how to actually get something running there.",
    techStack: [
      'Next.js', 'TypeScript', 'Vapi', 'Retell', 'Whisper/ASR', 'TTS'
    ],
    date: '2024',
    links: [],
    images: [],
  },
  {
    title: 'Agentic RAG Crawler',
    description:
      "This one started because I was trying to implement DeepSeek, but their documentation was super confusing at the time. Honestly, I ran into the same issue with a lot of API docs — they’d explain features but not really how to implement them into an actual app. So I figured, why not just build a chatbot for documentation that gives reliable answers? A RAG system felt like the best way to go about it.\n\nI came across crawl4ai, which can crawl an entire website (including all the subpages) as long as there’s a sitemap and a robots.txt. Most API documentation sites have that, so it worked out. Crawl4ai would go through the docs and parse everything. After that, I wrote a chunking strategy that split things into code snippets, paragraphs, and reference text so the retrieval would stay context-aware. For storage, I used Supabase with pgvector as my vector database. From there, boom — the base functionality was working. I built out a Streamlit app in Python to serve as the front end, and used Pydantic AI agents for retrieval. The cool part was that the agents would check the metadata of each chunk and grab info more intelligently than just plain semantic search.\n\nAt one point, I even tried spinning this into a startup idea (PlayGold AI). I did some client outreach and realized pretty quickly that this wasn’t a real pain point for companies. Even if they liked the idea, the ROI wasn’t high enough for them to pay for it. So I stopped pursuing it as a venture. Still, as a project, it was really fun to build and it taught me a lot about crawling, chunking, and building reliable RAG pipelines.",
    techStack: [
      'Node.js', 'Python', 'LangChain', 'Supabase', 'pgvector', 'OpenAI'
    ],
    date: '2024',
    links: [
      { name: 'GitHub', url: 'https://github.com/aravpatel19' }
    ],
    images: [],
  },
  {
    title: 'Deep Q‑Learning Tetris Agent',
    description:
      "This one was me just wanting to push myself. I thought, “okay, can I actually build an agent that learns how to play Tetris on its own?” So I built the whole thing in Python with PyTorch. First step was writing my own Tetris environment, handling piece shapes, rotations, board state, scoring, all of that. Then I boiled the game state down into four things that really mattered: lines cleared, holes, bumpiness, and total height.\n\nFor the model, I made a small Deep Q-Network with a couple of layers and ReLU activations. Nothing too crazy, but it worked. I set up replay memory, epsilon-greedy exploration, Bellman updates, and a training loop that logged to TensorBoard. I even wrote a test script so I could sit back and watch my bot play the game on its own.\n\nAt first it was awful. It stacked blocks randomly, created holes, and topped out in seconds. But once it started getting rewards for clearing lines, things clicked. Its performance shot up fast. After enough training, it was clearing over 1,000 lines, which was insane to watch. The coolest part was that it figured out strategies I never told it to, like avoiding holes and keeping the board flat.\n\nIf I go back to it, I’d probably train it longer, add in a dueling or double DQN, and maybe make a web app so anyone could watch the agent play live. But honestly, the best part was just taking reinforcement learning theory — Bellman equations, Q-values, exploration vs exploitation — and turning it into something real. Plus, it was hilarious to watch a bot get way better at Tetris than me.",
    techStack: [
      'Python', 'PyTorch', 'NumPy', 'Matplotlib'
    ],
    date: '2023',
    links: [
      { name: 'GitHub', url: 'https://github.com/aravpatel19' }
    ],
    images: [],
  },
  {
    title: 'AI Portfolio Chat (This site)',
    description:
      'An AI‑powered portfolio with function‑calling tools (projects, skills, contact), streaming responses, and a modern UI. Built with Next.js 15 and Vercel AI SDK.',
    techStack: [
      'Next.js 15', 'TypeScript', 'Vercel AI SDK', 'OpenAI', 'Tailwind', 'shadcn/ui'
    ],
    date: '2025',
    links: [
      { name: 'Website', url: 'https://aravpatel.com' },
      { name: 'GitHub', url: 'https://github.com/aravpatel19' }
    ],
    images: [
      { src: '/arav-images/no-background-ski-ghibli-smiling.png', alt: 'AI Portfolio Chat' },
    ],
  },
  {
    title: 'Career Beginnings (Client)',
    description:
      'Marketing site for Career Beginnings. I handled full build, SEO, and DNS configuration.',
    date: '2025',
    links: [
      { name: 'Website', url: 'https://career-beginnings.com/' }
    ],
    images: [
      { src: '/arav-images/career-beginnings-image.png', alt: 'Career Beginnings' },
    ],
  },
  {
    title: 'LiveCrossKeys (Client)',
    description:
      'Brochure website for LiveCrossKeys. Delivered build, SEO setup, and DNS configuration.',
    date: '2025',
    links: [
      { name: 'Website', url: 'https://livecrosskeys.com/' }
    ],
    images: [
      { src: '/arav-images/livecrosskeys-image.png', alt: 'LiveCrossKeys' },
    ],
  },
  {
    title: 'BLS Collaborative (Client)',
    description:
      'Professional site for BLS Collaborative. Led build, SEO optimization, and DNS configuration.',
    date: '2025',
    links: [
      { name: 'Website', url: 'https://blscollaborative.com/' }
    ],
    images: [
      { src: '/arav-images/bls-collaborative-image.png', alt: 'BLS Collaborative' },
    ],
  },
];

// Define interface for project prop
interface ProjectProps {
  title: string;
  description?: string;
  techStack?: string[];
  date?: string;
  links?: { name: string; url: string }[];
  images?: { src: string; alt: string }[];
}

const ProjectContent = ({ project }: { project: ProjectProps }) => {
  // Find the matching project data
  const projectData = PROJECT_CONTENT.find((p) => p.title === project.title);

  if (!projectData) {
    return <div>Project details not available</div>;
  }

  return (
    <div className="space-y-10">
      {/* Header section with description */}
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <span>{projectData.date}</span>
          </div>

          <p className="font-sans text-base leading-relaxed text-neutral-900 md:text-lg whitespace-pre-line">
            {projectData.description}
          </p>

          {/* Tech stack */}
          <div className="pt-4">
            <h3 className="mb-3 text-sm uppercase tracking-wide text-neutral-700">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {(projectData.techStack ?? []).map((tech, index) => (
                <span
                  key={index}
                  className="rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-800"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Links section */}
      {projectData.links && projectData.links.length > 0 && (
        <div className="mb-24">
          <div className="mb-4 flex items-center gap-2 px-6">
            <h3 className="text-sm tracking-wide text-neutral-700">Links</h3>
            <Link className="w-4 text-neutral-500" />
          </div>
          <Separator className="my-4" />
          <div className="space-y-3">
            {projectData.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl border border-neutral-200 bg-white p-4 text-neutral-900 shadow-sm transition-colors hover:bg-neutral-50"
              >
                <span className="capitalize">{link.name}</span>
                <ChevronRight className="h-4 w-4 text-neutral-500 transition-transform group-hover:translate-x-1" />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Images gallery */}
      {/* Images removed for opened card to keep text-focused UI */}
    </div>
  );
};

// Main data export
export const data = [
  {
    category: 'AI Systems',
    title: 'Multimodal Clinical RAG Fact-Checker',
    src: '/arav-images/clinical-fact-checker-image.png',
    content: <ProjectContent project={{ title: 'Multimodal Clinical RAG' }} />,
  },
  {
    category: 'Cloud & DevOps',
    title: 'Enterprise-Grade EKS Deployment for Node.js Application',
    src: '/arav-images/eks-terraform-image.jpg',
    content: <ProjectContent project={{ title: 'EKS Platform with Terraform' }} />,
  },
  {
    category: 'Voice & Agents',
    title: 'Multilingual Voice Translation App',
    src: '/arav-images/multilingual-image.jpg',
    content: <ProjectContent project={{ title: 'Multilingual Voice Translation App' }} />,
  },
  {
    category: 'Agents & RAG',
    title: 'Agentic RAG Crawler',
    src: '/arav-images/deepseek-image.jpg',
    content: <ProjectContent project={{ title: 'Agentic RAG Crawler' }} />,
  },
  {
    category: 'ML & RL',
    title: 'Deep Q‑Learning Tetris Agent',
    src: '/arav-images/tetris-image.jpg',
    content: <ProjectContent project={{ title: 'Deep Q‑Learning Tetris Agent' }} />,
  },
  {
    category: 'This Site',
    title: 'AI Portfolio Chat (This site)',
    src: '/arav-images/no-background-ski-ghibli-smiling.png',
    content: <ProjectContent project={{ title: 'AI Portfolio Chat (This site)' }} />,
  },
  {
    category: 'Client Projects',
    title: 'Career Beginnings (Client)',
    src: '/arav-images/career-beginnings-image.png',
    content: <ProjectContent project={{ title: 'Career Beginnings (Client)' }} />,
  },
  {
    category: 'Client Projects',
    title: 'LiveCrossKeys (Client)',
    src: '/arav-images/livecrosskeys-image.png',
    content: <ProjectContent project={{ title: 'LiveCrossKeys (Client)' }} />,
  },
  {
    category: 'Client Projects',
    title: 'BLS Collaborative (Client)',
    src: '/arav-images/bls-collaborative-image.png',
    content: <ProjectContent project={{ title: 'BLS Collaborative (Client)' }} />,
  },
];
