import { useEffect, useState } from 'react'
import { ArcElement, Chart, ChartData, Legend, Tooltip } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { MonthCategoryData } from '../sidebar/Chart'

Chart.register(ArcElement, Tooltip, Legend)

export const chartStyleDataset = {
  backgroundColor: [
    'rgba(255, 99, 132, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(255, 206, 86, 0.6)',
    'rgba(75, 192, 192, 0.6)',
    'rgba(153, 102, 255, 0.6)',
    'rgba(255, 159, 64, 0.6)',
    'rgba(92, 86, 255, 0.6)',
    'rgba(75, 192, 112,  0.6)',
    'rgba(237, 102, 255, 0.6)',
    'rgba(255, 64, 156,  0.6)',
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

const CategoryChart = ({ data }: { data: MonthCategoryData }) => {
  const [chartData, setChartData] = useState<ChartData<
    'pie',
    number[],
    unknown
  > | null>(null)

  useEffect(() => {
    const categoryLabel = Object.keys(data)
    if (categoryLabel.length != 0) {
      const dataSet = Object.values(data)

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
      {chartData && (
        <div>
          <Pie
            data={chartData}
            options={{
              responsive: true,
              animation: false,
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
                tooltip: {
                  mode: 'index' as const,
                  intersect: false,
                  callbacks: {
                    label: (context) => {
                      return `원${context.formattedValue}`
                    },
                  },
                },
              },
            }}
          />
        </div>
      )}
    </>
  )
}

export default CategoryChart
