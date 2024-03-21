import styled from 'styled-components'

const Container = styled.div<{ $margin?: string }>`
  display: flex;
  justify-content: space-between;

  & > div:first-child {
    flex: 1;
  }

  & > div:last-child {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  @media screen and (max-width: 780px) {
    flex-direction: column;
    row-gap: 0.5rem;
    margin: ${({ $margin }) => $margin ?? ''};
  }
`

const Title = styled.div<{ $justifyContent?: string }>`
  display: flex;
  flex-direction: column;
  justify-content: ${({ $justifyContent }) => $justifyContent || 'center'};

  /* SectionItem 타이틀 */
  & > h3 {
    color: ${({ theme }) => theme.color.gray2};
    font-size: ${({ theme }) => theme.fontSize.base};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    padding: 0.5rem 0;
    margin: 0;

    span {
      color: ${({ theme }) => theme.color.primary.main};
    }
  }

  /* 안내 문구 */
  & > p {
    margin: 0;
    color: ${({ theme }) => theme.color.gray1};
    font-size: ${({ theme }) => theme.fontSize.xs};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
  }

  @media (max-width: 780px) {
    /* SectionItem 타이틀 */
    & > h3 {
      font-size: ${({ theme }) => theme.fontSize.sm};
      font-weight: ${({ theme }) => theme.fontWeight.semiBold};
      padding: 0.2rem 0;
      margin: 0;
    }
  }
`

interface SectionProps {
  title: string | React.ReactNode
  children: React.ReactNode
  guidance?: string
  justifyContent?: string // title 수직 정렬
  margin?: string
}

const SectionItem = ({
  title,
  children,
  guidance,
  justifyContent,
  margin,
}: SectionProps) => {
  return (
    <Container $margin={margin}>
      <Title $justifyContent={justifyContent}>
        <h3>{title}</h3>
        {guidance && <p>{guidance}</p>}
      </Title>
      <div>{children}</div>
    </Container>
  )
}

export default SectionItem
