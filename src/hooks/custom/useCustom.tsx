import { useQuery } from '@tanstack/react-query'
import { getCustom } from '../../api/firebase'
import { useAuthContext } from '../../components/context/AuthContext'

const useCustom = () => {
  const { isLoggedIn } = useAuthContext()
  const { data: custom, isLoading } = useQuery({
    queryKey: ['custom'],
    queryFn: () => getCustom(),
    enabled: isLoggedIn,
  })

  return { custom, isLoading }
}

export default useCustom
