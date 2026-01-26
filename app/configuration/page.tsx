'use client';

import Column from "@/components/business/aims/Column";
import { useGetGoalTypesQuery } from "@/react-query/queries/goalTypesQueries/useGetGoalTypesQuery";

const ConfigurationPage = () => {
  const { goalTypes } = useGetGoalTypesQuery();

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 p-6">
        <Column 
          title="Goal Types" 
          data={goalTypes} 
          type="type" 
        />

        <div className="flex-1">CHART</div>
      </div>
    </div>
  );
};

export default ConfigurationPage;
