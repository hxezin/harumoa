import styled from 'styled-components'

export const Container = styled.div<{ $isBackground?: boolean }>`
  padding: 1.5rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  background: ${({ theme, $isBackground }) =>
    $isBackground ? theme.color.gray0 : ''};
`

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSize.base};
`
