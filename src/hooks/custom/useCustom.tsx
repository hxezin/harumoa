import { useQuery } from '@tanstack/react-query'
import { getCustom } from '../../api/firebase'

const useCustom = () => {
  const { data: custom, isLoading } = useQuery({
    queryKey: ['custom'],
    queryFn: () => getCustom(),
  })

  return { custom, isLoading }
}

export default useCustom
