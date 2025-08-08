# Lorcana Deck Builder - Refactored Codebase

This document outlines the refactored structure of the Lorcana Deck Builder application, which has been reorganized for better maintainability, readability, and scalability.

## 🏗️ New Directory Structure

```
src/
├── features/                    # Feature-based modules
│   ├── card-browser/           # Card browsing functionality
│   ├── deck-builder/           # Deck building functionality
│   └── search/                # Search and filtering functionality
│
├── shared/                     # Shared utilities and components
│   ├── components/             # Reusable UI components
│   ├── constants/              # Application constants
│   ├── hooks/                  # Custom React hooks
│   ├── types/                  # TypeScript type definitions
│   └── utils/                  # Utility functions
│
├── store/                      # State management (Zustand stores)
├── routes/                     # Page components
├── data/                       # Data fetching and caching
└── config/                     # Configuration files
```

## 📁 Feature-Based Organization

### Features Directory

Each feature is self-contained with its own components, hooks, and utilities:

- **`card-browser/`**: Card grid, card tiles, card details
- **`deck-builder/`**: Deck management, deck preview, deck statistics
- **`search/`**: Search functionality, filters, search results

### Shared Directory

Reusable code that can be used across multiple features:

- **`components/`**: UI components like `InkIcon`, `SearchFilters`
- **`constants/`**: Application-wide constants like ink types, card limits
- **`hooks/`**: Custom React hooks like `useResponsive`
- **`types/`**: TypeScript interfaces and types
- **`utils/`**: Helper functions for cards, decks, etc.

## 🔧 Key Improvements

### 1. **Better Type Safety**

- Centralized type definitions in `shared/types/`
- Improved interfaces with detailed JSDoc comments
- Type-safe constants and utilities

### 2. **Consistent Constants**

- **`inkTypes.ts`**: Ink type definitions and colors
- **`cardConstants.ts`**: Card-related limits and configurations
- **`uiConstants.ts`**: UI styling constants and breakpoints

### 3. **Reusable Utilities**

- **`cardUtils.ts`**: Card manipulation and validation functions
- **`deckUtils.ts`**: Deck statistics and management functions
- **`useResponsive.ts`**: Responsive design utilities

### 4. **Component Organization**

- **`InkIcon.tsx`**: Modular ink icon component with multiple variants
- **`SearchFilters.tsx`**: Refactored search and filter component
- Clear separation of concerns and responsibilities

### 5. **Improved Naming**

- Descriptive variable and function names
- Consistent naming conventions
- Clear component and file names

## 🎯 Benefits of Refactoring

### **Maintainability**

- Clear separation of concerns
- Modular architecture
- Easy to locate and modify code

### **Reusability**

- Shared components and utilities
- Consistent patterns across features
- Reduced code duplication

### **Scalability**

- Feature-based organization
- Easy to add new features
- Extensible architecture

### **Readability**

- Well-documented code
- Clear file and folder structure
- Consistent coding patterns

### **Type Safety**

- Comprehensive TypeScript types
- Better IDE support
- Reduced runtime errors

## 📋 Migration Guide

### For Developers

1. **Import Paths**: Update imports to use new shared modules

   ```typescript
   // Old
   import { getInkIcon } from "@/icons/inkIcons";

   // New
   import { InkIcon } from "@/shared/components";
   ```

2. **Constants**: Use centralized constants

   ```typescript
   // Old
   const MAX_COPIES = 4;

   // New
   import { CARD_CONSTANTS } from "@/shared/constants";
   const maxCopies = CARD_CONSTANTS.MAX_COPIES_PER_CARD;
   ```

3. **Types**: Use shared type definitions

   ```typescript
   // Old
   interface Card { ... }

   // New
   import { Card } from '@/shared/types';
   ```

4. **Utilities**: Use shared utility functions

   ```typescript
   // Old
   const isInkable = card.text.toLowerCase().includes("uninkable");

   // New
   import { isCardInkable } from "@/shared/utils";
   const isInkable = isCardInkable(card);
   ```

## 🚀 Next Steps

1. **Complete Migration**: Update all components to use new structure
2. **Add Tests**: Implement unit tests for utilities and components
3. **Documentation**: Add JSDoc comments to all functions
4. **Performance**: Optimize bundle size and loading performance
5. **Accessibility**: Improve accessibility features

## 📝 Code Standards

### **File Naming**

- Use PascalCase for components: `InkIcon.tsx`
- Use camelCase for utilities: `cardUtils.ts`
- Use kebab-case for directories: `card-browser/`

### **Component Structure**

```typescript
/**
 * Component description
 * Provides functionality for...
 */

import React from "react";
import { ComponentProps } from "./types";

interface ComponentNameProps {
  /** Prop description */
  propName: string;
}

export const ComponentName: React.FC<ComponentNameProps> = ({ propName }) => {
  // Component implementation
};
```

### **Utility Functions**

```typescript
/**
 * Function description
 * @param paramName - Parameter description
 * @returns Return value description
 */
export const functionName = (paramName: string): string => {
  // Function implementation
};
```

This refactored structure provides a solid foundation for future development and makes the codebase much more maintainable and scalable.
