import { logout as logoutApi } from '@/services/authApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useNavigate } from 'react-router-dom';
export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isPending: isLogout, mutate: userLogout } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate('/login', { replace: true });
    },
    onError: (err) => err.message,
  });

  return { isLogout, userLogout };
}
