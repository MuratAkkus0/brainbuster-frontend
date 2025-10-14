import { useAuth } from "@/hooks";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface Question {
  id: number;
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correctAnswer: string;
  incorrectAnswers: [
    {
      id: number;
      text: string;
      question: string;
    }
  ];
}

export type QuestionList = Array<Question | []>;

interface QuestionsState {
  questions: QuestionList;
}

const initialState: QuestionsState = {
  questions: [],
};

export const getAllQuestions = createAsyncThunk(
  "getAllQuestions",
  async (token, { rejectWithValue }) => {
    try {
      const data = await axios.get("/api/questions", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return data.data as QuestionList;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    removeQuestions: (state) => {
      state.questions = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllQuestions.fulfilled, (state, action) => {
      state.questions = action.payload || [];
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = questionsSlice.actions;

export default questionsSlice.reducer;
