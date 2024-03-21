import { ReactComponent as Minus } from '../../assets/icons/minusCircle.svg'
import { styled } from 'styled-components'

const DeleteButtonContainer = styled(Minus)`
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;

  circle {
    fill: ${({ theme }) => theme.color.gray2};
  }

  path {
    stroke: ${({ theme }) => theme.color.white};
  }
`

interface DeleteButtonProps {
  onClick: () => void
}

const DeleteButton = ({ onClick }: DeleteButtonProps) => {
  return (
    <DeleteButtonContainer
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
    />
  )
}

export default DeleteButton
