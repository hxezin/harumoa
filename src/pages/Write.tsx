import { useState } from 'react'
import { IDiary, IAccountBook } from '../types'
import AccountBookWrite from '../components/book/AccountBookWrite'
import DiaryWrite from '../components/book/DiaryWrite'
import { useLocation, useNavigate } from 'react-router-dom'
import { setBook, setTotalPrice } from '../api/firebase'
import {
  BookContainer,
  BookContentContainer,
  BookDataContainer,
} from '../assets/css/Book'
import { useMonthYearContext } from '../components/context/MonthYearContext'

const Write = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const date = location.search.split('=')[1]

  const { total } = useMonthYearContext()

  const [accountBookData, setAccountBookData] = useState<IAccountBook>(
    location.state?.detail.account_book ?? {}
  )

  const [diaryData, setDiaryData] = useState<IDiary>(
    location.state?.detail.diary ?? {
      title: '',
      content: '',
      emotion: '',
    }
  )

  const handleSavaClick = async () => {

    let income = total ? total.income_price : 0
    let expense = total ? total.expense_price : 0

    //수입/지출 데이터 가공
    Object.entries(accountBookData).map(([key, value]) => {
      if (value.is_income) {
        income += value.price
      } else {
        expense += value.price
      }
    })

    const resSetTotalPrice = await setTotalPrice(date.split('-'), {
      income_price: income,
      expense_price: expense,
    }) //total price update

    if (resSetTotalPrice) {
      //update 성공 시 가계부, 일기 set api call
      const reqData = {
        diary: diaryData,
        account_book: accountBookData,
      }

      const resSetBook = await setBook(
        date.replaceAll('-', '/'),
        {
          diary: diaryData,
          account_book: accountBookData,
        },
        total //에러 시 total price 롤백하기 위한 값
      )

      if (resSetBook) {
        navigate(`/detail?date=${date}`, {
          state: {
            detail: reqData,
          },
        })
      }
    }
  }

  return (
    <BookContainer>
      <BookDataContainer>
        <h2>{date}</h2>
        <button
          onClick={handleSavaClick}
          disabled={
            diaryData.title === '' ||
            Object.values(accountBookData).filter((item) => item.price === 0)
              .length !== 0 ||
            Object.keys(accountBookData).length === 0
          }
        >
          저장
        </button>
      </BookDataContainer>

      <BookContentContainer>
        <DiaryWrite diaryData={diaryData} setDiary={setDiaryData} />
        <AccountBookWrite
          accountBookData={accountBookData}
          setAccountBook={setAccountBookData}
        />
      </BookContentContainer>
    </BookContainer>
  )
}

export default Write
