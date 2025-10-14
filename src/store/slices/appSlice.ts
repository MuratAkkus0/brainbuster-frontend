import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  isLoading: boolean;
}

const initialState: AppState = {
  isLoading: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsLoading: (state, aciton: PayloadAction<boolean>) => {
      state.isLoading = aciton.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsLoading } = appSlice.actions;

export default appSlice.reducer;
