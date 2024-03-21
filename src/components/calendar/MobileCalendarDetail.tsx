import { MobileDetail } from './Calendar'

import { useNavigate } from 'react-router-dom'
import editIcon from '../../assets/icons/editIcon.svg'
import plusIcon from '../../assets/icons/plusIcon.svg'
import { inputNumberWithComma } from '../../utils/accountBook'
import styled from 'styled-components'
import { ellipsisStyles } from '../../assets/css/global'

interface Props {
  mobileDetail: MobileDetail
}

const MobileDetailContainer = styled.div`
  display: none;

  @media screen and (max-width: 780px) {
    display: block;
    padding: 0.8rem 0 1rem 0;
    border-top: 1px solid ${({ theme }) => theme.color.gray0};
    margin-top: 0.8rem;

    font-size: ${({ theme }) => theme.fontSize.sm};
    color: ${({ theme }) => theme.color.gray2};

    > div:first-child {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: ${({ theme }) => theme.fontWeight.bold};

      > div {
        display: flex;
        column-gap: 1rem;
        align-items: center;
      }
      span:first-child {
        font-size: ${({ theme }) => theme.fontSize.base};
        background: ${({ theme }) => theme.color.primary.main};
        border-radius: 50%;
        width: 1rem;
        height: 1rem;
        text-align: center;
        padding: 0.2rem 0.3rem 0.4rem;
        color: ${({ theme }) => theme.color.white};
      }
    }

    .diaryContent {
      font-size: ${({ theme }) => theme.fontSize.xs};
      color: ${({ theme }) => theme.color.gray1};
      padding-top: 0.5rem;
      ${ellipsisStyles}
    }
  }
`

const MobileAccountBookList = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  margin-top: 1rem;
`

const MobileAccountBookItem = styled.div<{ $isIncome: boolean }>`
  color: ${({ $isIncome, theme }) =>
    $isIncome ? theme.color.primary.dark : theme.color.red.dark};
  display: flex;
  column-gap: 2rem;

  span:first-child {
    width: 60px;
    ${ellipsisStyles}
  }
`

const MobileTotalPrice = styled.div`
  margin-top: 1rem;
  display: flex;
  column-gap: 2rem;
  border-top: 1px solid ${({ theme }) => theme.color.gray0};
  padding-top: 1rem;
`

const ActionButton = styled.button`
  border-radius: 0.15rem;
  background: #fcfcfc;
  box-shadow: 1.2px 1.2px 3.6px 0px rgba(97, 97, 97, 0.5);
  border: none;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const MobileCalendarDetail = ({ mobileDetail }: Props) => {
  const navigate = useNavigate()

  const handleBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (mobileDetail?.account_book) {
      //가계부가 있다면 편집
      e.stopPropagation()

      navigate(`/edit?date=${mobileDetail?.selectedDate}`, {
        state: {
          detail: {
            diary: mobileDetail?.diary,
            account_book: mobileDetail?.account_book,
          },
        },
      })
    } else {
      //아니면 추가
      navigate(`/write?date=${mobileDetail?.selectedDate}`)
    }
  }

  return (
    <MobileDetailContainer>
      <div>
        <div>
          <span>{mobileDetail.date}</span>
          <span>{mobileDetail.diary?.title}</span>
        </div>

        <ActionButton onClick={handleBtnClick}>
          <img src={mobileDetail.account_book ? editIcon : plusIcon} />
        </ActionButton>
      </div>

      <div>
        <h5 className='diaryContent'>{mobileDetail.diary?.content}</h5>
      </div>

      <MobileAccountBookList>
        {mobileDetail.account_book &&
          Object.entries(mobileDetail.account_book).map(([key, account]) => {
            return (
              <MobileAccountBookItem key={key} $isIncome={account.is_income}>
                <span>{account.category}</span>
                <span>{inputNumberWithComma(account.price)}원 </span>
              </MobileAccountBookItem>
            )
          })}
      </MobileAccountBookList>

      {mobileDetail.totalPrice && (
        <MobileTotalPrice>
          <span> TOTAL </span>
          <span>{inputNumberWithComma(mobileDetail.totalPrice)}원</span>
        </MobileTotalPrice>
      )}
    </MobileDetailContainer>
  )
}

export default MobileCalendarDetail
