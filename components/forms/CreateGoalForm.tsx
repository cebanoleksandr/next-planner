'use client';

import { GoalStatus, ICreateGoal, IGoalType, IOption } from "@/utils/interfaces";
import { Form, Formik, FormikHelpers } from "formik";
import { FC } from "react";
import * as Yup from 'yup';
import Button from "../UI/Button";
import FormikControl from "./FormControl";
import { getGoalTypeOptions } from "@/utils/helpers";
import { useGetGoalTypesQuery } from "@/react-query/queries/goalTypesQueries/useGetGoalTypesQuery";
import { useTranslations } from "next-intl";

interface IValues {
  title: string;
  description?: string;
  type: string;
}

interface IProps {
  onClose: () => void;
  onCreate: (goalData: ICreateGoal) => void;
}

const CreateGoalForm: FC<IProps> = ({ onClose, onCreate }) => {
  const t = useTranslations('Forms');
  const { goalTypes } = useGetGoalTypesQuery();

  const dropdownOptions: IOption[] = [
    { key: t('select_custom_field'), value: '' },
    ...getGoalTypeOptions(goalTypes),
  ];

  const initialValues: IValues = {
    title: '',
    description: '',
    type: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required(t('title_required')),
    type: Yup.string().required(t('type_required')).test(
      'is-valid-type',
      t('select_valid_goal_type'),
      value => value !== undefined && value !== ''
    ),
  });

  const onSubmit = (values: IValues, onSubmitProps: FormikHelpers<IValues>) => {
    const type = goalTypes.find(gt => gt.id === values.type);

    const goalData: ICreateGoal = {
      title: values.title,
      description: values.description,
      type: type as IGoalType,
      status: GoalStatus.NOT_STARTED, // Встановлюємо статус за замовчуванням
    };
    onCreate(goalData);
    onSubmitProps.resetForm();
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {formik => (
        <div className='p-2'>
          <Form className="p-5 overflow-y-auto max-h-150 scrollbar-md">
            <FormikControl
              control='input'
              label={t('title')}
              placeholder='Enter Goal Type title'
              type='text'
              name="title"
              isError={!!formik.errors.title}
              isTouched={!!formik.touched.title}
            />

            <FormikControl
              control='select'
              label={t('type')}
              name="type"
              options={dropdownOptions}
              isError={!!formik.errors.type}
              isTouched={!!formik.touched.type}
            />

            <FormikControl
              control='textarea'
              label={t('description')}
              placeholder={t('enter_goal_description')}
              name="description"
              isError={!!formik.errors.description}
              isTouched={!!formik.touched.description}
            />

            <div className='flex justify-end items-center gap-2'>
              <Button type="button" onClick={onClose} mode="white">
                {t('cancel')}
              </Button>

              <Button mode="primary">
                {t('create')}
              </Button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default CreateGoalForm;
