import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IGoalType } from '@/utils/interfaces';
import { GoalTypeService } from '@/api/services/goalTypeServise';
import { EQueries } from '@/react-query/types';
import { useAppDispatch } from '@/storage/hooks';
import { setAlertAC } from '@/storage/alertSlice';

export interface UpdateGoalTypeParams {
  id: string;
  data: Partial<IGoalType>;
}

export const useUpdateGoalTypeMutation = () => {
  const queryClient = useQueryClient();
    const dispatch = useAppDispatch();

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: UpdateGoalTypeParams) => 
      GoalTypeService.update(id, data),
    
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ 
        queryKey: [EQueries.getGoalTypes] 
      });
      
      queryClient.invalidateQueries({ 
        queryKey: [EQueries.getGoalTypeById, variables.id] 
      });
    },
    onError: (error) => {
      dispatch(setAlertAC({ text: error.message, mode: 'error' }));
    }
  });

  return {
    data: updateMutation.data,
    updateGoalType: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    error: updateMutation.error,
    isError: updateMutation.isError,
  };
};
