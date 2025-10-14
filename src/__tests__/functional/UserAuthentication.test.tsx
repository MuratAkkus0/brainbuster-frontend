/// <reference types="@testing-library/jest-dom" />
import { renderHook, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useLogin } from '@/hooks/auth/useLogin';
import { createTestStore } from '@/test-utils';
import axios from 'axios';
import { mockSuccessfulLogin, mockFailedLogin, resetMocks } from '@/test-utils/mockApi';
import { toast } from 'sonner';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock toast
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock navigate
const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate,
}));

describe('User Authentication - Functional Tests', () => {
  beforeEach(() => {
    resetMocks();
    mockNavigate.mockClear();
    (toast.success as jest.Mock).mockClear();
    (toast.error as jest.Mock).mockClear();
  });

  describe('Login Hook Integration', () => {
    it('should successfully authenticate user and update store', async () => {
      const store = createTestStore({
        user: {
          user: null,
          isLoading: false,
        },
      });

      mockSuccessfulLogin();

      const { result } = renderHook(() => useLogin(), {
        wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
      });

      // Call login
      await result.current({
        username: 'testuser',
        password: 'Test123!@#',
      });

      // Wait for async operations
      await waitFor(() => {
        // Check store was updated
        const state = store.getState();
        expect(state.user.user).not.toBeNull();
        expect(state.user.user?.user.username).toBe('testuser');
      });

      // Check success toast was shown
      expect(toast.success).toHaveBeenCalled();
    });

    it('should handle authentication failure gracefully', async () => {
      const store = createTestStore({
        user: {
          user: null,
          isLoading: false,
        },
      });

      mockFailedLogin();

      const { result } = renderHook(() => useLogin(), {
        wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
      });

      // Call login with wrong credentials
      const response = await result.current({
        username: 'wronguser',
        password: 'wrongpass',
      });

      // Should return error
      expect(response).toHaveProperty('isError', true);

      // Store should remain empty
      const state = store.getState();
      expect(state.user.user).toBeNull();

      // Error toast should be shown
      expect(toast.error).toHaveBeenCalled();
    });

    it('should handle network errors', async () => {
      const store = createTestStore({
        user: {
          user: null,
          isLoading: false,
        },
      });

      // Mock network error
      mockedAxios.post.mockRejectedValueOnce(new Error('Network error'));

      const { result } = renderHook(() => useLogin(), {
        wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
      });

      // Call login
      const response = await result.current({
        username: 'testuser',
        password: 'Test123!@#',
      });

      // Should return error
      expect(response).toHaveProperty('isError', true);

      // Error toast should be shown
      expect(toast.error).toHaveBeenCalled();
    });
  });

  describe('Authentication State Management', () => {
    it('should maintain authentication state across store', () => {
      const store = createTestStore({
        user: {
          user: {
            token: 'test-token',
            refreshToken: 'test-refresh-token',
            user: {
              id: 1,
              username: 'testuser',
              role: 'user',
              highScore: 100,
              createdAt: '2024-01-01T00:00:00.000Z',
            },
            message: 'Login successful',
          },
          isLoading: false,
        },
      });

      const state = store.getState();
      
      // Check user is authenticated
      expect(state.user.user).not.toBeNull();
      expect(state.user.user?.token).toBe('test-token');
      expect(state.user.user?.user.username).toBe('testuser');
    });

    it('should handle logout state', () => {
      const store = createTestStore({
        user: {
          user: null,
          isLoading: false,
        },
      });

      const state = store.getState();
      
      // Check user is not authenticated
      expect(state.user.user).toBeNull();
    });
  });

  describe('API Integration', () => {
    it('should send correct payload to login endpoint', async () => {
      const store = createTestStore({
        user: {
          user: null,
          isLoading: false,
        },
      });

      mockSuccessfulLogin();

      const { result } = renderHook(() => useLogin(), {
        wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
      });

      await result.current({
        username: 'testuser',
        password: 'Test123!@#',
      });

      await waitFor(() => {
        expect(mockedAxios.post).toHaveBeenCalledWith(
          '/api/auth/login',
          {
            username: 'testuser',
            password: 'Test123!@#',
          },
          expect.objectContaining({
            headers: expect.objectContaining({
              'Content-Type': 'application/json',
            }),
            withCredentials: true,
          })
        );
      });
    });

    it('should include auth headers in request', async () => {
      const store = createTestStore({
        user: {
          user: null,
          isLoading: false,
        },
      });

      mockSuccessfulLogin();

      const { result } = renderHook(() => useLogin(), {
        wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
      });

      await result.current({
        username: 'testuser',
        password: 'Test123!@#',
      });

      await waitFor(() => {
        const callArgs = mockedAxios.post.mock.calls[0];
        expect(callArgs[2]).toHaveProperty('withCredentials', true);
        expect(callArgs[2]).toHaveProperty('headers');
      });
    });
  });
});

