import styled from 'styled-components'
import { ellipsisStyles } from '../assets/css/global'
import { MonthDetail } from '../types'
import { useNavigate } from 'react-router-dom'
import { inputNumberWithComma } from '../utils/\baccountBook'

const DateBoxContainer = styled.div<{ $isCurrentMonth?: boolean }>`
  border-top: 0.1px solid #ccc;
  border-right: 0.1px solid #ccc;
  padding: 0.5rem;
  color: ${({ $isCurrentMonth }) => ($isCurrentMonth ? '#000' : '#ccc')};
  font-size: 0.8rem;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  &:hover button {
    visibility: visible;
  }
`

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
`

const Date = styled.div`
  margin-bottom: 0.5rem;
  text-align: center;
`

const Diary = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.3rem;
  padding: 0.2rem;
  background-color: #b2e7e8;

  > span {
    ${ellipsisStyles}
  }
`

const AccountBookList = styled.ul`
  flex: 2;
  overflow-y: auto;
  padding: 0;
  margin: 0.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`

const AccountBookItem = styled.li`
  display: flex;
  justify-content: space-between;
`

const Comment = styled.span`
  ${ellipsisStyles}
  flex: 1;
`

const Price = styled.span`
  ${ellipsisStyles}
  text-align: right;
  // flex: 1;
`

const TotalPrice = styled.div<{ $totalPrice: number }>`
  ${ellipsisStyles}
  border-top: 1px solid black;
  margin-top: 0.3rem;
  padding-top: 0.3rem;
  text-align: right;
  color: ${({ $totalPrice }) => ($totalPrice > 0 ? 'blue' : 'red')};
`

const EditButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  padding: 0 0.1rem;
  visibility: hidden;
`

const AddButton = styled.button`
  visibility: hidden;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

interface Props {
  selectedDate?: string
  date: number
  detail?: MonthDetail | null
  isCurrentMonth?: boolean
}

const DateBox = ({ selectedDate, date, detail, isCurrentMonth }: Props) => {
  const navigate = useNavigate()

  function handleContainerClick() {
    navigate(`/detail?date=${selectedDate}`, { state: { detail } })
  }

  function handleEditBtnClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation()
    navigate(`/edit?date=${selectedDate}`, { state: { detail } })
  }

  function handleAddBtnClick() {
    navigate(`/write?date=${selectedDate}`)
  }

  if (detail) {
    const { diary, account_book } = detail

    const totalPrice = Object.values(account_book).reduce((acc, cur) => {
      return cur.is_income ? acc + cur.price : acc - cur.price
    }, 0)

    return (
      <DateBoxContainer
        $isCurrentMonth={isCurrentMonth}
        onClick={handleContainerClick}
      >
        <ContentContainer>
          <Date>{date}</Date>
          <EditButton onClick={handleEditBtnClick}>수정</EditButton>
          <Diary>
            <span>{diary.title}</span>
          </Diary>
        </ContentContainer>

        <AccountBookList>
          {Object.entries(account_book).map(([key, account]) => (
            <AccountBookItem key={key}>
              <Comment>{account.memo}</Comment>
              <Price>₩ {inputNumberWithComma(account.price)}</Price>
            </AccountBookItem>
          ))}
        </AccountBookList>

        <TotalPrice $totalPrice={totalPrice}>
          ₩ {inputNumberWithComma(totalPrice)}
        </TotalPrice>
      </DateBoxContainer>
    )
  }

  return (
    <DateBoxContainer $isCurrentMonth={isCurrentMonth}>
      <ContentContainer>
        <Date>{date}</Date>
      </ContentContainer>
      {isCurrentMonth && (
        <ButtonContainer>
          <AddButton onClick={handleAddBtnClick}>+</AddButton>
        </ButtonContainer>
      )}
    </DateBoxContainer>
  )
}

export default DateBox
