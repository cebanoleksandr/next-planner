import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EQueries } from '@/react-query/types';
import { useAppDispatch } from '@/storage/hooks';
import { setAlertAC } from '@/storage/alertSlice';
import { DeleteCustomFieldDTO } from '@/utils/interfaces';
import { CustomFieldDefinitionService } from '@/api/services/customFieldDefinitionService';

export const useDeleteCustomFieldDefinitionMutation = () => {
  const queryClient = useQueryClient();
    const dispatch = useAppDispatch();

  const deleteMutation = useMutation({
    mutationFn: (data: DeleteCustomFieldDTO) => CustomFieldDefinitionService.delete(data),
    
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: [EQueries.getCustomFieldAnswer] 
      });
      
      queryClient.invalidateQueries({ 
        queryKey: [EQueries.getGoalTypes] 
      });

      dispatch(setAlertAC({ text: 'Custom Field deleted successfully', mode: 'success' }));
    },
    onError: (error) => {
      dispatch(setAlertAC({ text: error.message, mode: 'error' }));
      console.error('Delete Error:', error);
    }
  });

  return {
    deleteCustomField: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    error: deleteMutation.error,
    isError: deleteMutation.isError,
    isSuccess: deleteMutation.isSuccess,
  };
};
