import styled from 'styled-components'

export const ContentFooterContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: auto;
  border-top: 0.5px solid ${({ theme }) => theme.color.gray1};
  background-color: ${({ theme }) => theme.color.white};

  position: fixed;
  bottom: 0;
  z-index: 1;

  & > div {
    padding: 1rem 1.5rem;
  }
`

interface ContentFooterProps {
  children: React.ReactNode
}

const ContentFooter = ({ children }: ContentFooterProps) => {
  return <ContentFooterContainer>{children}</ContentFooterContainer>
}

export default ContentFooter
