import { useQuery } from '@tanstack/react-query';
import { GoalTypeService } from '@/api/services/goalTypeServise';
import { EQueries } from '@/react-query/types';
import { useAppDispatch } from '@/storage/hooks';
import { setAlertAC } from '@/storage/alertSlice';

export const useGetGoalTypeById = (id: string | undefined) => {
  const dispatch = useAppDispatch();

  const fetchInitial = async () => {
    try {
      const data = await GoalTypeService.getById(id!);
      return data;
    } catch (error: any) {
      dispatch(setAlertAC({ text: 'Something went wrong. Cannot get data.', mode: 'error' }));
      throw error;
    }
  };

  const {
    data: goalType = null,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [EQueries.getGoalTypeById, id!],
    queryFn: fetchInitial,
    enabled: !!id,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  return {
    goalType,
    isLoading,
    isError,
    error,
  };
};