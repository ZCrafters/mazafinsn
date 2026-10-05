// Global type declarations for the project

// If you need to declare React as a global namespace, it should be done like this:
// However, this is typically not needed in modern React projects with proper imports

// Instead of using 'export as namespace React' which causes the error,
// you should rely on the existing React type definitions from @types/react

// If you need custom global types, declare them here:
declare global {
  // Add any global type declarations here if needed
  interface Window {
    // Example: custom window properties
  }
}

// This makes the file a module, preventing global scope pollution
export {};