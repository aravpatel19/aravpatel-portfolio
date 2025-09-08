// src/components/chat/tool-renderer.tsx
import { Contact } from '../contact';
import Crazy from '../crazy';
import OpportunityCard from '../OpportunityCard';
import { Presentation } from '../presentation';
import AllProjects from '../projects/AllProjects';
import Skills from '../skills';
// import Sports from '../sport';

interface ToolRendererProps {
  toolInvocations: any[];
  messageId: string;
}

export default function ToolRenderer({
  toolInvocations,
  messageId,
}: ToolRendererProps) {
  return (
    <div className="w-full transition-all duration-300">
      {toolInvocations.map((tool) => {
        const { toolCallId, toolName } = tool;

        // Return specialized components based on tool name
        switch (toolName) {
          case 'getProjects':
            return (
              <div
                key={toolCallId}
                className="w-full overflow-hidden rounded-lg"
              >
                <AllProjects />
              </div>
            );

          case 'getPresentation':
            return (
              <div
                key={toolCallId}
                className="w-full overflow-hidden rounded-lg"
              >
                <Presentation />
              </div>
            );

          case 'getResume':
            // Fall back to default renderer so the tool's polite text is shown
            return (
              <div
                key={toolCallId}
                className="bg-secondary/10 w-full rounded-lg p-4"
              >
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-lg font-medium">Resume</h3>
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800 dark:bg-green-900 dark:text-green-100">
                    Tool Result
                  </span>
                </div>
                <div className="mt-2">
                  <p>{String(tool.result)}</p>
                </div>
              </div>
            );

          case 'getContact':
            return (
              <div key={toolCallId} className="w-full rounded-lg">
                <Contact />
                <div className="mt-3 px-2">
                  <div className="rounded-xl bg-muted/40 p-3 text-sm text-muted-foreground">
                    {typeof tool.result === 'object' ? (
                      <pre className="overflow-x-auto text-xs">
                        {JSON.stringify(tool.result, null, 2)}
                      </pre>
                    ) : (
                      <p>{String(tool.result)}</p>
                    )}
                  </div>
                </div>
              </div>
            );

          case 'getSkills':
            return (
              <div key={toolCallId} className="w-full rounded-lg">
                <Skills />
              </div>
            );

          // case 'getSports':
          //   return (
          //     <div key={toolCallId} className="w-full rounded-lg">
          //       <Sports />
          //     </div>
          //   );

          case 'getFun':
            return (
              <div key={toolCallId} className="w-full rounded-lg">
                <Crazy />
              </div>
            );

          case 'getJob':
            return (
              <div key={toolCallId} className="w-full rounded-lg">
                <OpportunityCard />
              </div>
            );

          // Default renderer for other tools
          default:
            return (
              <div
                key={toolCallId}
                className="bg-secondary/10 w-full rounded-lg p-4"
              >
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-lg font-medium">{toolName}</h3>
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800 dark:bg-green-900 dark:text-green-100">
                    Tool Result
                  </span>
                </div>
                <div className="mt-2">
                  {typeof tool.result === 'object' ? (
                    <pre className="bg-secondary/20 overflow-x-auto rounded p-3 text-sm">
                      {JSON.stringify(tool.result, null, 2)}
                    </pre>
                  ) : (
                    <p>{String(tool.result)}</p>
                  )}
                </div>
              </div>
            );
        }
      })}
    </div>
  );
}
