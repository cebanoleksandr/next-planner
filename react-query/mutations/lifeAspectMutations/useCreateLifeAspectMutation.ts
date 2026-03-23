import { lifeAspectService } from "@/api/services/lifeAspectService";
import { LifeAspectRequest } from "@/utils/interfaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateLifeAspectMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: LifeAspectRequest) => lifeAspectService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['life-aspects'] });
    }
  });
};