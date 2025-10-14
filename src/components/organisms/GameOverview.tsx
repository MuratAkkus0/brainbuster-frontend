import { cn } from "@/lib/utils";
import { UserAvatar } from "../atoms/UserAvatar";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks";
import type { UserModel } from "@/types/models/Auth/UserModel";
import { useSPQuiz } from "@/hooks/game/useSPQuiz";
import { useGetQuestions, type Question } from "@/hooks/useGetQuestions";
import { QuizChoice } from "../atoms/QuizChoice";
import { Dialog } from "@/components/ui/dialog";
import { GameOverDialog } from "./GameOverDialog";
import { QuizStartDialog } from "./QuizStartDialog";
import { toast } from "sonner";

const quizChoiceTagArr = ["A", "B", "C", "D"];

const UserAvatarContainer = ({
  user,
  position,
}: {
  user?: UserModel;
  position: "right" | "left";
}) => {
  return (
    <>
      <div
        className={cn("absolute ", position == "left" ? "left-4" : "right-4")}
      >
        <div className="bg-theme-main-bg p-2">
          <UserAvatar />
        </div>
        {user && (
          <div className="w-full p-2 text-center font-bold">
            {user.user.username}
          </div>
        )}
      </div>
    </>
  );
};

interface Choice {
  choiceId: string;
  text: string;
}
export const GameOverview = () => {
  const getQuestions = useGetQuestions();
  const [questionList, setQuestionList] = useState<Question[]>([]);
  const { user } = useAuth().user;
  const [isGameOverDialogOpen, setIsGameOverDialogOpen] = useState(false);
  const [isQuizStartDialogOpen, setIsQuizStartDialogOpen] = useState(true);
  const [isStarting, setIsStarting] = useState(false);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [gameResult, setGameResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    totalQuestions: 0,
  });

  const [quiz, setQuiz] = useState({
    sessionId: "",
    answerId: "",
    choosedAnswerId: "",
    correctAnswerChoiceId: "",
    isUserChoosed: false,
    currentQuestionId: 0,
    state: "",
    currentQuestion: {
      choices: [] as Choice[],
      index: 0,
      prompt: "",
      questionId: 0,
    },
    totalQuestion: 0,
    category: "",
  });
  const { createSession, startSession, answerQuestion } = useSPQuiz();

  const gameMode = localStorage.getItem("qm");

  // Load questions and extract categories
  useEffect(() => {
    console.log("get questions");
    getQuestions().then((res: any) => {
      console.log(res);
      setQuestionList(res);

      // Extract unique categories
      const categories = [...new Set(res.map((q: Question) => q.category))];
      setAvailableCategories(categories as string[]);
    });
  }, []);

  const handleStartQuiz = async (numQuestions: number, category: string) => {
    setIsStarting(true);

    try {
      // Filter questions by category if not "all"
      const filteredQuestions =
        category === "all"
          ? questionList
          : questionList.filter((q) => q.category === category);

      // Check if enough questions are available
      if (filteredQuestions.length < numQuestions) {
        toast.error(
          `Not enough questions available in this category. Only ${filteredQuestions.length} questions found. Please choose a lower number or different category.`
        );
        setIsStarting(false);
        return;
      }

      // Create session
      const sessionRes = await createSession(numQuestions);
      setQuiz((prev) => ({
        ...prev,
        sessionId: sessionRes.sessionId,
        state: sessionRes.state,
        totalQuestion: sessionRes.totalQuestions,
        category: category,
      }));

      // Start session
      const startRes = await startSession(sessionRes.sessionId);
      setQuiz((prev) => ({
        ...prev,
        state: startRes.state,
        currentQuestion: startRes.current,
        currentQuestionId: startRes.current.questionId,
      }));

      // Close start dialog
      setIsQuizStartDialogOpen(false);
      toast.success("Quiz started! Good luck!");
    } catch (error) {
      console.error("Failed to start quiz:", error);
      toast.error("Failed to start quiz. Please try again.");
    } finally {
      setIsStarting(false);
    }
  };

  const handleChooseAnswer = (e: React.MouseEvent<HTMLDivElement>) => {
    // Prevent multiple selections
    if (quiz.isUserChoosed) return;

    const choiceId = e.currentTarget.dataset.id;
    if (!choiceId) return;

    // Find the correct question by ID, not by index
    const currentQuestion = questionList.find(
      (q) => q.id === quiz.currentQuestion.questionId
    );

    if (!currentQuestion) {
      console.error("Question not found in question list");
      return;
    }

    const correctAnswerText = currentQuestion.correctAnswer;
    const correctAnswer = quiz.currentQuestion.choices.find(
      (item) => item.text === correctAnswerText
    );

    if (!correctAnswer) {
      console.error("Correct answer not found in choices");
      return;
    }

    // set isUserChoosed - this prevents further clicks
    setQuiz((prev) => ({
      ...prev,
      choosedAnswerId: choiceId,
      correctAnswerChoiceId: correctAnswer.choiceId,
      isUserChoosed: true,
    }));

    // API call
    answerQuestion(quiz.sessionId, choiceId).then((res: any) => {
      console.log("Answer response:", res);
      
      // Check if game is over
      if (!res.next || res.state === "COMPLETED") {
        // Game is finished
        setTimeout(() => {
          // Calculate answered questions and wrong answers
          const totalAnswered = (res.correctAnswers || 0) + (res.wrongAnswers || 0);
          const actualTotal = totalAnswered || quiz.totalQuestion;
          
          setGameResult({
            score: res.score || res.highScore || 0,
            correctAnswers: res.correctAnswers || 0,
            wrongAnswers: res.wrongAnswers || res.incorrectAnswers || 0,
            totalQuestions: actualTotal,
          });
          setIsGameOverDialogOpen(true);
        }, 2000);
      } else {
        // Continue to next question
        setTimeout(() => {
          setQuiz((prev) => ({
            ...prev,
            currentQuestion: res.next,
            currentQuestionId: res.next.questionId,
            isUserChoosed: false,
            choosedAnswerId: "",
            correctAnswerChoiceId: "",
          }));
        }, 2000);
      }
    });
  };

  const handlePlayAgain = () => {
    setIsGameOverDialogOpen(false);
    // Reload the page to start a new game
    window.location.reload();
  };

  return (
    <>
      <div className="h-full w-full grid grid-cols-1 grid-rows-12">
        <div className="bg-theme-second-bg row-start-1 row-end-8 flex items-center justify-center relative">
          {gameMode === "mp" && <UserAvatarContainer position="left" />}
          <UserAvatarContainer position="right" user={user ?? undefined} />
          <div className="p-4 text-2xl md:text-3xl font-medium">
            {quiz.currentQuestion?.prompt || "Loading..."}
          </div>
        </div>
        <div className="bg-theme-dark-bg row-start-8 row-end-13 grid grid-cols-2 grid-rows-2">
          {[].map(() => {
            return <></>;
          })}
          {quiz.currentQuestion?.choices.map((item, i) => {
            const isCorrect = item.choiceId === quiz.correctAnswerChoiceId;
            const isChosen = item.choiceId === quiz.choosedAnswerId;

            let bg = "";
            if (quiz.isUserChoosed) {
              if (isCorrect) bg = "bg-green-500";
              else if (isChosen && !isCorrect) bg = "bg-red-500";
            }

            return (
              <QuizChoice
                key={i}
                data-id={item.choiceId}
                onClick={handleChooseAnswer}
                className={cn(
                  bg,
                  quiz.isUserChoosed && "pointer-events-none cursor-not-allowed"
                )}
                tag={quizChoiceTagArr[i]}
              >
                {item.text}
              </QuizChoice>
            );
          })}
        </div>
      </div>

      {/* Quiz Start Dialog */}
      <Dialog
        open={isQuizStartDialogOpen}
        onOpenChange={setIsQuizStartDialogOpen}
      >
        <QuizStartDialog
          onStart={handleStartQuiz}
          availableCategories={availableCategories}
          totalAvailableQuestions={questionList.length}
          isLoading={isStarting}
        />
      </Dialog>

      {/* Game Over Dialog */}
      <Dialog
        open={isGameOverDialogOpen}
        onOpenChange={setIsGameOverDialogOpen}
      >
        <GameOverDialog
          score={gameResult.score}
          totalQuestions={gameResult.totalQuestions}
          correctAnswers={gameResult.correctAnswers}
          wrongAnswers={gameResult.wrongAnswers}
          onPlayAgain={handlePlayAgain}
        />
      </Dialog>
    </>
  );
};
