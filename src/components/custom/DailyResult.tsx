interface DailyResultProps {
  dailyResult: string

  setDailyResult: (data: string) => void
  isEdit: boolean
}

const DailyResult = ({
  dailyResult,
  setDailyResult,
  isEdit,
}: DailyResultProps) => {
  return <div>{dailyResult}</div>
}

export default DailyResult
