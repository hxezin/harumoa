import { useState } from 'react'
import { IDiary, IAccountBook } from '../types'
import AccountBookWrite from '../components/book/AccountBookWrite'
import DiaryWrite from '../components/book/DiaryWrite'
import { useLocation, useNavigate } from 'react-router-dom'
import { setBook } from '../api/firebase'
import {
  BookContainer,
  BookContentContainer,
  BookDataContainer,
} from '../assets/css/Book'

const Write = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const date = location.search.split('=')[1]

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
    const reqData = {
      diary: diaryData,
      account_book: accountBookData,
    }

    const res = await setBook(date.replaceAll('-', '/'), reqData)

    if (res) {
      navigate(`/detail?date=${date}`, {
        state: {
          detail: reqData,
        },
      })
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
