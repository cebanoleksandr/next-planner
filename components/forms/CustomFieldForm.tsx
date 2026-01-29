import { CustomFieldType, ICustomFieldDefinition, IGoalType, IOption } from "@/utils/interfaces";
import { FieldArray, Form, Formik, FormikHelpers, useFormikContext } from "formik";
import { AnimatePresence, motion, Variants } from "framer-motion";
import * as Yup from 'yup';
import Button from "../UI/Button";
import FormikControl from "./FormControl";
import { FC, useCallback, useEffect } from "react";

interface IValues {
  customFields: Array<{
    id?: string;
    key?: string;
    label: string;
    type: CustomFieldType | '';
  }>;
}

interface IProps {
  customFields: ICustomFieldDefinition[];
  onUpdate: (goalTypeData: Partial<IGoalType>) => void
}

const CustomFieldForm: FC<IProps> = ({ customFields, onUpdate }) => {
  const dropdownOptions: IOption[] = [
    { key: 'Select a custom field type', value: '' },
    { key: 'String', value: CustomFieldType.STRING },
    { key: 'Number', value: CustomFieldType.NUMBER },
    { key: 'Date', value: CustomFieldType.DATE },
    { key: 'Boolean', value: CustomFieldType.BOOLEAN },
  ];

  const initialValues: IValues = {
    customFields: customFields.length > 0 ? customFields.map(field => ({
      id: field.id,
      key: field.key,
      label: field.label,
      type: field.type,
    })) : [],
  }

  const validationSchema = Yup.object({
    customFields: Yup.array().of(
      Yup.object({
        label: Yup.string().required('Label is required'),
        type: Yup.string().required('Type is required'),
      })
    )
  });

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

  const onSubmit = (values: IValues) => {
    const filteredFields = values.customFields.filter(f => f.label && f.type);

    const goalTypeData: Partial<IGoalType> = {
      customFields: filteredFields as ICustomFieldDefinition[],
    };
    
    onUpdate(goalTypeData);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize={true}
    >
      {(formik) => (
        <div className='p-2'>
          <AutoSave debounceMs={500} />

          <Form className="p-5 overflow-y-auto max-h-150 scrollbar-md">
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
                            <p className="text-gray-400 mb-4">No custom fields added yet</p>
                            <Button
                              type="button"
                              mode="primary"
                              onClick={() => push({ label: '', type: '' })}
                            >
                              + Add Custom Field
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
                                      label={`Field Label ${index + 1}`}
                                      placeholder="Custom field label"
                                      name={fieldNameLabel}
                                      isError={!!(metaLabel.touched && metaLabel.error)}
                                      isTouched={metaLabel.touched}
                                    />

                                    <FormikControl
                                      control='select'
                                      label={`Field Type ${index + 1}`}
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
                                Add another field
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
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default CustomFieldForm;

const AutoSave = ({ debounceMs = 500 }) => {
  const { values, submitForm, isValid, dirty } = useFormikContext<any>();

  // Створюємо функцію для перевірки та відправки
  const debouncedSubmit = useCallback(() => {
    if (dirty && isValid) {
      submitForm();
    }
  }, [dirty, isValid, submitForm]);

  useEffect(() => {
    // Встановлюємо таймер
    const timer = setTimeout(() => {
      debouncedSubmit();
    }, debounceMs);

    // Очищуємо таймер, якщо значення змінилися знову до закінчення затримки
    return () => clearTimeout(timer);
  }, [values, debouncedSubmit, debounceMs]);

  return null;
};
