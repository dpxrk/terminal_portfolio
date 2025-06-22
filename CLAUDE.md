# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a terminal-themed portfolio website built with Next.js that simulates a command-line interface for showcasing developer information. The entire application is client-side rendered and features an interactive, draggable terminal window.

## Common Development Commands

```bash
# Development server with Turbopack (fast refresh)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## Architecture and Code Structure

### Core Architecture Pattern
The application follows a single-page terminal simulation pattern where:
- All components are client-side rendered (`"use client"`)
- State is managed locally using React hooks
- Commands are processed through a centralized command system
- The terminal window is draggable and maintains its own position state

### Key Architectural Components

1. **Terminal System** (`src/app/hooks/useTerminal.ts`):
   - Manages terminal history and command processing
   - Processes user input and executes commands
   - Maintains command history for terminal output

2. **Command Processing** (`src/app/data/commands.ts`):
   - Defines available terminal commands
   - Each command returns JSX for rich formatting
   - Special handling for resume download via `/resume` command

3. **Component Hierarchy**:
   ```
   PersonalWebsite (main container)
   └── Draggable wrapper
       └── Terminal window
           ├── TerminalHeader (window controls)
           ├── TerminalOutput (command history display)
           └── CommandPrompt (user input)
   ```

4. **Typing Effect** (`src/app/hooks/useTypingEffect.ts`):
   - Creates typewriter animation for welcome message
   - Manages cursor blinking animation

### Important Implementation Details

- **Path Aliases**: Use `@/*` for imports from `src/*`
- **Styling**: All styling uses Tailwind CSS classes; avoid inline styles
- **State Management**: No external state libraries; use React hooks
- **File Downloads**: Resume PDF served from `public/park_daniel_resume.pdf`
- **Dynamic Shadows**: Shadow positioning calculated based on terminal window position relative to viewport center

### Command System Extension

To add new commands:
1. Add command definition in `src/app/data/commands.ts`
2. Follow existing pattern of returning JSX elements
3. Use semantic HTML and Tailwind classes for styling
4. Maintain consistent terminal aesthetic (green text on dark background)

### Development Considerations

- The project uses Next.js 15.1.7 with App Router
- React 19 is used (check for any breaking changes when updating)
- No test suite is configured; consider manual testing for command functionality
- Terminal output uses array of JSX elements for maintaining history
- Window dragging uses react-draggable library with bounds="parent"