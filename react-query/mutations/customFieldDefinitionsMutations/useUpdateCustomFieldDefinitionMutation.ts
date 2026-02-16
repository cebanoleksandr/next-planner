import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IGoal, UpdateCustomFieldDTO } from '@/utils/interfaces';
import { EQueries } from '@/react-query/types';
import { useAppDispatch } from '@/storage/hooks';
import { setAlertAC } from '@/storage/alertSlice';
import { CustomFieldDefinitionService } from '@/api/services/customFieldDefinitionService';

export const useUpdateCustomFieldDefinitionMutation = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const updateMutation = useMutation({
    mutationFn: (updateCustomFieldDTO: UpdateCustomFieldDTO) => 
      CustomFieldDefinitionService.update(updateCustomFieldDTO),
    
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: [EQueries.getGoalTypes] 
      });
      dispatch(setAlertAC({ text: 'Custom Field is updated', mode: 'success' }));
    },
    onError: (error) => {
      dispatch(setAlertAC({ text: error.message, mode: 'error' }));
    }
  });

  return {
    data: updateMutation.data,
    updateCustomField: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    error: updateMutation.error,
    isError: updateMutation.isError,
  };
};
