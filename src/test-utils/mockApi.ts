import axios from 'axios';

export const mockAxios = axios as jest.Mocked<typeof axios>;

// Mock successful responses
export const mockSuccessfulLogin = () => {
  mockAxios.post.mockResolvedValueOnce({
    data: {
      token: 'mock-jwt-token',
      refreshToken: 'mock-refresh-token',
      user: {
        id: 1,
        username: 'testuser',
        role: 'user',
        highScore: 100,
        createdAt: '2024-01-01T00:00:00.000Z',
      },
      message: 'Login successful',
    },
  });
};

export const mockFailedLogin = () => {
  mockAxios.post.mockRejectedValueOnce({
    response: {
      status: 401,
      data: {
        message: 'Invalid credentials',
      },
    },
  });
};

export const mockSuccessfulRegister = () => {
  mockAxios.post.mockResolvedValueOnce({
    data: {
      token: 'mock-jwt-token',
      refreshToken: 'mock-refresh-token',
      user: {
        id: 3,
        username: 'newuser',
        role: 'user',
        highScore: 0,
        createdAt: '2024-01-01T00:00:00.000Z',
      },
      message: 'Registration successful',
    },
  });
};

export const mockFailedRegister = () => {
  mockAxios.post.mockRejectedValueOnce({
    response: {
      status: 409,
      data: {
        message: 'Username already exists',
      },
    },
  });
};

export const resetMocks = () => {
  jest.clearAllMocks();
};

