# AI Chat System Architecture

## Overview
The AI chat system is the core feature of this portfolio, providing an interactive conversational experience with an AI-powered memoji avatar. The system uses OpenAI's GPT-4o-mini model with function calling to provide structured responses.

## System Components

### 1. Chat API Route (`/api/chat/route.ts`)
**Purpose**: Main entry point for chat requests
**Key Features**:
- Handles POST requests with message history
- Integrates system prompt with user messages
- Manages function calling tools
- Provides streaming responses
- Error handling and logging

**Workflow**:
```typescript
POST /api/chat
├── Extract messages from request body
├── Prepend system prompt to messages
├── Initialize function tools
├── Call OpenAI with streaming
├── Return streaming response
└── Handle errors gracefully
```

### 2. System Prompt (`/api/chat/prompt.ts`)
**Purpose**: Defines AI personality and behavior
**Key Elements**:
- **Character Definition**: Arav Patel (AI/ML engineer)
- **Tone & Style**: Casual, warm, conversational with French expressions
- **Background Information**: Personal details, education, professional experience
- **Tool Usage Guidelines**: Instructions for function calling
- **Response Structure**: Guidelines for response format and length

**Personality Traits**:
- Enthusiastic about tech and AI
- Former competitive mountain biker
- Intern at LightOn AI
- Passionate about SaaS and entrepreneurship
- Uses casual language with occasional French expressions

### 3. Function Calling Tools (`/api/chat/tools/`)

#### Tool Architecture
Each tool follows a consistent pattern:
```typescript
export const toolName = tool({
  description: "What this tool does",
  parameters: z.object({}), // Zod schema for parameters
  execute: async () => {
    return "Tool response or data";
  },
});
```

#### Available Tools

**getPresentation.ts**
- **Purpose**: Personal introduction and background
- **Trigger**: "Who are you?" or "Tell me about yourself"
- **Response**: Concise personal introduction

**getProjects.ts**
- **Purpose**: Display project showcase
- **Trigger**: Questions about projects or work
- **Response**: Reference to project carousel component

**getSkills.ts**
- **Purpose**: Show technical and soft skills
- **Trigger**: Questions about skills or expertise
- **Response**: Reference to skills component

**getResume.ts**
- **Purpose**: Provide resume download link
- **Trigger**: Resume or CV requests
- **Response**: Download link reference

**getContact.ts**
- **Purpose**: Display contact information
- **Trigger**: Contact or communication requests
- **Response**: Contact component reference

 
- **Purpose**: Show sports background
- **Trigger**: Questions about sports or athletic background
- **Response**: Sports component reference

**getCrazy.ts**
- **Purpose**: Share interesting personal stories
- **Trigger**: Questions about hobbies or interesting experiences
- **Response**: Fun facts component reference

**getInternship.ts**
- **Purpose**: Provide internship information
- **Trigger**: Internship or job-related questions
- **Response**: Internship details

**getWeather.ts**
- **Purpose**: Get current weather information
- **Trigger**: Weather-related questions
- **Response**: Real-time weather data

## Chat Interface Components

### 1. Main Chat Component (`/components/chat/chat.tsx`)
**Key Features**:
- **useChat Hook**: Manages chat state and API calls
- **Animated Avatar**: Memoji that responds to conversation
- **Message Streaming**: Real-time response display
- **Tool Integration**: Displays tool results
- **Responsive Design**: Mobile and desktop optimized

**State Management**:
```typescript
const {
  messages,           // Chat message history
  input,             // Current input value
  handleInputChange, // Input change handler
  handleSubmit,      // Form submission
  isLoading,         // Loading state
  stop,              // Stop generation
  setMessages,       // Update messages
  setInput,          // Update input
  reload,            // Reload last response
  addToolResult,     // Add tool results
  append,            // Add new message
} = useChat({...});
```

### 2. Avatar System
**Features**:
- **Dynamic Video**: WebM/MP4 memoji animation
- **iOS Detection**: Fallback to static image for iOS devices
- **Talking State**: Avatar animates during AI responses
- **Interactive**: Click to return to landing page

**Implementation**:
```typescript
// iOS detection for video compatibility
const isIOS = () => {
  const userAgent = window.navigator.userAgent;
  const platform = window.navigator.platform;
  const maxTouchPoints = window.navigator.maxTouchPoints || 0;
  
  return /iPad|iPhone|iPod/.test(userAgent) || 
         /iPad|iPhone|iPod/.test(platform) ||
         (platform === 'MacIntel' && maxTouchPoints > 1);
};
```

### 3. Message Components
**ChatBubble**: Individual message display
**ChatMessageContent**: Message content rendering
**ToolRenderer**: Function call result display
**MessageLoading**: Loading state indicator

## Data Flow

### 1. User Input Processing
```
User Types → Input Validation → Message Append → API Call → Response Stream
```

### 2. AI Response Generation
```
System Prompt + User Message → OpenAI API → Function Call Detection → Tool Execution → Response Generation → UI Update
```

### 3. Tool Integration
```
AI Request → Tool Selection → Tool Execution → Result Integration → Response Streaming
```

## Error Handling

### 1. API Errors
- **Network Issues**: Graceful fallback with error messages
- **Rate Limiting**: User-friendly error notifications
- **Invalid Input**: Input validation and sanitization

### 2. Tool Errors
- **Tool Failures**: Fallback responses
- **Missing Data**: Default content display
- **Timeout Issues**: Loading state management

## Performance Optimizations

### 1. Streaming
- **Real-time Response**: Immediate feedback to users
- **Progressive Loading**: Content appears as generated
- **Reduced Latency**: Better perceived performance

### 2. Caching
- **Tool Results**: Cache frequently requested data
- **Avatar Assets**: Preload video and image assets
- **Component Memoization**: Prevent unnecessary re-renders

### 3. Asset Optimization
- **Video Compression**: Optimized memoji animations
- **Image Optimization**: Next.js Image component usage
- **Lazy Loading**: Defer non-critical assets

## Security Considerations

### 1. Input Sanitization
- **XSS Prevention**: Sanitize user inputs
- **Injection Attacks**: Validate message content
- **Rate Limiting**: Prevent API abuse

### 2. API Security
- **Environment Variables**: Secure API key storage
- **CORS Protection**: Restrict cross-origin requests
- **Request Validation**: Zod schema validation

## Future Enhancements

### 1. Advanced Features
- **Multi-modal Input**: Image and voice support
- **Context Memory**: Persistent conversation history
- **Custom Tools**: User-defined function calling

### 2. Performance Improvements
- **Edge Functions**: Faster API responses
- **CDN Integration**: Global asset distribution
- **Progressive Web App**: Offline capabilities

### 3. User Experience
- **Voice Interface**: Speech-to-text integration
- **Emotion Detection**: Avatar mood changes
- **Personalization**: User preference learning
