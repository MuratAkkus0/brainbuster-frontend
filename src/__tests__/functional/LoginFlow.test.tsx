/// <reference types="@testing-library/jest-dom" />
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "@/test-utils";
import { LoginForm } from "@/components/molecules/LoginForm";
import axios from "axios";
import {
  mockSuccessfulLogin,
  mockFailedLogin,
  resetMocks,
} from "@/test-utils/mockApi";

// Mock axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock react-router navigate
const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
  useLocation: () => ({ state: null, pathname: "/login" }),
  Link: ({ children, to }: any) => <a href={to}>{children}</a>,
}));

// Mock sonner toast
jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("Login Flow - Functional Tests", () => {
  beforeEach(() => {
    resetMocks();
    mockNavigate.mockClear();
  });

  describe("Successful Login Flow", () => {
    it("should allow user to login with valid credentials", async () => {
      const user = userEvent.setup();
      mockSuccessfulLogin();

      renderWithProviders(<LoginForm />, { withRouter: false });

      // User sees login form
      expect(
        screen.getAllByText(/login to your account/i)[0]
      ).toBeInTheDocument();

      // User fills in username
      const usernameInput = screen.getByLabelText(/username/i);
      await user.type(usernameInput, "testuser");
      expect(usernameInput).toHaveValue("testuser");

      // User fills in password
      const passwordInput = screen.getByLabelText(/password/i);
      await user.type(passwordInput, "Test123!@#");
      expect(passwordInput).toHaveValue("Test123!@#");

      // User clicks login button
      const loginButton = screen.getByRole("button", { name: /login/i });
      await user.click(loginButton);

      // API should be called with correct data
      await waitFor(() => {
        expect(mockedAxios.post).toHaveBeenCalledWith("/api/auth/login", {
          username: "testuser",
          password: "Test123!@#",
        });
      });
    });

    it("should display validation errors for empty fields", async () => {
      const user = userEvent.setup();
      renderWithProviders(<LoginForm />, { withRouter: false });

      // User clicks login without filling form
      const loginButton = screen.getByRole("button", { name: /login/i });
      await user.click(loginButton);

      // Validation errors should appear (HTML5 validation will prevent submit)
      const usernameInput = screen.getByLabelText(/username/i);
      const passwordInput = screen.getByLabelText(/password/i);

      expect(usernameInput).toBeRequired();
      expect(passwordInput).toBeRequired();
    });

    it("should successfully submit login form", async () => {
      const user = userEvent.setup();
      const { toast } = await import("sonner");
      mockSuccessfulLogin();

      renderWithProviders(<LoginForm />, { withRouter: false });

      // Fill and submit form
      await user.type(screen.getByLabelText(/username/i), "testuser");
      await user.type(screen.getByLabelText(/password/i), "Test123!@#");
      await user.click(screen.getByRole("button", { name: /login/i }));

      // Should show success toast after successful login
      await waitFor(
        () => {
          expect(toast.success).toHaveBeenCalled();
          expect(mockedAxios.post).toHaveBeenCalled();
        },
        { timeout: 3000 }
      );
    });
  });

  describe("Failed Login Flow", () => {
    it("should display error message for invalid credentials", async () => {
      const user = userEvent.setup();
      const { toast } = await import("sonner");
      mockFailedLogin();

      renderWithProviders(<LoginForm />, { withRouter: false });

      // Fill and submit form with invalid credentials (but valid format)
      await user.type(screen.getByLabelText(/username/i), "wronguser");
      await user.type(
        screen.getByLabelText(/password/i),
        "WrongPassword123!@#"
      );
      await user.click(screen.getByRole("button", { name: /login/i }));

      // Error toast should be shown
      await waitFor(
        () => {
          expect(mockedAxios.post).toHaveBeenCalled();
        },
        { timeout: 3000 }
      );

      // Check that error toast was called
      await waitFor(
        () => {
          expect(toast.error).toHaveBeenCalled();
        },
        { timeout: 1000 }
      );

      // Should not navigate
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  describe("UI Interactions", () => {
    it("should have link to registration page", () => {
      renderWithProviders(<LoginForm />, { withRouter: false });

      const signUpLink = screen.getByText(/sign up/i);
      expect(signUpLink).toBeInTheDocument();
      expect(signUpLink.closest("a")).toHaveAttribute("href", "/register");
    });

    it("should mask password input", () => {
      renderWithProviders(<LoginForm />, { withRouter: false });

      const passwordInput = screen.getByLabelText(/password/i);
      expect(passwordInput).toHaveAttribute("type", "password");
    });
  });
});
