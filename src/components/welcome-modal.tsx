'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import Image from 'next/image';
// import { useRouter } from 'next/navigation'; // Router not needed here
import { useState } from 'react';

// Added a trigger prop to accept custom triggers
interface WelcomeModalProps {
  trigger?: React.ReactNode;
}

export default function WelcomeModal({ trigger }: WelcomeModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Default trigger
  const defaultTrigger = (
    <Button
      variant="ghost"
      className="h-auto w-auto cursor-pointer rounded-2xl bg-white/30 p-3 shadow-lg backdrop-blur-lg hover:bg-white/60 focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
      onClick={() => setIsOpen(true)}
    >
      <span className="text-sm font-medium md:text-base">About this site</span>
    </Button>
  );

  // Function that uses window.location to force a complete page reload
  const handleContactMe = () => {
    setIsOpen(false);
    // Force a complete page reload with the request
    window.location.href = '/chat?query=How%20can%20I%20contact%20you%3F';
  };

  const handleQuickAsk = (q: string) => {
    setIsOpen(false);
    const query = encodeURIComponent(q);
    window.location.href = `/chat?query=${query}`;
  };

  return (
    <>
      {/* Use custom trigger if provided, otherwise use default */}
      {trigger ? (
        <div onClick={() => setIsOpen(true)}>{trigger}</div>
      ) : (
        defaultTrigger
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="z-52 max-h-[85vh] overflow-auto rounded-2xl border border-neutral-200 bg-white p-0 shadow-2xl sm:max-w-[85vw] md:max-w-[80vw] lg:max-w-[980px]">
          <div className="relative">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-20 rounded-t-2xl bg-gradient-to-r from-cyan-400/10 via-fuchsia-400/10 to-indigo-400/10" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex h-full flex-col"
          >
            {/* Header */}
            <DialogHeader className="relative flex flex-row items-start justify-between px-8 pt-8 pb-4">
              <div className="flex items-center gap-3">
                <Image src="/arav-images/Arav-Logo-purple.png" alt="John logo" width={40} height={40} className="rounded-lg" />
                <div>
                  <DialogTitle className="text-3xl font-bold tracking-tight text-neutral-900">About this site</DialogTitle>
                  <DialogDescription className="mt-1 text-sm text-neutral-700">
                    A conversational portfolio by John Patel — built with Next.js, Vercel AI SDK, and OpenAI.
                  </DialogDescription>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="sticky top-0 right-0 cursor-pointer rounded-full bg-black p-2 text-white hover:bg-black/90 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-6 w-6" />
                <span className="sr-only">Close</span>
              </Button>
            </DialogHeader>

            {/* Content area */}
            <div className="space-y-6 overflow-y-auto px-2 pb-4 md:px-8">
              <section className="w-full rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-neutral-900">What this is</h3>
                    <p className="text-sm leading-relaxed text-neutral-800">
                      This is my interactive portfolio. Instead of clicking around a static site,
                      you can chat with an AI that knows my background, projects, and interests.
                      Ask anything — the model can also surface structured UI for things like
                      projects, skills, and ways to contact me.
                    </p>
                    <h3 className="mt-6 text-xl font-semibold text-neutral-900">How it works</h3>
                    <p className="text-sm leading-relaxed text-neutral-800">
                      Built with Next.js 15, React 19, Tailwind, and the Vercel AI SDK using OpenAI
                      function calling. Certain questions trigger purpose-built tools (e.g., projects,
                      contact, job opportunities) rendered as native UI components.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-neutral-900">Try these</h3>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="secondary" className="rounded-full" onClick={() => handleQuickAsk('Who is John Patel?')}>
                        Who is John?
                      </Button>
                      <Button variant="secondary" className="rounded-full" onClick={() => handleQuickAsk('Show me your projects')}>
                        Show projects
                      </Button>
                      <Button variant="secondary" className="rounded-full" onClick={() => handleQuickAsk('What are your strongest skills?')}>
                        Top skills
                      </Button>
                      <Button variant="secondary" className="rounded-full" onClick={() => handleQuickAsk('How can I contact you?')}>
                        Contact info
                      </Button>
                    </div>
                    <h3 className="mt-6 text-xl font-semibold text-neutral-900">A note from me</h3>
                    <p className="text-sm leading-relaxed text-neutral-800">
                      I hope you enjoy this site! I thought it would be fun to have a chatbot that knows me and can answer questions about me. Hopefully you find it a unique experience and a different type of portfolio site. If you have any feedback, please let me know!
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="flex flex-col items-center px-8 pt-4 pb-3 md:pb-8">
              <Button
                onClick={() => setIsOpen(false)}
                className="h-auto rounded-full px-4 py-3 shadow"
                size="sm"
              >
                Start Chatting
              </Button>
              <div
                className="mt-6 flex cursor-pointer flex-wrap gap-1 text-center text-sm"
                onClick={handleContactMe}
              >
                <p className="text-neutral-700">Want to talk about something specific?</p>
                <div className="flex cursor-pointer items-center text-blue-500 hover:underline">Contact me.</div>
              </div>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>
    </>
  );
}
