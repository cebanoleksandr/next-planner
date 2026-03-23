import { useQuery } from "@tanstack/react-query";
import { subGoalService } from "@/api/services/subGoalService";

export const useGetSubGoalsQuery = (goalId: string) => {
  const {
    data: subgoals = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['subgoals', goalId],
    queryFn: () => subGoalService.getSubGoalsByGoalId(goalId),
    enabled: !!goalId
  });

  return {
    subgoals,
    isLoading,
    isError,
    error,
  }
};
