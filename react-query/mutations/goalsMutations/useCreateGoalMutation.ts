import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EQueries } from '@/react-query/types';
import { useAppDispatch } from '@/storage/hooks';
import { setAlertAC } from '@/storage/alertSlice';
import { goalService } from '@/api/services/goalService';
import { GoalRequest } from '@/utils/interfaces';

export const useCreateGoalMutation = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const createMutation = useMutation({
    mutationFn: (goalData: GoalRequest) => goalService.createGoal(goalData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EQueries.getGoals] });
      dispatch(setAlertAC({ text: 'Goal created successfully', mode: 'success' }));
    },
    onError: error => {
      dispatch(setAlertAC({ text: error.message, mode: 'error' }));
    }
  });

  return {
    data: createMutation.data,
    createGoal: createMutation.mutate,
    isCreating: createMutation.isPending,
    error: createMutation.error,
    isError: createMutation.isError,
  };
};
