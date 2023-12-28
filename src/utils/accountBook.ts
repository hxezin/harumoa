import { IAccountBook, TotalPrice } from '../types'

export const inputNumberWithComma = (str: string | number): string => {
  return String(str).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')
}

export const inputNumberCheck = (str: string): string => {
  // str 값이 숫자가 아닐경우 빈문자열로 replace
  return str.replace(/^0|[^0-9]/g, '')
}

const calcPrice = (totalData: number, data: number, isDelete: boolean) => {
  if (isDelete) {
    totalData -= data
  } else {
    totalData += data
  }
  return totalData
}

//수입/지출 데이터 가공
export const calcTotalPrice = (
  accountBookData: IAccountBook,
  total: TotalPrice,
  isDelete: boolean
) => {
  let income = total ? total.income_price : 0
  let expense = total ? total.expense_price : 0

  Object.entries(accountBookData).map(([key, value]) => {
    if (value.is_income) {
      income = calcPrice(income, value.price, isDelete)
    } else {
      expense = calcPrice(expense, value.price, isDelete)
    }
  })

  return {
    income_price: income < 0 ? 0 : income,
    expense_price: expense < 0 ? 0 : expense,
  }
}
