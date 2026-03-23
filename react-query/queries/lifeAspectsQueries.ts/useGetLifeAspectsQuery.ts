import { useQuery } from "@tanstack/react-query";
import { lifeAspectService } from "@/api/services/lifeAspectService";

export const useGetLifeAspectsQuery = () => {
  const {
    data: aspects = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['life-aspects'],
    queryFn: () => lifeAspectService.getAll(),
  });

  return {
    aspects,
    isLoading,
    isError,
    error,
  }
};