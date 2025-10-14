import axios, { type AxiosError } from "axios";
import { useAuth } from "../auth/useAuth";
import { toast } from "sonner";

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
    
    if (!token) {
      toast.error("Authentication required");
      throw new Error("User not authenticated");
    }

    try {
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
      toast.success("Question created successfully!");
      return res.data;
    } catch (err) {
      const error = err as AxiosError;
      console.error("Create question error:", error);
      
      const errorMessage =
        (error.response?.data as any)?.message || "Failed to create question";
      toast.error(errorMessage);
      throw error;
    }
  };
  return createQuestion;
};
