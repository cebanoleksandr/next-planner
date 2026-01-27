import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ICreateGoal } from '@/utils/interfaces';
import { EQueries } from '@/react-query/types';
import { useAppDispatch } from '@/storage/hooks';
import { setAlertAC } from '@/storage/alertSlice';
import { GoalService } from '@/api/services/goalService';

export const useCreateGoalMutation = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const createMutation = useMutation({
    mutationFn: (goalData: ICreateGoal) => GoalService.create(goalData),
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
