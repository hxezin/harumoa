import { useLocation, useNavigate } from 'react-router-dom'
import {
  BookContainer,
  BookContentContainer,
  BookDataContainer,
} from '../assets/css/Book'
import DiaryDetail from '../components/book/DiaryDetail'
import AccountBookDetail from '../components/book/AccountBookDetail'
import { useMonthYearContext } from '../components/context/MonthYearContext'
import useModal from '../hooks/useModal'
import Modal from '../components/common/Modal'
import { ConfirmContainer } from '../assets/css/Confirm'
import { useSetBook } from '../hooks/book/useSetBook'
import { useSetTotalPrice } from '../hooks/book/useSetTotalPrice'

const Detail = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const date = location.search.split('=')[1]

  const accountBookData = location.state.detail.account_book

  const diaryData = location.state.detail.diary

  const { isOpen, onClose, onOpen } = useModal()

  const { total } = useMonthYearContext()

  const { mutate: deleteBook } = useSetBook(date, total, null)

  const { updateTotalPrice } = useSetTotalPrice(
    date,
    total,
    accountBookData,
    true, //total price 빼기
    deleteBook
  )

  return (
    <BookContainer>
      <BookDataContainer>
        <h2>{date}</h2>
        <div>
          <button
            onClick={() =>
              navigate(`/edit?date=${date}`, {
                state: location.state,
              })
            }
          >
            수정
          </button>

          <button onClick={onOpen} style={{ background: '#ff0000' }}>
            삭제
          </button>
        </div>
      </BookDataContainer>

      <BookContentContainer>
        <DiaryDetail diaryData={diaryData} />
        <AccountBookDetail accountBookData={accountBookData} />
      </BookContentContainer>

      {isOpen && (
        <Modal onClose={onClose}>
          <ConfirmContainer>
            <h3>{date} 글을 삭제하시겠습니까?</h3>
            <h5>삭제 시 일기와 가계부는 삭제됩니다. </h5>

            <div>
              <button onClick={onClose}>취소</button>
              <button onClick={() => updateTotalPrice()}>확인</button>
            </div>
          </ConfirmContainer>
        </Modal>
      )}
    </BookContainer>
  )
}

export default Detail
