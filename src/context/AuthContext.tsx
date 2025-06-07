import { createContext, useContext, useState, type ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export type UserRole = 'user' | 'employee' | 'admin';

export type User = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Check if user is logged in on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // TODO: Verify token with backend
      // For now, we'll just set a dummy user
      // For demo purposes, setting a default admin user
      // In a real app, this would come from your authentication API
      setUser({
        id: '1',
        email: 'admin@example.com',
        name: 'Admin User',
        role: 'admin',
      });
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // TODO: Replace with actual API call
      // const response = await api.post('/auth/login', { email, password });
      // const { token, user } = response.data;
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, assign role based on email
      // In a real app, this would come from your authentication API
      const getRoleFromEmail = (email: string): UserRole => {
        if (email.includes('admin@')) return 'admin';
        if (email.includes('employee@')) return 'employee';
        return 'user';
      };
      
      const mockUser = {
        id: '1',
        email,
        name: email.split('@')[0],
        role: getRoleFromEmail(email),
      };
      
      // localStorage.setItem('token', token);
      setUser(mockUser);
      navigate('/');
    } catch (err) {
      setError('Failed to login. Please check your credentials.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // TODO: Replace with actual API call
      // const response = await api.post('/auth/register', { name, email, password });
      // const { token, user } = response.data;
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // New users get 'user' role by default
      const mockUser = {
        id: '1',
        email,
        name,
        role: 'user' as const,
      };
      
      // localStorage.setItem('token', token);
      setUser(mockUser);
      navigate('/');
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    // localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    loading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
