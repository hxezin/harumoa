import styled from 'styled-components'

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
`

export const Header = styled.header`
  padding: 1.5rem;
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ theme }) => theme.fontWeight.bold};

  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
`

export const Content = styled.div`
  padding: 0 1.5rem 5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
  overflow: scroll;

  .payment-period {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background: transparent;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 3;
`
