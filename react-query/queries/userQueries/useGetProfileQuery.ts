import { useQuery } from "@tanstack/react-query";
import { userService } from "@/api/services/userService";

export const useGetProfileQuery = () => {
  return useQuery({
    queryKey: ['user-profile'],
    queryFn: () => userService.getProfile(),
  });
};
