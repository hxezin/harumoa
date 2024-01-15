import styled from 'styled-components'

const Container = styled.div`
  width: 65%;
  margin: 3rem auto 8rem;
`

const Header = styled.header`
  padding: 0 1.5rem;

  h1 {
    color: ${({ theme }) => theme.color.black};
    font-size: ${({ theme }) => theme.fontSize.xl};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    margin-bottom: 0.5rem;
  }

  p {
    color: ${({ theme }) => theme.color.gray1};
    font-size: ${({ theme }) => theme.fontSize.base};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    margin: 0;
  }
`

const Content = styled.section`
  margin-top: 1.5rem;

  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

interface TemplateProps {
  title: string
  guidance?: string
  children: React.ReactNode
}

const Template = ({ title, guidance, children }: TemplateProps) => {
  return (
    <Container>
      <Header>
        <h1>{title}</h1>
        {guidance && <p>{guidance}</p>}
      </Header>

      <Content>{children}</Content>
    </Container>
  )
}

export default Template
