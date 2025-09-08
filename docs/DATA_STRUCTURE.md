# Data Structure & Content Management

## Overview

The portfolio manages various types of data including personal information, projects, skills, and AI responses. Data is structured in a modular way with clear separation between static content and dynamic AI-generated responses.

## Personal Information Data

### 1. Profile Information (`/components/presentation.tsx`)

**Purpose**: Personal introduction and background

```typescript
const profile = {
  name: 'Arav Patel',
  age: '21 years old',
  location: 'Paris, France',
  description: "Hey 👋 I’m Arav — AI/ML engineer and full‑stack developer. I build AI systems, cloud infra, and web products. Passionate about agents, RAG, and shipping useful tools.",
  src: '/profil-raph.png',
  fallbackSrc: 'https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3'
};
```

### 2. Contact Information (`/components/contact.tsx`)

**Purpose**: Contact details and social media links

```typescript
const contactInfo = {
  name: 'Arav Patel',
  email: 'aravpatel2319@gmail.com',
  handle: '@aravpatel',
  socials: [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/aravpatel-/',
    },
    {
      name: 'Youtube',
      url: 'https://www.youtube.com/@aravpatel',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/',
    },
    {
      name: 'Discord',
      url: 'https://discord.com/',
    },
    {
      name: 'Github',
      url: 'https://github.com/aravpatel19',
    },
    {
      name: 'X',
      url: 'https://x.com/aravpatel_',
    },
  ],
};
```

### 3. Skills Data (`/components/skills.tsx`)

**Purpose**: Technical and soft skills categorization

```typescript
const skillsData = [
  {
    category: 'Frontend Development',
    icon: <Code className="h-5 w-5" />,
    skills: [
      'HTML', 'CSS', 'JavaScript/TypeScript', 'Tailwind CSS',
      'Bootstrap', 'Next.js', 'React', 'Vercel AI SDK', 'Gsap'
    ],
    color: 'bg-blue-50 text-blue-600 border border-blue-200',
  },
  {
    category: 'Backend & Systems',
    icon: <Cpu className="h-5 w-5" />,
    skills: [
      'Unix', 'C', 'C++', 'Python', 'Typescript', 'Git', 'GitHub',
      'Docker', 'GCP', 'PostgreSQL'
    ],
    color: 'bg-emerald-50 text-emerald-600 border border-emerald-200',
  },
  {
    category: 'Design & Creative Tools',
    icon: <PenTool className="h-5 w-5" />,
    skills: ['Figma', 'Davinci Code', 'Illustrator', 'Canva', 'Keynote'],
    color: 'bg-indigo-50 text-indigo-600 border border-indigo-200',
  },
  {
    category: 'Soft Skills',
    icon: <Users className="h-5 w-5" />,
    skills: [
      'Communication', 'Problem-Solving', 'Adaptability',
      'Learning Agility', 'Teamwork', 'Creativity', 'Focus'
    ],
    color: 'bg-amber-50 text-amber-600 border border-amber-200',
  },
  {
    category: 'AI & Fullstack Engineering',
    icon: <Cpu className="h-5 w-5" />,
    skills: [
      'LLM Providers (ChatGPT, Whisper, Groq, Mistral & Claude)',
      'AI Agents', 'Prompt engineering',
      'Vector databases (Weaviate, Pinecone)',
      'RAG (Retrieval-Augmented Generation)',
      'Tool routing & calling', 'Hugging Face Transformers',
      'Vercel AI SDK', 'Supabase', 'Prisma', 'Next.js'
    ],
    color: 'bg-purple-50 text-purple-600 border border-purple-200',
  },
];
```

## Project Data Structure

### 1. Project Content (`/components/projects/Data.tsx`)

**Purpose**: Centralized project information with rich metadata

