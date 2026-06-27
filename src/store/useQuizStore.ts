import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface QuizState {
  answers: Record<string, number>;
  currentQuestionIndex: number;
  result: any;
  setAnswer: (questionId: string, value: number) => void;
  setResult: (result: any) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
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
        
      resetQuiz: () => 
        set({ answers: {}, currentQuestionIndex: 0, result: null }),
    }),
    {
      name: 'reader-dna-quiz-storage', // name of the item in the storage (must be unique)
    }
  )
);
