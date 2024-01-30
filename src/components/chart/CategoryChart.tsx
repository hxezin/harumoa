import { useEffect, useState } from 'react'
import { Books, IAccountBook } from '../../types'
import { ArcElement, Chart, ChartData, Legend, Tooltip } from 'chart.js'
import { Pie } from 'react-chartjs-2'

export type Entries<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T][]

Chart.register(ArcElement, Tooltip, Legend)

const chartStyleDataset = {
  backgroundColor: [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(92, 86, 255, 0.2)',
    'rgba(75, 192, 112, 0.2)',
    'rgba(237, 102, 255, 0.2)',
    'rgba(255, 64, 156, 0.2)',
  ],
  borderColor: [
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
  ],
  borderWidth: 1,
}

const CategoryChart = ({ data, month }: { data: Books; month: string }) => {
  const [chartData, setChartData] = useState<ChartData<
    'pie',
    number[],
    unknown
  > | null>(null)

  useEffect(() => {
    const result: {
      [category: string]: number
    } = {}

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
              }
            }
          )
        }
      })
    })

    const categoryLabel = Object.keys(result)
    if (categoryLabel.length != 0) {
      const dataSet = Object.values(result)

      setChartData({
        ...chartData,
        labels: categoryLabel,
        datasets: [{ ...chartStyleDataset, data: dataSet }],
      })
    } else {
      setChartData(null)
    }
  }, [data])

  return (
    <>
      {chartData ? (
        <div>
          <span>{month.replace('0', '')}월 지출 분석</span>
          <Pie
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: true,
                  position: 'top',
                  labels: {
                    // labels 에 대한 스타일링
                    color: '#030303',
                    font: {
                      family: 'Suite-Regular',
                      lineHeight: 2,
                    },
                  },
                },
              },
            }}
          />
        </div>
      ) : (
        <div> 데이터가 없습니다.</div>
      )}
    </>
  )
}

export default CategoryChart
