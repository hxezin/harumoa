import { useState } from 'react'
import { IDiary, IAccountBook } from '../types'
import AccountBookWrite from '../components/book/AccountBookWrite'
import DiaryWrite from '../components/book/DiaryWrite'
import { useLocation } from 'react-router-dom'
import {
  BookContainer,
  BookContentContainer,
  BookDataContainer,
} from '../assets/css/Book'
import { useMonthYearContext } from '../components/context/MonthYearContext'
import { useSetBook } from '../hooks/book/useSetBook'
import { useSetTotalPrice } from '../hooks/book/useSetTotalPrice'

const Write = () => {
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

  const { mutate: saveBook } = useSetBook(date, total, {
    diary: diaryData,
    account_book: accountBookData,
  })

  const { updateTotalPrice } = useSetTotalPrice(
    date,
    total,
    accountBookData,
    false, //total price 더하기
    saveBook
  )

  return (
    <BookContainer>
      <BookDataContainer>
        <h2>{date}</h2>
        <button
          onClick={() => updateTotalPrice()}
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
