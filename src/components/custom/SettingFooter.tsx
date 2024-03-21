import { styled } from 'styled-components'
import ContentFooter from '../common/ContentFooter'
import { BlueButton, Button } from '../common/Button'
import { ReactComponent as Arrow } from '../../assets/icons/arrowRight.svg'

const Box = styled.div`
  display: flex;
  //justify-content: space-between;
  justify-content: flex-end;
  align-items: center;
  position: relative;

  div {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }
`

const ArrowIcon = styled(Arrow)`
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;

  position: absolute;
  left: 7.8rem;
  top: 1.4rem;

  path {
    stroke: ${({ theme }) => theme.color.gray0};
  }
`

interface BookFooterProps {
  onCancel: () => void
  onSave: () => void
  onConfirm: () => void
  disabled?: boolean
}

const SettingFooter = ({
  onCancel,
  onSave,
  onConfirm,
  disabled,
}: BookFooterProps) => {
  return (
    <ContentFooter>
      <Box>
        {/* <Button
          value='회원 탈퇴하기'
          onClick={onConfirm}
          bgColor='transparent'
          fontColor={theme.color.gray0}
          hoverBgColor='transparent'
        />
        <ArrowIcon onClick={onConfirm} /> */}
        <div>
          <Button value='되돌리기' onClick={onCancel} disabled={disabled} />
          <BlueButton value='저장하기' onClick={onSave} disabled={disabled} />
        </div>
      </Box>
    </ContentFooter>
  )
}

export default SettingFooter
