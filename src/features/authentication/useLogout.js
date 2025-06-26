import { useQuery } from '@tanstack/react-query';

import { logOut as logOutApi } from '../../services/apiAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
//using toast in components
import { toast } from 'react-hot-toast';
import { replace, useNavigate } from 'react-router-dom';

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isLoading, mutate: logOut } = useMutation({
    mutationFn: async () => await logOutApi(),

    onSuccess: () => {
      toast.success('Logging out successful ');
      navigate('/login', replace);
      queryClient.removeQueries();
    },
    onError: (err) => toast.error(err.message),
  });

  return { isLoading, logOut };
}
