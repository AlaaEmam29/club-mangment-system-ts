import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { login } from '@/services/authApi';

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPaused: isLoginLoading, mutate: userLogin } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log(data, 'data from register');
      const { user, session } = data;
      queryClient.setQueryData(['user', user?.id || 'user_id'], user);
      queryClient.setQueryData(
        ['session', session?.access_token || 'access_token'],
        session
      );
      navigate('/update-user', { replace: true });
    },
    onError: (err) => err.message,
  });

  return { isLoginLoading, userLogin };
}
