import { updateUser as updateUserApi } from '@/services/authApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const useUpdatePassword = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: updatePassword, isPending: isUpdatePasswordLoading } =
    useMutation({
      mutationFn: updateUserApi,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['user'] });

        navigate('/login', { replace: true });
      },
      onError: (err) => toast.error(err.message),
    });
  return { updatePassword, isUpdatePasswordLoading };
};
export default useUpdatePassword;
