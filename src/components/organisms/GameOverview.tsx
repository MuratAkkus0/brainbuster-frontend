import { cn } from "@/lib/utils";
import { UserAvatar } from "../atoms/UserAvatar";
import {
  useEffect,
  useState,
  type HTMLAttributes,
  type MouseEventHandler,
} from "react";
import { useAuth } from "@/hooks";
import type { UserModel } from "@/types/models/Auth/UserModel";
import { useSPQuiz } from "@/hooks/game/useSPQuiz";

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

interface QuizChoiceProps extends HTMLAttributes<HTMLDivElement> {
  onClick: MouseEventHandler<HTMLDivElement>;
  tag: string;
  children: string;
}

const QuizChoice: React.FC<QuizChoiceProps> = ({
  onClick,
  tag,
  children,
  ...props
}) => {
  return (
    <div
      {...props}
      onClick={onClick}
      className="grid grid-cols-12 grid-rows-1 border-2 items-center justify-items-center cursor-pointer"
    >
      <div className="col-span-3 bg-theme-accent w-full h-full flex items-center justify-center font-bold text-2xl">
        {tag}
      </div>
      <div className="col-span-9 text-theme-main-text text-lg md:text-xl justify-self-start px-4">
        {children}
      </div>
    </div>
  );
};
interface Choice {
  choiceId: string;
  text: string;
}
export const GameOverview = () => {
  const { user } = useAuth().user;
  const [quiz, setQuiz] = useState({
    sessionId: "",
    answerId: "",
    state: "",
    currentQuestion: {
      choices: [] as Choice[],
      index: 0,
      prompt: "",
      questionId: 0,
    },
    totalQuestion: 0,
  });
  const {
    createSession,
    startSession,
    answerQuestion,
    getCurrentQuestion,
    getCurrentSessionInfo,
  } = useSPQuiz();
  const quizLS: Partial<typeof quiz> = JSON.parse(
    localStorage.getItem("quiz") || "{}"
  );
  const gameMode = localStorage.getItem("qm");

  useEffect(() => {
    console.log(quizLS);
    if (!quizLS || !quizLS?.sessionId) {
      console.log(true);
      createSession("test", "easy", 10).then((res: any) => {
        console.log(res);
        setQuiz((prev) => ({
          ...prev,
          sessionId: res.sessionId,
          state: res.state,
          totalQuestion: res.totalQuestions,
        }));
      });
    }
    return () => localStorage.removeItem("quiz");
  }, []);

  useEffect(() => {
    if (quiz.sessionId && quiz.state != "RUNNING") {
      startSession(quiz.sessionId).then((res: any) => {
        console.log(res);
        setQuiz((prev) => ({
          ...prev,
          currentQuestion: res.current,
          state: res.state,
        }));
      });
      if (quiz.sessionId && quiz.state == "RUNNING") {
        getCurrentQuestion(quiz.sessionId).then((res: any) => {
          console.log("------------------");
          console.log(res);
        });
      }
    }
    if (quiz.sessionId) {
      getCurrentSessionInfo(quiz.sessionId).then((res: any) => {
        console.log("..................");
        console.log(res);
        console.log("..................");
      });
    }
    localStorage.setItem("quiz", JSON.stringify(quiz));
    console.log(quiz);
  }, [quiz]);

  const handleChooseAnswer = (e: React.MouseEvent<HTMLDivElement>) => {
    const choiceId = e.currentTarget.dataset.id;
    if (choiceId) {
      answerQuestion(quiz.sessionId, choiceId);
      setQuiz((prev) => ({ ...prev, answerId: choiceId }));
    }
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
          {quiz.currentQuestion.choices &&
            quiz.currentQuestion.choices.map((item, i) => (
              <QuizChoice
                onClick={handleChooseAnswer}
                key={i}
                tag={quizChoiceTagArr[i]}
                data-id={item.choiceId}
              >
                {item.text}
              </QuizChoice>
            ))}
        </div>
      </div>
    </>
  );
};
