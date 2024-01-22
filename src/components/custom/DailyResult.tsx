import { styled } from 'styled-components'
import Radio from '../common/Radio'
import SectionItem from '../common/SectionItem'

const Box = styled.div`
  display: flex;
  gap: 2.5rem;
`

interface DailyResultProps {
  dailyResult: string
  setDailyResult: (data: string) => void
}

const DailyResult = ({ dailyResult, setDailyResult }: DailyResultProps) => {
  return (
    <SectionItem title='일간 수입/지출 보여지는 방법'>
      <Box>
        <Radio
          label='수입-지출(기본)'
          name='dailyResult'
          value='revenue'
          onChange={(e) => setDailyResult(e.target.value)}
          checked={dailyResult === 'revenue'}
        />
        <Radio
          label='수입만'
          name='dailyResult'
          value='income'
          onChange={(e) => setDailyResult(e.target.value)}
          checked={dailyResult === 'income'}
        />
        <Radio
          label='지출만'
          name='dailyResult'
          value='expense'
          onChange={(e) => setDailyResult(e.target.value)}
          checked={dailyResult === 'expense'}
        />
      </Box>
    </SectionItem>
  )
}

export default DailyResult
