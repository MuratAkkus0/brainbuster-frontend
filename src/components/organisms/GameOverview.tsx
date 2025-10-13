import { cn } from "@/lib/utils";
import { UserAvatar } from "../atoms/UserAvatar";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks";
import type { UserModel } from "@/types/models/Auth/UserModel";
import { useSPQuiz } from "@/hooks/game/useSPQuiz";
import { useGetQuestions, type Question } from "@/hooks/useGetQuestions";
import { QuizChoice } from "../atoms/QuizChoice";

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
  });
  const { createSession, startSession, answerQuestion, getCurrentSessionInfo } =
    useSPQuiz();

  const gameMode = localStorage.getItem("qm");

  useEffect(() => {
    console.log("get questions");
    getQuestions().then((res: any) => {
      console.log(res);
      setQuestionList(res);
    });
  }, []);

  useEffect(() => {
    console.log("quiz changed");
    console.log(quiz);
  }, [quiz]);

  // Create Session
  useEffect(() => {
    if (!quiz.sessionId) {
      createSession(10).then((res: any) => {
        setQuiz((prev) => ({
          ...prev,
          sessionId: res.sessionId,
          state: res.state,
          totalQuestion: res.totalQuestions,
        }));
      });
    }
    // return () => localStorage.removeItem("quiz");
  }, []);

  // Start Session
  useEffect(() => {
    if (quiz.sessionId && quiz.state !== "RUNNING") {
      startSession(quiz.sessionId).then((res: any) => {
        console.log(res);
        setQuiz((prev) => ({
          ...prev,
          state: res.state,
          currentQuestion: res.current,
          currentQuestionId: res.current.questionId,
        }));
      });
    }
  }, [quiz.sessionId]);

  // Get Current Session Info
  useEffect(() => {
    if (quiz.sessionId) {
      getCurrentSessionInfo(quiz.sessionId);
    }
  }, [quiz.sessionId]);

  const handleChooseAnswer = (e: React.MouseEvent<HTMLDivElement>) => {
    const choiceId = e.currentTarget.dataset.id;
    if (!choiceId) return;

    const correctAnswerText =
      questionList[quiz.currentQuestionId].correctAnswer;
    const correctAnswer = quiz.currentQuestion.choices.find(
      (item) => item.text === correctAnswerText
    );

    if (!correctAnswer) return;

    // set isUserChoosed
    setQuiz((prev) => ({
      ...prev,
      choosedAnswerId: choiceId,
      correctAnswerChoiceId: correctAnswer.choiceId,
      isUserChoosed: true,
    }));

    // API call
    answerQuestion(quiz.sessionId, choiceId).then((res: any) => {
      // Wait for be able to show right and wrong answers
      setTimeout(() => {
        setQuiz((prev) => ({
          ...prev,
          currentQuestion: res.next,
          currentQuestionId: res.next.questionId,
          isUserChoosed: false, // yeni soruya geçince resetle
          choosedAnswerId: "",
          correctAnswerChoiceId: "",
        }));
      }, 2000);
    });
  };

  return (
    <>
      <div className="h-full w-full grid grid-cols-1 grid-rows-12">
        <div className="bg-theme-second-bg row-start-1 row-end-8 flex items-center justify-center relative">
          {gameMode === "mp" && <UserAvatarContainer position="left" />}
          <UserAvatarContainer position="right" user={user ?? undefined} />
          <div className="p-4 text-2xl md:text-3xl font-medium">
            {quiz.currentQuestion?.prompt || ""}
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
                className={cn(bg)}
                tag={quizChoiceTagArr[i]}
              >
                {item.text}
              </QuizChoice>
            );
          })}
        </div>
      </div>
    </>
  );
};
