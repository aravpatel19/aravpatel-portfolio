'use client';
import { useChat } from '@ai-sdk/react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import FluidCursor from '@/components/FluidCursor';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { toast } from 'sonner';

// Component imports
import ChatBottombar from '@/components/chat/chat-bottombar';
import ChatLanding from '@/components/chat/chat-landing';
import { SimplifiedChatView } from '@/components/chat/simple-chat-view';
import {
  ChatBubble,
  ChatBubbleMessage,
} from '@/components/ui/chat/chat-bubble';
import WelcomeModal from '@/components/welcome-modal';
import { Info, MessageSquare, Code, Award, Mail, CircleEllipsis, PartyPopper } from 'lucide-react';
import HelperBoost from './HelperBoost';

// ClientOnly component for client-side rendering
//@ts-expect-error: client-only wrapper for hydration guard
const ClientOnly = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
};

// Define Avatar component props interface
interface AvatarProps { hasActiveTool: boolean; }

// Dynamic import of Avatar component
const Avatar = dynamic<AvatarProps>(
  () =>
    Promise.resolve(({ hasActiveTool }: AvatarProps) => {
      return (
        <div
          className={`flex items-center justify-center rounded-full transition-all duration-300 ${hasActiveTool ? 'h-20 w-20' : 'h-28 w-28'}`}
        >
          <div
            className="relative cursor-pointer"
            onClick={() => (window.location.href = '/')}
          >
            <Image
              src="/arav-images/no-background-ski-ghibli-smiling.png"
              alt="Arav avatar"
              width={320}
              height={320}
              priority
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      );
    }),
  { ssr: false }
);

// Narrow transition type to avoid Variants issues in framer-motion TS
const MOTION_CONFIG: {
  initial: { opacity: number; y: number };
  animate: { opacity: number; y: number };
  exit: { opacity: number; y: number };
  transition: { duration: number };
} = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: { duration: 0.3 },
};

