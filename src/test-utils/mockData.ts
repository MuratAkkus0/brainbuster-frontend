import type { Question } from '@/types/models/Question';

export const mockUser = {
  id: 1,
  username: 'testuser',
  role: 'user',
  highScore: 100,
  createdAt: '2024-01-01T00:00:00.000Z',
};

export const mockAdminUser = {
  id: 2,
  username: 'adminuser',
  role: 'admin',
  highScore: 500,
  createdAt: '2024-01-01T00:00:00.000Z',
};

export const mockAuthResponse = {
  token: 'mock-jwt-token',
  refreshToken: 'mock-refresh-token',
  user: mockUser,
  message: 'Login successful',
};

export const mockQuestion: Question = {
  id: 1,
  type: 'multiple',
  difficulty: 'medium',
  category: 'Science',
  question: 'What is the capital of France?',
  correctAnswer: 'Paris',
  incorrectAnswers: [
    { id: 1, text: 'London', question: 'What is the capital of France?' },
    { id: 2, text: 'Berlin', question: 'What is the capital of France?' },
    { id: 3, text: 'Madrid', question: 'What is the capital of France?' },
  ],
};

export const mockQuestions: Question[] = [
  mockQuestion,
  {
    id: 2,
    type: 'multiple',
    difficulty: 'easy',
    category: 'History',
    question: 'In which year did World War II end?',
    correctAnswer: '1945',
    incorrectAnswers: [
      { id: 4, text: '1944', question: 'In which year did World War II end?' },
      { id: 5, text: '1946', question: 'In which year did World War II end?' },
      { id: 6, text: '1943', question: 'In which year did World War II end?' },
    ],
  },
];

export const mockQuizSession = {
  sessionId: 'test-session-123',
  state: 'IN_PROGRESS',
  totalQuestions: 10,
  currentIndex: 0,
  answered: 0,
  correctAnswers: 0,
};

