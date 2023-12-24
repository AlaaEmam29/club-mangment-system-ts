import { getUser } from '@/services/authApi';
import { useQuery } from '@tanstack/react-query';
type UserInfo = {
  user: any | null;
  isLoading: boolean;
  error: Error | null;
  isAuthenticated: boolean;
};
export function useUser() {
  const {
    isLoading,
    data: user,
    error,
  } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });

  return {
    isLoading,
    error,
    user,
    isAuthenticated: user?.role === 'authenticated',
  } as UserInfo;
}
