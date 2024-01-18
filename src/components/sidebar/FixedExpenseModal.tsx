import { uuidv4 } from '@firebase/util'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { IFixedExpense } from '../../types'
import { inputNumberCheck, inputNumberWithComma } from '../../utils/accountBook'
import { paymentTypeOptions } from '../../constants'
import Select from '../common/Select'
import { setFixedExpense } from '../../api/firebase'
import { ellipsisStyles } from '../../assets/css/global'
import Modal from '../common/Modal'
import { deepCopy, formatSelectOptions } from '../../utils'
import usePatchCustom from '../../hooks/custom/usePatchCustom'
import { BlueButton, Button } from '../common/Button'
import AddButton from '../book/AddButton'
import DeleteButton from '../book/DeleteButton'
import Input from '../common/Input'

const HeaderContainer = styled.div`
  position: relative;

  h3 {
    margin: 0;
    margin-bottom: 2rem;

    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
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

  th {
    color: ${({ theme }) => theme.color.gray3};
    /* font-size: ${({ theme }) => theme.fontSize.xs};
    font-weight: ${({ theme }) => theme.fontWeight.bold}; */
    padding: 0.5rem;
    ${ellipsisStyles}
  }

  td {
    padding: 0.5rem 0;
    text-align: center;
    ${ellipsisStyles}
  }

  tr > th:first-child {
    width: 33%;
  }

  tr > th:nth-of-type(2) {
    width: 9%;
  }

  tr > th:nth-of-type(3) {
    width: 13%;
  }

  tr > th:nth-of-type(4) {
    width: 17%;
  }

  tr > th:nth-of-type(6) {
    width: 15%;
  }

  button {
    border: none;
    background: inherit;
  }

  input,
  select {
    //height: 34px;
    padding: 0.5rem;
    border-radius: 0.5rem;
    /* background: ${({ theme, $isEdit }) =>
      $isEdit ? theme.color.white : theme.color.secondary.main};
    border: 1px solid
      ${({ theme, $isEdit }) =>
      $isEdit ? theme.color.gray1 : theme.color.secondary.main}; */
  }

  input {
    cursor: text;
  }

  input[type='date'] {
    width: 40%;
  }

  input:not(input[type='date']) {
    width: 83%;
  }

  select {
    width: 95%;
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
        payment_period: { start_date: '', end_date: '' },
        payment_day: '',
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

  function handleCancle() {
    setNewData(deepCopy(originData))
    handleEditMode()
  }

  return (
    <Modal onClose={onClose}>
      <HeaderContainer>
        <h3>고정 지출</h3>
      </HeaderContainer>
      <TableContainer $isEdit={isEdit}>
        <thead>
          <tr>
            <th>지출 기간</th>
            <th>지출일</th>
            <th>카테고리</th>
            <th>금액</th>
            <th>지출 수단</th>
            <th>메모</th>
            {isEdit && <th></th>}
          </tr>
        </thead>
        <tbody>
          {Object.entries(newData).map(([key, value]) => (
            <tr key={key}>
              <td>
                <Input
                  type='date'
                  placeholder='시작 날짜'
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
                <Select
                  name='paymentDay'
                  handleOnChange={(e) => {
                    setNewData((prev) => {
                      prev[key].payment_day = e
                      return { ...prev }
                    })
                  }}
                  valData={formatSelectOptions(
                    Array.from({ length: 30 }, (_, index) =>
                      (index + 1).toString()
                    )
                  )}
                  defaultVal={newData[key].payment_day}
                  $viewMode={!isEdit}
                />
              </td>
              <td>
                <Select
                  name='category'
                  handleOnChange={(e) => {
                    setNewData((prev) => {
                      prev[key].category = e
                      return { ...prev }
                    })
                  }}
                  valData={formatSelectOptions(category.split(','))}
                  defaultVal={newData[key].category}
                  $viewMode={!isEdit}
                />
              </td>
              <td>
                <Input
                  type='text'
                  placeholder='금액'
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
                />
              </td>
              <td>
                <Select
                  name='paymentType'
                  handleOnChange={(e) => {
                    setNewData((prev) => {
                      prev[key].payment_type = e
                      return { ...prev }
                    })
                  }}
                  valData={paymentTypeOptions}
                  defaultVal={newData[key].payment_type}
                  $viewMode={!isEdit}
                />
              </td>
              <td>
                <Input
                  type='text'
                  placeholder='메모'
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

              <td>
                <DeleteButton onClick={() => handleDelete(key)} />
              </td>
            </tr>
          ))}
        </tbody>
      </TableContainer>

      {isEdit && <AddButton onClick={handleAdd} />}

      <ButtonContainer>
        {isEdit ? (
          <>
            <Button value='되돌리기' onClick={handleCancle} />
            <BlueButton
              value='저장하기'
              onClick={() => patchCustom()}
              disabled={
                Object.values(newData).filter((item) => item.price === 0)
                  .length !== 0
              }
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
