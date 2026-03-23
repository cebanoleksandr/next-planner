'use client';

import Column from "@/components/business/aims/Column";
import { useGetGoalsQuery } from "@/react-query/queries/goalsQueries/useGetGoalsQuery";
import { Goal } from "@/utils/interfaces";

const GoalsPage = () => {
  const { goals } = useGetGoalsQuery();

  console.log('GOALS DATA: ', goals);

  return (
    <div className="flex flex-col md:flex-row gap-4 p-6">
      <Column
        title='Goals'
        data={goals as Goal[]}
        onDelete={() => {}}
        type='goal'
      />
      <div className="flex-1">CHART</div>
    </div>
  );
};

export default GoalsPage;