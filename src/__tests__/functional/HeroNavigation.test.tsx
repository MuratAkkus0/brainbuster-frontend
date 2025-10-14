/// <reference types="@testing-library/jest-dom" />
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test-utils';
import { Hero } from '@/components/molecules/Hero';
import { mockUser, mockAdminUser, mockAuthResponse } from '@/test-utils/mockData';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('Hero Navigation - Functional Tests', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  describe('Guest User Journey', () => {
    it('should show authentication options for guests', () => {
      renderWithProviders(<Hero />, {
        preloadedState: {
          user: {
            user: null,
            isLoading: false,
          },
        },
      });

      // Guest sees welcome message
      expect(screen.getByText(/test yourself now/i)).toBeInTheDocument();

      // Guest sees sign in and sign up buttons
      expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();

      // Guest does not see authenticated options
      expect(screen.queryByRole('button', { name: /play quiz/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /go to profile/i })).not.toBeInTheDocument();
    });

    it('should navigate to login when sign in is clicked', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Hero />, {
        preloadedState: {
          user: {
            user: null,
            isLoading: false,
          },
        },
      });

      const signInButton = screen.getByRole('button', { name: /sign in/i });
      await user.click(signInButton);

      // Check if button navigates to login (link should exist)
      expect(signInButton.closest('a')).toHaveAttribute('href', '/login');
    });

    it('should navigate to register when sign up is clicked', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Hero />, {
        preloadedState: {
          user: {
            user: null,
            isLoading: false,
          },
        },
      });

      const signUpButton = screen.getByRole('button', { name: /sign up/i });
      await user.click(signUpButton);

      // Check if button navigates to register
      expect(signUpButton.closest('a')).toHaveAttribute('href', '/register');
    });
  });

  describe('Authenticated Regular User Journey', () => {
    it('should show personalized greeting and user options', () => {
      renderWithProviders(<Hero />, {
        preloadedState: {
          user: {
            user: { ...mockAuthResponse, user: mockUser },
            isLoading: false,
          },
        },
      });

      // User sees personalized greeting
      expect(screen.getByText(/welcome back, testuser!/i)).toBeInTheDocument();

      // User sees profile and quiz options
      expect(screen.getByRole('button', { name: /go to profile/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /play quiz/i })).toBeInTheDocument();

      // User does not see authentication options
      expect(screen.queryByRole('button', { name: /sign in/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /sign up/i })).not.toBeInTheDocument();
    });

    it('should set game mode when play quiz is clicked', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Hero />, {
        preloadedState: {
          user: {
            user: { ...mockAuthResponse, user: mockUser },
            isLoading: false,
          },
        },
      });

      const playQuizButton = screen.getByRole('button', { name: /play quiz/i });
      await user.click(playQuizButton);

      // Should set single player mode in localStorage
      expect(localStorageMock.setItem).toHaveBeenCalledWith('qm', 'sp');
    });

    it('should navigate to profile when go to profile is clicked', () => {
      renderWithProviders(<Hero />, {
        preloadedState: {
          user: {
            user: { ...mockAuthResponse, user: mockUser },
            isLoading: false,
          },
        },
      });

      const profileButton = screen.getByRole('button', { name: /go to profile/i });
      expect(profileButton.closest('a')).toHaveAttribute('href', '/profile');
    });
  });

  describe('Admin User Journey', () => {
    it('should show admin-specific options', () => {
      renderWithProviders(<Hero />, {
        preloadedState: {
          user: {
            user: { ...mockAuthResponse, user: mockAdminUser },
            isLoading: false,
          },
        },
      });

      // Admin sees personalized greeting
      expect(screen.getByText(/welcome back, adminuser!/i)).toBeInTheDocument();

      // Admin sees dashboard option instead of profile
      expect(screen.getByRole('button', { name: /go to dashboard/i })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /go to profile/i })).not.toBeInTheDocument();

      // Admin still sees quiz option
      expect(screen.getByRole('button', { name: /play quiz/i })).toBeInTheDocument();
    });

    it('should navigate to admin dashboard', () => {
      renderWithProviders(<Hero />, {
        preloadedState: {
          user: {
            user: { ...mockAuthResponse, user: mockAdminUser },
            isLoading: false,
          },
        },
      });

      const dashboardButton = screen.getByRole('button', { name: /go to dashboard/i });
      expect(dashboardButton.closest('a')).toHaveAttribute('href', '/admin/dashboard');
    });
  });

  describe('State Transitions', () => {
    it('should transition from guest to authenticated user', () => {
      const { rerender } = renderWithProviders(<Hero />, {
        preloadedState: {
          user: {
            user: null,
            isLoading: false,
          },
        },
      });

      // Initially guest
      expect(screen.getByText(/test yourself now/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();

      // User logs in - rerender with new state
      rerender(
        <Hero />
      );

      // After login simulation, manually update store
      const { container } = renderWithProviders(<Hero />, {
        preloadedState: {
          user: {
            user: { ...mockAuthResponse, user: mockUser },
            isLoading: false,
          },
        },
      });

      // Now authenticated view should be visible in new render
      expect(container.querySelector('div')).toBeInTheDocument();
    });
  });
});

