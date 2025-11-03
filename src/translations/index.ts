import { en } from './en';
import { cs } from './cs';
import { sk } from './sk';
import { Language } from '../contexts/LanguageContext';

export const translations = {
  en,
  cs,
  sk,
};

export const getTranslation = (lang: Language) => translations[lang];
