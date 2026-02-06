import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IGoal } from '@/utils/interfaces';
import { EQueries } from '@/react-query/types';
import { useAppDispatch } from '@/storage/hooks';
import { setAlertAC } from '@/storage/alertSlice';
import { GoalService } from '@/api/services/goalService';

export interface UpdateGoalParams {
  id: string;
  data: Partial<IGoal>;
}

export const useUpdateGoalMutation = () => {
  const queryClient = useQueryClient();
    const dispatch = useAppDispatch();

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: UpdateGoalParams) => 
      GoalService.update(id, data),
    
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ 
        queryKey: [EQueries.getGoals] 
      });
      
      queryClient.invalidateQueries({ 
        queryKey: [EQueries.getGoalById, variables.id] 
      });
    },
    onError: (error) => {
      dispatch(setAlertAC({ text: error.message, mode: 'error' }));
    }
  });

  return {
    data: updateMutation.data,
    updateGoal: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    error: updateMutation.error,
    isError: updateMutation.isError,
  };
};
