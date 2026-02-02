"use client";

import Column from "@/components/business/aims/Column";
import { useDeleteGoalTypeMutation } from "@/react-query/mutations/goalTypesMutations/useDeleteGoalTypeMutation";
import { useGetGoalsQuery } from "@/react-query/queries/goalsQueries/useGetGoalsQuery";
import { useGetGoalTypeById } from "@/react-query/queries/goalTypesQueries/useGetGoalTypeByIdQuery";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";

const isValidUUID = (id: string) => {
  const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return regex.test(id);
};

const AimPage = () => {
  const router = useRouter();
  const params = useParams();
  const t = useTranslations('AimPage');
  
  const rawId = (params?.aim || params?.id) as string;
  const isIdValid = isValidUUID(rawId);
  
  const { goalType, isLoading, isError } = useGetGoalTypeById(isIdValid ? rawId : undefined);
  const { goals } = useGetGoalsQuery();
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
        <h2 className="text-xl text-red-500">{t('invalid_goal_id')}</h2>
        <button onClick={() => router.push('/dashboard')} className="btn-primary mt-4">
          {t('go_to_dashboard')}
        </button>
      </div>
    );
  }

  if (isLoading) {
    return <div className="p-6">{t('loading')}</div>;
  }

  if (isError || !goalType) {
    return (
      <div className="p-6">
        <h2 className="text-xl text-red-500">{t('goal_not_found')}</h2>
        <button
          onClick={() => router.push('/dashboard')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          {t('go_to_dashboard')}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 p-6">
      <Column
        title={goalType.title}
        data={goals}
        type="goal"
        onDelete={onDelete}
      />
      <div className="flex-1">CHART</div>
    </div>
  );
};

export default AimPage;
