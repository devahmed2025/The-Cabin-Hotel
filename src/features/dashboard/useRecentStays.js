// import { useQuery } from '@tanstack/react-query';
// import { subDays } from 'date-fns';
// import { useSearchParams } from 'react-router-dom';
// import { getStaysAfterDate } from '../../services/apiBookings';

// export function useRecentStays() {
//   const [searchParams] = useSearchParams();

//   const numDays = !searchParams.get('last') ? 7 : Number(searchParams.get('last'));
//   const queryDate = subDays(new Date(), numDays).toISOString();

//   const { isLoading, data: stays } = useQuery({
//     queryFn: () => getStaysAfterDate(queryDate),
//     queryKey: ['stays', `Last-${numDays}`],
//   });

//   const confirmedStays = stays?.filter((stay) => stay?.status === 'checked-in' || stay?.status === 'checked-out');
//   return { isLoading, stays, confirmedStays };
// }

import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import { getStaysAfterDate } from '../../services/apiBookings';

export function useRecentStays() {
  const [searchParams] = useSearchParams();

  // 1. More robust numDays parsing
  const numDays = parseInt(searchParams.get('last') )|| 7;
  
  // 2. Validate numDays range
  const validatedNumDays = Math.min(Math.max(numDays, 1), 30); // Limit between 1-30 days
  
  // 3. Date handling with validation
  const today = new Date();
  const queryDate = subDays(today, validatedNumDays - 1).toISOString();

  // 4. Improved query with error handling
  const { isLoading, data: stays, error } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ['stays', `Last-${validatedNumDays}`],
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    retry: 2, // Retry failed requests twice
  });

  // 5. Safer filtering with null checks
  const confirmedStays = stays?.filter((stay) => 
    stay?.status && ['checked-in', 'checked-out'].includes(stay.status)
  ) || [];

  return { 
    isLoading, 
    stays: stays || [], // Provide fallback empty array
    confirmedStays,
    numDays: validatedNumDays, // Return the validated number of days
    error // Return error for error boundary handling
  };
}