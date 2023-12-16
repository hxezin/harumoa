import { useEffect, useState } from 'react'
import { IDiary, IAccountBook } from '../types'
import styled from 'styled-components'
import AccountBook from '../components/AccountBook'
import Diary from '../components/Diary'
import { useLocation } from 'react-router-dom'
import { setBook } from '../api/firebase'

const WriteContainer = styled.div`
  padding: 10px 30px;
`

const WriteDateContainer = styled.div`
  display: flex;
  justify-content: space-between;

  h2 {
    margin: 0;
  }
`

const WriteContentContainer = styled.div`
  display: flex;
  column-gap: 30px;

  margin-top: 20px;
`

const Write = () => {
  const [accountBookData, setAccountBookData] = useState<IAccountBook>({})

  const location = useLocation()

  const date = location.search.split('=')[1]

  const [diaryData, setDiaryData] = useState<IDiary>({
    title: '',
    content: '',
    emotion: '',
  })

  const handleSavaClick = () => {
    const reqData = {
      diary: diaryData,
      account_book: accountBookData,
    }

    setBook(date.replaceAll('-', '/'), reqData)
  }

  return (
    <WriteContainer>
      <WriteDateContainer>
        <h2>{date}</h2>
        <button
          onClick={handleSavaClick}
          disabled={
            diaryData.title === '' ||
            Object.values(accountBookData).filter((item) => item.price === 0)
              .length !== 0
          }
        >
          저장
        </button>
      </WriteDateContainer>

      <WriteContentContainer>
        <Diary diaryData={diaryData} setDiary={setDiaryData} />
        <AccountBook
          accountBookData={accountBookData}
          setAccountBook={setAccountBookData}
        />
      </WriteContentContainer>
    </WriteContainer>
  )
}

export default Write
