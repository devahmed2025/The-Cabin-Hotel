// import { useQuery } from '@tanstack/react-query';
// import { subDays } from 'date-fns';
// import { useSearchParams } from 'react-router-dom';
// import { getBookingsAfterDate } from '../../services/apiBookings';

// export function useRecentBookings() {
//   const [searchParams] = useSearchParams();

//   const numDays = !searchParams.get('last') ? 7 : Number(searchParams.get('last'));
//   const queryDate = subDays(new Date(), numDays).toISOString();

//   const { isLoading, data: bookings } = useQuery({
//     queryFn: () => getBookingsAfterDate(queryDate),
//     queryKey: ['bookings', `Last-${numDays}`],
//   });

//   return { isLoading, bookings };
// }
import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import { getBookingsAfterDate } from '../../services/apiBookings';

export function useRecentBookings() {
  const [searchParams] = useSearchParams();

  // 1. More robust numDays parsing with validation
  const numDays = Math.max(1, Math.min(
    Number(searchParams.get('last')) || 7, // Default to 7 if invalid
    30 // Maximum 30 days
  ));

  // 2. Calculate query date with validation
  const today = new Date();
  const queryDate = subDays(today, numDays).toISOString();

  // 3. Enhanced query configuration
  const { isLoading, data: bookings } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ['bookings', `Last-${numDays}`],
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    retry: 2, // Retry failed requests twice
  });

  // 4. Return validated numDays and safe fallback for bookings
  return { 
    isLoading, 
    bookings: bookings || [], // Ensure always an array
    numDays // Now guaranteed to be a number between 1-30
  };
}
