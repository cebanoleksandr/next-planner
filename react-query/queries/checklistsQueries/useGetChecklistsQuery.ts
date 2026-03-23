import { useQuery } from "@tanstack/react-query";
import { checklistService } from "@/api/services/checklistService";

export const useGetChecklistsQuery = (ownerId: string, ownerType: string) => {
  return useQuery({
    queryKey: ['checklists', ownerType, ownerId],
    queryFn: () => checklistService.getChecklistsByOwner(ownerId, ownerType),
    enabled: !!ownerId && !!ownerType,
  });
};