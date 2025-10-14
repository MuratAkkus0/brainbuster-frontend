export interface User {
  id: number;
  username: string;
  role: string;
  highScore: number;
  createdAt: string;
}

export interface CreateUserPayload {
  username: string;
  password: string;
}

export interface UpdateUserPayload {
  username: string;
  password: string;
}
