import { UpdateUserFormValues } from '@/features/updateUser/schema';
import supabase, { supabaseImagePathStorage } from './supabase';

const updateUser = async (userData: UpdateUserFormValues): Promise<any> => {
  const photoName = `${new Date().getTime()}-${userData.avatar_url
    ?.name}`.replaceAll('/', '');

  const { error: StorageError } = await supabase.storage
    .from('avater')
    .upload(photoName, userData.avatar_url as File);
  if (StorageError) throw new Error(StorageError.message);
  const user = {
    ...userData,
    avatar_url: `${supabaseImagePathStorage}/avater/${photoName}`,
  };
  const { data, error } = await supabase.auth.updateUser({
    data: user,
  });
  if (error) throw new Error(error.message);
  return data;
};

export { updateUser };
