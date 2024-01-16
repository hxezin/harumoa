import styled from 'styled-components'

const Container = styled.div<{
  width?: string
  height?: string
  $fontSize?: string
}>`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) =>
    height || 'calc(100vh - 55.5px)'}; // header height 변경 시 변경 필요

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    font-size: ${({ theme, $fontSize }) => $fontSize || theme.fontSize.base};
    color: ${({ theme }) => theme.color.primary.main};
    margin: 0;
  }

  p:first-of-type {
    margin-top: 1rem;
    margin-bottom: 0.2rem;
  }
`

const Spinner = styled.div<{ size?: string; $borderWidth?: string }>`
  width: ${({ size }) => size || '3rem'};
  height: ${({ size }) => size || '3rem'};
  border: ${({ $borderWidth }) => $borderWidth || '0.5rem'} solid
    ${({ theme }) => theme.color.gray0};
  border-top: ${({ $borderWidth }) => $borderWidth || '0.5rem'} solid
    ${({ theme }) => theme.color.primary.main};
  border-radius: 50%;

  transition-property: transform;
  animation-name: rotate;
  animation-duration: 1.2s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`

interface Props {
  width?: string // 컨테이너 width
  height?: string // 컨테이너 height
  size?: string // 로딩 스피너 크기
  fontSize?: string // 안내문구 텍스트 사이즈
  borderWidth?: string // 로딩 스피너 굵기
  showGuidance?: boolean // 안내문구 보여주기
}

const LoadingSpinner = ({
  width,
  height,
  size,
  fontSize,
  borderWidth,
  showGuidance = true,
}: Props) => {
  return (
    <Container width={width} height={height} $fontSize={fontSize}>
      <Spinner size={size} $borderWidth={borderWidth} />
      {showGuidance && (
        <>
          <p>당신의 하루를 모두 모으는 중입니다.</p>
          <p>잠시만 기다려주세요...</p>
        </>
      )}
    </Container>
  )
}

export default LoadingSpinner
