import styled from 'styled-components'

const SectionContainer = styled.section`
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.color.gray0};
  padding: 1.5rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  h2 {
    margin: 0;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.color.black};
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  }

  @media (max-width: 780px) {
    h2 {
      font-size: ${({ theme }) => theme.fontSize.base};
      font-weight: ${({ theme }) => theme.fontWeight.bold};
      margin: 0;
    }
  }
`

interface SectionProps {
  title: string
  children: React.ReactNode
}

const Section = ({ title, children }: SectionProps) => {
  return (
    <SectionContainer>
      <h2>{title}</h2>
      {children}
    </SectionContainer>
  )
}

export default Section
