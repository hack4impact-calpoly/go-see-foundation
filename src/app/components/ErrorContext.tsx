import { createContext, useContext, useRef, useState } from "react";

// Create Context
const ErrorContext = createContext<{
  errorMessages: Set<string>;
  appendErrorMessage: (msg: string) => void;
  clearErrorMessages: () => void;
} | null>(null);

// Provider Component
export function ErrorProvider({ children }: { children: React.ReactNode }) {
  const errorMessagesRef = useRef(new Set<string>());
  const [, forceRender] = useState(0); // Only re-renders the ErrorDisplay component

  const appendErrorMessage = (msg: string) => {
    errorMessagesRef.current.add(msg);
    forceRender((prev) => prev + 1); // Only updates the error UI
  };

  const clearErrorMessages = () => {
    errorMessagesRef.current.clear();
    forceRender(0); // Updates the error UI
  };

  return (
    <ErrorContext.Provider
      value={{
        errorMessages: errorMessagesRef.current,
        appendErrorMessage,
        clearErrorMessages,
      }}
    >
      {children}
    </ErrorContext.Provider>
  );
}

// Hook to use error context
export function useErrorContext() {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useErrorContext must be used within ErrorProvider");
  }
  return context;
}
