"use client";

import Column from "@/components/business/aims/Column";
import { useDeleteGoalTypeMutation } from "@/react-query/mutations/goalTypesMutations/useDeleteGoalTypeMutation";
import { useGetGoalTypeById } from "@/react-query/queries/goalTypesQueries/useGetGoalTypeByIdQuery";
import { useParams, useRouter } from "next/navigation";

const isValidUUID = (id: string) => {
  const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return regex.test(id);
};

const AimPage = () => {
  const router = useRouter();
  const params = useParams();
  
  const rawId = (params?.aim || params?.id) as string;
  const isIdValid = isValidUUID(rawId);
  
  const { goalType, isLoading, isError } = useGetGoalTypeById(isIdValid ? rawId : undefined);
  
  const { deleteGoalType } = useDeleteGoalTypeMutation();

  const onDelete = () => {
    if (goalType) {
      deleteGoalType(goalType.id);
      router.push('/dashboard');
    }
  }

  if (!isIdValid) {
    return (
      <div className="p-6">
        <h2 className="text-xl text-red-500">Некоректний ID цілі</h2>
        <button onClick={() => router.push('/dashboard')} className="btn-primary mt-4">
          На головну
        </button>
      </div>
    );
  }

  if (isLoading) {
    return <div className="p-6">Завантаження...</div>;
  }

  if (isError || !goalType) {
    return (
      <div className="p-6">
        <h2 className="text-xl text-red-500">Ціль не знайдено (404)</h2>
        <button 
          onClick={() => router.push('/dashboard')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Повернутися на головну
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 p-6">
      <Column
        title={goalType.title}
        data={[]}
        type="goal"
        onDelete={onDelete}
      />
      <div className="flex-1">CHART</div>
    </div>
  );
};

export default AimPage;
