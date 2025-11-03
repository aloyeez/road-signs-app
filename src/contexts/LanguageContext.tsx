import React, { createContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'cs' | 'sk';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
});

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Load language from localStorage on init
    const saved = localStorage.getItem('app-language');
    if (saved && (saved === 'en' || saved === 'cs' || saved === 'sk')) {
      return saved as Language;
    }
    return 'en'; // Default to English
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('app-language', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
