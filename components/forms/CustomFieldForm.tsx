import { CreateCustomFieldDTO, CustomFieldType, ICustomFieldDefinition, IGoalType, IOption, UpdateCustomFieldDTO } from "@/utils/interfaces";
import { FieldArray, Form, Formik, useFormikContext } from "formik";
import { AnimatePresence, motion, Variants } from "framer-motion";
import * as Yup from 'yup';
import Button from "../UI/Button";
import FormikControl from "./FormControl";
import { FC, useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import cn from "classnames";
import { TrashIcon } from "@heroicons/react/24/solid";
import DeleteCustomFieldPopup from "../popups/DeleteCustomFieldPopup";
import { useDeleteCustomFieldDefinitionMutation } from "@/react-query/mutations/customFieldDefinitionsMutations/useDeleteCustomFieldDefinitionMutation";

interface IValues {
  customFields: Array<{
    id?: string;
    required?: boolean;
    placeholder?: string | null;
    label: string;
    type: CustomFieldType | '';
  }>;
}

interface IProps {
  customFields: ICustomFieldDefinition[];
  goalTypeId: string;
  onCreateField: (customFieldDefinition: CreateCustomFieldDTO) => void;
  onUpdateField: (updateCustomFieldDTO: UpdateCustomFieldDTO) => void;
}

const CustomFieldForm: FC<IProps> = ({ customFields, goalTypeId, onCreateField, onUpdateField }) => {
  const t = useTranslations('Forms');
  const { deleteCustomField } = useDeleteCustomFieldDefinitionMutation();

  const [isDeleteFieldPopupOPen, setIsDeleteFIeldPopupOpen] = useState(false);
  const [selectedField, setSelectedField] = useState<ICustomFieldDefinition | null>(null);

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
      required: field.required,
      placeholder: field.placeholder ?? '',
      label: field.label,
      type: field.type,
    })) : [],
  }

  const validationSchema = Yup.object({
    customFields: Yup.array().of(
      Yup.object({
        label: Yup.string().required(t('field_label_required')),
        type: Yup.string().required(t('type_required')),
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

  const openFieldDeletePopup = (field: ICustomFieldDefinition) => {
    setSelectedField(field);
    setIsDeleteFIeldPopupOpen(true);
  }

  const closeFieldDeletePopup = () => {
    setSelectedField(null);
    setIsDeleteFIeldPopupOpen(false);
  }

  const onDeleteCustomField = (id: string) => {
    deleteCustomField({ id, goalTypeId: goalTypeId });
  }

  const onSubmit = (values: IValues) => {
    values.customFields.forEach(field => {
      if (field.id) {
        // Existing field, update
        onUpdateField({
          customFieldDefinition: {
            id: field.id,
            required: field.required!,
            placeholder: field.placeholder!,
            label: field.label,
            type: field.type as CustomFieldType,
          },
          goalTypeId: goalTypeId,
        });
      } else {
        // New field, create
        if (field.label && field.type) {
          onCreateField({
            customFieldDefinition: {
              label: field.label,
              type: field.type as CustomFieldType,
            },
            goalTypeId: goalTypeId,
          });
        }
      }
    });
  };

  return (
    <div>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize={true}
    >
      {(formik) => (
        <div className='p-2'>
          <AutoSave debounceMs={1500} />

          <Form className="mt-5 overflow-y-auto max-h-150 scrollbar-md">
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
                            {customFields.map((_: ICustomFieldDefinition, index: number) => {
                              const fieldNameLabel = `customFields[${index}].label`;
                              const fieldNameType = `customFields[${index}].type`;
                              const fieldRequired = `customFields[${index}].required`;
                              const fieldPlaceholder = `customFields[${index}].placeholder`;
                              const metaLabel = form.getFieldMeta(fieldNameLabel);
                              const metaType = form.getFieldMeta(fieldNameType);
                              const isSaved = !!form.values.customFields[index].id

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
                                  <div className={cn("px-4 pt-2 rounded-xl", {
                                    'border-2 border-yellow-600': !isSaved,
                                    'border-2 border-green-600': isSaved,
                                  })}>
                                    <div className="flex items-center gap-3">
                                      <div className="w-1/2">
                                      <FormikControl
                                        control='input'
                                        label={`${t('field_label')} ${index + 1}`}
                                        placeholder={t('field_label')}
                                        name={fieldNameLabel}
                                        isError={!!(metaLabel.touched && metaLabel.error)}
                                        isTouched={metaLabel.touched}
                                      />
                                      </div>

                                      <div className="w-1/2">
                                      <FormikControl
                                        control='select'
                                        label={`${t('field_type')} ${index + 1}`}
                                        name={fieldNameType}
                                        isError={!!(metaType.touched && metaType.error)}
                                        isTouched={metaType.touched}
                                        options={dropdownOptions}
                                      />
                                      </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                      <div className="mr-5 w-1/2">
                                        <input
                                          type="checkbox"
                                          name={fieldRequired}
                                          id={'required' + index}
                                          onChange={form.handleChange}
                                          onBlur={form.handleBlur}
                                          checked={!!form.values.customFields[index].required}
                                          className="mr-3"
                                        />
                                        <label htmlFor={'required' + index} className="text-white">
                                          {t('required')}
                                        </label>
                                      </div>

                                      <FormikControl
                                        control='input'
                                        label={`${t('field_placeholder')}`}
                                        placeholder={t('field_placeholder')}
                                        name={fieldPlaceholder}
                                        isError={!!(metaLabel.touched && metaLabel.error)}
                                        isTouched={metaLabel.touched}
                                      />
                                    </div>
                                  </div>

                                  <div>
                                    {isSaved ? (
                                      <button
                                        type='button'
                                        onClick={() => openFieldDeletePopup(form.values.customFields[index])}
                                        className='size-10 bg-red-500/20 text-red-500 rounded-full text-2xl cursor-pointer 
                                        hover:bg-red-500 hover:text-white transition duration-300 flex items-center justify-center'
                                      >
                                        <TrashIcon className="size-5" />
                                      </button>
                                    ) : (
                                      <button
                                        type='button'
                                        onClick={() => remove(index)}
                                        className='size-10 bg-red-500/20 text-red-500 rounded-full text-2xl cursor-pointer 
                                        hover:bg-red-500 hover:text-white transition duration-300'
                                      >
                                        ×
                                      </button>
                                    )}
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
          </Form>
        </div>
      )}
    </Formik>

    <DeleteCustomFieldPopup
      isVisible={isDeleteFieldPopupOPen}
      onClose={closeFieldDeletePopup}
      customField={selectedField!}
      onDelete={onDeleteCustomField}
    />
    </div>
  );
};

export default CustomFieldForm;

const AutoSave = ({ debounceMs = 1500 }) => {
  const { values, submitForm, isValid, dirty } = useFormikContext<IValues>();

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
