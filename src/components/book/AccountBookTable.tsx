import styled from 'styled-components'
import { inputNumberCheck, inputNumberWithComma } from '../../utils/accountBook'
import Input from '../common/Input'
import Dropdown from '../common/Dropdown'
import { IAccountBook, Options } from '../../types'
import DeleteButton from './DeleteButton'
import { paymentTypeOptions } from '../../constants'

const TableContainer = styled.table`
  width: 100%;
  margin-bottom: 0.5rem;

  thead {
    color: ${({ theme }) => theme.color.gray2};
    font-size: ${({ theme }) => theme.fontSize.sm};
    font-weight: ${({ theme }) => theme.fontWeight.extraBold};
    border-bottom: 1px solid ${({ theme }) => theme.color.gray0};
    text-align: center;

    td {
      padding: 0.56rem 0.5rem;
    }
  }

  tr > td {
    padding-top: 0.5rem;
    padding-right: 0.5rem;
  }

  tr > td:nth-child(2) {
    position: relative;
  }

  tr > td:nth-last-child(1) {
    padding-right: 0;
  }
`

export const KRWICon = styled.span<{ $viewMode: boolean }>`
  position: absolute;
  left: 1rem;
  top: 1.1rem;

  color: ${({ theme, $viewMode }) =>
    $viewMode ? theme.color.black : theme.color.gray3};
`

interface AccountBookTableProps {
  accountBookData: IAccountBook
  category: Options[]
  onDelete: (key: string) => void
  setAccountBook?: React.Dispatch<React.SetStateAction<IAccountBook>>
  viewMode: boolean
  isIncome: boolean
}

const AccountBookTable = ({
  accountBookData,
  category,
  onDelete,
  setAccountBook,
  viewMode,
  isIncome,
}: AccountBookTableProps) => {
  return (
    <TableContainer>
      <thead>
        <tr>
          <td width='20%'>카테고리</td>
          <td width='20%'>금액</td>
          <td width='20%'>지출 수단</td>
          <td width='40%'>메모</td>
          {!viewMode && <td></td>}
        </tr>
      </thead>

      <tbody>
        {/* type(expense, income)에 해당하는 데이터가 있는 경우 */}
        {accountBookData &&
          Object.entries(accountBookData)
            .filter(([, val]) => val.is_income === isIncome)
            .map(([key, val]) => (
              <tr key={key}>
                <td>
                  <Dropdown
                    onChange={(e) => {
                      accountBookData[key].category = e

                      //memo, price 초기화
                      accountBookData[key].memo = ''
                      accountBookData[key].price = 0

                      setAccountBook && setAccountBook({ ...accountBookData })
                    }}
                    options={category}
                    defaultValue={accountBookData[key].category}
                    placeholder='카테고리'
                    viewMode={viewMode}
                  />
                </td>
                <td>
                  <Input
                    type='text'
                    value={
                      accountBookData[key].price === 0
                        ? ''
                        : inputNumberWithComma(accountBookData[key].price)
                    }
                    onChange={(e) => {
                      const numPrice = inputNumberCheck(e.target.value)

                      accountBookData[key].price = Number(numPrice)

                      setAccountBook && setAccountBook({ ...accountBookData })
                    }}
                    placeholder='금액'
                    textAlign='right'
                    viewMode={viewMode}
                    padding='0.5rem'
                  />
                  <KRWICon $viewMode={viewMode}>₩</KRWICon>
                </td>
                <td>
                  <Dropdown
                    onChange={(e) => {
                      accountBookData[key].payment_type = e
                      console.log(accountBookData[key])
                      setAccountBook && setAccountBook({ ...accountBookData })
                    }}
                    options={paymentTypeOptions}
                    defaultValue={accountBookData[key].payment_type}
                    placeholder='지출 수단'
                    viewMode={viewMode}
                  />
                </td>
                <td>
                  <Input
                    type='text'
                    onChange={(e) => {
                      accountBookData[key].memo = e.target.value

                      setAccountBook && setAccountBook({ ...accountBookData })
                    }}
                    value={accountBookData[key].memo}
                    placeholder='메모'
                    textAlign='center'
                    viewMode={viewMode}
                  />
                </td>

                {!viewMode && (
                  <td>
                    <DeleteButton onClick={() => onDelete(key)} />
                  </td>
                )}
              </tr>
            ))}

        {/* 데이터가 없을 때 비어있음 표시 */}
        {viewMode &&
          (!accountBookData ||
            Object.entries(accountBookData).filter(
              ([, val]) => val.is_income === isIncome
            ).length === 0) && (
            <tr>
              <td
                colSpan={3}
                style={{
                  textAlign: 'center',
                  fontSize: '0.75rem',
                  color: '#b4b4b4',
                }}
              >
                비어있음
              </td>
            </tr>
          )}
      </tbody>
    </TableContainer>
  )
}

export default AccountBookTable
