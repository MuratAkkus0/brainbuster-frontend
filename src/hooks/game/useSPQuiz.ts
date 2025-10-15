import axios, { type AxiosError } from "axios";
import { useAuth } from "../auth/useAuth";
import { toast } from "sonner";

interface CreateSession {
  (numQuestions: number, category?: string): any;
}
interface StartSession {
  (sessionId: string): any;
}
interface AnswerQuestion {
  (sessionId: string, choiceId: string): any;
}
interface GetCurrentSessionInfo {
  (sessionId: string): any;
}
interface GetCurrentQuestion {
  (sessionId: string): any;
}

export const useSPQuiz = () => {
  const { user } = useAuth();
  const token = user.user?.token;

  const createSession: CreateSession = async (numQuestions = 10, category) => {
    if (!token) {
      toast.error("Authentication required");
      throw new Error("User not authenticated");
    }

    try {
      // Build request body with optional category filter
      const requestBody: { numQuestions: number; category?: string } = {
        numQuestions,
      };
      
      // Only add category if it's specified and not "all"
      if (category && category !== "all") {
        requestBody.category = category;
      }

      const res = await axios.post(
        "/api/sp/sessions",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      return res.data;
    } catch (err) {
      const error = err as AxiosError;
      console.error("Create session error:", error);
      toast.error("Failed to create quiz session");
      throw error;
    }
  };

  const startSession: StartSession = async (sessionId) => {
    if (!token) {
      toast.error("Authentication required");
      throw new Error("User not authenticated");
    }

    try {
      const res = await axios.post(
        `/api/sp/sessions/${sessionId}/start`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      return res.data;
    } catch (err) {
      const error = err as AxiosError;
      console.error("Start session error:", error);
      toast.error("Failed to start quiz session");
      throw error;
    }
  };

  const answerQuestion: AnswerQuestion = async (sessionId, choiceId) => {
    if (!token) {
      toast.error("Authentication required");
      throw new Error("User not authenticated");
    }

    try {
      const res = await axios.post(
        `/api/sp/sessions/${sessionId}/answer`,
        { choiceId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      return res.data;
    } catch (err) {
      const error = err as AxiosError;
      console.error("Answer question error:", error);
      toast.error("Failed to submit answer");
      throw error;
    }
  };

  const getCurrentSessionInfo: GetCurrentSessionInfo = async (sessionId) => {
    if (!token) {
      toast.error("Authentication required");
      throw new Error("User not authenticated");
    }

    try {
      const res = await axios.get(`/api/sp/sessions/${sessionId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      const error = err as AxiosError;
      console.error("Get session info error:", error);
      toast.error("Failed to get session information");
      throw error;
    }
  };

  const getCurrentQuestion: GetCurrentQuestion = async (sessionId) => {
    if (!token) {
      toast.error("Authentication required");
      throw new Error("User not authenticated");
    }

    try {
      const res = await axios.get(`/api/sp/sessions/${sessionId}/current`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      const error = err as AxiosError;
      console.error("Get current question error:", error);
      toast.error("Failed to get current question");
      throw error;
    }
  };

  return {
    createSession,
    startSession,
    answerQuestion,
    getCurrentSessionInfo,
    getCurrentQuestion,
  };
};
