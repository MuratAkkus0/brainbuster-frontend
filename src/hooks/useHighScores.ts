import { useState, useEffect } from "react";
import axios, { type AxiosError } from "axios";
import { useAuth } from "./auth/useAuth";
import { toast } from "sonner";

export interface HighScore {
  username: string;
  score: number;
}

export const useHighScores = () => {
  const { user } = useAuth();
  const token = user.user?.token;
  const [highScores, setHighScores] = useState<HighScore[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHighScores = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        
        const response = await axios.get<HighScore[]>("/api/users/highscores", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setHighScores(response.data);
      } catch (err) {
        const error = err as AxiosError;
        const errorMessage = "Failed to load leaderboard";
        setError(errorMessage);
        console.error("High scores fetch error:", error);
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHighScores();
  }, [token]);

  return { highScores, isLoading, error };
};

