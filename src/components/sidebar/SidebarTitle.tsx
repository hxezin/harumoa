import { styled } from 'styled-components'

const Container = styled.h3`
  margin-bottom: 0;
`

interface Props {
  title: string
}

const SidebarTitle = ({ title }: Props) => {
  return <Container>{title}</Container>
}

export default SidebarTitle
