import { useMemo } from 'react'
import { dailyResultOptions } from '../../constants'
import Select from '../common/Select'

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
  const defaultValue = useMemo(
    () => dailyResultOptions.find((option) => option.value === dailyResult),
    [dailyResult]
  )

  return (
    <section>
      <h3>일간 내역</h3>
      {isEdit ? (
        <Select
          name='dailyResult'
          handleOnChange={setDailyResult}
          valData={dailyResultOptions}
          defaultVal={dailyResult}
        />
      ) : (
        <input type='text' value={defaultValue?.label || ''} disabled />
      )}
    </section>
  )
}

export default DailyResult
