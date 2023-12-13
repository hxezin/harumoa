import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ellipsisStyles } from '../assets/css/global'
import { MonthDetail } from '../types'

const DateBoxContainer = styled.div<{ $isCurrentMonth?: boolean }>`
  border-top: 0.1px solid #ccc;
  border-right: 0.1px solid #ccc;
  padding: 0.5rem;
  color: ${({ $isCurrentMonth }) => ($isCurrentMonth ? '#000' : '#ccc')};
  font-size: 0.8rem;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
`

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
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
  flex: 1;
`

const TotalPrice = styled.div<{ $totalPrice: number }>`
  ${ellipsisStyles}
  border-top: 1px solid black;
  margin-top: 0.3rem;
  padding-top: 0.3rem;
  text-align: right;
  color: ${({ $totalPrice }) => ($totalPrice > 0 ? 'blue' : 'red')};
`

interface Props {
  selectedDate?: string
  date: number
  detail?: MonthDetail | null
  isCurrentMonth?: boolean
}

const DateBox = ({ selectedDate, date, detail, isCurrentMonth }: Props) => {
  if (detail) {
    const { diary, account_book } = detail

    const totalPrice = Object.values(account_book).reduce((acc, cur) => {
      return cur.is_income ? acc + cur.price : acc - cur.price
    }, 0)

    return (
      <Link to={`/detail?date=${selectedDate}`}>
        <DateBoxContainer $isCurrentMonth={isCurrentMonth}>
          <ContentContainer>
            <Date>{date}</Date>
            <Diary>
              <span>{diary.title}</span>
            </Diary>
          </ContentContainer>

          <AccountBookList>
            {Object.entries(account_book).map(([key, account]) => (
              <AccountBookItem key={key}>
                <Comment>{account.comment}</Comment>
                <Price>₩ {account.price}</Price>
              </AccountBookItem>
            ))}
          </AccountBookList>

          <TotalPrice $totalPrice={totalPrice}>₩ {totalPrice}</TotalPrice>
        </DateBoxContainer>
      </Link>
    )
  }

  return (
    <DateBoxContainer $isCurrentMonth={isCurrentMonth}>
      <Date>{date}</Date>
    </DateBoxContainer>
  )
}

export default DateBox
