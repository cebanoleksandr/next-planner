import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ICustomFieldAnswer, ICustomFieldAnswerRequest } from '@/utils/interfaces';
import { EQueries } from '@/react-query/types';
import { useAppDispatch } from '@/storage/hooks';
import { setAlertAC } from '@/storage/alertSlice';
import { CustomFieldAnswerService } from '@/api/services/customFieldAnswerService';

interface IUpdateAnswer { 
  goalId: string;
  id: string;
  answer: ICustomFieldAnswerRequest; 
}

export const useUpdateAnswerMutation = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const updateMutation = useMutation({
    mutationFn: ({ goalId, id, answer }: IUpdateAnswer) => CustomFieldAnswerService.update(goalId, id, answer),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EQueries.saveAnswers] });
      dispatch(setAlertAC({ text: 'Field Answer is updated', mode: 'error' }));
    },
    onError: error => {
      dispatch(setAlertAC({ text: error.message, mode: 'error' }));
    }
  });

  return {
    data: updateMutation.data,
    updateAnswer: updateMutation.mutate,
    isSaving: updateMutation.isPending,
    error: updateMutation.error,
    isError: updateMutation.isError,
  };
};
