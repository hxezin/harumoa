import styled from 'styled-components'

export const Container = styled.div<{
  $isBackground?: boolean
  $height?: boolean
  $enableExpectedLimit?: boolean
}>`
  padding: 1.5rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  background: ${({ theme, $isBackground }) =>
    $isBackground ? theme.color.gray0 : ''};

  height: ${({ $height }) => ($height ? '100%' : '')};
  max-height: ${({ $height, theme, $enableExpectedLimit }) =>
    $height
      ? $enableExpectedLimit
        ? `calc(100vh - ${theme.layout.headerHeight} - 325.5px)` // - (월별 예상 지출 + 합계)
        : `calc(100vh - ${theme.layout.headerHeight} - 178.85px)` // - 합계
      : ``};

  @media screen and (max-width: 780px) {
    padding: 1.5rem 0 0;
  }
`

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSize.base};

  @media screen and (max-width: 780px) {
    display: none;
  }
`
