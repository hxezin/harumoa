import { useLocation } from 'react-router-dom'
import { useMonthYearContext } from '../components/context/MonthYearContext'
import useModal from '../hooks/useModal'
import Modal from '../components/common/Modal'
import { useSetBook } from '../hooks/book/useSetBook'
import { useSetTotalPrice } from '../hooks/book/useSetTotalPrice'
import BookFooter from '../components/book/BookFooter'
import Diary from '../components/book/Diary'
import AccountBook from '../components/book/AccountBook'
import Confirm from '../components/common/Confirm'
import { Button, RedButton } from '../components/common/Button'
import Template from '../components/common/Template'

const Detail = () => {
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
    <>
      <Template title={`${date.replace(/-/g, '.')}.`}>
        <Diary diaryData={diaryData} viewMode={true} />
        <AccountBook accountBookData={accountBookData} viewMode={true} />
      </Template>

      {isOpen && (
        <Modal onClose={onClose}>
          <Confirm
            title={`정말 삭제하시겠습니까?`}
            guidance={`삭제하시면 ${date.replace(
              /-/g,
              '.'
            )}. 일기와 가계부를 복구할 수 없습니다.`}
            buttons={
              <>
                <Button onClick={onClose} value='취소하기' />
                <RedButton
                  onClick={() => updateTotalPrice()}
                  value='삭제하기'
                />
              </>
            }
          />
        </Modal>
      )}

      <BookFooter date={date} isEditMode={false} onDelete={onOpen} />
    </>
  )
}

export default Detail
