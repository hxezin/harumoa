import styled from 'styled-components'
import ContentHeader from '../common/ContentHeader'

const Container = styled.div`
  width: 65%;
  margin: 3rem auto 8rem;
`

const BookContentContainer = styled.section`
  margin-top: 1.5rem;

  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

interface BookContainerProps {
  date: string
  guidance?: string
  children: React.ReactNode
}

const BookContainer = ({ date, guidance, children }: BookContainerProps) => {
  return (
    <Container>
      <ContentHeader title={`${date.replace(/-/g, '.')}.`} />

      <BookContentContainer>{children}</BookContentContainer>
    </Container>
  )
}

export default BookContainer
