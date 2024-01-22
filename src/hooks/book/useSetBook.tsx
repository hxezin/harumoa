import { useMutation, useQueryClient } from '@tanstack/react-query'
import { setBook } from '../../api/firebase'
import { useNavigate } from 'react-router-dom'
import { MonthDetail, TotalPrice } from '../../types'
import { useToast } from '../../components/context/ToastContext'

export const useSetBook = (
  date: string,
  total: TotalPrice,
  reqData: MonthDetail | null,
  isDelete?: boolean
) => {
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const { showToast } = useToast()

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      setBook(
        date.replaceAll('-', '/'),
        reqData,
        total, //에러 시 total price 롤백하기 위한 값
        isDelete
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['books', date.split('-')[0], date.split('-')[1]],
      })
      showToast(data)
      if (reqData) {
        //작성 혹은 수정
        navigate(`/detail?date=${date}`, {
          state: {
            detail: reqData,
          },
        })
      } else {
        //삭제
        navigate('/')
      }
    },
  })
  return { mutate, isPending }
}
