import styled from 'styled-components'

const StyledToggleButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 1.2rem;
  z-index: 2;
  width: 30px;
  height: 30px;
`

interface Props {
  isSidebarOpen: boolean
  onToggle: () => void
}

const SidebarToggleButton = ({ isSidebarOpen, onToggle }: Props) => {
  return <StyledToggleButton onClick={onToggle}>☰</StyledToggleButton>
}

export default SidebarToggleButton
