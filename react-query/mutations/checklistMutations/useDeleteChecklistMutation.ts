import { checklistService } from "@/api/services/checklistService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteChecklistMutation = (ownerId: string, ownerType: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => checklistService.deleteChecklist(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['checklists', ownerType, ownerId] });
    }
  });
};
