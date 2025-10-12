import axios from "@/api/axios";
import type { LoginObjectModel } from "@/types/models/Auth/LoginObjectModel";
import type { RegisterObjectModel } from "@/types/models/Auth/RegisterObjectModel";
import type { UserModel } from "@/types/models/Auth/UserModel";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { AxiosError } from "axios";

export interface UserState {
  isLoading: boolean;
  user: UserModel | null;
}

const initialState: UserState = {
  isLoading: false,
  user: null,
};

export const handleLogin = createAsyncThunk(
  "login",
  async (payload: LoginObjectModel, { rejectWithValue }) => {
    try {
      console.log(payload);
      const response = await axios.post("/api/auth/login", payload, {
        headers: { "Content-Type": "Application/json" },
        withCredentials: true,
      });
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      console.error(error);

      // if there is a response
      if (error.response) {
        return rejectWithValue({
          isError: true,
          status: error.response.status,
          message:
            (error.response.data as any).message ||
            "Login failed - Bad network.",
        });
      }
      // no response , network problem
      return rejectWithValue({
        isError: true,
        status: 501,
        message: error.message || "Unexpected error.",
      });
    }
  }
);
export const handleRegister = createAsyncThunk(
  "register",
  async (payload: RegisterObjectModel, { rejectWithValue }) => {
    console.log("handle register triggered");

    try {
      const response = await axios.post("/api/auth/register", payload, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      return response.data;
    } catch (err: any) {
      console.error("Register error:", err);
      const error = err as AxiosError;
      // if there is a response
      if (error.response) {
        return rejectWithValue({
          isError: true,
          status: error.response.status,
          message:
            (error.response.data as any).message ||
            "Register failed - Bad network.",
        });
      }
      // no response , network problem
      return rejectWithValue({
        isError: true,
        status: 501,
        message: error.message || "Unexpected error.",
      });
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLoading: (state, aciton: PayloadAction<boolean>) => {
      state.isLoading = aciton.payload;
    },
    setUser: (state, action: PayloadAction<UserModel>) => {
      state.user = action.payload;
    },
    logOut: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload ?? null;
      })
      .addCase(handleLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(handleLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        console.error(action);
      })
      .addCase(handleRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload ?? null;
      })
      .addCase(handleRegister.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(handleRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        console.error(action);
      });
  },
});

// Action creators are generated for each case reducer function
export const { setIsLoading, setUser, logOut } = userSlice.actions;

export default userSlice.reducer;
