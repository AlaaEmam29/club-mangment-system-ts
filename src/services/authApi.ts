import supabase from './supabase';
const authWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });
  if (error) throw new Error(error.message);
  console.log(data);
  return data;
};
const getUser = async () => {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) {
    throw new Error(error.message);
  }

  return user;
};
const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
};
const forgetPasswordEmail = async ({ email }: { email: string }) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) {
    throw new Error(error.message);
  }
};

const updateUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { data, error } = await supabase.auth.updateUser({
    email,
    password,
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw new Error('Invalid Login. Please check your email and password.');
  }
  return data;
};
const register = async ({
  email,
  password,
  fullName,
}: {
  email: string;
  password: string;
  fullName: string;
}) => {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        avatar_url: '',
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
export {
  authWithGoogle,
  getUser,
  logout,
  forgetPasswordEmail,
  updateUser,
  login,
  register,
};
