import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: space-between;

  h3 {
    flex: 1;
    color: ${({ theme }) => theme.color.gray2};
    font-size: ${({ theme }) => theme.fontSize.base};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    padding: 0.5rem 0;
    margin: 0;
  }

  div {
    flex: 1;
  }
`

interface SectionProps {
  title: string
  children: React.ReactNode
}

const SectionItem = ({ title, children }: SectionProps) => {
  return (
    <Container>
      <h3>{title}</h3>
      <div>{children}</div>
    </Container>
  )
}

export default SectionItem
