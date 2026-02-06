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
  customFields: Array<{
    label: string;
    type: CustomFieldType | '';
  }>;
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
      marginBottom: 16, // відповідає mb-4
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
    customFields: []
  }

  const validationSchema = Yup.object({
    title: Yup.string().required(t('title_required')),
    customFields: Yup.array().of(
      Yup.object({
        label: Yup.string().required(t('field_label_required')),
        type: Yup.string().required(t('type_required')),
      })
    )
  });

  const onSubmit = (values: IValues, onSubmitProps: FormikHelpers<IValues>) => {
    const goalTypeData: ICreateGoalType = {
      title: values.title,
      customFields: values.customFields as ICreateCustomFieldDefinition[],
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

            <div className="mb-6 relative">
              <FieldArray name='customFields'>
                {({ push, remove, form }) => {
                  const { customFields } = form.values;

                  return (
                    <div className="overflow-hidden">
                      <AnimatePresence mode="popLayout" initial={false}>
                        {customFields.length === 0 ? (
                          <motion.div
                            key="empty-state"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-600 rounded-xl bg-gray-800/50"
                          >
                            <p className="text-gray-400 mb-4">{t('no_custom_fields_edded')}</p>
                            <Button
                              type="button"
                              mode="primary"
                              onClick={() => push({ label: '', type: '' })}
                            >
                              + {t('add_custom_field')}
                            </Button>
                          </motion.div>
                        ) : (
                          <>
                            {/* Список полів */}
                            {customFields.map((_: any, index: number) => {
                              const fieldNameLabel = `customFields[${index}].label`;
                              const fieldNameType = `customFields[${index}].type`;
                              const metaLabel = form.getFieldMeta(fieldNameLabel);
                              const metaType = form.getFieldMeta(fieldNameType);

                              return (
                                <motion.div
                                  key={index}
                                  variants={fieldVariants}
                                  initial="hidden"
                                  animate="visible"
                                  exit="exit"
                                  layout
                                  className='flex gap-2 items-center'
                                >
                                  <div className="flex-1">
                                    <FormikControl
                                      control='input'
                                      label={`${t('field_label')} ${index + 1}`}
                                      placeholder="Custom field label"
                                      name={fieldNameLabel}
                                      isError={!!(metaLabel.touched && metaLabel.error)}
                                      isTouched={metaLabel.touched}
                                    />

                                    <FormikControl
                                      control='select'
                                      label={`${t('field_type')} ${index + 1}`}
                                      name={fieldNameType}
                                      isError={!!(metaType.touched && metaType.error)}
                                      isTouched={metaType.touched}
                                      options={dropdownOptions}
                                    />
                                  </div>

                                  <div className="">
                                    <button
                                      type='button'
                                      onClick={() => remove(index)}
                                      className='size-10 bg-red-500/20 text-red-500 rounded-full text-2xl cursor-pointer 
                                      hover:bg-red-500 hover:text-white transition duration-300'
                                    >
                                      ×
                                    </button>
                                  </div>
                                </motion.div>
                              );
                            })}

                            {/* Кнопка "Додати ще" з'являється під списком */}
                            <motion.div layout className="flex justify-start mt-2">
                              <button
                                type="button"
                                onClick={() => push({ label: '', type: '' })}
                                className="flex items-center gap-2 text-sm font-medium text-green-500 hover:text-green-400 transition cursor-pointer"
                              >
                                <span className="size-6 flex items-center justify-center bg-green-500/20 rounded-full">+</span>
                                {t('add_custom_field')}
                              </button>
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }}
              </FieldArray>
            </div>

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