```typescript
const PROJECT_CONTENT = [
  {
    title: 'Synto',
    description: 'Synto is an AI-powered interface that transforms complex blockchain interactions into simple, natural language commands...',
    techStack: [
      'Next.js', 'TailwindCSS', 'Web3.js', 'shadcn-ui', 'TypeScript',
      'Phantom Wallet', 'OpenAI API', 'Vercel AI SDK', 'Solana Agent kit',
      'Neon', 'Prisma'
    ],
    date: '2025',
    links: [
      { name: 'website', url: 'https://synto.fun' },
      { name: 'Launch Video', url: 'https://www.youtube.com/watch?v=4QUE2KgKDUw' },
      { name: 'X', url: 'https://x.com/chainSynto' },
      // ... more links
    ],
    images: [
      { src: '/synto1.png', alt: 'Synto landing page' },
      { src: '/synto2.png', alt: 'Synto chat interface' },
      // ... more images
    ],
  },
  // ... more projects
];
```

### 2. Project Categories

**Purpose**: Organization and display structure

```typescript
export const data = [
  {
    category: 'Startup Project',
    title: 'Synto',
    src: '/syntopreview.png',
    content: <ProjectContent project={{ title: 'Synto' }} />,
  },
  {
    category: 'Fun Tool',
    title: 'Rrate',
    src: '/ratepreview.png',
    content: <ProjectContent project={{ title: 'Rrate' }} />,
  },
  {
    category: 'Hackathon Winner',
    title: 'Defai',
    src: '/defaipreview.png',
    content: <ProjectContent project={{ title: 'Defai' }} />,
  },
  // ... more projects
];
```

### 3. Project Types & Categories

- **Startup Projects**: Synto, Rrate
- **Hackathon Winners**: Defai, Fitgear
- **Business Intelligence**: Datai
- **42 Projects**: 3D Pong Game, Minishell
- **Automation**: YouBot
- **Web Development**: Old Portfolio

## AI System Data

### 1. System Prompt (`/api/chat/prompt.ts`)

**Purpose**: AI personality and behavior definition

```typescript
export const SYSTEM_PROMPT = {
  role: 'system',
  content: `
# Character: Raphaël Giraud

Act as me, Raphaël Giraud - a 21-year-old full-stack developer specializing in AI...

## Tone & Style
- Be casual, warm, and conversational - like chatting with a friend
- Use short, punchy sentences and simple language
- Include occasional French expressions (Baguette, Voilà, etc.)
- Be enthusiastic about tech, especially AI and entrepreneurship
- Show a lot of humor and personality
- End most responses with a question to keep conversation flowing
- Match the language of the user
- DON'T BREAK LINE TOO OFTEN

