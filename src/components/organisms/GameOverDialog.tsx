import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trophy, Target, Award } from "lucide-react";
import { useNavigate } from "react-router";

interface GameOverDialogProps {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  onPlayAgain?: () => void;
}

export const GameOverDialog = ({
  score,
  totalQuestions,
  correctAnswers,
  onPlayAgain,
}: GameOverDialogProps) => {
  const navigate = useNavigate();
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  const getPerformanceMessage = () => {
    if (percentage >= 90) return "Outstanding! 🌟";
    if (percentage >= 70) return "Great Job! 🎉";
    if (percentage >= 50) return "Good Effort! 👍";
    return "Keep Practicing! 💪";
  };

  const handleGoToDashboard = () => {
    navigate("/profile");
  };

  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle className="text-center text-2xl flex items-center justify-center gap-2">
          <Trophy className="h-6 w-6 text-yellow-500" />
          Game Over!
        </DialogTitle>
        <DialogDescription className="text-center text-lg pt-2">
          {getPerformanceMessage()}
        </DialogDescription>
      </DialogHeader>

      <div className="grid gap-6 py-6">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-blue-500" />
            <span className="text-sm font-medium">Your Score</span>
          </div>
          <div className="text-5xl font-bold text-primary">{score}</div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="flex flex-col items-center gap-2 p-4 bg-secondary/50 rounded-lg">
            <Target className="h-5 w-5 text-green-500" />
            <div className="text-2xl font-bold text-green-600">
              {correctAnswers}
            </div>
            <div className="text-sm text-muted-foreground">Correct</div>
          </div>

          <div className="flex flex-col items-center gap-2 p-4 bg-secondary/50 rounded-lg">
            <Target className="h-5 w-5 text-red-500" />
            <div className="text-2xl font-bold text-red-600">
              {totalQuestions - correctAnswers}
            </div>
            <div className="text-sm text-muted-foreground">Wrong</div>
          </div>
        </div>

        <div className="text-center">
          <div className="text-sm text-muted-foreground">Accuracy</div>
          <div className="text-3xl font-bold">{percentage}%</div>
        </div>
      </div>

      <DialogFooter className="flex-col sm:flex-row gap-2">
        <Button
          variant="outline"
          onClick={handleGoToDashboard}
          className="w-full sm:w-auto"
        >
          Dashboard
        </Button>
        {onPlayAgain && (
          <Button onClick={onPlayAgain} className="w-full sm:w-auto">
            Play Again
          </Button>
        )}
      </DialogFooter>
    </DialogContent>
  );
};
