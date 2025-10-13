import { getAllQuestions } from "@/store/slices/questionsSlice";
import type { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";

export const useGetQuestions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const getQuestions = async () => {
    const questions = await dispatch(getAllQuestions());
    return questions.payload;
  };
  return getQuestions;
};
