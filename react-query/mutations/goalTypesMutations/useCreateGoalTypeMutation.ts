import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IGoalType } from '@/utils/interfaces';
import { GoalTypeService } from '@/api/services/goalTypeServise';
import { EQueries } from '@/react-query/types';
import { useAppDispatch } from '@/storage/hooks';
import { setAlertAC } from '@/storage/alertSlice';

export const useCreateGoalTypeMutation = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const createMutation = useMutation({
    mutationFn: (goalTypeData: Partial<IGoalType>) => GoalTypeService.create(goalTypeData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EQueries.getGoalTypes] });
    },
    onError: error => {
      dispatch(setAlertAC({ text: error.message, mode: 'error' }));
    }
  });

  return {
    data: createMutation.data,
    createGoalType: createMutation.mutate,
    isCreating: createMutation.isPending,
    error: createMutation.error,
    isError: createMutation.isError,
  };
};
