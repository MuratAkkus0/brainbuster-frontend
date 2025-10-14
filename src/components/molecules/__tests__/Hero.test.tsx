import { screen } from '@testing-library/react';
import { Hero } from '@/components/molecules/Hero';
import { renderWithProviders } from '@/test-utils';
import { mockUser, mockAdminUser, mockAuthResponse } from '@/test-utils/mockData';

describe('Hero Component', () => {
  describe('Unauthenticated User', () => {
    it('should display default welcome message', () => {
      renderWithProviders(<Hero />, {
        preloadedState: {
          user: {
            user: null,
            isLoading: false,
          },
        },
      });

      expect(screen.getByText(/test yourself now/i)).toBeInTheDocument();
    });

    it('should display Sign in and Sign up buttons', () => {
      renderWithProviders(<Hero />, {
        preloadedState: {
          user: {
            user: null,
            isLoading: false,
          },
        },
      });

      expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
    });

    it('should not display Play Quiz button', () => {
      renderWithProviders(<Hero />, {
        preloadedState: {
          user: {
            user: null,
            isLoading: false,
          },
        },
      });

      expect(screen.queryByRole('button', { name: /play quiz/i })).not.toBeInTheDocument();
    });
  });

  describe('Authenticated Regular User', () => {
    it('should display personalized welcome message', () => {
      renderWithProviders(<Hero />, {
        preloadedState: {
          user: {
            user: { ...mockAuthResponse, user: mockUser },
            isLoading: false,
          },
        },
      });

      expect(screen.getByText(/welcome back, testuser!/i)).toBeInTheDocument();
    });

    it('should display Go to Profile button', () => {
      renderWithProviders(<Hero />, {
        preloadedState: {
          user: {
            user: { ...mockAuthResponse, user: mockUser },
            isLoading: false,
          },
        },
      });

      expect(screen.getByRole('button', { name: /go to profile/i })).toBeInTheDocument();
    });

    it('should display Play Quiz button', () => {
      renderWithProviders(<Hero />, {
        preloadedState: {
          user: {
            user: { ...mockAuthResponse, user: mockUser },
            isLoading: false,
          },
        },
      });

      expect(screen.getByRole('button', { name: /play quiz/i })).toBeInTheDocument();
    });

    it('should not display Sign in/Sign up buttons', () => {
      renderWithProviders(<Hero />, {
        preloadedState: {
          user: {
            user: { ...mockAuthResponse, user: mockUser },
            isLoading: false,
          },
        },
      });

      expect(screen.queryByRole('button', { name: /sign in/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /sign up/i })).not.toBeInTheDocument();
    });
  });

  describe('Authenticated Admin User', () => {
    it('should display Go to Dashboard button for admin', () => {
      renderWithProviders(<Hero />, {
        preloadedState: {
          user: {
            user: { ...mockAuthResponse, user: mockAdminUser },
            isLoading: false,
          },
        },
      });

      expect(screen.getByRole('button', { name: /go to dashboard/i })).toBeInTheDocument();
    });

    it('should not display Go to Profile button for admin', () => {
      renderWithProviders(<Hero />, {
        preloadedState: {
          user: {
            user: { ...mockAuthResponse, user: mockAdminUser },
            isLoading: false,
          },
        },
      });

      expect(screen.queryByRole('button', { name: /go to profile/i })).not.toBeInTheDocument();
    });
  });
});

