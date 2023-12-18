import { useLocation, useNavigate } from 'react-router-dom'
import {
  BookContainer,
  BookContentContainer,
  BookDataContainer,
} from '../assets/css/Book'
import DiaryDetail from '../components/book/DiaryDetail'
import AccountBookDetail from '../components/book/AccountBookDetail'

const Detail = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const date = location.search.split('=')[1]

  const accountBookData = location.state.detail.account_book

  const diaryData = location.state.detail.diary

  return (
    <BookContainer>
      <BookDataContainer>
        <h2>{date}</h2>
        <button
          onClick={() =>
            navigate(`/edit?date=${date}`, {
              state: location.state,
            })
          }
        >
          수정
        </button>
      </BookDataContainer>

      <BookContentContainer>
        <DiaryDetail diaryData={diaryData} />
        <AccountBookDetail accountBookData={accountBookData} />
      </BookContentContainer>
    </BookContainer>
  )
}

export default Detail
