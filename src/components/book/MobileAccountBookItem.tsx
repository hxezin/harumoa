import { useState } from 'react'
import styled from 'styled-components'
import { paymentTypeOptions } from '../../constants'
import { IAccountBook, Options } from '../../types'
import { inputNumberCheck, inputNumberWithComma } from '../../utils/accountBook'
import { BlueButton } from '../common/Button'
import Dropdown from '../common/Dropdown'
import Input from '../common/Input'
import SectionItem from '../common/SectionItem'

const Container = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const Header = styled.header`
  padding: 1.5rem;
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ theme }) => theme.fontWeight.bold};

  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
`

const Content = styled.div`
  padding: 0 1.5rem 5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
  overflow: scroll;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background: transparent;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 3;
`

interface Props {
  id: string
  accountBook: IAccountBook
  setAccountBook?: React.Dispatch<React.SetStateAction<IAccountBook>>
  category: Options[]
  viewMode: boolean
  onClose: () => void
}

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
      <Container>
        <Header> {accountBook[id]?.is_income ? '수입' : '지출'} </Header>
        <Content>
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
        </Content>
        <ButtonContainer>
          <BlueButton
            value={viewMode ? '닫기' : '확인'}
            onClick={handleClose}
          />
        </ButtonContainer>
      </Container>
    </>
  )
}

export default MobileAccountBookItem
