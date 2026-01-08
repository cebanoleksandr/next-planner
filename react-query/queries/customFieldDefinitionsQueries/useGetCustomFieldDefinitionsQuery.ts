import { CustomFieldDefinitionService } from "@/api/services/customFieldDefinitionService";
import { EQueries } from "@/react-query/types";
import { setAlertAC } from "@/storage/alertSlice";
import { useAppDispatch } from "@/storage/hooks";
import { useQuery } from "@tanstack/react-query";

export const useGetCustomFieldDefinitionsQuery = () => {
  const dispatch = useAppDispatch();

  const fetchInitial = async () => {
    try {
      const data = await CustomFieldDefinitionService.getAll();
      return data;
    } catch (error: any) {
      dispatch(setAlertAC({ text: 'Something went wrong. Cannot get custom field definitions.', mode: 'error' }));
      throw error;
    }
  };

  const {
    data: customFieldDefinitions = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [EQueries.customFieldDefinitions],
    queryFn: fetchInitial,
    staleTime: 5 * 60 * 1000,
  });

  return {
    customFieldDefinitions,
    isLoading,
    isError,
    error,
  };
};
