import { useAuth } from "./useAuth";
import { setUser } from "@/store/slices/userSlice";
import { useDispatch } from "react-redux";
import axios, { type AxiosError } from "axios";
import { toast } from "sonner";

interface UpdateProfilePayload {
  username: string;
  password: string;
}

export const useUpdateProfile = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const token = user.user?.token;
  const userId = user.user?.user.id;

  const updateProfile = async (payload: UpdateProfilePayload) => {
    if (!userId || !token) {
      toast.error("Authentication required");
      throw new Error("User not authenticated");
    }

    try {
      const response = await axios.put(`/api/users/${userId}`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      // Update Redux store with new user data
      if (response.data) {
        dispatch(setUser(response.data));
      }

      toast.success("Profile updated successfully!");
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      console.error("Update profile error:", error);

      if (error.response) {
        const errorMessage =
          (error.response.data as any)?.message || "Failed to update profile";
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }

      toast.error("Network error. Please try again.");
      throw new Error("Network error");
    }
  };

  return { updateProfile };
};
