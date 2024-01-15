import styled from 'styled-components'

export const ContentHeaderContainer = styled.header`
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

interface ContentHeaderProps {
  title: string
  guidance?: string
}

const ContentHeader = ({ title, guidance }: ContentHeaderProps) => {
  return (
    <ContentHeaderContainer>
      <h1>{title}</h1>
      {guidance && <p>{guidance}</p>}
    </ContentHeaderContainer>
  )
}

export default ContentHeader
