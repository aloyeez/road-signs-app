import { TranslationKeys } from './en';

export const sk: TranslationKeys = {
  // Common
  common: {
    back: 'Späť',
    continue: 'Pokračovať',
    start: 'Začať',
    close: 'Zavrieť',
    save: 'Uložiť',
    cancel: 'Zrušiť',
  },

  // Navigation
  nav: {
    home: 'Domov',
    settings: 'Nastavenia',
    about: 'O aplikácii',
  },

  // Home page
  home: {
    title: 'Majster dopravných značiek',
    subtitle: 'Ovládnite dopravné značky v Európe',
    description: 'Učte sa a precvičujte dopravné značky z rôznych krajín pomocou interaktívnych kartičiek, kvízov a opakovania.',
    selectCountry: 'Vybrať krajinu',
    startLearning: 'Začať sa učiť',
    features: {
      title: 'Prečo Majster dopravných značiek?',
      flashcards: 'Interaktívne kartičky',
      flashcardsDesc: 'Učte sa pomocou kartičiek a sledujte svoj pokrok',
      quiz: 'Kvíz s výberom odpovedí',
      quizDesc: 'Otestujte svoje znalosti náročnými kvízmi',
      trueFalse: 'Výzvy Pravda/Nepravda',
      trueFalseDesc: 'Rýchle precvičovania na upevnenie znalostí',
      progress: 'Sledovanie pokroku',
      progressDesc: 'Sledujte svoju cestu učenia a vidíte zlepšenie',
    },
  },

  // Settings page
  settings: {
    title: 'Nastavenia',
    subtitle: 'Prispôsobte si prostredie',
    appearance: 'Vzhľad',
    darkMode: 'Tmavý režim',
    darkModeDesc: 'Prepnúť tmavý režim',
    language: 'Jazyk',
    languageDesc: 'Vyberte preferovaný jazyk',
    languages: {
      en: 'Angličtina',
      cs: 'Čeština',
      sk: 'Slovenčina',
    },
    data: 'Dáta',
    resetProgress: 'Resetovať pokrok',
    resetProgressDesc: 'Vymazať všetok pokrok v učení (nemožno vrátiť späť)',
    resetConfirm: 'Naozaj chcete resetovať všetok pokrok?',
  },

  // About page
  about: {
    title: 'O aplikácii',
    subtitle: 'Informácie o tejto aplikácii',
    version: 'Verzia',
    description: 'Majster dopravných značiek je komplexný nástroj na učenie, ktorý vám pomôže ovládnuť dopravné značky z rôznych európskych krajín.',
    features: {
      title: 'Funkcie',
      feature1: 'Interaktívny systém učenia pomocou kartičiek',
      feature2: 'Rôzne typy kvízov pre pestré precvičovanie',
      feature3: 'Sledovanie pokroku a statistiky',
      feature4: 'Podpora tmavého režimu',
      feature5: 'Offline funkčnosť',
    },
    contact: 'Kontakt',
    feedback: 'Odoslať spätnú väzbu',
  },

  // Select Country page
  selectCountry: {
    title: 'Vybrať krajinu',
    subtitle: 'Vyberte krajinu a začnite sa učiť',
    czechia: 'Česko',
    slovakia: 'Slovensko',
    coming: 'Už čoskoro',
    totalSigns: 'značiek',
    categories: 'kategórií',
  },

  // Country Dashboard
  dashboard: {
    title: 'Česko',
    subtitle: 'Ovládnite české dopravné značky',
    progress: 'Váš pokrok',
    learned: 'Naučené',
    total: 'Celkom',
    learningSessions: 'Vzdelávacie moduly',
    flashcards: 'Kartičky',
    flashcardsDesc: 'Presunutím sa učte a opakujte značky',
    quiz: 'Kvízový režim',
    quizDesc: 'Otestujte svoje znalosti',
    trueFalse: 'Pravda/Nepravda',
    trueFalseDesc: 'Rýchle precvičovacie výzvy',
    browseAll: 'Prechádzať všetky značky',
    browseAllDesc: 'Zobraziť všetky dopravné značky',
  },

  // Flashcards
  flashcards: {
    title: 'Učenie značiek',
    subtitle: 'Presunutím kategorizujte',
    chooseCategory: 'Vyberte kategóriu',
    selectCategoryDesc: 'Vyberte kategóriu pre začiatok učenia',
    categories: {
      all: 'Všetko',
      warning: 'Výstražné',
      prohibition: 'Zákazové',
      mandatory: 'Príkazové',
      information: 'Informatívne',
      priority: 'Prednosť',
    },
    progress: 'Pokrok',
    remaining: 'zostáva',
    instructions: {
      left: 'Stále sa učím',
      right: 'Už viem',
    },
    tapToSee: 'Klepnite pre zobrazenie názvu',
    sessionComplete: 'Lekcia dokončená!',
    continueSession: 'Pokračovať v lekcii',
    practiceAgain: 'Cvičiť znova',
    backToMenu: 'Späť do menu',
    newSigns: 'nových',
    learnedSigns: 'naučených',
    allLearned: 'Všetkých {{count}} značiek naučených ✓',
    practiceAllHint: 'Kliknite pre opakovanie všetkých {{count}} značiek',
    cards: 'kariet',
  },

  // Quiz
  quiz: {
    title: 'Kvízový režim',
    subtitle: 'Otestujte svoje znalosti',
    chooseCategory: 'Vyberte kategóriu',
    selectCategoryDesc: 'Vyberte kategóriu pre začiatok kvízu',
    question: 'Otázka {{current}} z {{total}}',
    checkAnswer: 'Skontrolovať odpoveď',
    nextQuestion: 'Ďalšia otázka',
    correct: 'Správne!',
    incorrect: 'Nesprávne',
    theCorrectAnswer: 'Správna odpoveď je:',
    quizComplete: 'Kvíz dokončený!',
    yourScore: 'Vaše skóre',
    accuracy: 'Úspešnosť',
    tryAgain: 'Skúsiť znova',
    newQuiz: 'Nový kvíz',
  },

  // True/False
  trueFalse: {
    title: 'Pravda/Nepravda',
    subtitle: 'Rýchle výzvy',
    chooseCategory: 'Vyberte kategóriu',
    selectCategoryDesc: 'Vyberte kategóriu pre začiatok',
    question: 'Otázka {{current}} z {{total}}',
    isThisSign: 'Je táto značka:',
    true: 'Pravda',
    false: 'Nepravda',
    correct: 'Správne!',
    incorrect: 'Nesprávne!',
    challengeComplete: 'Výzva dokončená!',
    yourScore: 'Vaše skóre',
    accuracy: 'Úspešnosť',
    tryAgain: 'Skúsiť znova',
    newChallenge: 'Nová výzva',
  },

  // Signs List
  signsList: {
    title: 'Všetky značky',
    subtitle: 'Prechádzať všetky dopravné značky',
    search: 'Hľadať značky...',
    filterByCategory: 'Filtrovať podľa kategórie',
    all: 'Všetko',
    showAll: 'Zobraziť všetko',
    noResults: 'Žiadne značky nenájdené',
    tryDifferent: 'Skúste iný vyhľadávací výraz',
  },
};
