import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ICustomFieldDefinition } from '@/utils/interfaces';
import { EQueries } from '@/react-query/types';
import { useAppDispatch } from '@/storage/hooks';
import { setAlertAC } from '@/storage/alertSlice';
import { CustomFieldDefinitionService } from '@/api/services/customFieldDefinitionService';

export const useCreateCustomFieldDefinitionMutation = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const createMutation = useMutation({
    mutationFn: (customFieldDefinition: Partial<ICustomFieldDefinition>) => CustomFieldDefinitionService.create(customFieldDefinition),
    onSuccess: () => {
      dispatch(setAlertAC({ text: 'Goal Type created successfully', mode: 'success' }));
      queryClient.invalidateQueries({ queryKey: [EQueries.createCustomFieldDefinition] });
    },
    onError: error => {
      dispatch(setAlertAC({ text: error.message, mode: 'error' }));
    }
  });

  return {
    data: createMutation.data,
    createCustomFieldDefinition: createMutation.mutate,
    isCreating: createMutation.isPending,
    error: createMutation.error,
    isError: createMutation.isError,
  };
};
