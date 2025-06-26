import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking as updateBookingApi } from '../../services/apiBookings';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
//   const { id } = useParams();
  const { mutate: updateBooking, isLoading: isCheckingIn } = useMutation({
    mutationFn: (id) => updateBookingApi(id, { isPaid: true, status: 'checked-in' }),
    onSuccess: (data) => {
      toast.success(`checkin Completed Successfully for Booking ID: ${data.id}`);
      queryClient.invalidateQueries({ active: true });
      navigate('/')
    },
    
    onError: () => {
      toast.error('Something went wrong');
    },
  });

  return { updateBooking, isCheckingIn };
}
