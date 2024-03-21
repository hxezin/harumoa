import { uuidv4 } from '@firebase/util'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { IFixedExpense } from '../../types'
import { inputNumberCheck, inputNumberWithComma } from '../../utils/accountBook'
import { paymentTypeOptions } from '../../constants'
import { setFixedExpense } from '../../api/firebase'
import { ellipsisStyles } from '../../assets/css/global'
import Modal from '../common/Modal'
import { deepCopy, formatSelectOptions } from '../../utils'
import usePatchCustom from '../../hooks/custom/usePatchCustom'
import { BlueButton, Button } from '../common/Button'
import AddButton from '../book/AddButton'
import DeleteButton from '../book/DeleteButton'
import Input from '../common/Input'
import isEqual from 'lodash.isequal'
import dayjs from 'dayjs'
import Dropdown from '../common/Dropdown'
import { KRWICon } from '../book/AccountBookTable'
import { ReactComponent as Close } from '../../assets/icons/closeIcon.svg'

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  h3 {
    margin: 0;

    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }

  svg {
    cursor: pointer;
  }
`

const TableContainer = styled.table<{ $isEdit: boolean }>`
  width: 100%;
  min-width: 800px;
  margin-bottom: 10px;
  border-collapse: collapse;

  thead {
    border-bottom: 1px solid ${({ theme }) => theme.color.gray1};
  }

  thead > tr > td {
    font-weight: ${({ theme }) => theme.fontWeight.extraBold};
  }

  th {
    color: ${({ theme }) => theme.color.gray3};
    padding: 0.5rem;
    ${ellipsisStyles}
  }

  td {
    padding: 0.5rem;
    text-align: center;
    ${ellipsisStyles}
    overflow: visible;
  }

  button {
    border: none;
    background: inherit;
  }

  input {
    cursor: text;
  }

  input[type='date'] {
    width: 45%;
  }

  tr > td:nth-child(4) {
    position: relative;
  }

  input[type='date']::-webkit-inner-spin-button,
  input[type='date']::-webkit-calendar-picker-indicator {
    display: ${({ $isEdit }) => ($isEdit ? '' : 'none')};
    -webkit-appearance: ${({ $isEdit }) => ($isEdit ? '' : 'none')};
  }
`

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
`

interface Props {
  data: IFixedExpense
  setData: React.Dispatch<React.SetStateAction<IFixedExpense>>
  category: string
  onClose: () => void
}

