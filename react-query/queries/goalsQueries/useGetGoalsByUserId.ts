import { useQuery } from '@tanstack/react-query';
import { EQueries } from '@/react-query/types';
import { useAppDispatch } from '@/storage/hooks';
import { setAlertAC } from '@/storage/alertSlice';
import { GoalService } from '@/api/services/goalService';

export const useGetGoalsByUserId = (userId: string) => {
  const dispatch = useAppDispatch();

  const fetchInitial = async () => {
    try {
      const data = await GoalService.getByUser(userId);
      return data;
    } catch (error: any) {
      dispatch(setAlertAC({ text: 'Something went wrong. Cannot get goals by this user.', mode: 'error' }));
      throw error;
    }
  };

  const {
    data: goals = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [EQueries.getGoalsByUserId, userId],
    queryFn: fetchInitial,
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  return {
    goals,
    isLoading,
    isError,
    error,
  };
};
