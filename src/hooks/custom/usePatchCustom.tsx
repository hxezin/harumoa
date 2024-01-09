import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../../api/react-query'

interface usePatchCustomProps {
  onMutate: () => Promise<unknown>
  onSuccess: () => void
  onError?: () => Promise<unknown>
}

const usePatchCustom = ({
  onMutate,
  onSuccess,
  onError,
}: usePatchCustomProps) => {
  const { mutate: patchCustom } = useMutation({
    mutationFn: onMutate,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['custom'],
      })
      onSuccess()
    },
    onError: onError,
  })

  return { patchCustom }
}

export default usePatchCustom
