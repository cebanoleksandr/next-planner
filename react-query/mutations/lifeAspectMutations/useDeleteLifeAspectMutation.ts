import { lifeAspectService } from "@/api/services/lifeAspectService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteLifeAspectMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => lifeAspectService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['life-aspects'] });
    }
  });
};