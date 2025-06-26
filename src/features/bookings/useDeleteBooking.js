import { useMutation, useQueryClient } from '@tanstack/react-query';
//using toast in components
import { toast } from 'react-hot-toast';
import { deleteBooking as deleteBookingApi } from '../../services/apiBookings';

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: async (id) => await deleteBookingApi(id),

    onSuccess: () => {
      toast.success('Deleting booking was successful ');

      queryClient.invalidateQueries({
        // invalidate the query that is fetching the cabins to update the data in the ui so it will refetch and re render
        queryKey: ['bookings'],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteBooking };
}
