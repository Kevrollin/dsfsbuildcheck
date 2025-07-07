import React, { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";

interface LoaderContextType {
  show: boolean;
  message?: string;
  showLoader: (message?: string) => void;
  hideLoader: () => void;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export const LoaderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState<string | undefined>(undefined);

  const showLoader = useCallback((msg?: string) => {
    setMessage(msg);
    setShow(true);
  }, []);

  const hideLoader = useCallback(() => {
    setShow(false);
    setTimeout(() => setMessage(undefined), 400); // clear message after fade out
  }, []);

  return (
    <LoaderContext.Provider value={{ show, message, showLoader, hideLoader }}>
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => {
  const context = useContext(LoaderContext);
  if (!context) throw new Error("useLoader must be used within a LoaderProvider");
  return context;
}; 