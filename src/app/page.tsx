'use client';

import FluidCursor from '@/components/FluidCursor';
// import { Button } from '@/components/ui/button';
import WelcomeModal from '@/components/welcome-modal';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, Code, Award, Mail, CircleEllipsis, PartyPopper } from 'lucide-react';
import Image from 'next/image';
import Script from 'next/script';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

/* ---------- quick-question data ---------- */
const questions = {
  Me: 'Who are you? I want to know more about you.',
  Projects: 'What are your projects? What are you working on right now?',
  Skills: 'What are your skills? Give me a list of your soft and hard skills.',
  Fun: 'What do you do for fun? What are your hobbies?',
  Contact: 'How can I contact you?',
} as const;

// legacy side prompt config removed; using centered icon buttons instead

/* ---------- component ---------- */
export default function Home() {
  const [input, setInput] = useState('');
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();

  // Background image selection via URL param (default: ski background)
  const bgParam = searchParams?.get('bg');
  const bgSrc = bgParam === 'beach'
    ? '/arav-images/beach.jpg'
    : bgParam === 'beach2'
    ? '/arav-images/beach-2.jpg'
    : '/arav-images/morocco-background.jpg';

  const goToChat = useCallback((query: string) => {
    router.push(`/chat?query=${encodeURIComponent(query)}`);
  }, [router]);

  /* hero animations (unchanged) */
  const topElementVariants: { hidden: { opacity: number; y: number }; visible: { opacity: number; y: number; transition: { duration: number } } } = {
    hidden: { opacity: 0, y: -60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };
  const bottomElementVariants: { hidden: { opacity: number; y: number }; visible: { opacity: number; y: number; transition: { duration: number; delay: number } } } = {
    hidden: { opacity: 0, y: 80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.2 },
    },
  };

  useEffect(() => {
    // No-op: remove legacy memoji preloads (assets removed)
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pb-24 md:pb-20">
      {/* full-bleed blurred background image with soft overlay */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src={bgSrc}
          alt="Background"
          fill
          priority
          sizes="100vw"
          className="object-cover blur-[6px] brightness-90 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-200/30 to-indigo-200/20" />
      </div>
      {/* big blurred footer word */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center overflow-hidden">
        <div
          className="hidden bg-gradient-to-b from-neutral-500/10 to-neutral-100/0 bg-clip-text text-[10rem] leading-none font-black text-transparent select-none sm:block lg:text-[16rem]"
          style={{ marginBottom: '-2.5rem' }}
        >
          Arav Patel
        </div>
      </div>

      {/* GitHub button removed */}

      {/* Left badge removed */}

      {/* header */}
      <motion.div
        className="z-1 mt-12 mb-4 flex flex-col items-center text-center md:mt-2 md:mb-6"
        variants={topElementVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Moved About button elsewhere */}

        <h2 className="text-secondary-foreground mt-1 text-xl font-semibold md:text-2xl">
          Hey, I&apos;m Arav 👋
        </h2>
        <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
          Arav Patel&apos;s AI Persolio
        </h1>
      </motion.div>

      {/* About this site button (top-right) */}
      <div className="absolute right-4 top-4 z-20">
        <WelcomeModal
          trigger={
            <button className="rounded-full bg-white/30 px-4 py-2 text-sm font-medium text-black shadow-md backdrop-blur-lg transition hover:bg-white/60">
              About this site
            </button>
          }
        />
      </div>

      {/* hero flanked by side prompts (original layout) */}
      <div className="relative z-10 -mt-12 w-full md:mt-0">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
          {/* Left vertical prompts (use full prompt text) */}
          <div className="hidden flex-col items-end gap-3 md:flex">
            <button onClick={() => goToChat(questions.Me)} className="inline-flex min-w-[260px] items-center gap-2 rounded-2xl border border-white/30 bg-white/80 px-5 py-3 text-[13px] font-medium text-black shadow-md backdrop-blur-md hover:bg-white"><MessageSquare className="h-4 w-4"/> <span className="text-left">{questions.Me}</span></button>
            <button onClick={() => goToChat(questions.Projects)} className="inline-flex min-w-[260px] items-center gap-2 rounded-2xl border border-white/30 bg-white/80 px-5 py-3 text-[13px] font-medium text-black shadow-md backdrop-blur-md hover:bg-white"><Code className="h-4 w-4"/> <span className="text-left">{questions.Projects}</span></button>
            <button onClick={() => goToChat(questions.Skills)} className="inline-flex min-w-[260px] items-center gap-2 rounded-2xl border border-white/30 bg-white/80 px-5 py-3 text-[13px] font-medium text-black shadow-md backdrop-blur-md hover:bg-white"><Award className="h-4 w-4"/> <span className="text-left">{questions.Skills}</span></button>
          </div>

          {/* Hero image */}
          <div className="flex justify-center">
            <div className="relative h-72 w-auto sm:h-80 md:h-[24rem] lg:h-[28rem]">
              <Image
                src="/arav-images/no-background-ski-ghibli.png"
                alt="Arav hero"
                width={640}
                height={640}
                priority
                className="h-full w-auto object-contain"
                style={{ WebkitMaskImage: 'radial-gradient(80% 70% at 50% 50%, black 30%, transparent 100%)', maskImage: 'radial-gradient(60% 70% at 50% 50%, black 48%, transparent 100%)' }}
              />
            </div>
          </div>

          {/* Right vertical prompts (use full prompt text) */}
          <div className="hidden flex-col items-start gap-3 md:flex">
            <button onClick={() => goToChat(questions.Fun)} className="inline-flex min-w-[260px] items-center gap-2 rounded-2xl border border-white/30 bg-white/80 px-5 py-3 text-[13px] font-medium text-black shadow-md backdrop-blur-md hover:bg-white"><PartyPopper className="h-4 w-4"/> <span className="text-left">{questions.Fun}</span></button>
            <button onClick={() => goToChat(questions.Contact)} className="inline-flex min-w-[260px] items-center gap-2 rounded-2xl border border-white/30 bg-white/80 px-5 py-3 text-[13px] font-medium text-black shadow-md backdrop-blur-md hover:bg-white"><Mail className="h-4 w-4"/> <span className="text-left">{questions.Contact}</span></button>
            <button onClick={() => router.push('/chat?menu=1')} className="inline-flex min-w-[240px] items-center gap-2 rounded-2xl border border-white/30 bg-white/80 px-5 py-3 text-[13px] font-medium text-black shadow-md backdrop-blur-md hover:bg-white"><CircleEllipsis className="h-4 w-4"/> <span className="text-left">More</span></button>
          </div>
        </div>
      </div>

      {/* input only */}
      <motion.div
        variants={bottomElementVariants}
        initial="hidden"
        animate="visible"
        className="z-10 mt-2 flex w-full flex-col items-center justify-center md:px-0"
      >
        {/* Mobile quick pills for accessibility (desktop uses side prompts) */}
        <div className="mb-3 flex w-full max-w-4xl flex-wrap items-center justify-center gap-2 md:hidden">
          <button onClick={() => goToChat(questions.Me)} className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/85 px-3 py-2 text-sm font-medium text-black shadow-sm backdrop-blur-md">
            <MessageSquare className="h-4 w-4" /> Me
          </button>
          <button onClick={() => goToChat(questions.Projects)} className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/85 px-3 py-2 text-sm font-medium text-black shadow-sm backdrop-blur-md">
            <Code className="h-4 w-4" /> Projects
          </button>
          <button onClick={() => goToChat(questions.Skills)} className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/85 px-3 py-2 text-sm font-medium text-black shadow-sm backdrop-blur-md">
            <Award className="h-4 w-4" /> Skills
          </button>
          <button onClick={() => goToChat(questions.Fun)} className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/85 px-3 py-2 text-sm font-medium text-black shadow-sm backdrop-blur-md">
            <PartyPopper className="h-4 w-4" /> Fun
          </button>
          <button onClick={() => goToChat(questions.Contact)} className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/85 px-3 py-2 text-sm font-medium text-black shadow-sm backdrop-blur-md">
            <Mail className="h-4 w-4" /> Contact
          </button>
        </div>

        {/* free-form question */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (input.trim()) goToChat(input.trim());
          }}
          className="relative w-full max-w-4xl"
        >
          <div className="mx-auto flex items-center rounded-full border border-white/30 bg-white/80 py-2 pr-2 pl-5 shadow-sm backdrop-blur-md">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything…"
              className="text-md w-full border-none bg-transparent text-black placeholder:text-neutral-600 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              aria-label="Submit question"
              className="flex items-center justify-center rounded-full bg-[#0171E3] p-2 text-white shadow disabled:opacity-50"
            >
              <ArrowRight  className="h-6 w-6" />
            </button>
          </div>
        </form>
      </motion.div>
      {/* ElevenLabs Voice Widget */}
      <Script src="https://unpkg.com/@elevenlabs/convai-widget-embed" strategy="afterInteractive" />
      <div className="fixed bottom-4 right-4 z-50 md:bottom-6 md:right-6">
        {/* @ts-expect-error - custom web component provided by ElevenLabs */}
        <elevenlabs-convai
          agent-id="agent_0301k4b51fnfe15b51nf239zanc0"
          avatar-image-url="/arav-images/no-background-ski-ghibli-smiling.png"
          avatar-orb-color-1="#6DB035"
          avatar-orb-color-2="#F5CABB"
          action-text="Wanna Talk to me"
          start-call-text="Start the chat!"
          end-call-text="End"
          expand-text="Open voice chat"
          listening-text="Listening..."
          speaking-text="Arav speaking"
        />
      </div>

      <FluidCursor />
    </div>
  );
}

