import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Goal, GoalRequest } from '@/utils/interfaces';
import { EQueries } from '@/react-query/types';
import { useAppDispatch } from '@/storage/hooks';
import { setAlertAC } from '@/storage/alertSlice';
import { goalService } from '@/api/services/goalService';

export interface UpdateGoalParams {
  id: string;
  data: GoalRequest;
}

export const useUpdateGoalMutation = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: UpdateGoalParams) => 
      goalService.updateGoal(id, data),
    
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
