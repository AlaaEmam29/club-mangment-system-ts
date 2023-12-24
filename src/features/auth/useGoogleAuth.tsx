import { authWithGoogle } from '@/services/authApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const useGoogleAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isPending: isAuthLoading, mutate: authGoogle } = useMutation({
    mutationFn: authWithGoogle,
    onSuccess: (data) => {
      console.log(data, 'data');

      queryClient.setQueryData(['user'], data);
      navigate('/update-user', { replace: true });
    },
    onError: (err: Error) => err.message,
  });
  return { isAuthLoading, authGoogle };
};
export default useGoogleAuth;
