export interface Question {
  id: number;
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[] | IncorrectAnswer[];
}

export interface IncorrectAnswer {
  id: number;
  text: string;
  question: string;
}

export interface CreateQuestionPayload {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
}

export interface UpdateQuestionPayload {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
}
