import { useEffect, useState } from 'react'
import { Books, IAccountBook } from '../../types'
import styled from 'styled-components'
import { inputNumberWithComma } from '../../utils/accountBook'

type Entries<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T][]

const chartColor = [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)',
  'rgba(92, 86, 255, 1)',
  'rgba(75, 192, 112, 1)',
  'rgba(237, 102, 255, 1)',
  'rgba(255, 64, 156, 1)',
]

const ProgressContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.color.gray0};
  border-radius: 10px;
  height: 1rem;

  display: flex;
  padding: 4px;

  div:first-child {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  div:last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`

const FillProgress = styled.div<{ $width: string; $bgColor: string }>`
  width: ${({ $width }) => $width};
  background-color: ${({ $bgColor }) => $bgColor};
  height: 1rem;
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 0.5rem;
  gap: 0.5rem;
`

const DataContainer = styled.div<{ $bgColor: string }>`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0 1rem;

  div {
    display: flex;
    align-items: center;
    gap: 0.3rem;

    > div {
      background-color: ${({ $bgColor }) => $bgColor};
      border-radius: 50%;
      width: 10px;
      height: 10px;
    }
  }
`

const NoDataSpan = styled.span`
  height: 80px;
  line-height: 80px;
`

const CategoryProgressBar = ({
  data,
  month,
}: {
  data: Books
  month: string
}) => {
  const [chartData, setChartData] = useState<{
    [category: string]: number
  } | null>(null)

  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    const result: {
      [category: string]: number
    } = {}

    let totalPrice = 0
    Object.entries(data).map(([key, dateValue]) => {
      Object.entries(dateValue).map(([key, accoutvalue]) => {
        if (key === 'account_book') {
          ;(Object.entries(accoutvalue) as Entries<IAccountBook>).map(
            ([key, value]) => {
              if (!value.is_income) {
                console.log(result[value.category])

                result[value.category]
                  ? (result[value.category] += value.price)
                  : (result[value.category] = 0 + value.price)

                totalPrice += value.price
              }
            }
          )
        }
      })
    })

    if (Object.keys(result).length !== 0) {
      setChartData(result)
    } else {
      setChartData(null)
    }

    setTotalPrice(totalPrice)
  }, [data])

  const getFillWidth = (price: number) => {
    const percentage = Math.round((price / totalPrice) * 100).toString()

    return percentage + '%'
  }

  return (
    <div>
      <span>{month.replace('0', '')}월 지출 분석</span>
      <ContentContainer>
        <ProgressContainer>
          {chartData &&
            Object.entries(chartData).map(([key, value], idx) => {
              const width = getFillWidth(value)

              return (
                <FillProgress
                  $width={width}
                  $bgColor={chartColor[idx]}
                  key={key}
                />
              )
            })}
        </ProgressContainer>

        {chartData ? (
          Object.entries(chartData).map(([key, value], idx) => (
            <DataContainer key={key} $bgColor={chartColor[idx]}>
              <div>
                <div></div>
                <span>{key}</span>
              </div>

              <span>{inputNumberWithComma(value)}원</span>
            </DataContainer>
          ))
        ) : (
          <NoDataSpan>데이터가 없습니다.</NoDataSpan>
        )}
      </ContentContainer>
    </div>
  )
}

export default CategoryProgressBar
