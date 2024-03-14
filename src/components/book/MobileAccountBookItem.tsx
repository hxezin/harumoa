import { useState } from 'react'
import { paymentTypeOptions } from '../../constants'
import { IAccountBook, Options } from '../../types'
import { inputNumberCheck, inputNumberWithComma } from '../../utils/accountBook'
import { BlueButton } from '../common/Button'
import Dropdown from '../common/Dropdown'
import Input from '../common/Input'
import SectionItem from '../common/SectionItem'
import * as S from '../sidebar/MobileFixedExpenseItem.styled'

interface Props {
  id: string
  accountBook: IAccountBook
  setAccountBook?: React.Dispatch<React.SetStateAction<IAccountBook>>
  category: Options[]
  viewMode: boolean
  onClose: () => void
}

// MobileFixedExpenseItem와 스타일드 컴포넌트 공유
const MobileAccountBookItem = ({
  id,
  accountBook,
  setAccountBook,
  category,
  viewMode,
  onClose,
}: Props) => {
  const [currentData, setCurrentData] = useState<IAccountBook>(accountBook)

  const handleClose = () => {
    setAccountBook && setAccountBook(currentData)
    onClose() //backsheet 닫기
  }

  return (
    <>
      <S.Container>
        <S.Header> {accountBook[id]?.is_income ? '수입' : '지출'} </S.Header>
        <S.Content>
          <SectionItem title='카테고리'>
            <Dropdown
              onChange={(e) => {
                accountBook[id].category = e

                //memo, price 초기화
                accountBook[id].memo = ''
                accountBook[id].price = 0

                setCurrentData({ ...accountBook })
              }}
              options={category}
              defaultValue={accountBook[id]?.category}
              placeholder='카테고리'
              viewMode={viewMode}
            />
          </SectionItem>
          <SectionItem title='금액'>
            <Input
              type='text'
              value={
                accountBook[id]?.price === 0
                  ? ''
                  : inputNumberWithComma(accountBook[id]?.price)
              }
              onChange={(e) => {
                const numPrice = inputNumberCheck(e.target.value)

                accountBook[id].price = Number(numPrice)

                setCurrentData({ ...accountBook })
              }}
              textAlign='center'
              viewMode={viewMode}
              padding='0.5rem 1.5rem 0.5rem'
            />
          </SectionItem>
          <SectionItem title='지출 수단'>
            <Dropdown
              onChange={(e) => {
                accountBook[id].payment_type = e
                setCurrentData({ ...accountBook })
              }}
              options={paymentTypeOptions}
              defaultValue={accountBook[id]?.payment_type}
              placeholder='지출 수단'
              viewMode={viewMode}
            />
          </SectionItem>
          <SectionItem title='메모'>
            <Input
              type='text'
              onChange={(e) => {
                accountBook[id].memo = e.target.value

                setCurrentData({ ...accountBook })
              }}
              value={accountBook[id]?.memo}
              placeholder='메모'
              textAlign='center'
              viewMode={viewMode}
            />
          </SectionItem>
        </S.Content>
        <S.ButtonContainer>
          <BlueButton
            value={viewMode ? '닫기' : '확인'}
            onClick={handleClose}
          />
        </S.ButtonContainer>
      </S.Container>
    </>
  )
}

export default MobileAccountBookItem
