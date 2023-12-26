import { authWithGoogle } from '@/services/authApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

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
    onError: (err: Error) => toast.error(err.message),
  });
  return { isAuthLoading, authGoogle };
};
export default useGoogleAuth;
