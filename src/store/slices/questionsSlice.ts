import axios from "@/api/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
  async (_, { rejectWithValue }) => {
    try {
      const data = await axios.get("/api/questions");
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
