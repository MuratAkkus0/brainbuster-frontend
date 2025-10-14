import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import { setUser } from "@/store/slices/userSlice";
import axios, { type AxiosError } from "axios";
import { toast } from "sonner";
import { useAuth } from "./useAuth";

export const useRefreshUserProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();
  const token = user.user?.token;

  const refreshUserProfile = async (showToast = false) => {
    if (!token) {
      console.warn("Cannot refresh profile: User not authenticated");
      return null;
    }

    try {
      const response = await axios.get(`/api/users/getCurrentUser`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      // Update Redux store with fresh user data
      // Keep the token from current state since API doesn't return it
      if (response.data && user.user) {
        const updatedUserData = {
          ...user.user,
          user: response.data,
        };
        dispatch(setUser(updatedUserData));

        if (showToast) {
          toast.success("Profile refreshed successfully!");
        }

        console.log("User profile refreshed:", response.data);
        return response.data;
      }
    } catch (err) {
      const error = err as AxiosError;
      console.error("Refresh user profile error:", error);

      if (showToast) {
        const errorMessage =
          (error.response?.data as any)?.message || "Failed to refresh profile";
        toast.error(errorMessage);
      }

      throw error;
    }
  };

  return { refreshUserProfile };
};
