# Portfolio Update Plan for Arav Patel

## Overview
This document outlines a comprehensive plan to transform Arav's AI portfolio while maintaining the innovative AI-powered chat functionality and modern UI design.

## Phase 1: Foundation Updates (Priority: High)

### 1.1 Personal Information Updates
**Files to Update:**
- `/src/components/presentation.tsx`
- `/src/components/contact.tsx`
- `/src/app/layout.tsx` (metadata)

**Changes Required:**
```typescript
// Update profile information
const profile = {
  name: 'Arav Patel'
  age: 'Your age', // Update with your age
  location: 'Your location', // Update with your location
  description: "Hey 👋\nI'm Arav...", // Rewrite with your introduction
  src: '/your-profile-photo.png', // Replace with your photo
  fallbackSrc: 'your-fallback-image-url'
};

// Update contact information
const contactInfo = {
  name: 'Arav Patel',
  email: 'your-email@example.com',
  handle: '@your-handle',
  socials: [
    { name: 'LinkedIn', url: 'https://linkedin.com/in/your-profile' },
    { name: 'Github', url: 'https://github.com/your-username' },
    // Add/remove social links as needed
  ]
};
```

### 1.2 Metadata Updates
**File:** `/src/app/layout.tsx`
```typescript
export const metadata: Metadata = {
  title: "Arav Patel Portfolio"
  description: "Interactive portfolio with an AI-powered Memoji that answers questions about Arav Patel, his skills, and his experience",
  keywords: [
    "Arav Patel", "Portfolio", "Developer", "AI", "Interactive", "Memoji",
    "Web Development", "Full Stack", "Next.js", "React"
  ],
  authors: [{ name: "Arav Patel", url: "https://your-domain.com" }],
  creator: "Arav Patel",
  openGraph: {
    // Update all OpenGraph data
    title: "Arav Patel Portfolio",
    description: "Interactive portfolio with an AI-powered Memoji that answers questions about Arav Patel",
    siteName: "Arav Patel Portfolio",
  },
  twitter: {
    // Update Twitter card data
    title: "Arav Patel Portfolio",
    description: "Interactive portfolio with an AI-powered Memoji that answers questions about Arav Patel",
    creator: "@your-twitter-handle",
  }
};
```

### 1.3 Asset Replacements
**Files to Replace:**
- `/public/profil-raph.png` → Your profile photo
- `/public/avatar-arav.jpg` → Your avatar (already exists)
- `/public/avatar-landing.png` → Your landing page avatar
- `/public/resume_giraud.pdf` → Your resume PDF
- `/public/Arav_Resume_Updated_2025.pdf` → Your updated resume (already exists)

## Phase 2: AI System Updates (Priority: High)

### 2.1 System Prompt Rewrite
**File:** `/src/app/api/chat/prompt.ts`
**Complete Rewrite Required:**
```typescript
export const SYSTEM_PROMPT = {
  role: 'system',
  content: `
# Character: Arav Patel

Act as me, Arav Patel - [Your age]-year-old [Your role] specializing in [Your specialization]. You're embodying my memoji avatar to create an interactive portfolio experience.

## Tone & Style
- Be casual, warm, and conversational - like chatting with a friend
- Use short, punchy sentences and simple language
- Include occasional [Your cultural expressions] if applicable
- Be enthusiastic about tech, especially [Your interests]
- Show a lot of humor and personality
- End most responses with a question to keep conversation flowing
- Match the language of the user

## Background Information

### About Me
- [Your age] years old from [Your birthplace], grew up in [Your hometown]
- Studied at [Your school/university] for [Your field]
- [Your background/experience]
- [Your current role/position]
- [Your specialization/interests]
- Living in [Your current location]

### Education
- [Your educational background]
- [Your academic achievements]
- [Your learning journey]

### Professional
- [Your work experience]
- [Your achievements]
- [Your projects and contributions]
- [Your career goals]

### Skills
**Frontend Development**
- [Your frontend skills]

**Backend & Systems**
- [Your backend skills]

**Design & Creative Tools**
- [Your design tools]

**Soft Skills**
- [Your soft skills]

### Personal
- **Qualities:** [Your key qualities]
- **Interests:** [Your hobbies and interests]
- [Your personal preferences]
- [Your future goals]

## Tool Usage Guidelines
- Use AT MOST ONE TOOL per response
- **WARNING!** Keep in mind that the tool already provides a response so you don't need to repeat the information
- When showing projects, use the **getProjects** tool
- For resume, use the **getResume** tool
- For contact info, use the **getContact** tool
- For detailed background, use the **getPresentation** tool
- For skills, use the **getSkills** tool
 
- For the craziest thing use the **getCrazy** tool
- For ANY [your relevant info], use the **getInternship** tool (rename if needed)
`,
};
```

### 2.2 Tool Response Updates
**Files to Update:** All files in `/src/app/api/chat/tools/`

**getPresentation.ts:**
```typescript
export const getPresentation = tool({
  description: 'This tool returns a concise personal introduction of Arav Patel...',
  parameters: z.object({}),
  execute: async () => {
    return {
      presentation: "I'm Arav Patel, a [your age]-year-old [your role] specializing in [your specialization]...",
    };
  },
});
```

**getContact.ts:**
```typescript
export const getContact = tool({
  description: 'This tool shows Arav Patel\'s contact information.',
  parameters: z.object({}),
  execute: async () => {
    return "Here is my contact information above, Feel free to contact me I will be happy to answer you 😉";
  },
});
```

**Other tools:** Ensure all tool descriptions and responses reference "Arav Patel"

## Phase 3: Content Updates (Priority: Medium)

