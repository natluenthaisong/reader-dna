import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { QuizApiResult } from '@/types/index';

interface QuizState {
  answers: Record<string, number>;
  currentQuestionIndex: number;
  result: QuizApiResult | null;
  setAnswer: (questionId: string, value: number) => void;
  setResult: (result: QuizApiResult | null) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  jumpToQuestion: (index: number) => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set) => ({
      answers: {},
      currentQuestionIndex: 0,
      result: null,
      
      setAnswer: (questionId, value) => 
        set((state) => ({
          answers: { ...state.answers, [questionId]: value }
        })),
        
      setResult: (result) => set({ result }),
        
      nextQuestion: () => 
        set((state) => ({
          currentQuestionIndex: state.currentQuestionIndex + 1
        })),
        
      prevQuestion: () => 
        set((state) => ({
          currentQuestionIndex: Math.max(0, state.currentQuestionIndex - 1)
        })),
        
      jumpToQuestion: (index) =>
        set({ currentQuestionIndex: index }),
        
      resetQuiz: () => 
        set({ answers: {}, currentQuestionIndex: 0, result: null }),
    }),
    {
      name: 'reader-dna-quiz-storage',
    }
  )
);
