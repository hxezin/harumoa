import { ReactElement } from 'react'
import { styled } from 'styled-components'

const Container = styled.h3`
  padding-bottom: 0.5rem;
  border-bottom: 1px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

interface Props {
  title: string
  children?: ReactElement
}

const SidebarTitle = ({ title, children }: Props) => {
  return (
    <Container>
      <span>{title}</span>
      {children}
    </Container>
  )
}

export default SidebarTitle
