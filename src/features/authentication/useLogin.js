import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginAPi } from '../../services/apiAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutateAsync: login, isLoading: isLogging } = useMutation({
    mutationFn: ({ email, password }) => loginAPi({ email, password }),
    onSuccess: (user) => {
      // adding user to the react query cache
      queryClient.setQueryData({ queryKey: ['user'], user });
      toast.success('Logged in successfully');
      console.log('data of user from useLogin', user);
      navigate('/dashboard');
    },
    onError: (err) => toast.error(err.message),
  });

  return { isLogging, login };
}
