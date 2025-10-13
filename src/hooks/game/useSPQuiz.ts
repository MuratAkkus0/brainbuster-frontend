import axios from "@/api/axios";

interface CreateSession {
  (category: string, difficulty: string, numQuestions: number): any;
}
interface StartSession {
  (sessionId: string): any;
}
interface AnswerQuestion {
  (sessionId: string, choiceId: string): any;
}
interface GetCurrentSessionInfo {
  (sessionId: string): any;
}
interface GetCurrentQuestion {
  (sessionId: string): any;
}

export const useSPQuiz = () => {
  const createSession: CreateSession = async (
    category = "general",
    difficulty = "easy",
    numQuestions = 10
  ) => {
    const res = await axios.post("/api/sp/sessions", {
      numQuestions,
      category,
      difficulty,
    });
    console.log(res.data);
    return res.data;
  };
  const startSession: StartSession = async (sessionId) => {
    const res = await axios.post(`/api/sp/sessions/${sessionId}/start`);
    console.log(res.data);
    return res.data;
  };
  const answerQuestion: AnswerQuestion = async (sessionId, choiceId) => {
    const res = await axios.post(`/api/sp/sessions/${sessionId}/answer`, {
      choiceId: choiceId,
    });
    console.log(res.data);
    return res.data;
  };
  const getCurrentSessionInfo: GetCurrentSessionInfo = async (sessionId) => {
    const res = await axios.get(`/api/sp/sessions/${sessionId}`);
    console.log(res.data);
    return res.data;
  };
  const getCurrentQuestion: GetCurrentQuestion = async (sessionId) => {
    const res = await axios.get(`/api/sp/sessions/${sessionId}/current`);
    console.log(res.data);
    return res.data;
  };

  return {
    createSession,
    startSession,
    answerQuestion,
    getCurrentSessionInfo,
    getCurrentQuestion,
  };
};
