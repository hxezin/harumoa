import { IAccountBook } from '../../types'
import AccountBookThead from './AccountBookThead'
import { AccountBookContainer, AccountBookTable } from '../../assets/css/Book'

interface AccountBookProps {
  accountBookData: IAccountBook
}

const AccountBook = ({ accountBookData }: AccountBookProps) => {
  return (
    <AccountBookContainer>
      <h3>가계부</h3>

      <AccountBookTable>
        <AccountBookThead />

        <tbody>
          {accountBookData &&
            Object.entries(accountBookData).map(([key, val]) => (
              <tr key={key}>
                <td></td>
                <td></td>
                <td></td>
                <td></td>

                <td></td>
              </tr>
            ))}
        </tbody>
      </AccountBookTable>
    </AccountBookContainer>
  )
}

export default AccountBook
