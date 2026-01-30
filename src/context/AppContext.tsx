import React, { createContext, useContext, useState, ReactNode } from 'react';

// Tipos de dados
export interface UserData {
  userType: 'student' | 'instructor' | null;
  
  // Dados do Aluno
  studentData?: {
    documents?: {
      rg?: string;
      cpf?: string;
      residencia?: File | null;
      renach?: string;
      ladv?: File | null;
    };
    category?: 'A' | 'B' | 'C' | 'D' | 'E';
    transmission?: 'manual' | 'automatic';
    selectedInstructor?: any;
    scheduledClasses?: any[];
    activeClass?: {
      instructorName: string;
      startTime: Date;
      isActive: boolean;
    } | null;
  };
  
  // Dados do Instrutor
  instructorData?: {
    credentials: {
      credencial?: string;
      ear?: string;
      cnh?: string;
    };
    car: {
      model?: string;
      year?: number;
      plate?: string;
      category?: 'A' | 'B' | 'C' | 'D' | 'E';
      transmission?: 'manual' | 'automatic';
    };
    availability?: {
      weekday: string;
      startTime: string;
      endTime: string;
    }[];
    price?: number;
    activeClass?: {
      studentName: string;
      startTime: Date;
      isActive: boolean;
    } | null;
  };
}

interface AppContextType {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  currentScreen: string;
  setCurrentScreen: (screen: string) => void;
  navigationHistory: string[];
  goBack: () => void;
  resetApp: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData>({ userType: null });
  const [currentScreen, setCurrentScreenState] = useState('welcome');
  const [navigationHistory, setNavigationHistory] = useState<string[]>(['welcome']);

  const setCurrentScreen = (screen: string) => {
    setNavigationHistory(prev => [...prev, screen]);
    setCurrentScreenState(screen);
  };

  const goBack = () => {
    if (navigationHistory.length > 1) {
      const newHistory = navigationHistory.slice(0, -1);
      setNavigationHistory(newHistory);
      setCurrentScreenState(newHistory[newHistory.length - 1]);
    }
  };

  const resetApp = () => {
    setUserData({ userType: null });
    setCurrentScreenState('welcome');
    setNavigationHistory(['welcome']);
  };

  return (
    <AppContext.Provider
      value={{
        userData,
        setUserData,
        currentScreen,
        setCurrentScreen,
        navigationHistory,
        goBack,
        resetApp,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
