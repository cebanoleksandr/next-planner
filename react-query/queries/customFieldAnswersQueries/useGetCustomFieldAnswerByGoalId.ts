import { useQuery } from '@tanstack/react-query';
import { EQueries } from '@/react-query/types';
import { useAppDispatch } from '@/storage/hooks';
import { setAlertAC } from '@/storage/alertSlice';
import { CustomFieldAnswerService } from '@/api/services/customFieldAnswerService';

export const useGetCustomFieldAnswerByGoalId = (goalId: string) => {
  const dispatch = useAppDispatch();

  const fetchInitial = async () => {
    try {
      const data = await CustomFieldAnswerService.getByGoal(goalId);
      return data;
    } catch (error: any) {
      dispatch(setAlertAC({ text: 'Something went wrong. Cannot get data.', mode: 'error' }));
      throw error;
    }
  };

  const {
    data: customFieldAnswer = null,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [EQueries.getCustomFieldAnswer, goalId],
    queryFn: fetchInitial,
    enabled: !!goalId,
    staleTime: 5 * 60 * 1000,
  });

  return {
    customFieldAnswer,
    isLoading,
    isError,
    error,
  };
};
