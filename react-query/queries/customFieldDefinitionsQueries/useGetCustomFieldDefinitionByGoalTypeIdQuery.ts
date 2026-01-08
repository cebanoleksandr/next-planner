import { useQuery } from '@tanstack/react-query';
import { EQueries } from '@/react-query/types';
import { useAppDispatch } from '@/storage/hooks';
import { setAlertAC } from '@/storage/alertSlice';
import { CustomFieldDefinitionService } from '@/api/services/customFieldDefinitionService';

export const useGetCustomFieldDefinitionByGoalTypeId = (goalTypeId: string) => {
  const dispatch = useAppDispatch();

  const fetchInitial = async () => {
    try {
      const data = await CustomFieldDefinitionService.getByGoalType(goalTypeId);
      return data;
    } catch (error: any) {
      dispatch(setAlertAC({ text: 'Cannot get data custom field definition by this goalTypeId.', mode: 'error' }));
      throw error;
    }
  };

  const {
    data: customFieldDefinition = null,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [EQueries.getCustomFieldDefinitionByGoalTypeId, goalTypeId],
    queryFn: fetchInitial,
    enabled: !!goalTypeId,
    staleTime: 5 * 60 * 1000,
  });

  return {
    customFieldDefinition,
    isLoading,
    isError,
    error,
  };
};