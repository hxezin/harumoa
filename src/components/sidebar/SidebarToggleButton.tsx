import styled from 'styled-components'

const StyledToggleButton = styled.button`
  position: absolute;
  right: 0;
  top: 50%;
  z-index: 2;
  width: 30px;
  height: 30px;
`

interface Props {
  isSidebarOpen: boolean
  onToggle: () => void
}

const SidebarToggleButton = ({ isSidebarOpen, onToggle }: Props) => {
  return (
    <StyledToggleButton onClick={onToggle}>
      {isSidebarOpen ? '>' : '<'}
    </StyledToggleButton>
  )
}

export default SidebarToggleButton
