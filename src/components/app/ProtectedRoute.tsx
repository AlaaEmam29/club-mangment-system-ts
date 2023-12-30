import { Navigate } from 'react-router-dom';

import { useUser } from '@/features/user/useUser';
import MainLoader from './MainLoader';
export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  const { user , isLoading } = useUser();
console.log(user, 'isAuthenticated');
  if (isLoading) {
    return <MainLoader />;
  } else if (!user && !isLoading) {
    return <Navigate to="/login" replace />;
  }
  if (user) return children;
}
