import { useQuery } from '@tanstack/react-query';
import { getBooking } from '../../services/apiBookings';
import { useParams, useSearchParams } from 'react-router-dom';
// creating react query use hook to fetch cabins so one hook gives cabons to any file needs it
export function useBooking() {
  // we get the id of the booking from the url
  const { id } = useParams();
  const { isLoading, data, error } = useQuery({
    queryKey: ['booking'],
    queryFn: () => getBooking(id),
    suspense: false,
  });

  return { isLoading, error, data };
}
