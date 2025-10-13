import axios from "@/api/axios";

interface CreateSession {
  (numQuestions: number): any;
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
  const createSession: CreateSession = async (numQuestions = 10) => {
    const res = await axios.post("/api/sp/sessions", {
      numQuestions,
    });
    console.log(res);
    return res.data;
  };
  const startSession: StartSession = async (sessionId) => {
    const res = await axios.post(`/api/sp/sessions/${sessionId}/start`);
    return res.data;
  };
  const answerQuestion: AnswerQuestion = async (sessionId, choiceId) => {
    const res = await axios.post(`/api/sp/sessions/${sessionId}/answer`, {
      choiceId: choiceId,
    });
    return res.data;
  };
  const getCurrentSessionInfo: GetCurrentSessionInfo = async (sessionId) => {
    const res = await axios.get(`/api/sp/sessions/${sessionId}`);
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
