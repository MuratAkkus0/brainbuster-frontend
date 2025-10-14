import { useAuth } from "../auth/useAuth";
import axios, { type AxiosError } from "axios";
import { toast } from "sonner";
import type {
  User,
  CreateUserPayload,
  UpdateUserPayload,
} from "@/types/models/User";
import { useState } from "react";
import { UserRoles } from "@/types/enums/UserRoles";

export const useUsers = () => {
  const { user } = useAuth();
  const token = user.user?.token;
  const [isLoading, setIsLoading] = useState(false);

  const getAllUsers = async (): Promise<User[]> => {
    if (!token) {
      toast.error("Authentication required");
      throw new Error("User not authenticated");
    }

    setIsLoading(true);
    try {
      const response = await axios.get<User[]>("/api/users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      const filteredUsers = response.data.filter(
        (user) => user.role !== UserRoles.ADMIN
      );
      return filteredUsers;
    } catch (err) {
      const error = err as AxiosError;
      console.error("Get users error:", error);

      const errorMessage =
        (error.response?.data as any)?.message || "Failed to fetch users";
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getUser = async (id: number): Promise<User> => {
    if (!token) {
      toast.error("Authentication required");
      throw new Error("User not authenticated");
    }

    setIsLoading(true);
    try {
      const response = await axios.get<User>(`/api/users/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      console.error("Get user error:", error);

      const errorMessage =
        (error.response?.data as any)?.message || "Failed to fetch user";
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const createUser = async (payload: CreateUserPayload): Promise<User> => {
    if (!token) {
      toast.error("Authentication required");
      throw new Error("User not authenticated");
    }

    setIsLoading(true);
    try {
      const response = await axios.post<User>("/api/users", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      toast.success("User created successfully!");
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      console.error("Create user error:", error);

      const errorMessage =
        (error.response?.data as any)?.message || "Failed to create user";
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (
    id: number,
    payload: UpdateUserPayload
  ): Promise<User> => {
    if (!token) {
      toast.error("Authentication required");
      throw new Error("User not authenticated");
    }

    setIsLoading(true);
    try {
      const response = await axios.put<User>(`/api/users/${id}`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      toast.success("User updated successfully!");
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      console.error("Update user error:", error);

      const errorMessage =
        (error.response?.data as any)?.message || "Failed to update user";
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (id: number): Promise<void> => {
    if (!token) {
      toast.error("Authentication required");
      throw new Error("User not authenticated");
    }

    setIsLoading(true);
    try {
      await axios.delete(`/api/users/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      toast.success("User deleted successfully!");
    } catch (err) {
      const error = err as AxiosError;
      console.error("Delete user error:", error);

      const errorMessage =
        (error.response?.data as any)?.message || "Failed to delete user";
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
  };
};
