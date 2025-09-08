'use client';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Code, Cpu, PenTool, Users } from 'lucide-react';

const Skills = () => {
  const skillsData = [
    {
      category: 'Cloud & DevOps',
      icon: <Cpu className="h-5 w-5" />,
      skills: [
        'AWS (EKS, EC2, S3, RDS, Lambda, VPC, IAM)',
        'Terraform (IaC, cost optimization, networking)',
        'Kubernetes (EKS clusters, scaling, manifests)',
        'Docker (containerization, CI/CD workflows)',
        'Jenkins, GitHub Actions (pipelines)',
        'Linux & Bash scripting',
      ],
      color: 'bg-emerald-50 text-emerald-600 border border-emerald-200',
    },
    {
      category: 'AI & LLM Infrastructure',
      icon: <Cpu className="h-5 w-5" />,
      skills: [
        'RAG & Multimodal RAG',
        'LangChain, Docling, crawl4ai, MCPs',
        'Pinecone, Milvus, Supabase (vector DBs)',
        'Agentic workflows & conversational AI',
        'Prompt engineering (few‑shot, variables)',
        'Voice AI (Vapi, Retell, AWS Transcribe)',
        'Fine‑tuning & eval, RLHF, DQN',
      ],
      color: 'bg-purple-50 text-purple-600 border border-purple-200',
    },
    {
      category: 'Machine Learning & Data',
      icon: <Cpu className="h-5 w-5" />,
      skills: [
        'PyTorch, TensorFlow, Scikit‑learn',
        'Hugging Face Transformers',
        'Random Forests & classical ML',
        'Predictive modeling (finance experiments)',
        'Pandas, Matplotlib, Power BI',
      ],
      color: 'bg-indigo-50 text-indigo-600 border border-indigo-200',
    },
    {
      category: 'Backend Engineering',
      icon: <Code className="h-5 w-5" />,
      skills: [
        'Python, Node.js, Java, FastAPI',
        'REST APIs, GraphQL basics',
        'PostgreSQL, MySQL',
        'API integrations & SDKs',
      ],
      color: 'bg-blue-50 text-blue-600 border border-blue-200',
    },
    {
      category: 'Frontend & Product',
      icon: <Code className="h-5 w-5" />,
      skills: [
        'React, Next.js, TypeScript',
        'JavaScript, HTML/CSS, Tailwind CSS',
        'Figma (prototyping, user flows)',
        'SEO & modern web design',
        'Agile (Scrum, Kanban, Jira)',
        'Client communication & discovery',
      ],
      color: 'bg-sky-50 text-sky-700 border border-sky-200',
    },
    {
      category: 'Tools & Misc',
      icon: <PenTool className="h-5 w-5" />,
      skills: [
        'Git/GitHub, GitHub CLI',
        'Docker Compose, Power BI',
        'Azure ML, Azure Web Services',
        'Stripe integration & payments',
        'Automation prototypes (Signal/Desktop)',
      ],
      color: 'bg-zinc-50 text-zinc-700 border border-zinc-200',
    },
    {
      category: 'Certifications',
      icon: <PenTool className="h-5 w-5" />,
      skills: ['Hugging Face Fundamentals of Agents (2025)'],
      color: 'bg-amber-50 text-amber-700 border border-amber-200',
    },
    {
      category: 'Soft Skills',
      icon: <Users className="h-5 w-5" />,
      skills: [
        'Problem‑solving & cost optimization',
        'Client collaboration & translation',
        'Adaptability & fast learning',
        'Team collaboration (QUEST, Fidelity, Mindgrasp)',
        'Leadership & initiative (PlayGold AI, freelancing)',
        'Communication (docs, presentations)',
        'Creativity & experimentation',
        'Cultural awareness (Madrid abroad)',
        'Time management & resilience',
      ],
      color: 'bg-rose-50 text-rose-700 border border-rose-200',
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto w-full max-w-6xl"
    >
      <div className="mb-4 flex items-end justify-between md:mb-6">
        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">Skills & Expertise</h2>
      </div>

      {/* Responsive grid of category cards */}
      <motion.div
        className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 md:gap-5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {skillsData.map((section, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="h-full overflow-hidden rounded-2xl border border-white/15 bg-white/85 p-0 shadow-sm backdrop-blur-xl">
              {/* header chip */}
              <div className="flex items-center gap-2 rounded-t-2xl bg-gradient-to-r from-cyan-500/25 via-fuchsia-500/25 to-indigo-500/25 px-4 py-2.5">
                <div className="text-primary/90">{section.icon}</div>
                <h3 className="text-sm font-semibold tracking-wide md:text-[15px]">{section.category}</h3>
              </div>
              <div className="px-4 py-3 md:py-4">
                <div className="flex w-full flex-wrap gap-1.5 md:gap-2">
                  {section.skills.map((skill, idx) => (
                    <motion.div
                      key={idx}
                      variants={badgeVariants}
                      whileHover={{ scale: 1.04, transition: { duration: 0.15 } }}
                    >
                      <Badge className="max-w-full break-words whitespace-normal border border-black/10 bg-white/95 px-3 py-1.5 text-[13px] font-medium leading-snug text-black shadow-sm">
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Skills;
