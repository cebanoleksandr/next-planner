import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ICustomFieldAnswer } from '@/utils/interfaces';
import { EQueries } from '@/react-query/types';
import { useAppDispatch } from '@/storage/hooks';
import { setAlertAC } from '@/storage/alertSlice';
import { CustomFieldAnswerService } from '@/api/services/customFieldAnswerService';

export const useSaveAnswersMutation = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const saveMutation = useMutation({
    mutationFn: (answers: ICustomFieldAnswer[]) => CustomFieldAnswerService.saveAnswers(answers),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EQueries.saveAnswers] });
    },
    onError: error => {
      dispatch(setAlertAC({ text: error.message, mode: 'error' }));
    }
  });

  return {
    data: saveMutation.data,
    saveAnswers: saveMutation.mutate,
    isSaving: saveMutation.isPending,
    error: saveMutation.error,
    isError: saveMutation.isError,
  };
};
