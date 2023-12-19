import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ellipsisStyles } from '../../assets/css/global'
import useModal from '../../hooks/useModal'
import { IFixedExpense } from '../../types'
import { inputNumberWithComma } from '../../utils/\baccountBook'
import { useMonthYearContext } from '../context/MonthYearContext'
import FixedExpenseModal from './FixedExpenseModal'
import SidebarTitle from './SidebarTitle'

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ManagementButton = styled.button`
  height: 20px;
`

const TableContainer = styled.table`
  width: 100%;
  border: 1px solid #c2c2c2;
  padding: 0.5rem;

  td {
    width: 20%;
    text-align: center;
    ${ellipsisStyles}
  }

  tr > td:first-child {
    width: 25%;
  }

  tr > td:last-child {
    width: 5%;
  }
`

interface Props {
  fixedExpense: IFixedExpense
}

const FixedExpense = ({ fixedExpense }: Props) => {
  const { monthYear } = useMonthYearContext()
  const { Modal, onOpen, onClose, isOpen } = useModal()
  const [data, setData] = useState<IFixedExpense>({})

  useEffect(() => {
    setData(fixedExpense)
  }, [fixedExpense])

  return (
    <section>
      <TitleContainer>
        <SidebarTitle title='고정 지출' />
        <ManagementButton onClick={onOpen}>관리</ManagementButton>
      </TitleContainer>
      {data && (
        <TableContainer>
          <thead>
            <tr>
              <th>날짜</th>
              <th>내용</th>
              <th>금액</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data)
              .sort(
                (a, b) =>
                  // 고정 지출 일자 오름차순 정렬
                  parseInt(a[1].payment_day) - parseInt(b[1].payment_day)
              )
              .map(([key, value]) => {
                return (
                  <tr key={key}>
                    <td>
                      {monthYear.year}-{monthYear.month}-
                      {value.payment_day.toString().padStart(2, '0')}
                    </td>
                    <td>{value.memo}</td>
                    <td>{inputNumberWithComma(value.price)}</td>
                    <td>{value.payment_type === 'card' ? '💳' : '💵'}</td>
                  </tr>
                )
              })}
          </tbody>
        </TableContainer>
      )}
      {isOpen && (
        <Modal>
          <FixedExpenseModal data={data} setData={setData} onClose={onClose} />
        </Modal>
      )}
    </section>
  )
}

export default FixedExpense
