import React, { createContext, useContext, useEffect, useState } from 'react';
import { initDatabase } from '../services/DB';

type DbContextType = {
    isLoading: boolean;
    isInitialized: boolean;
    error: string | null;
  };

  const DbContext = createContext<DbContextType>({
    isLoading: true,
    isInitialized: false,
    error: null,
  });

  export const useDatabaseContext = () => useContext(DbContext);

  export const DbProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isInitialized, setIsInitialized] = useState(false);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
      const initialize = async () => {
        try {
          await initDatabase();
          setIsInitialized(true);
          setError(null);
        } catch (err) {
          console.error('Failed to initialize database:', err);
          setError('Failed to initialize database. Please refresh the page and try again.');
        } finally {
          setIsLoading(false);
        }
      };
      initialize();
    }, []);

    return (
        <DbContext.Provider value={{ isLoading, isInitialized, error }}>
          {children}
        </DbContext.Provider>
      );
    };