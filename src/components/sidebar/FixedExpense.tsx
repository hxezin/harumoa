import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ellipsisStyles } from '../../assets/css/global'
import useModal from '../../hooks/useModal'
import { IFixedExpense } from '../../types'
import { inputNumberWithComma } from '../../utils/\baccountBook'
import { filterFixedExpense } from '../../utils/calendar'
import { useMonthYearContext } from '../context/MonthYearContext'
import FixedExpenseModal from './FixedExpenseModal'
import SidebarTitle from './SidebarTitle'

const ManagementButton = styled.button`
  height: 20px;
`

const Table = styled.table`
  width: 100%;
  padding: 0.5rem;

  thead {
    padding-bottom: 0.5rem;
  }

  tbody {
    display: block;
    max-height: 300px;
    overflow-y: auto;
  }

  thead,
  tbody tr {
    display: table;
    width: 100%;
  }

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

const TableRow = styled.tr<{ $isPastDate: boolean }>`
  color: ${({ $isPastDate }) => ($isPastDate ? 'gray' : 'black')};
`

interface Props {
  fixedExpense: IFixedExpense
}

const FixedExpense = ({ fixedExpense }: Props) => {
  const { monthYear } = useMonthYearContext()
  const { onOpen, onClose, isOpen } = useModal()
  const [data, setData] = useState<IFixedExpense>({})

  useEffect(() => {
    // 캘린더가 바뀔 때마다 데이터 필터링
    const filteredData = filterFixedExpense(
      fixedExpense,
      monthYear.year,
      monthYear.month
    )
    setData(filteredData)
  }, [fixedExpense, monthYear.month, monthYear.year])

  return (
    <section>
      <SidebarTitle title='고정 지출'>
        <ManagementButton onClick={onOpen}>관리</ManagementButton>
      </SidebarTitle>
      {data && (
        <Table>
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
                const currentDate = dayjs()
                const targetDate = dayjs(
                  `${monthYear.year}-${monthYear.month}-${value.payment_day}`
                )
                // target 날짜가 지났는지 여부
                const isPastDate = currentDate.isAfter(targetDate)
                return (
                  <TableRow key={key} $isPastDate={isPastDate}>
                    <td>{targetDate.format('YYYY-MM-DD')}</td>
                    <td>{value.memo}</td>
                    <td>{inputNumberWithComma(value.price)}</td>
                    <td>{value.payment_type === 'card' ? '💳' : '💵'}</td>
                  </TableRow>
                )
              })}
          </tbody>
        </Table>
      )}
      {isOpen && (
        <FixedExpenseModal data={data} setData={setData} onClose={onClose} />
      )}
    </section>
  )
}

export default FixedExpense
