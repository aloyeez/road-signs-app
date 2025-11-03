export const en = {
  // Common
  common: {
    back: 'Back',
    continue: 'Continue',
    start: 'Start',
    close: 'Close',
    save: 'Save',
    cancel: 'Cancel',
  },

  // Navigation
  nav: {
    home: 'Home',
    settings: 'Settings',
    about: 'About',
  },

  // Home page
  home: {
    title: 'Road Signs Master',
    subtitle: 'Master road signs across Europe',
    description: 'Learn and practice road signs from different countries with interactive flashcards, quizzes, and spaced repetition.',
    selectCountry: 'Select Country',
    startLearning: 'Start Learning',
    features: {
      title: 'Why Road Signs Master?',
      flashcards: 'Interactive Flashcards',
      flashcardsDesc: 'Learn with swipeable flashcards and track your progress',
      quiz: 'Multiple Choice Quiz',
      quizDesc: 'Test your knowledge with challenging quizzes',
      trueFalse: 'True/False Challenges',
      trueFalseDesc: 'Quick practice sessions to reinforce learning',
      progress: 'Track Progress',
      progressDesc: 'Monitor your learning journey and see improvements',
    },
  },

  // Settings page
  settings: {
    title: 'Settings',
    subtitle: 'Customize your experience',
    appearance: 'Appearance',
    darkMode: 'Dark Mode',
    darkModeDesc: 'Toggle dark mode theme',
    language: 'Language',
    languageDesc: 'Choose your preferred language',
    languages: {
      en: 'English',
      cs: 'Czech',
      sk: 'Slovak',
    },
    data: 'Data',
    resetProgress: 'Reset Progress',
    resetProgressDesc: 'Clear all learning progress (cannot be undone)',
    resetConfirm: 'Are you sure you want to reset all progress?',
  },

  // About page
  about: {
    title: 'About',
    subtitle: 'Learn about this app',
    version: 'Version',
    description: 'Road Signs Master is a comprehensive learning tool designed to help you master road signs from different European countries.',
    features: {
      title: 'Features',
      feature1: 'Interactive flashcard learning system',
      feature2: 'Multiple quiz types for varied practice',
      feature3: 'Progress tracking and statistics',
      feature4: 'Dark mode support',
      feature5: 'Offline functionality',
    },
    contact: 'Contact',
    feedback: 'Send Feedback',
  },

  // Select Country page
  selectCountry: {
    title: 'Select Country',
    subtitle: 'Choose a country to start learning',
    czechia: 'Czechia',
    slovakia: 'Slovakia',
    coming: 'Coming Soon',
    totalSigns: 'signs',
    categories: 'categories',
  },

  // Country Dashboard
  dashboard: {
    title: 'Czechia',
    subtitle: 'Master Czech road signs',
    progress: 'Your Progress',
    learned: 'Learned',
    total: 'Total',
    learningSessions: 'Learning Sessions',
    flashcards: 'Flashcards',
    flashcardsDesc: 'Swipe to learn and review signs',
    quiz: 'Quiz Mode',
    quizDesc: 'Test your knowledge',
    trueFalse: 'True/False',
    trueFalseDesc: 'Quick practice challenges',
    browseAll: 'Browse All Signs',
    browseAllDesc: 'View all road signs',
  },

  // Flashcards
  flashcards: {
    title: 'Learn Signs',
    subtitle: 'Swipe to categorize',
    chooseCategory: 'Choose Category',
    selectCategoryDesc: 'Select a category to start learning',
    categories: {
      all: 'All',
      warning: 'Warning',
      prohibition: 'Prohibition',
      mandatory: 'Mandatory',
      information: 'Information',
      priority: 'Priority',
    },
    progress: 'Progress',
    remaining: 'remaining',
    instructions: {
      left: 'Still Learning',
      right: 'Already Done',
    },
    tapToSee: 'Tap to see name',
    sessionComplete: 'Session Complete!',
    continueSession: 'Continue Session',
    practiceAgain: 'Practice Again',
    backToMenu: 'Back to Menu',
    newSigns: 'new',
    learnedSigns: 'learned',
    allLearned: 'All {{count}} signs learned ✓',
    practiceAllHint: 'Click to practice all {{count}} signs again',
    cards: 'cards',
  },

  // Quiz
  quiz: {
    title: 'Quiz Mode',
    subtitle: 'Test your knowledge',
    chooseCategory: 'Choose Category',
    selectCategoryDesc: 'Select a category to start the quiz',
    question: 'Question {{current}} of {{total}}',
    checkAnswer: 'Check Answer',
    nextQuestion: 'Next Question',
    correct: 'Correct!',
    incorrect: 'Incorrect',
    theCorrectAnswer: 'The correct answer is:',
    quizComplete: 'Quiz Complete!',
    yourScore: 'Your Score',
    accuracy: 'Accuracy',
    tryAgain: 'Try Again',
    newQuiz: 'New Quiz',
  },

  // True/False
  trueFalse: {
    title: 'True/False',
    subtitle: 'Quick challenges',
    chooseCategory: 'Choose Category',
    selectCategoryDesc: 'Select a category to start',
    question: 'Question {{current}} of {{total}}',
    isThisSign: 'Is this sign:',
    true: 'True',
    false: 'False',
    correct: 'Correct!',
    incorrect: 'Incorrect!',
    challengeComplete: 'Challenge Complete!',
    yourScore: 'Your Score',
    accuracy: 'Accuracy',
    tryAgain: 'Try Again',
    newChallenge: 'New Challenge',
  },

  // Signs List
  signsList: {
    title: 'All Signs',
    subtitle: 'Browse all road signs',
    search: 'Search signs...',
    filterByCategory: 'Filter by Category',
    all: 'All',
    showAll: 'Show All',
    noResults: 'No signs found',
    tryDifferent: 'Try a different search term',
  },
};

export type TranslationKeys = typeof en;
