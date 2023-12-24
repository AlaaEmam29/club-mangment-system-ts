import { register as registerApi } from '@/services/authApi';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export function useRegister() {
  const navigate = useNavigate();
  const { isPending: isRegisterLoading, mutate: registerUser } = useMutation({
    mutationFn: registerApi,
    onSuccess: () => {
      navigate('/login', { replace: true });
    },
    onError: (err) => err.message,
  });

  return { isRegisterLoading, registerUser };
}
