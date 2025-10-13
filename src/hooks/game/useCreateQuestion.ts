import axios from "@/api/axios";

export const useCreateQuestion = ({
  type,
  difficulty,
  category,
  question,
  correctAnswer,
  incorrectAnswers,
}: {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
}) => {
  const createQuestion = () => {
    const res = axios.post("/api/questions", {
      type,
      difficulty,
      category,
      question,
      correctAnswer,
      incorrectAnswers,
    });
  };
};
