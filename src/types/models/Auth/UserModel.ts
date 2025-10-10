export interface UserModel {
  token: string;
  refreshToken: string;
  user: {
    id: number;
    username: string;
    role: string;
    highScore: number;
    createdAt: Date;
  };
  message: string;
}
