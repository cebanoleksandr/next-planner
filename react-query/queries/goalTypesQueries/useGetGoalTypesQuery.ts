import { GoalTypeService } from "@/api/services/goalTypeServise";
import { EQueries } from "@/react-query/types";
import { setAlertAC } from "@/storage/alertSlice";
import { useAppDispatch } from "@/storage/hooks";
import { useQuery } from "@tanstack/react-query";

export const useGetGoalTypesQuery = () => {
  const dispatch = useAppDispatch();

  const fetchInitial = async () => {
    try {
      const data = await GoalTypeService.getAll();
      return data;
    } catch (error: any) {
      dispatch(setAlertAC({ text: 'Something went wrong. Cannot get data.', mode: 'error' }));
      throw error;
    }
  };

  const {
    data: goalTypes = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [EQueries.getGoalTypes],
    queryFn: fetchInitial,
    staleTime: 5 * 60 * 1000,
  });

  return {
    goalTypes,
    isLoading,
    isError,
    error,
  };
};