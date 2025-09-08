import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';
import { motion } from 'framer-motion';
import { BriefcaseBusiness, ChevronDown, ChevronRight, ChevronUp, CircleEllipsis, Laugh, Layers, PartyPopper, UserRoundSearch } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Drawer } from 'vaul';

interface HelperBoostProps {
  submitQuery?: (query: string) => void;
  setInput?: (value: string) => void;
  controlledOpen?: boolean;
  onControlledOpenChange?: (open: boolean) => void;
  hideQuickRow?: boolean;
}

const questions = {
  Me: 'Who are you? I want to know more about you.',
  Projects: 'What are your projects? What are you working on right now?',
  Skills: 'What are your skills? Give me a list of your soft and hard skills.',
  Fun: "What do you do for fun? What are your hobbies?",
  Contact:
    'How can I reach you?',
};

const questionConfig = [
  { key: 'Me', color: '#329696', icon: Laugh },
  { key: 'Projects', color: '#3E9858', icon: BriefcaseBusiness },
  { key: 'Skills', color: '#856ED9', icon: Layers },
  { key: 'Fun', color: '#B95F9D', icon: PartyPopper },
  { key: 'Contact', color: '#C19433', icon: UserRoundSearch },
];

// Drawer questions are now sourced dynamically from /api/qa (docs/Q&A.md)

type RemoteSection = { id: string; name: string; questions: string[] };

// Animated Chevron component
const AnimatedChevron = () => {
  return (
    <motion.div
      animate={{
        y: [0, -4, 0], // Subtle up and down motion
      }}
      transition={{
        duration: 1.5,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'loop',
      }}
      className="text-primary mb-1.5"
    >
      <ChevronUp size={16} />
    </motion.div>
  );
};

// Canned answers removed; questions now mirror the system prompt exclusively

