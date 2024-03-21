import { useEffect, useState } from 'react'
import { IFixedExpense } from '../../types'
import { deepCopy, formatSelectOptions } from '../../utils'
import { inputNumberCheck, inputNumberWithComma } from '../../utils/accountBook'
import Dropdown from '../common/Dropdown'
import Input from '../common/Input'
import { paymentTypeOptions } from '../../constants'
import SectionItem from '../common/SectionItem'
import { BlueButton, Button, RedButton } from '../common/Button'
import isEqual from 'lodash.isequal'
import usePatchCustom from '../../hooks/custom/usePatchCustom'
import { deleteFixedExpense, setFixedExpense } from '../../api/firebase'
import useModal from '../../hooks/useModal'
import Modal from '../common/Modal'
import Confirm from '../common/Confirm'
import * as S from './MobileFixedExpenseItem.styled'

interface Props {
  id: string
  data: IFixedExpense
  setData: React.Dispatch<React.SetStateAction<IFixedExpense>>
  category: string
  onClose: () => void
  viewMode: boolean
}

const MobileFixedExpenseItem = ({
  id,
  data,
  setData,
  category,
  onClose,
  viewMode,
}: Props) => {
  const [isEdit, setIsEdit] = useState(!viewMode)
  const [originData, setOriginData] = useState<IFixedExpense>({})
  const [newData, setNewData] = useState<IFixedExpense>({})

  const { isOpen, onClose: onModalClose, onOpen: onModalOpen } = useModal()

  useEffect(() => {
    setNewData(deepCopy(data))
    setOriginData(deepCopy(data))
  }, [])

  const { patchCustom } = usePatchCustom({
    onMutate: () =>
      isEdit ? setFixedExpense(newData) : deleteFixedExpense(id),
    onSuccess: () => {
      setData(newData)
      handleEditMode()
    },
    onError: () => (isEdit ? setFixedExpense(newData) : deleteFixedExpense(id)),
  })

  function handleEditMode() {
    setIsEdit(!isEdit)
  }

  return (
    <>
      <S.Container>
        <S.Header> 고정 지출 </S.Header>
        <S.Content>
          <SectionItem title='지출 기간'>
            <div className='payment-period'>
              <Input
                type='date'
                placeholder='시작 날짜'
                textAlign='center'
                onChange={(e) => {
                  setNewData((prev) => {
                    prev[id].payment_period.start_date = e.target.value
                    return { ...prev }
                  })
                }}
                value={newData[id]?.payment_period?.start_date || ''}
                viewMode={!isEdit}
              />
              {' - '}
              <Input
                type='date'
                placeholder='종료 날짜'
                textAlign='center'
                onChange={(e) => {
                  setNewData((prev) => {
                    prev[id].payment_period.end_date = e.target.value
                    return { ...prev }
                  })
                }}
                value={newData[id]?.payment_period?.end_date || ''}
                min={newData[id]?.payment_period?.start_date || ''}
                viewMode={!isEdit}
              />
            </div>
          </SectionItem>
          <SectionItem title='지출일'>
            <Dropdown
              onChange={(e) => {
                setNewData((prev) => {
                  prev[id].payment_day = e
                  return { ...prev }
                })
              }}
              options={formatSelectOptions(
                Array.from({ length: 30 }, (_, index) => (index + 1).toString())
              )}
              defaultValue={newData[id]?.payment_day}
              viewMode={!isEdit}
              placeholder='지출일'
              height='18rem'
            />
          </SectionItem>
          <SectionItem title='카테고리'>
            <Dropdown
              onChange={(e) => {
                setNewData((prev) => {
                  prev[id].category = e
                  return { ...prev }
                })
              }}
              options={formatSelectOptions(category.split(','))}
              defaultValue={newData[id]?.category}
              viewMode={!isEdit}
              placeholder='카테고리'
              height='10rem'
            />
          </SectionItem>
          <SectionItem title='금액'>
            <Input
              type='text'
              textAlign='center'
              onChange={(e) => {
                setNewData((prev) => {
                  const numPrice = inputNumberCheck(e.target.value)
                  prev[id].price = Number(numPrice)
                  return { ...prev }
                })
              }}
              value={
                newData[id]?.price === 0 || newData[id]?.price === undefined
                  ? ''
                  : inputNumberWithComma(newData[id]?.price)
              }
              viewMode={!isEdit}
            />
          </SectionItem>
          <SectionItem title='지출 수단'>
            <Dropdown
              onChange={(e) => {
                setNewData((prev) => {
                  prev[id].payment_type = e
                  return { ...prev }
                })
              }}
              placeholder='지출 수단'
              options={paymentTypeOptions}
              defaultValue={newData[id]?.payment_type}
              viewMode={!isEdit}
            />
          </SectionItem>
          <SectionItem title='메모'>
            <Input
              type='text'
              placeholder='메모'
              textAlign='center'
              onChange={(e) => {
                setNewData((prev) => {
                  prev[id].memo = e.target.value
                  return { ...prev }
                })
              }}
              value={newData[id]?.memo || ''}
              viewMode={!isEdit}
            />
          </SectionItem>
        </S.Content>
        <S.ButtonContainer>
          {isEdit ? (
            <>
              <Button
                value={viewMode ? '되돌리기' : '초기화'}
                onClick={() => setNewData(deepCopy(originData))}
                disabled={isEqual(originData, newData)}
              />
              <BlueButton
                value='저장하기'
                onClick={patchCustom}
                disabled={
                  isEqual(originData, newData) || newData[id]?.price === 0
                }
              />
            </>
          ) : (
            <>
              <Button value='삭제하기' onClick={onModalOpen} />
              <BlueButton value='수정하기' onClick={handleEditMode} />
            </>
          )}
        </S.ButtonContainer>
      </S.Container>

      {isOpen && (
        <Modal onClose={onModalClose}>
          <Confirm
            title={`정말 삭제하시겠습니까?`}
            guidance={`삭제하시면 해당 고정지출을 복구할 수 없습니다.`}
            buttons={
              <>
                <Button
                  onClick={onModalClose}
                  value='취소하기'
                  padding='0.5rem'
                />
                <RedButton
                  onClick={() => {
                    patchCustom()
                    onClose()
                  }}
                  value='삭제하기'
                  padding='0.5rem'
                />
              </>
            }
          />
        </Modal>
      )}
    </>
  )
}

export default MobileFixedExpenseItem