const FixedExpenseModal = ({ data, setData, category, onClose }: Props) => {
  const [isEdit, setIsEdit] = useState(false)
  const [originData, setOriginData] = useState<IFixedExpense>({})
  const [newData, setNewData] = useState<IFixedExpense>({})
  const [deleteList, setDeleteList] = useState<string[]>([])

  const currentDate = dayjs().format('YYYY-MM-DD')
  const oneYearLater = dayjs().add(1, 'year').format('YYYY-MM-DD')

  useEffect(() => {
    setNewData(deepCopy(data))
    setOriginData(deepCopy(data))
  }, [data])

  const { patchCustom } = usePatchCustom({
    onMutate: () => setFixedExpense(newData, deleteList),
    onSuccess: () => {
      setData(newData)
      handleEditMode()
    },
    onError: () => setFixedExpense(originData),
  })

  function handleAdd() {
    setNewData((prev) => ({
      ...prev,
      [uuidv4()]: {
        //추가 시 초기값 변경.
        payment_period: { start_date: currentDate, end_date: oneYearLater },
        payment_day: '1',
        category: category.split(',')[0],
        memo: '',
        price: 0,
        payment_type: '',
      },
    }))
  }

  function handleEditMode() {
    setIsEdit(!isEdit)
  }

  function handleDelete(key: string) {
    setNewData((prev) => {
      delete prev[key]
      return { ...prev }
    })

    setDeleteList((prev) => [...prev, key])
  }

  function handleCancel() {
    setNewData(deepCopy(originData))
    handleEditMode()
  }

  return (
    <Modal onClose={onClose}>
      <HeaderContainer>
        <h3>고정 지출</h3>

        <Close onClick={onClose} />
      </HeaderContainer>
      <TableContainer $isEdit={isEdit}>
        <thead>
          <tr>
            <td width='25%'>지출 기간</td>
            <td width='10%'>지출일</td>
            <td width='15%'>카테고리</td>
            <td width='20%'>금액</td>
            <td width='10%'>지출 수단</td>
            <td width='20%'>메모</td>
            {isEdit && <td></td>}
          </tr>
        </thead>
        <tbody>
          {Object.entries(newData).map(([key, value]) => (
            <tr key={key}>
              <td>
                <Input
                  type='date'
                  placeholder='시작 날짜'
                  textAlign='center'
                  onChange={(e) => {
                    setNewData((prev) => {
                      prev[key].payment_period.start_date = e.target.value
                      return { ...prev }
                    })
                  }}
                  value={newData[key].payment_period.start_date}
                  viewMode={!isEdit}
                />
                {' ~ '}
                <Input
                  type='date'
                  placeholder='종료 날짜'
                  textAlign='center'
                  onChange={(e) => {
                    setNewData((prev) => {
                      prev[key].payment_period.end_date = e.target.value
                      return { ...prev }
                    })
                  }}
                  value={newData[key].payment_period.end_date}
                  min={newData[key].payment_period.start_date}
                  viewMode={!isEdit}
                />
              </td>
              <td>
                <Dropdown
                  onChange={(e) => {
                    setNewData((prev) => {
                      prev[key].payment_day = e
                      return { ...prev }
                    })
                  }}
                  options={formatSelectOptions(
                    Array.from({ length: 30 }, (_, index) =>
                      (index + 1).toString()
                    )
                  )}
                  defaultValue={newData[key].payment_day}
                  viewMode={!isEdit}
                  placeholder='지출일'
                  height='18rem'
                />
              </td>
              <td>
                <Dropdown
                  onChange={(e) => {
                    setNewData((prev) => {
                      prev[key].category = e
                      return { ...prev }
                    })
                  }}
                  options={formatSelectOptions(category.split(','))}
                  defaultValue={newData[key].category}
                  viewMode={!isEdit}
                  placeholder='카테고리'
                  height='10rem'
                />
              </td>
              <td>
                <Input
                  type='text'
                  textAlign='right'
                  onChange={(e) => {
                    setNewData((prev) => {
                      const numPrice = inputNumberCheck(e.target.value)
                      prev[key].price = Number(numPrice)
                      return { ...prev }
                    })
                  }}
                  value={
                    newData[key].price === 0
                      ? ''
                      : inputNumberWithComma(newData[key].price)
                  }
                  viewMode={!isEdit}
                  padding='0.5rem 1.5rem 0.5rem 0.5rem'
                />
                <KRWICon $viewMode={!isEdit}>원</KRWICon>
              </td>
              <td>
                <Dropdown
                  onChange={(e) => {
                    setNewData((prev) => {
                      prev[key].payment_type = e
                      return { ...prev }
                    })
                  }}
                  placeholder='지출 수단'
                  options={paymentTypeOptions}
                  defaultValue={newData[key].payment_type}
                  viewMode={!isEdit}
                />
              </td>
              <td>
                <Input
                  type='text'
                  placeholder='메모'
                  textAlign='center'
                  onChange={(e) => {
                    setNewData((prev) => {
                      prev[key].memo = e.target.value
                      return { ...prev }
                    })
                  }}
                  value={newData[key].memo}
                  viewMode={!isEdit}
                />
              </td>

              {isEdit && (
                <td>
                  <DeleteButton onClick={() => handleDelete(key)} />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </TableContainer>

      {isEdit && <AddButton onClick={handleAdd} />}

      <ButtonContainer>
        {isEdit ? (
          <>
            <Button
              value='되돌리기'
              onClick={handleCancel}
              disabled={isEqual(originData, newData)}
            />
            <BlueButton
              value='저장하기'
              onClick={() => patchCustom()}
              disabled={isEqual(originData, newData)}
            />
          </>
        ) : (
          <>
            <Button value='닫기' onClick={onClose} />
            <BlueButton value='수정하기' onClick={handleEditMode} />
          </>
        )}
      </ButtonContainer>
    </Modal>
  )
}

export default FixedExpenseModal
