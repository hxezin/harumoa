import { useLocation, useNavigate } from 'react-router-dom'
import {
  BookContainer,
  BookContentContainer,
  BookDataContainer,
} from '../assets/css/Book'
import DiaryDetail from '../components/book/DiaryDetail'
import AccountBookDetail from '../components/book/AccountBookDetail'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { setBook, setTotalPrice } from '../api/firebase'
import { useMonthYearContext } from '../components/context/MonthYearContext'
import { calcTotalPrice } from '../utils/accountBook'
import useModal from '../hooks/useModal'
import Modal from '../components/common/Modal'
import { ConfirmContainer } from '../assets/css/Confirm'

const Detail = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const date = location.search.split('=')[1]

  const accountBookData = location.state.detail.account_book

  const diaryData = location.state.detail.diary

  const { isOpen, onClose, onOpen } = useModal()

  const queryClient = useQueryClient()

  const { total } = useMonthYearContext()

  const { mutate: deleteBook } = useMutation({
    mutationFn: () =>
      setBook(
        date.replaceAll('-', '/'),
        null,
        total //에러 시 total price 롤백하기 위한 값
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['books', date.split('-')[0], date.split('-')[1]],
      })
      navigate('/')
    },
  })

  const handleDeleteBook = async () => {
    const calcTotal = calcTotalPrice(accountBookData, total, true) //세번째 파라미터가 true로 누적 시 마이너스로 계산된다

    const resSetTotalPrice = await setTotalPrice(date.split('-'), calcTotal) //total price update

    if (resSetTotalPrice) {
      //update 성공 시 삭제
      deleteBook()
    }
  }

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
              <button onClick={handleDeleteBook}>확인</button>
            </div>
          </ConfirmContainer>
        </Modal>
      )}
    </BookContainer>
  )
}

export default Detail
