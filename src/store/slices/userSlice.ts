import axios from "@/api/axios";
import type { LoginObjectModel } from "@/types/models/Auth/LoginObjectModel";
import type { UserModel } from "@/types/models/Auth/UserModel";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

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
  async (payload: LoginObjectModel) => {
    console.log("handle login triggered");

    console.log(payload);
    if (!payload.username && !payload.password) return;
    const response = await axios.post("/api/auth/login", payload, {
      headers: { "Content-Type": "Application/json" },
      withCredentials: true,
    });
    const user: UserModel = response.data;
    if (response) {
      return user;
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
      });
  },
});

// Action creators are generated for each case reducer function
export const { setIsLoading, setUser, logOut } = userSlice.actions;

export default userSlice.reducer;
