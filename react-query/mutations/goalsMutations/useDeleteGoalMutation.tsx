import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EQueries } from '@/react-query/types';
import { useAppDispatch } from '@/storage/hooks';
import { setAlertAC } from '@/storage/alertSlice';
import { GoalService } from '@/api/services/goalService';

export const useDeleteGoalMutation = () => {
  const queryClient = useQueryClient();
    const dispatch = useAppDispatch();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => GoalService.delete(id),
    
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: [EQueries.getGoals] 
      });
      
      queryClient.invalidateQueries({ 
        queryKey: [EQueries.getGoalById] 
      });

      dispatch(setAlertAC({ text: 'Goal deleted successfully', mode: 'success' }));
    },
    onError: (error) => {
      dispatch(setAlertAC({ text: error.message, mode: 'error' }));
      console.error('Delete Error:', error);
    }
  });

  return {
    deleteGoal: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    error: deleteMutation.error,
    isError: deleteMutation.isError,
    isSuccess: deleteMutation.isSuccess,
  };
};
