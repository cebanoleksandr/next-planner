import { useMutation, useQueryClient } from "@tanstack/react-query";
import { subGoalService } from "@/api/services/subGoalService";
import { SubGoalRequest } from "@/utils/interfaces";

export const useCreateSubGoalMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SubGoalRequest) => subGoalService.createSubGoal(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['subgoals', variables.goalId] });
      queryClient.invalidateQueries({ queryKey: ['goals'] });
    }
  });
};
