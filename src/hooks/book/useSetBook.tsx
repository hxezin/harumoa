import { useMutation, useQueryClient } from '@tanstack/react-query'
import { setBook } from '../../api/firebase'
import { useNavigate } from 'react-router-dom'
import { MonthDetail, TotalPrice } from '../../types'

export const useSetBook = (
  date: string,
  total: TotalPrice,
  reqData: MonthDetail | null
) => {
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const { mutate } = useMutation({
    mutationFn: () =>
      setBook(
        date.replaceAll('-', '/'),
        reqData,
        total //에러 시 total price 롤백하기 위한 값
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['books', date.split('-')[0], date.split('-')[1]],
      })
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
  return { mutate }
}
