export const mockUser = {
  id: 1,
  username: 'testuser',
  role: 'user',
  highScore: 100,
  createdAt: '2024-01-01T00:00:00.000Z',
};

export const mockAdminUser = {
  id: 2,
  username: 'adminuser',
  role: 'admin',
  highScore: 500,
  createdAt: '2024-01-01T00:00:00.000Z',
};

export const mockAuthResponse = {
  token: 'mock-jwt-token',
  refreshToken: 'mock-refresh-token',
  user: mockUser,
  message: 'Login successful',
};

export const mockRegisterPayload = {
  username: 'newuser',
  password: 'Test123!@#',
};

export const mockLoginPayload = {
  username: 'testuser',
  password: 'Test123!@#',
};

