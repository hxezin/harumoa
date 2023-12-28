import { useMutation } from '@tanstack/react-query'
import { calcTotalPrice } from '../../utils/accountBook'
import { setTotalPrice } from '../../api/firebase'
import { IAccountBook, TotalPrice } from '../../types'

export const useSetTotalPrice = (
  date: string,
  total: TotalPrice,
  accountBookData: IAccountBook,
  isDelete: boolean,
  handleSuccess: () => void
) => {
  const { mutate: updateTotalPrice } = useMutation({
    mutationFn: () => {
      const calcTotal = calcTotalPrice(accountBookData, total, isDelete)

      return setTotalPrice(date.split('-'), calcTotal) //total price update
    },
    onSuccess: () => handleSuccess(),
  })
  return { updateTotalPrice }
}
