import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking as updateBookingApi } from '../../services/apiBookings';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

export function useCheckOut() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  //   const { id } = useParams();
  const { mutate: updateBooking, isLoading: isCheckingIn } = useMutation({
    mutationFn: (id) => updateBookingApi(id, { status: 'checked-out' }),
    onSuccess: (data) => {
      toast.success(`Check Out Completed Successfully for Booking ID: ${data.id}`);
      queryClient.invalidateQueries({ active: true });
      navigate('/');
    },

    onError: () => {
      toast.error('Something went wrong');
    },
  });

  return { updateBooking, isCheckingIn };
}
