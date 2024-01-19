import styled from 'styled-components'

export const Container = styled.div<{
  $isBackground?: boolean
  $height?: boolean
}>`
  padding: 1.5rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  background: ${({ theme, $isBackground }) =>
    $isBackground ? theme.color.gray0 : ''};

  ${({ $height, theme }) =>
    $height
      ? `height: calc(100vh - ${theme.layout.headerHeight} - 330px)`
      : ``};
`

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSize.base};
`
