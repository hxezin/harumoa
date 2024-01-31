import { useEffect, useState } from 'react'
import { getSixMonthChart } from '../../api/firebase'
import { TotalPrice } from '../../types'
import { MonthYear } from '../../utils/calendar'

import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Title,
  Tooltip,
  LineController,
  BarController,
  TooltipItem,
  ChartTypeRegistry,
} from 'chart.js'
import { Chart } from 'react-chartjs-2'
import theme from '../../assets/css/theme'
import dayjs from 'dayjs'
import { useToast } from '../context/ToastContext'
import NoDataChart from './NoDataChart'

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Title,
  Tooltip,
  LineController,
  BarController
)

const options = {
  responsive: true,
  animation: false as const,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    tooltip: {
      mode: 'index' as const,
      intersect: false,
      callbacks: {
        label: (context: TooltipItem<keyof ChartTypeRegistry>) => {
          return `${context.dataset.label}: ₩ ${context.formattedValue}`
        },
      },
    },
  },
}

interface SixMonthProps {
  monthYear: MonthYear
}

const SixMonthChart = ({ monthYear }: SixMonthProps) => {
  const [data, setData] = useState<
    { year: string; month: string; total: TotalPrice }[]
  >([])
  const { showToast } = useToast()

  useEffect(() => {
    async function getData(year: string, month: string) {
      const res = await getSixMonthChart(year, month)
      if (res.success) {
        setData(res.data || [])
      } else {
        // 에러 처리 로직 추가
        showToast({ success: res.success, message: res.message || '' })
      }
    }

    getData(monthYear.year, monthYear.month)
  }, [monthYear, showToast])

  const chartData = {
    labels: data.map((data) =>
      dayjs(`${data.year}-${data.month}-01`).format('MMMM')
    ),
    datasets: [
      {
        type: 'line' as const,
        label: '합계',
        borderColor: theme.color.primary.dark,
        borderWidth: 2,
        fill: false,
        data: data.map(
          (data) => data.total.income_price - data.total.expense_price
        ),
      },
      {
        type: 'bar' as const,
        label: '수입',
        data: data.map((data) => data.total.income_price),
        backgroundColor: theme.color.primary.main,
      },
      {
        type: 'bar' as const,
        label: '지출',
        data: data.map((data) => data.total.expense_price),
        backgroundColor: theme.color.red.main,
      },
    ],
  }

  function emptyData() {
    return (
      data.every((item) => item.total.expense_price === 0) &&
      data.every((item) => item.total.income_price === 0)
    )
  }

  return (
    <div>
      {!emptyData() ? (
        <Chart type='bar' options={options} data={chartData} />
      ) : (
        <NoDataChart />
      )}
    </div>
  )
}

export default SixMonthChart
