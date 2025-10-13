export type TLoginUser = {
  email: string;
  password: string;
  username?: string;
  role?: 'user' | 'admin';
};