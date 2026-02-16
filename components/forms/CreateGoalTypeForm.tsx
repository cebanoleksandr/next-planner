import { CustomFieldType, ICreateCustomFieldDefinition, ICreateGoalType, IOption } from "@/utils/interfaces";
import { FieldArray, Form, Formik, FormikHelpers } from "formik";
import * as Yup from 'yup';
import Button from "../UI/Button";
import { FC } from "react";
import FormikControl from "./FormControl";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useTranslations } from "next-intl";

interface IValues {
  title: string;
}

interface IProps {
  onClose: () => void;
  onCreate: (goalTypeData: ICreateGoalType) => void;
}

const CreateGoalTypeForm: FC<IProps> = ({ onClose, onCreate }) => {
  const t = useTranslations('Forms');

  const dropdownOptions: IOption[] = [
    { key: 'Select a custom field type', value: '' },
    { key: 'String', value: CustomFieldType.STRING },
    { key: 'Number', value: CustomFieldType.NUMBER },
    { key: 'Date', value: CustomFieldType.DATE },
    { key: 'Boolean', value: CustomFieldType.BOOLEAN },
  ];

  const fieldVariants: Variants = {
    hidden: { opacity: 0, x: -20, height: 0, marginBottom: 0 },
    visible: {
      opacity: 1,
      x: 0,
      height: 'auto',
      marginBottom: 16,
      transition: { duration: 0.3, ease: 'easeOut' }
    },
    exit: {
      opacity: 0,
      x: 20,
      height: 0,
      marginBottom: 0,
      transition: { duration: 0.2, ease: 'easeIn' }
    }
  };

  const initialValues: IValues = {
    title: '',
  }

  const validationSchema = Yup.object({
    title: Yup.string().required(t('title_required')),
    customFields: Yup.array().of(
      Yup.object({
        label: Yup.string().required(t('field_label_required')),
      })
    )
  });

  const onSubmit = (values: IValues, onSubmitProps: FormikHelpers<IValues>) => {
    const goalTypeData: ICreateGoalType = {
      title: values.title,
    };
    onCreate(goalTypeData);
    onSubmitProps.resetForm();
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <div className='p-2'>
          <Form className="p-5 overflow-y-auto max-h-150 scrollbar-md">
            <FormikControl
              control='input'
              label={t('title')}
              placeholder={t('enter_goal_type_name')}
              type='text'
              name="title"
              isError={!!formik.errors.title}
              isTouched={!!formik.touched.title}
            />

            <div className='flex justify-end items-center gap-2'>
              <Button type="button" onClick={onClose} mode="white">
                {(t('cancel'))}
              </Button>

              <Button mode="primary">
                {t('create')}
              </Button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  )
}

export default CreateGoalTypeForm;
