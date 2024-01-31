import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { inputNumberWithComma } from '../../utils/accountBook'
import { chartStyleDataset } from './CategoryChart'
import { MonthCategoryData } from '../sidebar/Chart'

const ProgressContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.color.white};
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
  gap: 1rem;
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

    > span:last-child {
      color: ${({ theme }) => theme.color.gray2};
      font-size: ${({ theme }) => theme.fontSize.xs};
    }
  }
`

const CategoryProgressBar = ({
  data,
  totalPrice,
}: {
  data: MonthCategoryData
  totalPrice: number
}) => {
  const [chartData, setChartData] = useState<{
    [category: string]: number
  } | null>(null)

  useEffect(() => {
    if (Object.keys(data).length !== 0) {
      setChartData(data)
    } else {
      setChartData(null)
    }
  }, [data])

  const getFillWidth = (price: number) => {
    const percentage = Math.round((price / totalPrice) * 100).toString()

    return percentage + '%'
  }

  return (
    <ContentContainer>
      <ProgressContainer>
        {chartData &&
          Object.entries(chartData).map(([key, value], idx) => {
            const width = getFillWidth(value)

            return (
              <FillProgress
                $width={width}
                $bgColor={chartStyleDataset.backgroundColor[idx]}
                key={key}
              />
            )
          })}
      </ProgressContainer>

      {chartData &&
        Object.entries(chartData).map(([key, value], idx) => {
          const width = getFillWidth(value)

          return (
            <DataContainer
              key={key}
              $bgColor={chartStyleDataset.backgroundColor[idx]}
            >
              <div>
                <div></div>
                <span>{key}</span>
                <span>{width}</span>
              </div>

              <span>{inputNumberWithComma(value)}₩</span>
            </DataContainer>
          )
        })}
    </ContentContainer>
  )
}

export default CategoryProgressBar
