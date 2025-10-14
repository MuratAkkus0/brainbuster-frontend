import axios from "axios";
import { useAuth } from "../auth/useAuth";

interface CreateQuestion {
  (
    type: string,
    difficulty: string,
    category: string,
    question: string,
    correctAnswer: string,
    incorrectAnswers: string[]
  ): any;
}

export const useCreateQuestion = () => {
  const createQuestion: CreateQuestion = async (
    type,
    difficulty,
    category,
    question,
    correctAnswer,
    incorrectAnswers
  ) => {
    const { user } = useAuth();
    const token = user.user?.token;
    const res = await axios.post(
      "/api/questions",
      {
        type,
        difficulty,
        category,
        question,
        correctAnswer,
        incorrectAnswers,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    return res.data;
  };
  return createQuestion;
};
