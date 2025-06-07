import { type ReactNode } from 'react';
import { useAuth, type UserRole } from '../context/AuthContext';

type ProtectedRouteProps = {
  children: ReactNode;
  allowedRoles?: UserRole[];
};

export const ProtectedComponent = ({
  children,
  allowedRoles = [],
}: ProtectedRouteProps) => {
  const { user, isAuthenticated } = useAuth();

  // If not authenticated, dont render 
  if (!isAuthenticated) {
    return null;
  }

  // If no specific roles required, allow access
  if (allowedRoles.length === 0) {
    return <>{children}</>;
  }

  // Check if user has required role
  const hasRequiredRole = user && allowedRoles.includes(user.role);

  // If user has required role, render children
  if (hasRequiredRole) {
    return <>{children}</>;
  }

  // If user is authenticated but doesn't have required role, show unauthorized
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Unauthorized</h1>
        <p>You don't have permission to access this page.</p>
      </div>
    </div>
  );
};

// Helper components for specific roles
export const AdminOnly = ({ children }: { children: ReactNode }) => (
  <ProtectedComponent allowedRoles={['admin']}>
    {children}
  </ProtectedComponent>
);

export const EmployeeOnly = ({ children }: { children: ReactNode }) => (
  <ProtectedComponent allowedRoles={['employee', 'admin']}>
    {children}
  </ProtectedComponent>
);

export const UserOnly = ({ children }: { children: ReactNode }) => (
  <ProtectedComponent allowedRoles={['user', 'employee', 'admin']}>
    {children}
  </ProtectedComponent>
);