'use client';

import { motion } from 'framer-motion';
import { Award, Code, GraduationCap, Mail, MessageSquare } from 'lucide-react';
import React from 'react';

interface ChatLandingProps {
  submitQuery: (query: string) => void;
}

const ChatLanding: React.FC<ChatLandingProps> = ({ submitQuery }) => {
  // Suggested questions that the user can click on
  const suggestedQuestions = [
    { icon: <MessageSquare className="h-4 w-4" />, text: 'Who are you? I want to know more about you.' },
    { icon: <Code className="h-4 w-4" />, text: 'What are your projects? What are you working on right now?' },
    { icon: <Award className="h-4 w-4" />, text: 'What are your skills? Give me a list of your soft and hard skills.' },
    { icon: <Mail className="h-4 w-4" />, text: 'How can I reach you?' },
  ];

  // Animation variants for staggered animation
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
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.div
      className="flex w-full flex-col items-center px-4 py-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Welcome message */}
      <motion.div className="mb-8 text-center" variants={itemVariants}>
        <h2 className="mb-3 text-2xl font-semibold">
          I’m John's interactive portfolio
        </h2>
        <p className="mx-auto max-w-md text-neutral-800 drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]">
          Ask anything about my background, skills, and projects.
        </p>
      </motion.div>

      {/* Suggested questions as grid of square cards */}
      <motion.div className="grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3" variants={containerVariants}>
        {suggestedQuestions.map((q, index) => (
          <motion.button
            key={index}
            className="rounded-xl border border-neutral-200 bg-white/90 p-4 text-left text-sm text-neutral-900 shadow-sm backdrop-blur hover:bg-white"
            onClick={() => submitQuery(q.text)}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-100">
              {q.icon}
            </div>
            <div>{q.text}</div>
          </motion.button>
        ))}
        <motion.button
          className="rounded-xl border border-neutral-200 bg-white/90 p-4 text-left text-sm text-neutral-900 shadow-sm backdrop-blur hover:bg-white"
          onClick={() => window.dispatchEvent(new CustomEvent('open-helper-drawer'))}
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-100">
            <MessageSquare className="h-4 w-4" />
          </div>
          <div>More</div>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ChatLanding;
