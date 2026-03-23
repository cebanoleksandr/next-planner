'use client';

import Column from "@/components/business/aims/Column";
import { useGetSubGoalsQuery } from "@/react-query/queries/subGoalsQueries/useGetSubGoalsQuery";

const SubgoalsPage = () => {
  const goalId = '1'; // todo: get real goalId
  const { subgoals } = useGetSubGoalsQuery(goalId);

  return (
    <div className="flex flex-col md:flex-row gap-4 p-6">
      <Column
        title='Subgoals'
        data={subgoals}
        onDelete={() => {}}
        type='subgoal'
      />
      <div className="flex-1">CHART</div>
    </div>
  );
};

export default SubgoalsPage;