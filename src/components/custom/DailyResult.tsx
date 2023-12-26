import { dailyResultOptions } from '../../constants'
import Dropdown from '../common/Dropdown'

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
  return (
    <section>
      <h3>일간 내역</h3>
      <Dropdown
        options={dailyResultOptions}
        defaultValue={dailyResult}
        onSelect={setDailyResult}
        isEdit={isEdit}
      />
    </section>
  )
}

export default DailyResult
