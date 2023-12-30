import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { UpdateUserFormValues } from './schema';
import { updateUser as updateUserApi } from '@/services/userApi';

import { useNavigate } from 'react-router-dom';

const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: updateUserApi,
  });
  const updateUser = async (data: UpdateUserFormValues): Promise<any> => {
    return new Promise((resolve, _) => {
      mutation.mutate(data, {
        onSuccess: (data) => {
          resolve(data);
          queryClient.setQueryData(['user'], data);
          queryClient.invalidateQueries({
            queryKey: ['user'],
          });
          const user_metadata = data.user_metadata || {};
          const { full_name } = user_metadata || {
            full_name: '',
          };
        
          toast.success(`data for ${full_name} update it !`);
          navigate('/', { replace: true });
        },
        onError: (error: Error) => {
          toast.error(error.message);
        },
      });
    });
  };

  return {
    updateUser,
    isUpdateUserLoading: mutation.isPending,
  };
};
export default useUpdateUser;
