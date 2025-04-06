'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
  const { authState } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authState.isLoading) {
      if (!authState.isAuthenticated) {
        router.push('/login');
      } else if (adminOnly && !authState.user?.isAdmin) {
        router.push('/');
      }
    }
  }, [authState.isLoading, authState.isAuthenticated, authState.user, router, adminOnly]);

  if (authState.isLoading) {
    return <div>Loading...</div>;
  }

  if (!authState.isAuthenticated) {
    return null;
  }

  if (adminOnly && !authState.user?.isAdmin) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;