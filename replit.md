# Mathematical Calculator Suite

## Overview

This is a full-stack mathematical calculator application built with React, Express, and TypeScript. The application provides six core mathematical operations: basic arithmetic calculations, factorial computation, prime number checking, nCr (combinations) calculation, multiplication table generation, and series sum computation. The frontend features a modern UI built with shadcn/ui components and Tailwind CSS, while the backend provides validated API endpoints for all mathematical operations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, using Vite as the build tool
- **UI Components**: Built using shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming support
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation resolvers
- **Component Structure**: Modular calculator components in `/client/src/components/calculators/`

### Backend Architecture
- **Framework**: Express.js with TypeScript running in ESM mode
- **Validation**: Zod schemas for request validation in shared directory
- **API Design**: RESTful endpoints under `/api` namespace with proper HTTP status codes
- **Error Handling**: Centralized error handling middleware with structured error responses
- **Development**: Hot reload with tsx and custom logging middleware

### Data Storage Solutions
- **Database**: PostgreSQL configured with Drizzle ORM
- **Connection**: Neon serverless database adapter for production scalability
- **Schema Management**: Drizzle migrations with schema definitions in `/shared/schema.ts`
- **Current State**: Storage layer prepared but mathematical operations don't require persistent data

### Authentication and Authorization
- **Current Implementation**: No authentication system implemented
- **Session Management**: connect-pg-simple configured for future session storage
- **Security**: Basic Express security middleware with CORS considerations

### Code Organization
- **Monorepo Structure**: Shared TypeScript code between client and server
- **Path Aliases**: Configured TypeScript paths for clean imports (`@/`, `@shared/`)
- **Build System**: Separate build processes for client (Vite) and server (esbuild)
- **Type Safety**: Full TypeScript coverage with strict mode enabled

### Development Workflow
- **Local Development**: Concurrent client and server development with hot reload
- **Code Quality**: ESLint and TypeScript checking with pre-commit hooks
- **Build Process**: Production builds optimize both client bundle and server code
- **Environment**: Environment variables for database configuration and API keys

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling
- **Drizzle ORM**: Type-safe database operations with schema migrations
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### UI and Styling
- **Radix UI**: Headless component primitives for accessibility and behavior
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Lucide React**: Icon library for consistent iconography
- **Class Variance Authority**: Utility for creating variant-based component APIs

### Development and Build Tools
- **Vite**: Fast build tool with HMR for development and optimized production builds
- **esbuild**: Fast JavaScript bundler for server-side code compilation
- **TypeScript**: Static type checking across the entire codebase
- **PostCSS**: CSS processing with Tailwind and autoprefixer plugins

### Form and Data Management
- **React Hook Form**: Performant form library with minimal re-renders
- **TanStack Query**: Server state management with caching and synchronization
- **Zod**: Schema validation for both client and server-side data validation
- **date-fns**: Date manipulation library for any future date-related features