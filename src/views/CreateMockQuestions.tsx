import { useCreateQuestion } from "@/hooks/game/useCreateQuestion";
import questionList from "../../public/data/initialQuestions.json";

export const CreateMockQuestions = () => {
  const createQuestion = useCreateQuestion();

  for (let i in questionList) {
    const {
      type,
      difficulty,
      category,
      question,
      correctAnswer,
      incorrectAnswers,
    } = questionList[i];
    createQuestion(
      type,
      difficulty,
      category,
      question,
      correctAnswer,
      incorrectAnswers
    );
  }

  return <div>CreateMockQuestions</div>;
};
