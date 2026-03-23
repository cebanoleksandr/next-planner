'use client';

import { Form, Formik, FormikHelpers } from "formik";
import { FC } from "react";
import * as Yup from 'yup';
import Button from "../UI/Button";
import FormikControl from "./FormControl";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { GoalRequest, ProgressStatus } from "@/utils/interfaces";

interface IValues {
  title: string;
  description?: string;
}

interface IProps {
  onClose: () => void;
  onCreate: (goalData: GoalRequest) => void;
}

const CreateGoalForm: FC<IProps> = ({ onClose, onCreate }) => {
  const t = useTranslations('Forms');
  const params = useParams();
  const rawId = (params?.aim || params?.id) as string;

  const initialValues: IValues = {
    title: '',
    description: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required(t('title_required')),
  });

  const onSubmit = (values: IValues, onSubmitProps: FormikHelpers<IValues>) => {
    const goalData: GoalRequest = {
      title: values.title,
      description: values.description,
      status: ProgressStatus.TODO,
      lifeAspectId: '', // todo: get real data
      priority: 1
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
              placeholder={t('enter_goal_name')}
              type='text'
              name="title"
              isError={!!formik.errors.title}
              isTouched={!!formik.touched.title}
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
