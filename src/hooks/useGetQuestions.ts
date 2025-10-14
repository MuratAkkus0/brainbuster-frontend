import { getAllQuestions } from "@/store/slices/questionsSlice";
import type { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { useAuth } from "./auth/useAuth";
import { toast } from "sonner";

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
  const { user } = useAuth();
  const token = user.user?.token;
  const dispatch = useDispatch<AppDispatch>();

  const getQuestions = async () => {
    if (!token) {
      toast.error("Authentication required");
      throw new Error("User not authenticated");
    }

    try {
      const questions = await dispatch(getAllQuestions(token));
      
      if (questions.meta.requestStatus === "fulfilled") {
        const questionList = questions.payload as Question[];
        return questionList;
      } else {
        toast.error("Failed to fetch questions");
        throw new Error("Failed to fetch questions");
      }
    } catch (err) {
      console.error("Get questions error:", err);
      toast.error("An error occurred while fetching questions");
      throw err;
    }
  };

  return getQuestions;
};
