import { checklistService } from "@/api/services/checklistService";
import { ChecklistItemRequest } from "@/utils/interfaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddChecklistItemMutation = (ownerId: string, ownerType: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ checklistId, payload }: { checklistId: string, payload: ChecklistItemRequest }) => 
      checklistService.addItem(checklistId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['checklists', ownerType, ownerId] });
    }
  });
};