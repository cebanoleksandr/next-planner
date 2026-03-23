import { lifeAspectService } from "@/api/services/lifeAspectService";
import { useQuery } from "@tanstack/react-query";

export const useGetLifeAspectByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ['life-aspects', id],
    queryFn: () => lifeAspectService.getById(id),
    enabled: !!id,
  });
};