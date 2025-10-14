/**
 * Test Constants
 * Centralized test data to improve maintainability and reduce duplication
 */

export const TEST_CREDENTIALS = {
  VALID: {
    username: "testuser",
    password: "Test123!@#",
  },
  INVALID: {
    username: "wronguser",
    password: "WrongPassword123!@#",
  },
  ADMIN: {
    username: "adminuser",
    password: "Admin123!@#",
  },
} as const;

export const TEST_TIMEOUTS = {
  SHORT: 1000,
  MEDIUM: 3000,
  LONG: 5000,
} as const;

export const API_ENDPOINTS = {
  LOGIN: "/api/auth/login",
  REGISTER: "/api/auth/register",
  LOGOUT: "/api/auth/logout",
  USERS: "/api/users",
  QUESTIONS: "/api/questions",
} as const;

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  PROFILE: "/profile",
  ADMIN_DASHBOARD: "/admin/dashboard",
  GAME: "/game",
} as const;

export const FORM_LABELS = {
  USERNAME: /username/i,
  PASSWORD: /password/i,
  EMAIL: /email/i,
} as const;

export const BUTTON_LABELS = {
  LOGIN: /login/i,
  SIGN_IN: /sign in/i,
  SIGN_UP: /sign up/i,
  LOGOUT: /logout/i,
  SUBMIT: /submit/i,
  PLAY_QUIZ: /play quiz/i,
  GO_TO_PROFILE: /go to profile/i,
  GO_TO_DASHBOARD: /go to dashboard/i,
} as const;

export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: /invalid credentials/i,
  NETWORK_ERROR: /network error/i,
  REQUIRED_FIELD: /required/i,
  ACCESS_DENIED: /access denied/i,
} as const;

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: /login successful/i,
  REGISTRATION_SUCCESS: /registration successful/i,
  PROFILE_UPDATED: /profile updated/i,
} as const;

