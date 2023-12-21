import { IAccountBook } from '../../types'
import AccountBookThead from './AccountBookThead'
import { AccountBookContainer, AccountBookTable } from '../../assets/css/Book'
import { inputNumberWithComma } from '../../utils/accountBook'

interface AccountBookProps {
  accountBookData: IAccountBook
}

const AccountBookDetail = ({ accountBookData }: AccountBookProps) => {
  return (
    <AccountBookContainer>
      <h3>가계부</h3>

      <AccountBookTable>
        <AccountBookThead />

        <tbody>
          {accountBookData &&
            Object.entries(accountBookData).map(([key, val]) => (
              <tr key={key}>
                <td>{val.is_income ? '수입' : '지출'}</td>
                <td>{val.category}</td>
                <td>{val.memo}</td>
                <td>{inputNumberWithComma(val.price)}</td>

                <td></td>
              </tr>
            ))}
        </tbody>
      </AccountBookTable>
    </AccountBookContainer>
  )
}

export default AccountBookDetail
