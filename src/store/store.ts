import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import questionsReducer from "./slices/questionsSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const userConfig = {
  key: "user",
  storage,
  whiteList: ["user"],
};
const questionConfig = {
  key: "question",
  storage,
  whiteList: ["questions"],
};

const persistedUser = persistReducer(userConfig, userReducer);
const persistedQuestions = persistReducer(questionConfig, questionsReducer);

export const store = configureStore({
  reducer: {
    user: persistedUser,
    questions: persistedQuestions,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
