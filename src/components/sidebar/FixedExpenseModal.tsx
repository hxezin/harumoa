import { uuidv4 } from '@firebase/util'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { IFixedExpense } from '../../types'
import { inputNumberCheck, inputNumberWithComma } from '../../utils/accountBook'
import { paymentTypeOptions } from '../../constants'
import Select from '../common/Select'
import { setFixedExpense } from '../../api/firebase'
import { ellipsisStyles } from '../../assets/css/global'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Modal from '../common/Modal'

const HeaderContainer = styled.div`
  position: relative;

  h3 {
    margin: 0;
    margin-bottom: 1rem;
  }
`

const AddButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
`

const TableContainer = styled.table<{ $isEdit: boolean }>`
  width: 100%;
  border: 1px solid #c2c2c2;
  padding: 0.5rem;
  min-width: 800px;

  th {
    padding: 0 0.5rem;
    ${ellipsisStyles}
  }

  td {
    padding: ${({ $isEdit }) => ($isEdit ? '0' : '0 1rem')};
    text-align: center;
    ${ellipsisStyles}
  }

  td:not(:first-child) > input {
    width: 5rem;
  }
`

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
`

const dayOptions = Array.from({ length: 30 }, (_, index) =>
  (index + 1).toString()
).map((day) => ({
  label: day,
  value: day,
}))

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
    setNewData(JSON.parse(JSON.stringify(data)))
    setOriginData(JSON.parse(JSON.stringify(data)))
  }, [data])

  const queryClient = useQueryClient()
  const { mutate: onSave } = useMutation({
    mutationFn: () => setFixedExpense(newData, deleteList),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['custom'],
      })
      setData(newData)
      handleEditMode()
    },
  })

  function handleAdd() {
    setNewData((prev) => ({
      ...prev,
      [uuidv4()]: {
        payment_period: { start_date: currentDate, end_date: oneYearLater },
        payment_day: '1',
        category: '공과금',
        memo: '',
        price: 0,
        payment_type: 'cash',
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
    setNewData(JSON.parse(JSON.stringify(originData)))
    handleEditMode()
  }

  return (
    <Modal onClose={onClose}>
      <HeaderContainer>
        <h3>고정 지출 관리</h3>
        {isEdit ? <AddButton onClick={handleAdd}>➕</AddButton> : null}
      </HeaderContainer>
      <TableContainer $isEdit={isEdit}>
        <thead>
          <tr>
            <th>지출 기간</th>
            <th>지출 일자</th>
            <th>카테고리</th>
            <th>내용</th>
            <th>금액</th>
            <th>지출 수단</th>
            {isEdit && <th></th>}
          </tr>
        </thead>
        <tbody>
          {Object.entries(newData).map(([key, value]) => {
            return isEdit ? (
              <tr key={key}>
                <td>
                  <input
                    type='date'
                    placeholder='시작 날짜'
                    onChange={(e) => {
                      setNewData((prev) => {
                        prev[key].payment_period.start_date = e.target.value
                        return { ...prev }
                      })
                    }}
                    value={newData[key].payment_period.start_date}
                  />
                  {' - '}
                  <input
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
                    valData={dayOptions}
                    defaultVal={newData[key].payment_day}
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
                    valData={category
                      .split(',')
                      .map((item) => ({ label: item, value: item }))}
                    defaultVal={newData[key].category}
                  />
                </td>
                <td>
                  <input
                    type='text'
                    placeholder='내용'
                    onChange={(e) => {
                      setNewData((prev) => {
                        prev[key].memo = e.target.value
                        return { ...prev }
                      })
                    }}
                    value={newData[key].memo}
                  />
                </td>
                <td>
                  <input
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
                  />
                </td>
                <td>
                  <button onClick={() => handleDelete(key)}>🗑</button>
                </td>
              </tr>
            ) : (
              <tr key={key}>
                <td>
                  {value.payment_period.start_date} -{' '}
                  {value.payment_period.end_date}
                </td>
                <td>{value.payment_day}일</td>
                <td>{value.category}</td>
                <td>{value.memo}</td>
                <td>{inputNumberWithComma(value.price)}</td>
                <td>{value.payment_type === 'card' ? '💳' : '💵'}</td>
              </tr>
            )
          })}
        </tbody>
      </TableContainer>
      <ButtonContainer>
        {isEdit ? (
          <>
            <button onClick={handleCancle}>취소</button>
            <button
              onClick={() => onSave()}
              disabled={
                Object.values(newData).filter((item) => item.price === 0)
                  .length !== 0
              }
            >
              저장
            </button>
          </>
        ) : (
          <>
            <button onClick={handleEditMode}>수정</button>
            <button onClick={onClose}>닫기</button>
          </>
        )}
      </ButtonContainer>
    </Modal>
  )
}

export default FixedExpenseModal
