import { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import { getTranslation } from '../translations';

export const useTranslation = () => {
  const { language, setLanguage } = useContext(LanguageContext);
  const translations = getTranslation(language);

  // Simple template string replacement for {{variable}} patterns
  const t = (key: string, params?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let value: any = translations;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }

    if (typeof value !== 'string') {
      console.warn(`Translation value is not a string: ${key}`);
      return key;
    }

    // Replace template variables like {{count}}, {{current}}, etc.
    if (params) {
      return value.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
        return params[paramKey] !== undefined ? String(params[paramKey]) : match;
      });
    }

    return value;
  };

  return {
    t,
    language,
    setLanguage,
  };
};
