import { useQuery } from '@tanstack/react-query';
import { EQueries } from '@/react-query/types';
import { useAppDispatch } from '@/storage/hooks';
import { setAlertAC } from '@/storage/alertSlice';
import { GoalService } from '@/api/services/goalService';

export const useGetGoalById = (id: string) => {
  const dispatch = useAppDispatch();

  const fetchInitial = async () => {
    try {
      const data = await GoalService.getById(id);
      return data;
    } catch (error: any) {
      dispatch(setAlertAC({ text: 'Something went wrong. Cannot get goal.', mode: 'error' }));
      throw error;
    }
  };

  const {
    data: goal = null,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [EQueries.getGoalById, id],
    queryFn: fetchInitial,
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });

  return {
    goal,
    isLoading,
    isError,
    error,
  };
};
