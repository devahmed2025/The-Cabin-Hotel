import { useQuery } from '@tanstack/react-query';
import { getStaysTodayActivity } from '../../services/apiBookings';

export function useTodayActivity() {
  const { isLoading, data: stays } = useQuery({ queryFn: getStaysTodayActivity, queryKey: ['todayActivity'] });
  return { stays, isLoading }; 
}
