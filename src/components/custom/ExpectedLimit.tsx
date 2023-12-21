import { IExpectedLimit } from '../../types'

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
  return <div>{expectedLimit.price}</div>
}

export default ExpectedLimit
