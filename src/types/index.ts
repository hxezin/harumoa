interface TotalPrice {
  income_price: number
  expense_price: number
}

interface Diary {
  title: string
  emotion: string
  content: string
}

interface AccountBook {
  [key: string]: {
    comment: string
    price: number
    category: string
    is_income: boolean
  }
}

export interface MonthDetail {
  diary: Diary
  account_book: AccountBook
}

export interface Books {
  [key: string]: MonthDetail | TotalPrice
  total: TotalPrice
}
