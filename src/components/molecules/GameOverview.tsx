import React, { type ReactNode } from "react";

const quizChoiceTagArr = ["A", "B", "C", "D"];
const quizs = [
  {
    question: "question",
    choices: ["choise 1", "choise 2", "choise 3", "choice 4"],
  },
  {
    question: "question",
    choices: ["choise 1", "choise 2", "choise 3", "choice 4"],
  },
  {
    question: "question",
    choices: ["choise 1", "choise 2", "choise 3", "choice 4"],
  },
  {
    question: "question",
    choices: ["choise 1", "choise 2", "choise 3", "choice 4"],
  },
];

const QuizChoice = ({ tag, children }: { tag: string; children: string }) => {
  return (
    <div className="grid grid-cols-12 grid-rows-1 border-2 items-center justify-items-center cursor-pointer">
      <div className="col-span-3 bg-theme-accent w-full h-full flex items-center justify-center font-bold text-2xl">
        {tag}
      </div>
      <div className="col-span-9 text-theme-main-text text-lg justify-self-start px-4">
        {children}
      </div>
    </div>
  );
};

export const GameOverview = () => {
  return (
    <>
      <div className="h-full w-full grid grid-cols-1 grid-rows-12">
        <div className="bg-theme-second-bg row-start-1 row-end-8 flex items-center justify-center">
          <div className="p-4">question</div>
        </div>
        <div className="bg-theme-dark-bg row-start-8 row-end-13 grid grid-cols-2 grid-rows-2">
          {quizs.map((item, i) => (
            <QuizChoice tag={quizChoiceTagArr[i]}>{item.question}</QuizChoice>
          ))}
        </div>
      </div>
    </>
  );
};
