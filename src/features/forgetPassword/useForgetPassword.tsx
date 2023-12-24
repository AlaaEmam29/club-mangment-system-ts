import { forgetPasswordEmail as forgetPasswordEmailApi } from '@/services/authApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
const useForgetPassword = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: forgetPassword, isPending: isForgetPasswordLoading } =
    useMutation({
      mutationFn: forgetPasswordEmailApi,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['user'] });

        navigate('/login', { replace: true });
      },
      onError: (err) => err.message,
    });
  return { forgetPassword, isForgetPasswordLoading };
};
export default useForgetPassword;
