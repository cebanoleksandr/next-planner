'use client';

import Column from "@/components/business/aims/Column";
import { useGetLifeAspectsQuery } from "@/react-query/queries/lifeAspectsQueries.ts/useGetLifeAspectsQuery";

const AspectsPage = () => {
  const { aspects } = useGetLifeAspectsQuery();

  return (
    <div className="flex flex-col md:flex-row gap-4 p-6">
      <Column
        title='Life aspects'
        data={aspects}
        onDelete={() => {}}
        type='aspect'
      />
      <div className="flex-1">CHART</div>
    </div>
  );
};

export default AspectsPage;