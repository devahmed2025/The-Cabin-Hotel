import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../../services/apiCabins';
import { useSearchParams } from 'react-router-dom';
// creating react query use hook to fetch cabins so one hook gives cabons to any file needs it
export function useCabins() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ['cabins'],
    queryFn: getCabins,
    suspense: false, // VERY IMPORTANT
  });

  return { isLoading, error, cabins };
}
