import { TranslationKeys } from './en';

export const cs: TranslationKeys = {
  // Common
  common: {
    back: 'Zpět',
    continue: 'Pokračovat',
    start: 'Začít',
    close: 'Zavřít',
    save: 'Uložit',
    cancel: 'Zrušit',
  },

  // Navigation
  nav: {
    home: 'Domů',
    settings: 'Nastavení',
    about: 'O aplikaci',
  },

  // Home page
  home: {
    title: 'Mistr dopravních značek',
    subtitle: 'Ovládněte dopravní značky v Evropě',
    description: 'Učte se a procvičujte dopravní značky z různých zemí pomocí interaktivních kartiček, kvízů a opakování.',
    selectCountry: 'Vybrat zemi',
    startLearning: 'Začít se učit',
    features: {
      title: 'Proč Mistr dopravních značek?',
      flashcards: 'Interaktivní kartičky',
      flashcardsDesc: 'Učte se pomocí kartiček a sledujte svůj pokrok',
      quiz: 'Kvíz s výběrem odpovědí',
      quizDesc: 'Otestujte své znalosti náročnými kvízy',
      trueFalse: 'Výzvy Pravda/Nepravda',
      trueFalseDesc: 'Rychlá procvičování pro upevnění znalostí',
      progress: 'Sledování pokroku',
      progressDesc: 'Sledujte svou cestu učení a vidíte zlepšení',
    },
  },

  // Settings page
  settings: {
    title: 'Nastavení',
    subtitle: 'Přizpůsobte si prostředí',
    appearance: 'Vzhled',
    darkMode: 'Tmavý režim',
    darkModeDesc: 'Přepnout tmavý režim',
    language: 'Jazyk',
    languageDesc: 'Vyberte preferovaný jazyk',
    languages: {
      en: 'Angličtina',
      cs: 'Čeština',
      sk: 'Slovenština',
    },
    data: 'Data',
    resetProgress: 'Resetovat pokrok',
    resetProgressDesc: 'Vymazat veškerý pokrok v učení (nelze vrátit zpět)',
    resetConfirm: 'Opravdu chcete resetovat veškerý pokrok?',
  },

  // About page
  about: {
    title: 'O aplikaci',
    subtitle: 'Informace o této aplikaci',
    version: 'Verze',
    description: 'Mistr dopravních značek je komplexní nástroj pro učení, který vám pomůže ovládnout dopravní značky z různých evropských zemí.',
    features: {
      title: 'Funkce',
      feature1: 'Interaktivní systém učení pomocí kartiček',
      feature2: 'Různé typy kvízů pro pestré procvičování',
      feature3: 'Sledování pokroku a statistiky',
      feature4: 'Podpora tmavého režimu',
      feature5: 'Offline funkčnost',
    },
    contact: 'Kontakt',
    feedback: 'Odeslat zpětnou vazbu',
  },

  // Select Country page
  selectCountry: {
    title: 'Vybrat zemi',
    subtitle: 'Vyberte zemi a začněte se učit',
    czechia: 'Česko',
    slovakia: 'Slovensko',
    coming: 'Již brzy',
    totalSigns: 'značek',
    categories: 'kategorií',
  },

  // Country Dashboard
  dashboard: {
    title: 'Česko',
    subtitle: 'Ovládněte české dopravní značky',
    progress: 'Váš pokrok',
    learned: 'Naučeno',
    total: 'Celkem',
    learningSessions: 'Vzdělávací moduly',
    flashcards: 'Kartičky',
    flashcardsDesc: 'Přejetím se učte a opakujte značky',
    quiz: 'Kvízový režim',
    quizDesc: 'Otestujte své znalosti',
    trueFalse: 'Pravda/Nepravda',
    trueFalseDesc: 'Rychlé procvičovací výzvy',
    browseAll: 'Procházet všechny značky',
    browseAllDesc: 'Zobrazit všechny dopravní značky',
  },

  // Flashcards
  flashcards: {
    title: 'Učení značek',
    subtitle: 'Přejetím kategorizujte',
    chooseCategory: 'Vyberte kategorii',
    selectCategoryDesc: 'Vyberte kategorii pro začátek učení',
    categories: {
      all: 'Vše',
      warning: 'Výstražné',
      prohibition: 'Zákazové',
      mandatory: 'Příkazové',
      information: 'Informativní',
      priority: 'Přednost',
    },
    progress: 'Pokrok',
    remaining: 'zbývá',
    instructions: {
      left: 'Stále se učím',
      right: 'Již umím',
    },
    tapToSee: 'Klepněte pro zobrazení názvu',
    sessionComplete: 'Lekce dokončena!',
    continueSession: 'Pokračovat v lekci',
    practiceAgain: 'Cvičit znovu',
    backToMenu: 'Zpět do menu',
    newSigns: 'nových',
    learnedSigns: 'naučených',
    allLearned: 'Všech {{count}} značek naučeno ✓',
    practiceAllHint: 'Klikněte pro opakování všech {{count}} značek',
    cards: 'karet',
  },

  // Quiz
  quiz: {
    title: 'Kvízový režim',
    subtitle: 'Otestujte své znalosti',
    chooseCategory: 'Vyberte kategorii',
    selectCategoryDesc: 'Vyberte kategorii pro začátek kvízu',
    question: 'Otázka {{current}} z {{total}}',
    checkAnswer: 'Zkontrolovat odpověď',
    nextQuestion: 'Další otázka',
    correct: 'Správně!',
    incorrect: 'Nesprávně',
    theCorrectAnswer: 'Správná odpověď je:',
    quizComplete: 'Kvíz dokončen!',
    yourScore: 'Vaše skóre',
    accuracy: 'Úspěšnost',
    tryAgain: 'Zkusit znovu',
    newQuiz: 'Nový kvíz',
  },

  // True/False
  trueFalse: {
    title: 'Pravda/Nepravda',
    subtitle: 'Rychlé výzvy',
    chooseCategory: 'Vyberte kategorii',
    selectCategoryDesc: 'Vyberte kategorii pro začátek',
    question: 'Otázka {{current}} z {{total}}',
    isThisSign: 'Je tato značka:',
    true: 'Pravda',
    false: 'Nepravda',
    correct: 'Správně!',
    incorrect: 'Nesprávně!',
    challengeComplete: 'Výzva dokončena!',
    yourScore: 'Vaše skóre',
    accuracy: 'Úspěšnost',
    tryAgain: 'Zkusit znovu',
    newChallenge: 'Nová výzva',
  },

  // Signs List
  signsList: {
    title: 'Všechny značky',
    subtitle: 'Procházet všechny dopravní značky',
    search: 'Hledat značky...',
    filterByCategory: 'Filtrovat podle kategorie',
    all: 'Vše',
    showAll: 'Zobrazit vše',
    noResults: 'Žádné značky nenalezeny',
    tryDifferent: 'Zkuste jiný vyhledávací výraz',
  },
};
