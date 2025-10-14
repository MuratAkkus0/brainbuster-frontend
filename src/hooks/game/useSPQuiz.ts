import axios from "axios";
import { useAuth } from "../auth/useAuth";

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
  const { user } = useAuth();
  const token = user.user?.token;
  const createSession: CreateSession = async (numQuestions = 10) => {
    const res = await axios.post(
      "/api/sp/sessions",
      {
        numQuestions,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    console.log(res);
    return res.data;
  };
  const startSession: StartSession = async (sessionId) => {
    const res = await axios.post(
      `/api/sp/sessions/${sessionId}/start`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    return res.data;
  };
  const answerQuestion: AnswerQuestion = async (sessionId, choiceId) => {
    const res = await axios.post(
      `/api/sp/sessions/${sessionId}/answer`,
      {
        choiceId: choiceId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    return res.data;
  };
  const getCurrentSessionInfo: GetCurrentSessionInfo = async (sessionId) => {
    const res = await axios.get(`/api/sp/sessions/${sessionId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return res.data;
  };
  const getCurrentQuestion: GetCurrentQuestion = async (sessionId) => {
    const res = await axios.get(`/api/sp/sessions/${sessionId}/current`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
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
