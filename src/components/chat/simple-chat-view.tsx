'use client';

import {
  ChatBubble,
  ChatBubbleMessage,
} from '@/components/ui/chat/chat-bubble';
import { ChatRequestOptions } from 'ai';
import { Message } from 'ai/react';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import ChatMessageContent from './chat-message-content';
import ToolRenderer from './tool-renderer';

interface SimplifiedChatViewProps {
  message: Message;
  isLoading: boolean;
  reload: (
    chatRequestOptions?: ChatRequestOptions
  ) => Promise<string | null | undefined>;
  addToolResult?: (args: { toolCallId: string; result: string }) => void;
  streamLocked?: boolean; // when true, delay tool UI until stream finishes for this message
}

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

export function SimplifiedChatView({
  message,
  isLoading,
  reload,
  addToolResult,
  streamLocked,
}: SimplifiedChatViewProps) {
  // Hooks must be declared before any early returns
  const [streamComplete, setStreamComplete] = useState(false);
  const isAssistant = message.role === 'assistant';

  // Extract tool invocations that are in "result" state
  const toolInvocations =
    message.parts
      ?.filter(
        (part) =>
          part.type === 'tool-invocation' &&
          part.toolInvocation?.state === 'result'
      )
      .map((part) =>
        part.type === 'tool-invocation' ? part.toolInvocation : null
      )
      .filter(Boolean) || [];

  // Only display the first tool (if any)
  const currentTool = toolInvocations.length > 0 ? [toolInvocations[0]] : [];
  const currentToolName = currentTool.length > 0 ? (currentTool[0] as { toolName: string }).toolName : undefined;
  // Keep detection for possible future use
  // const isQA = currentToolName === 'getQA';

  const hasTextContent = message.content.trim().length > 0;
  // Normalize contact copy to avoid placeholder text and ensure it references the card below
  if (currentToolName === 'getContact') {
    message.content = 'Here are my contact details — see the card below. Feel free to reach out, I’ll be happy to respond. 😉';
  }
  const hasTools = currentTool.length > 0;
  const isFinalAssistant = isLoading && message.id === undefined ? false : true;

  useEffect(() => {
    // reset when message changes or new streaming starts
    setStreamComplete(false);
  }, [message.id, message.content]);

  return (
    <motion.div {...MOTION_CONFIG} className="flex h-full w-full flex-col px-4">
      {/* Single scrollable container for both text and tool content */}
      <div className="custom-scrollbar flex h-full w-full flex-col overflow-y-auto">
        {/* Text content first */}
        {isAssistant && hasTextContent && (
          <div className="w-full">
            <ChatBubble variant="received" className="w-full">
              <ChatBubbleMessage className="w-full">
                <ChatMessageContent
                  message={message}
                  isLast={true}
                  isLoading={isLoading}
                  reload={reload}
                  addToolResult={addToolResult}
                  skipToolRendering={true}
                  onStreamComplete={() => setStreamComplete(true)}
                />
              </ChatBubbleMessage>
            </ChatBubble>
          </div>
        )}

        {/* Tool invocation result - display only when not streaming and for finalized assistant message */}
        {isAssistant && hasTools && streamComplete && !streamLocked && isFinalAssistant && currentToolName !== 'getQA' && (
          <div className="mt-4 w-full">
            <ToolRenderer
              toolInvocations={currentTool}
              messageId={message.id || 'current-msg'}
            />
          </div>
        )}

        {/* Add some padding at the bottom for better scrolling experience */}
        <div className="pb-4"></div>
      </div>
    </motion.div>
  );
}
