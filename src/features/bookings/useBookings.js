import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';

const PAGE_SIZE = 8;

export function useBookings() {
  const [searchParams] = useSearchParams();
  const filter = searchParams.get('status') || 'all';
  const sortBy = searchParams.get('sortBy') || 'startDate-desc';
  const page = +searchParams.get('page') || 1;

  const queryClient = useQueryClient();

  const { isLoading, data, error } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
    suspense: false,
    keepPreviousData: true,
  });

  // 🟡 Prefetch next page
  const count = data?.count ?? 0;
  const totalPages = Math.ceil(count / PAGE_SIZE);

  if (page < totalPages) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  }
  // Prefetch prev page
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  }

  return {
    isLoading,
    bookings: data?.bookings ?? [],
    count,
    error,
  };
}
