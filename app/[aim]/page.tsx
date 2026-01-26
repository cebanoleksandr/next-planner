"use client";

import Column from "@/components/business/aims/Column";
import { useGetGoalTypeById } from "@/react-query/queries/goalTypesQueries/useGetGoalTypeByIdQuery";
import { IGoal } from "@/utils/interfaces";
import { notFound, usePathname } from "next/navigation";

const AimPage = () => {
  const pathname = usePathname();
  const { goalType, isLoading } = useGetGoalTypeById(pathname.replace('/', ''));

  if (!goalType && !isLoading) {
    notFound();
  }

  const goalCards: IGoal[] = [];

  return (
    <div className="flex flex-col md:flex-row gap-4 p-6">
      <Column
        title={goalType?.title ?? ''} 
        data={goalCards} 
        type="goal" 
      />

      <div className="flex-1">CHART</div>
    </div>
  );
};

export default AimPage;
