import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../../api/react-query'
import { useToast } from '../../components/context/ToastContext'

interface usePatchCustomProps {
  onMutate: () => Promise<{ success: boolean; message: string }>
  onSuccess: () => void
  onError?: () => Promise<unknown>
}

const usePatchCustom = ({
  onMutate,
  onSuccess,
  onError,
}: usePatchCustomProps) => {
  const { showToast } = useToast()

  const { mutate: patchCustom, isPending } = useMutation({
    mutationFn: onMutate,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['custom'],
      })
      onSuccess()
      showToast(data)
    },
    onError: onError,
  })

  return { patchCustom, isPending }
}

export default usePatchCustom
