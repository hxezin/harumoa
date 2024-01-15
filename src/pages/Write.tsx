import { useEffect, useState } from 'react'
import { IDiary, IAccountBook } from '../types'
import AccountBook from '../components/book/AccountBook'
import Diary from '../components/book/Diary'
import { useLocation } from 'react-router-dom'
import { useMonthYearContext } from '../components/context/MonthYearContext'
import { useSetBook } from '../hooks/book/useSetBook'
import { useSetTotalPrice } from '../hooks/book/useSetTotalPrice'
import { calcTotalPrice } from '../utils/accountBook'
import BookFooter from '../components/book/BookFooter'
import Template from '../components/common/Template'

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
  }) //아래 useSetTotalPrice 처럼 mutate를 다른 이름으로 반환하지 않은 이유는 Detail.tsx에서는 해당 커스텀 훅의 mutate를 삭제용도로 사용하기 때문

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
    <>
      <Template
        title={`${date.replace(/-/g, '.')}.`}
        guidance='오늘의 하루와 지출 내역을 기록해보세요!'
      >
        <Diary diaryData={diaryData} setDiary={setDiaryData} viewMode={false} />
        <AccountBook
          accountBookData={accountBookData}
          setAccountBook={setAccountBookData}
          viewMode={false}
        />
      </Template>

      <BookFooter
        date={date}
        isEditMode={true}
        onSave={() => updateTotalPrice()}
        disabled={
          Object.values(accountBookData).filter((item) => item.price === 0)
            .length !== 0 || Object.keys(accountBookData).length === 0
        }
      />
    </>
  )
}

export default Write
