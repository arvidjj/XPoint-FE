export type UserRole = 'user' | 'employee' | 'admin';

export type AuthUser = {
  id: string;
  email: string;
  nombre: string;
  token: string;
  role: UserRole;
};