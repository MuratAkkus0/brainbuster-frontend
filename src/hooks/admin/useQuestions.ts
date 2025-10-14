import { useAuth } from "../auth/useAuth";
import axios, { type AxiosError } from "axios";
import { toast } from "sonner";
import type {
  Question,
  CreateQuestionPayload,
  UpdateQuestionPayload,
} from "@/types/models/Question";
import { useState } from "react";

export const useQuestions = () => {
  const { user } = useAuth();
  const token = user.user?.token;
  const [isLoading, setIsLoading] = useState(false);

  const getAllQuestions = async (): Promise<Question[]> => {
    if (!token) {
      toast.error("Authentication required");
      throw new Error("User not authenticated");
    }

    setIsLoading(true);
    try {
      const response = await axios.get<Question[]>("/api/questions", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      console.error("Get questions error:", error);

      const errorMessage =
        (error.response?.data as any)?.message || "Failed to fetch questions";
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getQuestion = async (id: number): Promise<Question> => {
    if (!token) {
      toast.error("Authentication required");
      throw new Error("User not authenticated");
    }

    setIsLoading(true);
    try {
      const response = await axios.get<Question>(`/api/questions/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      console.error("Get question error:", error);

      const errorMessage =
        (error.response?.data as any)?.message || "Failed to fetch question";
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const createQuestion = async (
    payload: CreateQuestionPayload
  ): Promise<Question> => {
    if (!token) {
      toast.error("Authentication required");
      throw new Error("User not authenticated");
    }

    setIsLoading(true);
    try {
      const response = await axios.post<Question>("/api/questions", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      toast.success("Question created successfully!");
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      console.error("Create question error:", error);

      const errorMessage =
        (error.response?.data as any)?.message || "Failed to create question";
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuestion = async (
    id: number,
    payload: UpdateQuestionPayload
  ): Promise<Question> => {
    if (!token) {
      toast.error("Authentication required");
      throw new Error("User not authenticated");
    }

    setIsLoading(true);
    try {
      const response = await axios.put<Question>(
        `/api/questions/${id}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      toast.success("Question updated successfully!");
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      console.error("Update question error:", error);

      const errorMessage =
        (error.response?.data as any)?.message || "Failed to update question";
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteQuestion = async (id: number): Promise<void> => {
    if (!token) {
      toast.error("Authentication required");
      throw new Error("User not authenticated");
    }

    setIsLoading(true);
    try {
      await axios.delete(`/api/questions/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      toast.success("Question deleted successfully!");
    } catch (err) {
      const error = err as AxiosError;
      console.error("Delete question error:", error);

      const errorMessage =
        (error.response?.data as any)?.message || "Failed to delete question";
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    getAllQuestions,
    getQuestion,
    createQuestion,
    updateQuestion,
    deleteQuestion,
  };
};
