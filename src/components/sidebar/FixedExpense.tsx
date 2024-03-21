import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ellipsisStyles } from '../../assets/css/global'
import useModal from '../../hooks/useModal'
import { IFixedExpense } from '../../types'
import { inputNumberWithComma } from '../../utils/accountBook'
import { filterFixedExpense } from '../../utils/calendar'
import { useMonthYearContext } from '../context/MonthYearContext'
import FixedExpenseModal from './FixedExpenseModal'
import { GrayBorderButton } from '../common/Button'
import * as S from './Sidebar.styled'
import MobileFixedExpenseItem from './MobileFixedExpenseItem'
import useBottomSheet from '../../hooks/useBottomSheet'
import useResize from '../../hooks/useResize'

const Table = styled.table<{ $enableExpectedLimit: boolean }>`
  width: 100%;

  border-spacing: 0;
  text-align: center;
  border-collapse: collapse;

  thead {
    font-size: ${({ theme }) => theme.fontSize.xs};
    font-weight: ${({ theme }) => theme.fontWeight.extraBold};
    color: ${({ theme }) => theme.color.gray3};
  }

  tbody {
    height: 100%;
    max-height: ${
      ({ theme, $enableExpectedLimit }) =>
        $enableExpectedLimit
          ? `calc(100vh - ${theme.layout.headerHeight} - 215px - 325.5px)` // - (월별 예상 지출 + 합계)
          : `calc(100vh - ${theme.layout.headerHeight} - 215px - 178.85px)` // - 합계
    };
    overflow-y: scroll;

    font-size: ${({ theme }) => theme.fontSize.xs};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    color: ${({ theme }) => theme.color.gray2};
  }

  tr {
    border-bottom: 1px solid ${({ theme }) => theme.color.gray1};
  }

  th {
    padding: 0.5rem;
  }

  td {
    text-align: center;
    ${ellipsisStyles}
    padding: 0.5rem;

    border-left: 1px solid ${({ theme }) => theme.color.gray1};
  }

  td:first-child {
    border-left: none;
  }

  th:first-child,
  td:first-child {
    width: 40px;
  }

  th:nth-child(2),
  td:nth-child(2) {
    width: 100px;
  }

  th:last-child,
  td:last-child {
    width: 80px;
  }

  @media (max-width: 780px) {
    thead {
      font-size: ${({ theme }) => theme.fontSize.sm};
    }

    tbody {
      font-size: ${({ theme }) => theme.fontSize.sm};
    }

    td {
      border: none;
    }

    th:first-child,
    td:first-child {
      width: 20%;
    }

    th:nth-child(2),
    td:nth-child(2) {
      width: 40%;
    }

    th:last-child,
    td:last-child {
      width: 40%;
    }
  }
`

const TableRow = styled.tr<{ $isPastDate: boolean }>`
  color: ${({ $isPastDate }) => ($isPastDate ? 'gray' : 'black')};

  @media (max-width: 780px) {
    cursor: pointer;
  }
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`

const FixedTotalContainer = styled.div`
  border-top: 1px solid ${({ theme }) => theme.color.black};
  padding: 0.5rem;

  display: flex;
  justify-content: space-between;

  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};

  @media (max-width: 780px) {
    font-size: ${({ theme }) => theme.fontSize.sm};

    padding-bottom: 1rem;
  }
`

interface Props {
  fixedExpense: IFixedExpense
  category: string
  enableExpectedLimit: boolean // 월별 예상 지출 설정 활성화 여부
}

const FixedExpense = ({
  fixedExpense,
  category,
  enableExpectedLimit,
}: Props) => {
  const { monthYear } = useMonthYearContext()
  const { onOpen, onClose, isOpen } = useModal()
  const [data, setData] = useState<IFixedExpense>({})

  const [selectedFixedExpense, setSelectedFixedExpense] = useState<
    string | null
  >(null)
  const { BottomSheet, openBottomSheet, closeBottomSheet } = useBottomSheet()

  useEffect(() => {
    // 캘린더가 바뀔 때마다 데이터 필터링
    const filteredData = filterFixedExpense(
      fixedExpense,
      monthYear.year,
      monthYear.month
    )

    setData(filteredData)
  }, [fixedExpense, monthYear.month, monthYear.year])

  const { resize } = useResize()
  function handleTableRowClick(id: string) {
    if (resize > 780) {
      //데스크탑
      return
    } else {
      //모바일
      setSelectedFixedExpense(id)
      openBottomSheet()
    }
  }

  const getTotalFixedPrice = (data: IFixedExpense) => {
    let totalFixedPrice = 0

    totalFixedPrice = Object.values(data).reduce((acc, cur) => {
      return acc + cur.price
    }, 0)

    return totalFixedPrice
  }

  return (
    <S.Container $height $enableExpectedLimit={enableExpectedLimit}>
      <S.TitleContainer>
        <span>고정 지출</span>
        <GrayBorderButton
          onClick={onOpen}
          value='관리'
          padding='0.25rem 0.375rem'
          fontSize='xs'
        />
      </S.TitleContainer>

      <ContentContainer>
        <Table $enableExpectedLimit={enableExpectedLimit}>
          <thead>
            <tr>
              <th>지출일</th>
              <th>금액</th>
              <th>메모</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(data).length !== 0 &&
              Object.entries(data)
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
                    <TableRow
                      key={key}
                      $isPastDate={isPastDate}
                      onClick={() => handleTableRowClick(key)}
                    >
                      <td>{targetDate.format('DD')}일</td>
                      <td>{inputNumberWithComma(value.price)}원</td>

                      <td>{value.memo}</td>
                    </TableRow>
                  )
                })}
          </tbody>
        </Table>

        <FixedTotalContainer>
          <span> TOTAL</span>
          <span>{inputNumberWithComma(getTotalFixedPrice(data))}원</span>
        </FixedTotalContainer>
      </ContentContainer>

      {isOpen && (
        <FixedExpenseModal
          data={fixedExpense}
          setData={setData}
          category={category}
          onClose={onClose}
        />
      )}

      {selectedFixedExpense !== null && (
        <BottomSheet>
          <MobileFixedExpenseItem
            id={selectedFixedExpense}
            data={fixedExpense}
            setData={setData}
            category={category}
            onClose={closeBottomSheet}
            viewMode={true}
          />
        </BottomSheet>
      )}
    </S.Container>
  )
}

export default FixedExpense
