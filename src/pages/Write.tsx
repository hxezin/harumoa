import { useEffect, useState } from 'react'
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
import { calcTotalPrice } from '../utils/accountBook'

const Write = () => {
  const location = useLocation()

  const date = location.search.split('=')[1]

  const { total } = useMonthYearContext()

  const [modifyPrice, setModifyPrice] = useState({
    income_price: 0,
    expense_price: 0,
  }) //수정 중일때 사용하는 price state

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
    location.state ? modifyPrice : total, //edit ? 계산된 total : total
    accountBookData,
    false, //total price 더하기
    saveBook
  )

  useEffect(() => {
    if (location.state) {
      //수정 시 있는 값에서 줄이거나 늘릴 때 기존꺼에서 누적되는 현상 발생 변수 별도로 두는걸로 해결

      setModifyPrice(calcTotalPrice(accountBookData, total, true)) //isDelete true로 줘서 수입을 빼주고, 지출은 더해준다. 함수 재사용
    }
  }, [])

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
