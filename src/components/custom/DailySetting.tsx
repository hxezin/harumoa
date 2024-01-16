import { Custom } from '../../types'
import Section from '../common/Section'
import CustomCategory from './CustomCategory'
import DailyResult from './DailyResult'

interface DailySettingProps {
  customData: Custom
  setCustomData: React.Dispatch<React.SetStateAction<Custom>>
}

const DailySetting = ({ customData, setCustomData }: DailySettingProps) => {
  return (
    <Section title='일간 가계부 설정'>
      <DailyResult
        dailyResult={customData.daily_result}
        setDailyResult={(data) =>
          setCustomData({ ...customData, daily_result: data })
        }
      />
      <CustomCategory
        category={customData.category}
        setCategory={(data) => {
          setCustomData({ ...customData, category: data })
        }}
        isEdit={true}
      />
    </Section>
  )
}

export default DailySetting
