import { GoalService } from "@/api/services/goalService";
import { EQueries } from "@/react-query/types";
import { setAlertAC } from "@/storage/alertSlice";
import { useAppDispatch } from "@/storage/hooks";
import { useQuery } from "@tanstack/react-query";

export const useGetGoalsQuery = (page?: number, size?: number) => {
  const dispatch = useAppDispatch();

  const {
    data: goals = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [EQueries.getGoals, page, size],
    queryFn: async ({ queryKey }) => {
      const [, page, size] = queryKey as [EQueries, number?, number?];

      try {
        return await GoalService.getAll(page, size);
      } catch (error) {
        dispatch(
          setAlertAC({
            text: 'Something went wrong. Cannot get goals.',
            mode: 'error',
          })
        );
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000,
  });

  return {
    goals,
    isLoading,
    isError,
    error,
  };
};
