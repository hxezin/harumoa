interface TotalPrice {
  income_price: number
  expense_price: number
}

export interface IDiary {
  title: string
  emotion: string
  content: string
}

export interface IAccountBook {
  [key: string]: {
    memo: string
    price: number
    category: string
    is_income: boolean
  }
}

export interface MonthDetail {
  diary: IDiary
  account_book: IAccountBook
}

export interface Books {
  [key: string]: MonthDetail | TotalPrice
  total: TotalPrice
}
