# Agent Instructions & Best Practices for Vue.js + NestJS Development

## 🚨 CRITICAL RULES - NEVER VIOLATE

### 1. Docker Container Management
- **NEVER** use aggressive commands like `docker stop $(docker ps -q)` or `docker rm $(docker ps -aq)`
- **ALWAYS** use targeted commands:
  ```bash
  # Stop only specific compose services
  docker-compose -f docker-compose.prod.yml down
  
  # Stop specific containers by name
  docker stop container_name
  
  # Remove specific containers by name
  docker rm container_name
  ```
- **VERIFY** what containers exist before stopping/removing
- **RESPECT** other applications' containers - they may be running important services

### 2. Port Configuration
- **NEVER** change established port configurations without explicit user permission
- **MAINTAIN** stable port assignments:
  - Frontend: 3000
  - Backend: 3001
  - PostgreSQL: 5432
  - pgAdmin: 5050
- **ALWAYS** use environment variables for port configuration in Docker Compose
- **VERIFY** port conflicts before making changes

### 3. Code Duplication Prevention
- **ALWAYS** identify and refactor duplicate code patterns
- **CREATE** reusable components for common UI elements (buttons, badges, forms, etc.)
- **USE** mapping and computed properties to avoid repetitive HTML
- **IMPLEMENT** shared utilities for common operations (date formatting, API calls, etc.)

## 🔧 Development Workflow Best Practices

### 1. Problem Investigation
- **ALWAYS** use browser tools first when debugging frontend issues:
  ```bash
  # Check console errors
  mcp_browser-tools_getConsoleErrors
  
  # Check network errors
  mcp_browser-tools_getNetworkErrors
  
  # Take screenshots to see current state
  mcp_browser-tools_takeScreenshot
  
  # Run accessibility/performance audits if needed
  mcp_browser-tools_runAccessibilityAudit
  ```

### 2. Code Changes
- **READ** the current file content before making changes
- **UNDERSTAND** the existing structure and patterns
- **MAKE** minimal, targeted changes
- **TEST** changes immediately after implementation
- **VERIFY** that changes don't break existing functionality

### 3. Error Handling
- **ALWAYS** check logs when services fail:
  ```bash
  # Check container logs
  docker logs container_name
  
  # Check service status
  docker-compose ps
  
  # Check network connectivity
  docker network inspect network_name
  ```

## 🏗️ Architecture & Design Principles

### 1. Component Structure
- **CREATE** a clear hierarchy:
  ```
  src/
  ├── components/
  │   ├── ui/           # Reusable UI components
  │   ├── layout/       # Layout components
  │   └── feature/      # Feature-specific components
  ├── views/            # Page components
  ├── types/            # TypeScript interfaces
  ├── utils/            # Utility functions
  └── config/           # Configuration files
  ```

### 2. State Management
- **USE** Vue 3 Composition API with `ref`, `computed`, `watch`
- **IMPLEMENT** proper reactivity patterns
- **AVOID** direct DOM manipulation
- **USE** proper TypeScript interfaces for all data structures

### 3. API Integration
- **CREATE** centralized API configuration
- **USE** environment variables for API endpoints
- **IMPLEMENT** proper error handling and loading states
- **AVOID** hardcoded URLs

## 🐳 Docker Best Practices

### 1. Container Lifecycle
- **ALWAYS** check running containers before making changes
- **USE** health checks for service dependencies
- **IMPLEMENT** proper service dependencies in Docker Compose
- **VERIFY** network connectivity between services

### 2. Environment Configuration
- **USE** `.env` files for configuration
- **PASS** build arguments for frontend builds
- **AVOID** hardcoded values in Dockerfiles
- **TEST** environment variable resolution

### 3. Service Dependencies
- **CONFIGURE** proper `depends_on` with health checks
- **WAIT** for services to be healthy before starting dependent services
- **USE** the same network for related services

## 🎯 Frontend Development Guidelines

### 1. Component Design
- **CREATE** small, focused components with single responsibility
- **USE** props for data input, emits for events
- **IMPLEMENT** proper TypeScript interfaces
- **AVOID** prop drilling - use provide/inject when needed

### 2. Styling
- **USE** Tailwind CSS utility classes
- **AVOID** custom CSS that conflicts with Tailwind
- **CREATE** consistent design patterns
- **IMPLEMENT** responsive design from the start

### 3. Performance
- **USE** `v-memo` for expensive computations
- **IMPLEMENT** lazy loading for routes
- **OPTIMIZE** bundle size with proper imports
- **USE** `nextTick` when DOM updates are needed

## 🔌 Backend Development Guidelines

### 1. API Design
- **FOLLOW** RESTful conventions
- **IMPLEMENT** proper validation with DTOs
- **USE** consistent error response formats
- **IMPLEMENT** proper HTTP status codes

### 2. Database
- **USE** TypeORM entities with proper relationships
- **IMPLEMENT** database migrations
- **USE** transactions for complex operations
- **IMPLEMENT** proper indexing

### 3. Security
- **VALIDATE** all inputs
- **IMPLEMENT** proper CORS configuration
- **USE** environment variables for sensitive data
- **IMPLEMENT** rate limiting for production

## 🧪 Testing & Quality Assurance

### 1. Code Quality
- **RUN** linters before committing changes
- **CHECK** TypeScript compilation
- **VERIFY** no console errors in browser
- **TEST** all user flows

### 2. Error Prevention
- **ALWAYS** handle async operations properly
- **IMPLEMENT** proper error boundaries
- **USE** TypeScript strict mode
- **VALIDATE** data at boundaries

## 📋 Pre-Change Checklist

Before making any changes, **ALWAYS** verify:

1. ✅ **Current State**: What is the current working state?
2. ✅ **Problem Definition**: What exactly needs to be fixed?
3. ✅ **Impact Assessment**: What will break if I make this change?
4. ✅ **Backup Plan**: How can I revert if something goes wrong?
5. ✅ **Testing Strategy**: How will I verify the change works?

## 🚫 Common Anti-Patterns to Avoid

- ❌ **Aggressive container management** (stopping all containers)
- ❌ **Hardcoded values** in configuration files
- ❌ **Code duplication** without refactoring
- ❌ **Port changes** without user permission
- ❌ **Breaking existing functionality** without testing
- ❌ **Ignoring error logs** when debugging
- ❌ **Making assumptions** about user requirements

## 🎯 Success Metrics

A successful development session should result in:

1. ✅ **No broken functionality** - all existing features work
2. ✅ **Clean, maintainable code** - no duplication
3. ✅ **Proper error handling** - graceful failure modes
4. ✅ **Consistent architecture** - following established patterns
5. ✅ **Working Docker setup** - all services healthy
6. ✅ **User satisfaction** - requirements met without side effects

## 🔄 Iterative Development Process

1. **ANALYZE** the current state and requirements
2. **PLAN** the changes with minimal impact
3. **IMPLEMENT** changes incrementally
4. **TEST** each change immediately
5. **VERIFY** no regressions
6. **REFACTOR** if needed for maintainability
7. **DOCUMENT** any new patterns or components

Remember: **Quality over speed, stability over novelty, user experience over technical complexity.**
