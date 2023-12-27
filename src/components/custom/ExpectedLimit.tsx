import { styled } from 'styled-components'
import { IExpectedLimit } from '../../types'
import { inputNumberCheck, inputNumberWithComma } from '../../utils/accountBook'

const Container = styled.div`
  display: flex;
  gap: 1rem;
`

interface ExpectedLimitProps {
  expectedLimit: IExpectedLimit

  setExpectedLimit: (data: IExpectedLimit) => void

  isEdit: boolean
}

const ExpectedLimit = ({
  expectedLimit,
  setExpectedLimit,
  isEdit,
}: ExpectedLimitProps) => {
  function handleRadioChange(isPossible: boolean) {
    setExpectedLimit({ ...expectedLimit, is_possible: isPossible })
  }

  return (
    <section>
      <h3>예상 한도</h3>
      <Container>
        <label>
          <input
            type='radio'
            value='unused'
            disabled={!isEdit}
            checked={!expectedLimit.is_possible}
            onChange={() => handleRadioChange(false)}
          />
          미사용
        </label>

        <label>
          <input
            type='radio'
            value='used'
            disabled={!isEdit}
            checked={expectedLimit.is_possible}
            onChange={() => handleRadioChange(true)}
          />
          사용
        </label>

        {expectedLimit.is_possible && (
          <label>
            예상 한도:{' '}
            <input
              type='text'
              disabled={!isEdit}
              onChange={(e) => {
                const numPrice = inputNumberCheck(e.target.value)
                setExpectedLimit({ ...expectedLimit, price: Number(numPrice) })
              }}
              value={
                expectedLimit.price === 0
                  ? ''
                  : inputNumberWithComma(expectedLimit.price)
              }
            />
          </label>
        )}
      </Container>
    </section>
  )
}

export default ExpectedLimit
