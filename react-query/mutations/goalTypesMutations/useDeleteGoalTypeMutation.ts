import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GoalTypeService } from '@/api/services/goalTypeServise';
import { EQueries } from '@/react-query/types';
import { useAppDispatch } from '@/storage/hooks';
import { setAlertAC } from '@/storage/alertSlice';

export const useDeleteGoalTypeMutation = () => {
  const queryClient = useQueryClient();
    const dispatch = useAppDispatch();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => GoalTypeService.delete(id),
    
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: [EQueries.getGoalTypes] 
      });
      
      queryClient.invalidateQueries({ 
        queryKey: [EQueries.getGoalTypeById] 
      });
    },
    onError: (error) => {
      dispatch(setAlertAC({ text: error.message, mode: 'error' }));
      console.error('Delete Error:', error);
    }
  });

  return {
    deleteGoalType: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    error: deleteMutation.error,
    isError: deleteMutation.isError,
    isSuccess: deleteMutation.isSuccess,
  };
};
