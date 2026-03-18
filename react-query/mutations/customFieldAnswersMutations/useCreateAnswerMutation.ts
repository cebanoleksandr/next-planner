import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ICustomFieldAnswer } from '@/utils/interfaces';
import { EQueries } from '@/react-query/types';
import { useAppDispatch } from '@/storage/hooks';
import { setAlertAC } from '@/storage/alertSlice';
import { CustomFieldAnswerService } from '@/api/services/customFieldAnswerService';

export const useCreateAnswerMutation = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const saveMutation = useMutation({
    mutationFn: (answer: ICustomFieldAnswer) => CustomFieldAnswerService.create(
      answer.goalCardId, 
      { 
        fieldDefinitionId: answer.customFieldId, 
        value: answer.value 
      }
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EQueries.saveAnswers] });
      dispatch(setAlertAC({ text: 'Field Answer is updated', mode: 'error' }));
    },
    onError: error => {
      dispatch(setAlertAC({ text: error.message, mode: 'error' }));
    }
  });

  return {
    data: saveMutation.data,
    createAnswer: saveMutation.mutate,
    isSaving: saveMutation.isPending,
    error: saveMutation.error,
    isError: saveMutation.isError,
  };
};
