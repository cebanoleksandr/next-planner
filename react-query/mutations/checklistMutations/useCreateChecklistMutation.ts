import { checklistService } from "@/api/services/checklistService";
import { ChecklistRequest } from "@/utils/interfaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateChecklistMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ChecklistRequest) => checklistService.createChecklist(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['checklists', variables.ownerType, variables.ownerId] });
    }
  });
};