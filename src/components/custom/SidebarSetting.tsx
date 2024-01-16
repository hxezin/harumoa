import { styled } from 'styled-components'
import { IExpectedLimit } from '../../types'
import { inputNumberCheck, inputNumberWithComma } from '../../utils/accountBook'
import Input from '../common/Input'
import Radio from '../common/Radio'
import Section from '../common/Section'
import SectionItem from '../common/SectionItem'

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > div {
    flex: 1;
    display: flex;
    gap: 2.5rem;
    margin-right: 1rem;
  }

  & > input {
    flex: 1;
  }
`

interface SidebarSettingProps {
  expectedLimit: IExpectedLimit

  setExpectedLimit: (data: IExpectedLimit) => void
}

const SidebarSetting = ({
  expectedLimit,
  setExpectedLimit,
}: SidebarSettingProps) => {
  function handleRadioChange(isPossible: boolean) {
    setExpectedLimit({ ...expectedLimit, is_possible: isPossible })
  }

  return (
    <Section title='사이드바 설정'>
      <SectionItem title='‘월별 예상 지출’ 설정'>
        <Box>
          <div>
            <Radio
              label='미사용'
              name='expectedLimit'
              value='unused'
              onChange={() => handleRadioChange(false)}
              checked={!expectedLimit.is_possible}
            />
            <Radio
              label='사용'
              name='expectedLimit'
              value='used'
              onChange={() => handleRadioChange(true)}
              checked={expectedLimit.is_possible}
            />
          </div>

          <Input
            type='text'
            placeholder='월별 예상 지출을 작성해주세요.'
            onChange={(e) => {
              const numPrice = inputNumberCheck(e.target.value)
              setExpectedLimit({ ...expectedLimit, price: Number(numPrice) })
            }}
            value={
              expectedLimit.price === 0
                ? ''
                : inputNumberWithComma(expectedLimit.price)
            }
            textAlign='right'
            disabled={!expectedLimit.is_possible}
          />
        </Box>
      </SectionItem>
    </Section>
  )
}

export default SidebarSetting