## Background Information
### About Me
- 21 years old (born January 8, 2004) from Montpellier, grew up in Mauguio
- Studied at 42 Paris for computer science
- Former competitive mountain biker (14th in Junior World Cup, top 10 in French Cup)
- Recent interning at LightOn AI (https://lighton.ai)
- Full-stack developer specializing in AI
- Living in Paris

### Education
- Started in sports-study program in Voiron
- General high school track with focus on math and physics
- Started a License in Computer Science as an athlete (with a special program) but dropped out
- 42 Paris for computer science (unconventional education path)
- Finished 7th in the selection pool of 42 Paris

### Professional
- Recently finished an internship at LightOn AI, working on secure, on-premise GPT solutions
- Built tools like a custom Model Context Protocol (MCP), Google Drive syncs for RAG pipelines, and deepsearch systems
- Developed AI-powered web scraping tools and enhanced Lighton's AI platform features
- Passionate about building SaaS products that combine AI + UX simplicity
- Won 3 startup hackathons, including ETH Oxford and Paris Blockchain Week, with projects like synto.fun — an AI interface to simplify Web3 operations

### Family
- Sporty family of six who love mountains
- Younger brother Paul (18) at Sciences Po Lyon
- Older sister Laetitia (25) works in environmental law consulting
- Older brother Corentin (27) is a DevOps engineer who introduced me to coding
- Father is a self-employed FIDIC expert engineer
- Mother is a PE teacher

### Skills
**Frontend Development**
- HTML, CSS, JavaScript/TypeScript, Tailwind CSS, Bootstrap, Next.js, Vercel AI SDK

**Backend & Systems**
- Unix, C, C++, Python, Git, GitHub

**Design & Creative Tools**
- Figma, Davinci Code, Canva

**Soft Skills**
- Communication, Problem-Solving, Adaptability, Learning Agility, Teamwork, Creativity, Focus

### Personal
- **Qualities:** tenacious, determined
- **Flaw:** impatient - "when I want something, I want it immediately"
- Love lasagna, pasta, and dates
- Big Olympique de Marseille (OM) fan
- Former athlete who enjoys outdoor activities
- **In 5 Years:** see myself living my best life, building a successful startup, traveling the world and be in shape for sure
- I prefer Mac (Windows is shit) and I say Pain au chocolat
- **What I'm sure 90% of people get wrong:** People think success is just luck, but it's not. You need a clear plan and be ready to work hard for a long time.
- **What kind of project would make you say 'yes' immediately?** A project where AI does 99% and I take 100% of the credit just like this portfolio ahah

## Tool Usage Guidelines
- Use AT MOST ONE TOOL per response
- **WARNING!** Keep in mind that the tool already provides a response so you don't need to repeat the information
- When showing projects, use the **getProjects** tool
- For resume, use the **getResume** tool
- For contact info, use the **getContact** tool
- For detailed background, use the **getPresentation** tool
- For skills, use the **getSkills** tool
 
- For the craziest thing use the **getCrazy** tool
- For ANY internship information, use the **getInternship** tool
`,
};
```

### 2. Function Calling Tools (`/api/chat/tools/`)

**Purpose**: Structured data retrieval for AI responses

#### Tool Response Patterns

```typescript
// Simple text response
export const getPresentation = tool({
  description: 'This tool returns a concise personal introduction of Arav Patel...',
  parameters: z.object({}),
  execute: async () => {
    return {
      presentation: "I'm Arav Patel, an AI/ML engineer focused on agents, RAG, and cloud infra..."
    };
  },
});

// Component reference response
export const getProjects = tool({
  description: "This tool will show a list of all projects made by Arav",
  parameters: z.object({}),
  execute: async () => {
    return "Here are my projects — personal builds plus client websites. See the cards below!";
  },
});
```

## Asset Management

### 1. Image Assets (`/public/`)

**Purpose**: Visual content and project screenshots

#### Profile Images

- `/profil-raph.png` - Main profile photo
- `/avatar-arav.jpg` - Alternative avatar
- `/avatar-landing.png` - Landing page avatar

#### Project Images

- `/synto1.png` through `/synto6.png` - Synto project screenshots
- `/defai1.png` through `/defai4.jpeg` - Defai project screenshots
- `/datai1.png` through `/datai4.png` - Datai project screenshots
- `/trans1.png` through `/trans6.png` - Transcendance project screenshots
- `/minishell1.png` - Minishell project screenshot
- `/youbot1.jpg`, `/youbot2.png` - YouBot project screenshots
- `/oldport1.png`, `/oldport2.png` - Old portfolio screenshots

#### Project Previews

- `/syntopreview.png` - Synto preview
- `/defaipreview.png` - Defai preview
- `/dataipreview.png` - Datai preview
- `/transcendancepreview.png` - Transcendance preview
- `/minishellpreview.png` - Minishell preview
- `/youbotpreview.png` - YouBot preview
- `/oldportfoliopreview.png` - Old portfolio preview
- `/ratepreview.png` - Rrate preview
- `/fitgearpreview.png` - Fitgear preview

#### Memoji Assets

- `/landing-memojis.png` - Static memoji for landing page
- `/final_memojis.webm` - Animated memoji video (WebM)
- `/final_memojis_ios.mp4` - Animated memoji video (MP4 for iOS)

#### Other Assets

- `/resume_giraud.pdf` - Resume PDF
- `/resume_giraud_preview.png` - Resume preview
- `/Arav_Resume_Updated_2025.pdf` - Alternative resume
- `/favicon.svg` - Site favicon
- (removed) `/logo-toukoum.svg` - Logo

### 2. Video Assets

**Purpose**: Animated content and demos

- `/final_memojis.webm` - Main memoji animation (WebM format)
- `/final_memojis_ios.mp4` - Memoji animation for iOS devices

## Metadata Structure

### 1. Page Metadata (`/app/layout.tsx`)

```typescript
export const metadata: Metadata = {
  title: "Arav Patel Portfolio",
  description: "Interactive portfolio with an AI-powered Memoji that answers questions about me, my skills, and my experience",
  keywords: [
    "Arav Patel", "Portfolio", "Developer", "AI", "Interactive",
    "Web Development", "Full Stack", "Next.js", "React"
  ],
  authors: [{ name: "Arav Patel", url: "https://aravpatel.com" }],
  creator: "Arav Patel",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aravpatel.com",
    title: "Arav Patel Portfolio",
    description: "Interactive portfolio with an AI-powered Memoji that answers questions about me",
    siteName: "Arav Patel Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arav Patel Portfolio",
    description: "Interactive portfolio with an AI-powered Memoji that answers questions about me",
    creator: "@aravpatel_",
  },
  icons: {
    icon: [{ url: "/arav-images/Arav-Logo-purple.png", sizes: "any" }],
    shortcut: "/arav-images/Arav-Logo-purple.png",
  },
};
```

## Quick Questions Data

### 1. Landing Page Questions (`/app/page.tsx`)

**Purpose**: Pre-defined conversation starters

```typescript
const questions = {
  Me: 'Who are you? I want to know more about you.',
  Projects: 'What are your projects? What are you working on right now?',
  Skills: 'What are your skills? Give me a list of your soft and hard skills.',
  Fun: 'What's the craziest thing you've ever done? What are your hobbies?',
  Contact: 'How can I contact you?',
} as const;

const questionConfig = [
  { key: 'Me', color: '#329696', icon: Laugh },
  { key: 'Projects', color: '#3E9858', icon: BriefcaseBusiness },
  { key: 'Skills', color: '#856ED9', icon: Layers },
  { key: 'Fun', color: '#B95F9D', icon: PartyPopper },
  { key: 'Contact', color: '#C19433', icon: UserRoundSearch },
] as const;
```

## Data Update Patterns

### 1. Static Content Updates

- **Profile Information**: Update `presentation.tsx` profile object
- **Contact Information**: Update `contact.tsx` contactInfo object
- **Skills**: Update `skills.tsx` skillsData array
- **Projects**: Update `Data.tsx` PROJECT_CONTENT array

### 2. AI System Updates

- **Personality**: Update `prompt.ts` SYSTEM_PROMPT content
- **Tool Responses**: Update individual tool files in `/api/chat/tools/`
- **Function Logic**: Modify tool execute functions

### 3. Asset Updates

- **Images**: Replace files in `/public/` directory
- **Videos**: Update memoji animation files
- **Documents**: Replace resume PDFs

### 4. Metadata Updates

- **SEO**: Update `layout.tsx` metadata object
- **Social Media**: Update OpenGraph and Twitter card data
- **Branding**: Update title, description, and keywords

## Data Validation

### 1. TypeScript Interfaces

```typescript
interface ProjectProps {
  title: string;
  description?: string;
  techStack?: string[];
  date?: string;
  links?: { name: string; url: string }[];
  images?: { src: string; alt: string }[];
}

interface ContactInfo {
  name: string;
  email: string;
  handle: string;
  socials: { name: string; url: string }[];
}
```

### 2. Zod Schemas

```typescript
// Tool parameter validation
parameters: z.object({
  // Define expected parameters
})
```

## Performance Considerations

### 1. Data Loading

- **Static Data**: Pre-loaded at build time
- **Dynamic Data**: Loaded on-demand via API calls
- **Asset Optimization**: Images optimized with Next.js Image component

### 2. Caching Strategy

- **Static Assets**: Cached by CDN
- **API Responses**: Cached by Vercel Edge Functions
- **Component Data**: Memoized with React hooks

### 3. Bundle Optimization

- **Code Splitting**: Dynamic imports for large components
- **Tree Shaking**: Unused code elimination
- **Asset Compression**: Optimized images and videos
