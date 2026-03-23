import { lifeAspectService } from "@/api/services/lifeAspectService";
import { LifeAspectRequest } from "@/utils/interfaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateLifeAspectMutation = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: LifeAspectRequest) => lifeAspectService.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['life-aspects'] });
      queryClient.invalidateQueries({ queryKey: ['life-aspects', id] });
    }
  });
};