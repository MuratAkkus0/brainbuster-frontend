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
      correct_answer,
      incorrect_answers,
    } = questionList[i];
    createQuestion(
      type,
      difficulty,
      category,
      question,
      correct_answer,
      incorrect_answers
    );
  }

  return <div>CreateMockQuestions</div>;
};
