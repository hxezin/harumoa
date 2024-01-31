import styled from 'styled-components'
import CategoryChart from '../chart/CategoryChart'
import SixMonthChart from '../chart/SixMonthChart'
import { useMonthYear } from '../context/MonthYearContext'
import nextArrow from '../../assets/icons/nextArrow.svg'
import beforeArrow from '../../assets/icons/beforeArrow.svg'
import { useEffect, useState } from 'react'
import CategoryProgressBar from '../chart/CategoryProgressBar'
import { IAccountBook } from '../../types'
import NoDataChart from '../chart/NoDataChart'

type Entries<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T][]

export interface MonthCategoryData {
  [category: string]: number
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const MonthlyContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 800px;
  gap: 1.5rem;
  justify-content: center;
  padding-bottom: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray0};

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  > div:first-child {
    width: 220px;
    justify-content: space-between;
  }

  span:nth-of-type(1) {
    color: ${({ theme }) => theme.color.gray1};
    font-size: ${({ theme }) => theme.fontSize.xs};
    font-weight: ${({ theme }) => theme.fontWeight.extraBold};
  }

  span:nth-of-type(2) {
    color: ${({ theme }) => theme.color.black};
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: ${({ theme }) => theme.fontWeight.extraBold};
  }
`

const LocationButton = styled.button`
  border-radius: 0.15rem;
  background: #fcfcfc;
  box-shadow: 1.2px 1.2px 3.6px 0px rgba(97, 97, 97, 0.5);
  border: none;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: scroll;

  gap: 2rem;
  height: 100%;
  max-height: 500px;
  margin-top: 10px;

  > div {
    width: 100%;
  }
`

const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray0};
  font-size: ${({ theme }) => theme.fontSize.sm};
`

const Tab = styled.div<{ $active: boolean }>`
  width: 15%;

  border-top: none;
  padding: 0.5rem;
  cursor: pointer;

  border-bottom: ${({ $active, theme }) =>
    $active ? `3px solid ${theme.color.primary.main}` : 'none'};
`

const CategoryChartContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;

  > div:first-child {
    width: 50%;
  }

  > div:last-child {
    width: 40%;
  }
`

const Chart = () => {
  const { data, monthYear, updateMonthYear } = useMonthYear()

  const [active, setActive] = useState('category')
  const [monthChartData, setMonthChartData] = useState<MonthCategoryData>({})
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    const result: MonthCategoryData = {}
    let totalPrice = 0

    Object.entries(data).map(([key, dateValue]) => {
      Object.entries(dateValue).map(([key, accoutvalue]) => {
        if (key === 'account_book') {
          ;(Object.entries(accoutvalue) as Entries<IAccountBook>).map(
            ([key, value]) => {
              if (!value.is_income) {
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

    setTotalPrice(totalPrice)

    //result에 담긴 값이 있다면,
    Object.keys(result).length !== 0 && setMonthChartData(result)
  }, [data])

  return (
    <Container>
      <MonthlyContainer>
        <div>
          <LocationButton onClick={() => updateMonthYear(-1)}>
            <img src={beforeArrow} />
          </LocationButton>

          <div>
            <span>{monthYear.year}</span>
            <span>{monthYear.enMonth.toUpperCase()}</span>
          </div>

          <LocationButton onClick={() => updateMonthYear(1)}>
            <img src={nextArrow} />
          </LocationButton>
        </div>
      </MonthlyContainer>

      <TabContainer>
        <Tab
          $active={active === 'category'}
          onClick={() => {
            setActive('category')
          }}
        >
          월별 카테고리
        </Tab>
        <Tab
          $active={active === 'sixMonth'}
          onClick={() => {
            setActive('sixMonth')
          }}
        >
          6개월 수입/지출
        </Tab>
      </TabContainer>

      <ChartContainer>
        {active === 'category' ? (
          Object.keys(monthChartData).length !== 0 ? (
            <CategoryChartContainer>
              <CategoryChart data={monthChartData} />
              <CategoryProgressBar
                data={monthChartData}
                totalPrice={totalPrice}
              />
            </CategoryChartContainer>
          ) : (
            <NoDataChart />
          )
        ) : null}

        {active === 'sixMonth' && <SixMonthChart monthYear={monthYear} />}
      </ChartContainer>
    </Container>
  )
}

export default Chart
