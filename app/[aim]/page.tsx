"use client";

import Column from "@/components/business/aims/Column";
import { useDeleteGoalTypeMutation } from "@/react-query/mutations/goalTypesMutations/useDeleteGoalTypeMutation";
import { useGetGoalsQuery } from "@/react-query/queries/goalsQueries/useGetGoalsQuery";
import { useGetGoalTypeById } from "@/react-query/queries/goalTypesQueries/useGetGoalTypeByIdQuery";
import { notFound, usePathname, useRouter } from "next/navigation";

const AimPage = () => {
  const pathname = usePathname();
  const { goals } = useGetGoalsQuery();
  const { goalType, isLoading } = useGetGoalTypeById(pathname.replace('/', ''));
  const { deleteGoalType } = useDeleteGoalTypeMutation();

  const router = useRouter();

  if (!goalType && !isLoading) {
    notFound();
  }

  const onDelete = () => {
    if (goalType) {
      deleteGoalType(goalType.id);
      router.push('/dashboard');
    }
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 p-6">
      <Column
        title={goalType?.title ?? ''}
        data={[]}
        type="goal"
        onDelete={onDelete}
      />

      <div className="flex-1">CHART</div>
    </div>
  );
};

export default AimPage;
