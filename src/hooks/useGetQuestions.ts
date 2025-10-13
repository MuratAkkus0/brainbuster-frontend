import { getAllQuestions } from "@/store/slices/questionsSlice";
import type { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
export interface Question {
  category: string;
  correctAnswer: string;
  difficulty: string;
  id: number;
  incorrectAnswers: [];
  question: string;
  type: string;
}
export const useGetQuestions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const getQuestions = async () => {
    const questions = await dispatch(getAllQuestions());
    const questionList = questions.payload as Question[];
    return questionList;
  };
  return getQuestions;
};