const Chat = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('query');
  const [autoSubmitted, setAutoSubmitted] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [isTalking, setIsTalking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // New state to prevent duplicate submissions
  const hasLoadedHistoryRef = useRef(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const autoScrollRef = useRef(true);
  
  // Reset session chat on fresh navigation and on page hide (to avoid tab restore retaining state)
  useEffect(() => {
    try {
      const entries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      const navType = entries && entries[0] ? entries[0].type : undefined;
      if (navType && navType !== 'back_forward') {
        sessionStorage.removeItem('chatHistorySession');
      }
    } catch {
      // best effort only
    }

    const handlePageHide = () => {
      try { sessionStorage.removeItem('chatHistorySession'); } catch {}
    };
    window.addEventListener('pagehide', handlePageHide);
    return () => window.removeEventListener('pagehide', handlePageHide);
  }, []);

  // Allow ChatLanding "More" to open the drawer
  useEffect(() => {
    const handler = () => setDrawerOpen(true);
    window.addEventListener('open-helper-drawer', handler as EventListener);
    return () => window.removeEventListener('open-helper-drawer', handler as EventListener);
  }, []);
  
  // Ref to track if we've already submitted the initial query
  const hasSubmittedInitialQuery = useRef(false);

  const {
    messages,
    input,
    handleInputChange,
    isLoading,
    stop,
    setMessages,
    setInput,
    reload,
    addToolResult,
    append,
  } = useChat({
    onResponse: (response) => {
      if (response) {
        setLoadingSubmit(false);
        setIsTalking(true);
        if (videoRef.current) {
          videoRef.current.play().catch((error) => {
            console.error('Failed to play video:', error);
          });
        }
      }
    },
    onFinish: () => {
      setLoadingSubmit(false);
      setIsTalking(false);
      setIsSubmitting(false); // Reset submission state
      if (videoRef.current) {
        videoRef.current.pause();
      }
    },
    onError: (error) => {
      setLoadingSubmit(false);
      setIsTalking(false);
      setIsSubmitting(false); // Reset submission state on error
      if (videoRef.current) {
        videoRef.current.pause();
      }
      console.error('Chat error:', error.message, error.cause);
      toast.error(`Error: ${error.message}`);
    },
    onToolCall: (tool) => {
      const toolName = tool.toolCall.toolName;
      console.log('Tool call:', toolName);
    },
  });

  // Load chat history from sessionStorage (once)
  useEffect(() => {
    if (hasLoadedHistoryRef.current) return;
    try {
      // Cleanup legacy localStorage key from older versions
      try { localStorage.removeItem('chatHistory'); } catch {}
      const raw = sessionStorage.getItem('chatHistorySession');
      if (raw) {
        const persisted = JSON.parse(raw);
        if (Array.isArray(persisted) && persisted.length > 0) {
          setMessages(persisted);
        }
      }
    } catch (e) {
      console.warn('Failed to load chat history:', e);
    } finally {
      hasLoadedHistoryRef.current = true;
    }
  }, [setMessages]);

  // Persist chat history on changes (sessionStorage so it resets on tab close)
  useEffect(() => {
    try {
      sessionStorage.setItem('chatHistorySession', JSON.stringify(messages));
    } catch {
      // no-op
    }
  }, [messages]);

  // Track user intent: if user is near bottom, keep autoscroll enabled
  const handleScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const threshold = 80; // px from bottom
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    autoScrollRef.current = distanceFromBottom < threshold;
  }, []);

  // Auto-scroll to bottom when messages change (only if user hasn't scrolled away)
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    if (autoScrollRef.current) {
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  // After streaming finishes, ensure we settle at bottom if user intended autoscroll
  useEffect(() => {
    if (!isLoading) {
      const el = scrollContainerRef.current;
      if (el && autoScrollRef.current) {
        el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
      }
    }
  }, [isLoading]);

  const { currentAIMessage, latestUserMessage, hasActiveTool } = useMemo(() => {
    const latestAIMessageIndex = messages.findLastIndex(
      (m) => m.role === 'assistant'
    );
    const latestUserMessageIndex = messages.findLastIndex(
      (m) => m.role === 'user'
    );

    const result = {
      currentAIMessage:
        latestAIMessageIndex !== -1 ? messages[latestAIMessageIndex] : null,
      latestUserMessage:
        latestUserMessageIndex !== -1 ? messages[latestUserMessageIndex] : null,
      hasActiveTool: false,
    };

    if (result.currentAIMessage) {
      result.hasActiveTool =
        result.currentAIMessage.parts?.some(
          (part) =>
            part.type === 'tool-invocation' &&
            part.toolInvocation?.state === 'result'
        ) || false;
    }

    if (latestAIMessageIndex < latestUserMessageIndex) {
      result.currentAIMessage = null;
    }

    return result;
  }, [messages]);

  const isToolInProgress = messages.some(
    (m) =>
      m.role === 'assistant' &&
      m.parts?.some(
        (part) =>
          part.type === 'tool-invocation' &&
          part.toolInvocation?.state !== 'result'
      )
  );

  // Debounced submit function to prevent duplicate calls
  const submitQuery = useCallback((query: string) => {
    if (!query.trim() || isToolInProgress || isSubmitting || isLoading) {
      return;
    }
    
    setIsSubmitting(true);
    setLoadingSubmit(true);
    
    append({
      role: 'user',
      content: query,
    });
  }, [isToolInProgress, isSubmitting, isLoading, append]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.loop = true;
      videoRef.current.muted = true;
      videoRef.current.playsInline = true;
      videoRef.current.pause();
    }
  }, []);

  // Separate effect for initial query to prevent duplicate calls
  useEffect(() => {
    // Skip auto-submit if we already have persisted history
    const hasHistory = messages && messages.length > 0;
    if (hasHistory) return;
    if (initialQuery && !autoSubmitted && !isSubmitting && !isToolInProgress && !isLoading && !hasSubmittedInitialQuery.current) {
      hasSubmittedInitialQuery.current = true;
      setAutoSubmitted(true);
      setInput('');
      
      // Direct call to append instead of using submitQuery to avoid dependency issues
      setIsSubmitting(true);
      setLoadingSubmit(true);
      append({
        role: 'user',
        content: initialQuery,
      });
    }
  }, [initialQuery, autoSubmitted, isSubmitting, isToolInProgress, isLoading, append, setInput, messages]);

  useEffect(() => {
    if (videoRef.current) {
      if (isTalking) {
        videoRef.current.play().catch((error) => {
          console.error('Failed to play video:', error);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isTalking]);

  const onSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isToolInProgress || isSubmitting) return;
    submitQuery(input);
    setInput('');
  }, [input, isToolInProgress, isSubmitting, submitQuery, setInput]);

  const handleStop = useCallback(() => {
    stop();
    setLoadingSubmit(false);
    setIsTalking(false);
    setIsSubmitting(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  }, [stop]);

  // Check if this is the initial empty state (no messages)
  const isEmptyState =
    !currentAIMessage && !latestUserMessage && !loadingSubmit;

  // Calculate header height based on hasActiveTool
  const headerHeight = hasActiveTool ? 100 : 180;

  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Fluid cursor background (above image overlay, below content) */}
      <ClientOnly>
        <FluidCursor />
      </ClientOnly>
      {/* background to match landing */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src="/arav-images/morocco-background.jpg"
          alt="Background"
          priority
          fill
          sizes="100vw"
          className="object-cover blur-[12px] brightness-90 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-200/30 to-indigo-200/20" />
      </div>
      <div className="absolute top-6 right-8 z-51 flex flex-col-reverse items-center justify-center gap-1 md:flex-row">
        <WelcomeModal
          trigger={
            <div className="hover:bg-accent cursor-pointer rounded-2xl px-3 py-1.5">
              <Info className="text-accent-foreground h-8" />
            </div>
          }
        />
      </div>

      {/* Fixed Avatar Header with Gradient */}
      <div
        className="fixed top-0 right-0 left-0 z-50"
        style={{
          background:
            'linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.95) 30%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 100%)',
        }}
      >
        <div
          className={`transition-all duration-300 ease-in-out ${hasActiveTool ? 'pt-6 pb-0' : 'py-6'}`}
        >
          <div className="flex justify-center">
            <ClientOnly>
              <Avatar hasActiveTool={hasActiveTool} />
            </ClientOnly>
          </div>

          {/* Mobile compact About link */}
          <div className="mt-2 flex justify-center md:hidden">
            <WelcomeModal
              trigger={
                <button className="text-xs text-neutral-700 underline underline-offset-4 hover:text-neutral-900">
                  About this site
                </button>
              }
            />
          </div>

          {/* Removed transient latest user message under the header to avoid duplication */}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto flex h-full max-w-4xl flex-col px-2 md:px-4">
        {/* Scrollable Chat Content (threaded) */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto px-2"
          style={{ paddingTop: `${headerHeight}px` }}
          onScroll={handleScroll}
        >
          {isEmptyState ? (
            <motion.div
              key="landing"
              className="flex min-h-full items-center justify-center"
              {...MOTION_CONFIG}
            >
              <ChatLanding submitQuery={submitQuery} />
            </motion.div>
          ) : (
            <div className="flex w-full flex-col gap-3 pb-4">
              {messages.map((m, idx) => {
                const key = m.id || `msg-${idx}`;
                if (m.role === 'user') {
                  return (
                    <div key={key} className="px-4">
                      <ChatBubble variant="sent">
                        <ChatBubbleMessage>
                          <div className="whitespace-pre-wrap break-words">{m.content}</div>
                        </ChatBubbleMessage>
                      </ChatBubble>
                    </div>
                  );
                }
                if (m.role === 'assistant') {
                  return (
                    <div key={key} className="pb-1">
                      <SimplifiedChatView
                        message={m}
                        isLoading={isLoading}
                        reload={reload}
                        addToolResult={addToolResult}
                        streamLocked={isLoading && messages[messages.length-1]?.id === m.id && messages[messages.length-1]?.role === 'assistant'}
                      />
                    </div>
                  );
                }
                return null;
              })}
              {loadingSubmit && (
                <motion.div key="loading" {...MOTION_CONFIG} className="px-4 pt-2">
                  <ChatBubble variant="received">
                    <ChatBubbleMessage isLoading />
                  </ChatBubble>
                </motion.div>
              )}
            </div>
          )}
        </div>


        {/* Quick pill buttons (match home page) */}
        <div className="sticky bottom-[88px] z-40 px-2 md:px-0">
          <div className="mb-3 flex w-full max-w-4xl flex-wrap items-center justify-center gap-2 md:gap-3 mx-auto">
            <button onClick={() => submitQuery('Who are you? I want to know more about you.')} className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/80 px-4 py-2 text-sm font-medium text-black shadow-sm backdrop-blur-md hover:bg-white"><MessageSquare className="h-4 w-4"/>About Me</button>
            <button onClick={() => submitQuery('What are your projects? What are you working on right now?')} className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/80 px-4 py-2 text-sm font-medium text-black shadow-sm backdrop-blur-md hover:bg-white"><Code className="h-4 w-4"/>Projects</button>
            <button onClick={() => submitQuery('What are your skills? Give me a list of your soft and hard skills.')} className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/80 px-4 py-2 text-sm font-medium text-black shadow-sm backdrop-blur-md hover:bg-white"><Award className="h-4 w-4"/>Skills</button>
            <button onClick={() => submitQuery('What do you do for fun? What are your hobbies?')} className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/80 px-4 py-2 text-sm font-medium text-black shadow-sm backdrop-blur-md hover:bg-white"><PartyPopper className="h-4 w-4"/>Fun</button>
            <button onClick={() => submitQuery('How can I reach you?')} className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/80 px-4 py-2 text-sm font-medium text-black shadow-sm backdrop-blur-md hover:bg-white"><Mail className="h-4 w-4"/>Contact</button>
            <button onClick={() => setDrawerOpen(true)} className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/80 px-4 py-2 text-sm font-medium text-black shadow-sm backdrop-blur-md hover:bg-white"><CircleEllipsis className="h-4 w-4"/>More</button>
          </div>
        </div>

        {/* Fixed Bottom Bar - minimal, no boxy background */}
        <div className="sticky bottom-0 px-2 pt-3 md:px-0 md:pb-4">
          <div className="relative flex flex-col items-center gap-3">
            <HelperBoost submitQuery={submitQuery} setInput={setInput} controlledOpen={drawerOpen} onControlledOpenChange={setDrawerOpen} hideQuickRow={true} />
            <ChatBottombar
              input={input}
              handleInputChange={handleInputChange}
              handleSubmit={onSubmit}
              isLoading={isLoading}
              stop={handleStop}
              isToolInProgress={isToolInProgress}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
