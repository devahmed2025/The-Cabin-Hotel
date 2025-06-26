import supabase, { supabaseUrl } from './supabase';
import toast from 'react-hot-toast';

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  console.log('data', data);
  if (error) throw new Error('something went wrong, please try again later.', error.message);
}

export async function getCurrentUser() {
  try {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      console.error('Error fetching user:', error.message);
      toast.error('Failed to fetch user session');
      return null;
    }

    return data?.user;
  } catch (err) {
    console.error('Unexpected error:', err);
    toast.error('Unexpected error occurred');
    return null;
  }
}

export async function logOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error('error', error.message);
}

// export async function signup({ email, password, fullName }) {
//   const { data, error } = await supabase.auth.signUp({
//     email,
//     password,
//     fullName,
//   });
//   if (error) throw new Error('error', error.message);
//   return data;
// }

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: '',
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  let updateddata;
  if (password) updateddata = { password };
  if (fullName) updateddata = { data: { fullName } };

  //1 update password or full namme

  const { data, error } = await supabase.auth.updateUser();
  if (error) throw new Error('error', error.message);
  if (!avatar) return data;

  //2 upload img to user
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: uploadError } = await supabase.storage.from('avatars').upload(fileName, avatar);
  if (uploadError) throw new Error('error', uploadError.message);

  //3 update avatar of user
  //https://ajnszqhdwjtzomyvhomw.supabase.co/storage/v1/object/public/avatars//avatar-82621f90-f7de-486c-9acc-88af84eede2c-0.9241753866342292
  const { data: updatedUser, error: updateUserError } = await supabase.auth.updateUser({
    data: { avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}` },
  });
  if (updateUserError) throw new Error('error', updateUserError.message);

  return updatedUser;
}
