import { checklistService } from "@/api/services/checklistService";
import { ChecklistItemRequest } from "@/utils/interfaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateChecklistItemMutation = (ownerId: string, ownerType: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ itemId, payload }: { itemId: string, payload: Partial<ChecklistItemRequest> }) => 
      checklistService.updateItem(itemId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['checklists', ownerType, ownerId] });
      // Також оновлюємо ціль, бо прогрес міг змінитись
      queryClient.invalidateQueries({ queryKey: ['goals'] });
    }
  });
};
