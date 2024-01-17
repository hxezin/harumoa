import { GrayBorderButton } from '../common/Button'
import { ReactComponent as Add } from '../../assets/icons/addCircle.svg'
import { styled } from 'styled-components'

const AddIcon = styled(Add)`
  width: 1.5rem;
  height: 1.5rem;

  circle {
    fill: ${({ theme }) => theme.color.primary.main};
  }

  path {
    stroke: ${({ theme }) => theme.color.white};
  }
`

interface AddButtonProps {
  onClick: () => void
}

const AddButton = ({ onClick }: AddButtonProps) => {
  return (
    <GrayBorderButton
      value={<AddIcon />}
      onClick={onClick}
      padding='0.25rem 0'
      width='100%'
      borderRadius='0.5rem'
    />
  )
}

export default AddButton
