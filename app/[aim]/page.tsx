"use client";

import Column from "@/components/business/aims/Column";
import { useGetGoalsQuery } from "@/react-query/queries/goalsQueries/useGetGoalsQuery";
import { useGetGoalTypeById } from "@/react-query/queries/goalTypesQueries/useGetGoalTypeByIdQuery";
import { IGoal } from "@/utils/interfaces";
import { notFound, usePathname } from "next/navigation";

const AimPage = () => {
  const pathname = usePathname();
  const { goals } = useGetGoalsQuery();
  const { goalType, isLoading } = useGetGoalTypeById(pathname.replace('/', ''));

  if (!goalType && !isLoading) {
    notFound();
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 p-6">
      <Column
        title={goalType?.title ?? ''} 
        data={[]}
        type="goal"
      />

      <div className="flex-1">CHART</div>
    </div>
  );
};

export default AimPage;