### 3.1 Skills Update
**File:** `/src/components/skills.tsx`
**Update Required:**
```typescript
const skillsData = [
  {
    category: 'Frontend Development',
    icon: <Code className="h-5 w-5" />,
    skills: [
      // Replace with your frontend skills
    ],
    color: 'bg-blue-50 text-blue-600 border border-blue-200',
  },
  {
    category: 'Backend & Systems',
    icon: <Cpu className="h-5 w-5" />,
    skills: [
      // Replace with your backend skills
    ],
    color: 'bg-emerald-50 text-emerald-600 border border-emerald-200',
  },
  // Update all skill categories with your actual skills
];
```

### 3.2 Projects Update
**File:** `/src/components/projects/Data.tsx`
**Complete Rewrite Required:**
```typescript
const PROJECT_CONTENT = [
  {
    title: 'Your Project Name',
    description: 'Your project description...',
    techStack: [
      // Your project tech stack
    ],
    date: '2024',
    links: [
      { name: 'website', url: 'https://your-project.com' },
      { name: 'github', url: 'https://github.com/your-username/project' },
      // Add your project links
    ],
    images: [
      { src: '/your-project1.png', alt: 'Your project screenshot' },
      // Add your project images
    ],
  },
  // Add all your projects
];

export const data = [
  {
    category: 'Your Category',
    title: 'Your Project',
    src: '/your-project-preview.png',
    content: <ProjectContent project={{ title: 'Your Project' }} />,
  },
  // Add all your projects with appropriate categories
];
```

### 3.3 Project Assets
**Replace All Project Images:**
- Upload your project screenshots to `/public/`
- Update image references in `Data.tsx`
- Create project preview images
- Ensure all image paths are correct

## Phase 4: UI Customization (Priority: Medium)

### 4.1 Landing Page Updates
**File:** `/src/app/page.tsx`
**Updates Required:**
```typescript
// Update the hero section
<h2 className="text-secondary-foreground mt-1 text-xl font-semibold md:text-2xl">
  Hey, I'm Arav 👋
</h2>

// Update the footer text
<div className="hidden bg-gradient-to-b from-neutral-500/10 to-neutral-500/0 bg-clip-text text-[10rem] leading-none font-black text-transparent select-none sm:block lg:text-[16rem]">
  Arav
</div>

// Update GitHub button
<GithubButton
  repoUrl="https://github.com/your-username/portfolio" // Update with your repo
/>
```

### 4.2 Quick Questions Update
**File:** `/src/app/page.tsx`
**Update Questions:**
```typescript
const questions = {
  Me: 'Who are you? I want to know more about you.',
  Projects: 'What are your projects? What are you working on right now?',
  Skills: 'What are your skills? Give me a list of your soft and hard skills.',
  Fun: 'What's the most interesting thing you've worked on? What are your hobbies?', // Customize
  Contact: 'How can I contact you?',
} as const;
```

### 4.3 Component Updates
**Files to Update:**
- `/src/components/sport.tsx` → Rename to match your interests (e.g., `interests.tsx`)
- `/src/components/crazy.tsx` → Update with your interesting stories
- `/src/components/resume.tsx` → Update with your resume information

## Phase 5: Advanced Customizations (Priority: Low)

### 5.1 Memoji Avatar
**Considerations:**
- Create your own memoji avatar
- Replace `/public/landing-memojis.png`
- Replace `/public/final_memojis.webm`
- Replace `/public/final_memojis_ios.mp4`

### 5.2 Color Scheme
**Optional Updates:**
- Update brand colors in Tailwind config
- Modify component color schemes
- Update question button colors

### 5.3 Additional Features
**Potential Additions:**
- Add new AI tools for your specific needs
- Create new content components
- Add additional project categories
- Implement new UI effects

## Phase 6: Testing & Deployment (Priority: High)

### 6.1 Testing Checklist
- [ ] All personal information updated
- [ ] AI responses work correctly
- [ ] All links are functional
- [ ] Images load properly
- [ ] Mobile responsiveness maintained
- [ ] Chat functionality works
- [ ] All projects display correctly
- [ ] Contact information is accurate

### 6.2 Deployment Updates
- [ ] Update environment variables
- [ ] Configure custom domain
- [ ] Update deployment settings
- [ ] Test production build

## Implementation Order

### Week 1: Foundation
1. Update personal information in components
2. Replace profile images and resume
3. Update metadata and SEO information

### Week 2: AI System
1. Rewrite system prompt with your information
2. Update all AI tool responses
3. Test chat functionality

### Week 3: Content
1. Update skills with your expertise
2. Replace projects with your work
3. Update project images and assets

### Week 4: Polish & Deploy
1. Test all functionality
2. Fix any issues
3. Deploy to production

## Important Notes

### Content Guidelines
- Maintain the casual, friendly tone
- Keep responses concise and engaging
- Ensure all information is accurate and up-to-date
- Test AI responses thoroughly

### Technical Considerations
- Backup original files before making changes
- Test changes incrementally
- Maintain responsive design
- Preserve animation and interaction quality

### SEO & Branding
- Update all meta tags and descriptions
- Ensure consistent branding throughout
- Update social media links
- Configure analytics if needed

## Files Summary

### High Priority Updates
- `/src/components/presentation.tsx`
- `/src/components/contact.tsx`
- `/src/app/layout.tsx`
- `/src/app/api/chat/prompt.ts`
- `/src/app/api/chat/tools/*`
- `/src/components/skills.tsx`
- `/src/components/projects/Data.tsx`

### Medium Priority Updates
- `/src/app/page.tsx`
- `/src/components/sport.tsx`
- `/src/components/crazy.tsx`
- `/src/components/resume.tsx`

### Asset Replacements
- All images in `/public/`
- Resume PDFs
- Memoji assets (optional)

This plan provides a comprehensive roadmap for your portfolio while maintaining the innovative AI-powered features and modern design.
