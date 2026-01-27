import { GoalTypeService } from "@/api/services/goalTypeServise";
import { EQueries } from "@/react-query/types";
import { useKeycloak } from "@react-keycloak/web";
import { useQuery } from "@tanstack/react-query";

export const useGetGoalTypesQuery = () => {
  const { keycloak, initialized } = useKeycloak();

  const fetchInitial = async () => {
    try {
      const data = await GoalTypeService.getAll();
      return data;
    } catch (error: any) {
      throw error;
    }
  };

  const {
    data: goalTypes = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [EQueries.getGoalTypes],
    queryFn: fetchInitial,
    enabled: initialized && !!keycloak.authenticated,
    staleTime: 5 * 60 * 1000,
  });

  return {
    goalTypes,
    isLoading,
    isError,
    error,
  };
};