export default function HelperBoost({ submitQuery, controlledOpen, onControlledOpenChange, hideQuickRow }: HelperBoostProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [open, setOpen] = useState(false);
  const [sections, setSections] = useState<RemoteSection[]>([]);

  // Load sections from the system prompt Q&A via API
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/qa');
        if (!res.ok) return;
        const data = (await res.json()) as { sections: RemoteSection[] };
        setSections(data.sections || []);
      } catch {
        // no-op
      }
    };
    load();
  }, []);

  // Refresh when the drawer opens to reflect any prompt edits without a full page reload
  useEffect(() => {
    const effOpen = controlledOpen ?? open;
    if (!effOpen) return;
    (async () => {
      try {
        const res = await fetch('/api/qa', { cache: 'no-store' });
        if (!res.ok) return;
        const data = (await res.json()) as { sections: RemoteSection[] };
        setSections(data.sections || []);
      } catch {
        // no-op
      }
    })();
  }, [open, controlledOpen]);

  const handleQuestionClick = (questionKey: string) => {
    if (submitQuery) {
      submitQuery(questions[questionKey as keyof typeof questions]);
    }
  };

  const handleDrawerQuestionClick = (question: string) => {
    if (submitQuery) {
      // Submit plain question; system prompt now includes curated Q&A
      submitQuery(question);
    }
    setOpen(false);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <Drawer.Root open={controlledOpen ?? open} onOpenChange={(v)=>{ setOpen(v); onControlledOpenChange?.(v); }}>
        <div className="w-full">
          {!hideQuickRow && (
            <div
              className={
                isVisible
                  ? 'mb-2 flex justify-center'
                  : 'mb-0 flex justify-center'
              }
            >
              <button
                onClick={toggleVisibility}
                className="flex items-center gap-1 px-3 py-1 text-xs text-gray-500 transition-colors hover:text-gray-700"
              >
                {isVisible ? (
                  <>
                    <ChevronDown size={14} />
                    Hide quick questions
                  </>
                ) : (
                  <>
                    <ChevronUp size={14} />
                    Show quick questions
                  </>
                )}
              </button>
            </div>
          )}

          {/* HelperBoost Content */}
          {(!hideQuickRow && isVisible) && (
            <div className="w-full">
              <div
                className="flex w-full flex-wrap gap-1 md:gap-3"
                style={{ justifyContent: 'safe center' }}
              >
                {questionConfig.map(({ key, color, icon: Icon }) => (
                  <Button
                    key={key}
                    onClick={() => handleQuestionClick(key)}
                    variant="outline"
                    className="h-auto min-w-[100px] flex-shrink-0 cursor-pointer rounded-xl border border-neutral-200 bg-white px-4 py-3 shadow-none transition-none active:scale-95 hover:bg-white"
                  >
                    <div className="flex items-center gap-3 text-gray-700">
                      <Icon size={18} strokeWidth={2} color={color} />
                      <span className="text-sm font-medium">{key}</span>
                    </div>
                  </Button>
                ))}

                {/* Need Inspiration Button */}
                <TooltipProvider>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <Drawer.Trigger className="group relative flex flex-shrink-0 items-center justify-center">
                        <motion.div
                          className="flex h-auto cursor-pointer items-center space-x-1 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm transition-all duration-200 hover:bg-white"
                          whileHover={{ scale: 1 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center gap-3 text-gray-700">
                            <CircleEllipsis
                              className="h-[20px] w-[18px]"
                              //style={{ color: '#3B82F6' }}
                              strokeWidth={2}
                            />
                            {/*<span className="text-sm font-medium">More</span>*/}
                          </div>
                        </motion.div>
                      </Drawer.Trigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <AnimatedChevron />
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Content */}
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-100 bg-black/30 backdrop-blur-sm" />
          <Drawer.Content className="fixed right-0 bottom-0 left-0 z-100 mt-24 flex h-[80%] flex-col rounded-t-2xl bg-white outline-none shadow-2xl lg:h-[60%]">
            <div className="flex-1 overflow-y-auto rounded-t-2xl bg-white px-5 py-6">
              <div className="mx-auto w-full max-w-2xl space-y-4">
                <div
                  aria-hidden
                  className="mx-auto mb-6 h-1.5 w-12 flex-shrink-0 rounded-full bg-neutral-300"
                />
                <div className="mx-auto w-full">
                  <div className="space-y-8 pb-20">
                    {(sections.length ? sections : []).map((category) => (
                      <CategorySection
                        key={category.id}
                        name={category.name}
                        Icon={UserRoundSearch}
                        questions={category.questions}
                        onQuestionClick={handleDrawerQuestionClick}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
}

// Component for each category section
interface CategorySectionProps {
  name: string;
  Icon: React.ElementType;
  questions: string[];
  onQuestionClick: (question: string) => void;
}

function CategorySection({ name, Icon, questions, onQuestionClick }: CategorySectionProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2.5 px-1">
        <Icon className="h-5 w-5" />
        <Drawer.Title className="text-[22px] font-medium text-gray-900">
          {name}
        </Drawer.Title>
      </div>

      <Separator className="my-4" />

      <div className="space-y-3">
        {questions.map((question, index) => (
          <QuestionItem
            key={index}
            question={question}
            onClick={() => onQuestionClick(question)}
          />
        ))}
      </div>
    </div>
  );
}

// Component for each question item with animated chevron
interface QuestionItemProps {
  question: string;
  onClick: () => void;
}

function QuestionItem({ question, onClick }: QuestionItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      className={cn(
        'flex w-full items-center justify-between rounded-xl',
        'text-[15px] px-5 py-4 text-left font-medium',
        'transition-all shadow-sm border border-neutral-200',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
        'bg-white hover:bg-neutral-50 text-neutral-900'
      )}
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        backgroundColor: '#f6f7f8',
      }}
      whileTap={{
        scale: 0.98,
        backgroundColor: '#eef0f2',
      }}
    >
      <div className="flex items-center">
        <span>{question}</span>
      </div>
      <motion.div
        animate={{ x: isHovered ? 4 : 0 }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 25,
        }}
      >
        <ChevronRight className={cn('h-5 w-5 shrink-0', 'text-primary')} />
      </motion.div>
    </motion.button>
  );
}
