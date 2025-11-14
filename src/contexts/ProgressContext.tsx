import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import type { UserProgress, QuizResult, CountryCode } from '../types/progress';
import {
  loadProgress,
  saveProgress,
  resetProgress as resetProgressService,
  recordQuizResult,
  updateSignProgress as updateSignProgressService,
  getCountryStats,
  getOverallStats,
  getSignsNeedingPractice,
} from '../services/progressService';

interface ProgressContextType {
  progress: UserProgress;
  recordQuiz: (result: QuizResult) => void;
  updateSignProgress: (country: CountryCode, signId: number, isCorrect: boolean) => void;
  resetProgress: () => void;
  getCountryStatistics: (country: CountryCode) => ReturnType<typeof getCountryStats>;
  getOverallStatistics: () => ReturnType<typeof getOverallStats>;
  getWeakSigns: (country: CountryCode, limit?: number) => ReturnType<typeof getSignsNeedingPractice>;
  isLoading: boolean;
}

export const ProgressContext = createContext<ProgressContextType>({
  progress: {
    quizHistory: [],
    signProgress: {},
    categoryStats: {},
    totalQuizzesTaken: 0,
    totalSignsStudied: 0,
    lastActivityDate: new Date().toISOString(),
    streakDays: 0,
  },
  recordQuiz: () => {},
  updateSignProgress: () => {},
  resetProgress: () => {},
  getCountryStatistics: () => ({
    totalQuizzes: 0,
    averageScore: 0,
    masteredSigns: 0,
    totalStudiedSigns: 0,
    categoryStats: [],
    recentQuizzes: [],
  }),
  getOverallStatistics: () => ({
    totalQuizzes: 0,
    averageScore: 0,
    masteredSigns: 0,
    totalStudiedSigns: 0,
    streakDays: 0,
    bestCategory: null,
    weakestCategory: null,
  }),
  getWeakSigns: () => [],
  isLoading: true,
});

interface ProgressProviderProps {
  children: ReactNode;
}

export const ProgressProvider: React.FC<ProgressProviderProps> = ({ children }) => {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load progress on mount
  useEffect(() => {
    const loadedProgress = loadProgress();
    setProgress(loadedProgress);
    setIsLoading(false);
  }, []);

  // Record quiz result
  const recordQuiz = useCallback((result: QuizResult) => {
    if (!progress) return;

    const updatedProgress = recordQuizResult(progress, result);
    setProgress(updatedProgress);
  }, [progress]);

  // Update progress for individual sign
  const updateSignProgress = useCallback((
    country: CountryCode,
    signId: number,
    isCorrect: boolean
  ) => {
    if (!progress) return;

    const updatedProgress = updateSignProgressService(progress, country, signId, isCorrect);
    setProgress(updatedProgress);
  }, [progress]);

  // Reset all progress
  const resetProgress = useCallback(() => {
    const emptyProgress = resetProgressService();
    setProgress(emptyProgress);
  }, []);

  // Get country-specific statistics
  const getCountryStatistics = useCallback((country: CountryCode) => {
    if (!progress) {
      return {
        totalQuizzes: 0,
        averageScore: 0,
        masteredSigns: 0,
        totalStudiedSigns: 0,
        categoryStats: [],
        recentQuizzes: [],
      };
    }
    return getCountryStats(progress, country);
  }, [progress]);

  // Get overall statistics
  const getOverallStatistics = useCallback(() => {
    if (!progress) {
      return {
        totalQuizzes: 0,
        averageScore: 0,
        masteredSigns: 0,
        totalStudiedSigns: 0,
        streakDays: 0,
        bestCategory: null,
        weakestCategory: null,
      };
    }
    return getOverallStats(progress);
  }, [progress]);

  // Get signs that need practice
  const getWeakSigns = useCallback((country: CountryCode, limit: number = 10) => {
    if (!progress) return [];
    return getSignsNeedingPractice(progress, country, limit);
  }, [progress]);

  // Default progress while loading
  const defaultProgress: UserProgress = {
    quizHistory: [],
    signProgress: {},
    categoryStats: {},
    totalQuizzesTaken: 0,
    totalSignsStudied: 0,
    lastActivityDate: new Date().toISOString(),
    streakDays: 0,
  };

  return (
    <ProgressContext.Provider
      value={{
        progress: progress || defaultProgress,
        recordQuiz,
        updateSignProgress,
        resetProgress,
        getCountryStatistics,
        getOverallStatistics,
        getWeakSigns,
        isLoading,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};
