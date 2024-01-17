import styled from 'styled-components'
import Header from '../components/layout/Header'
import RootContainer from '../components/layout/RootContainer'
import { BlueBorderButton } from '../components/common/Button'
import { useNavigate } from 'react-router-dom'
import rightArrow from '../assets/icons/rightArrow.svg'

const NotFoundContainer = styled.div`
  width: 100%;
  height: ${({ theme }) => `calc(100vh - ${theme.layout.headerHeight})`};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 1.5rem;

  h1 {
    margin: 0;
    font-size: 5rem;
    font-weight: ${({ theme }) => theme.fontWeight.extraBold};
  }

  h2 {
    margin: 0;
    font-size: ${({ theme }) => theme.fontSize.xl};
    font-weight: ${({ theme }) => theme.fontWeight.extraBold};
  }

  p {
    margin: 0;
    font-size: ${({ theme }) => theme.fontSize.base};
  }
`

const NotFound = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    if (localStorage.getItem('user')) {
      navigate('/')
    } else {
      navigate('/login')
    }
  }

  return (
    <RootContainer>
      <Header />

      <NotFoundContainer>
        <h1>404</h1>
        <h2>
          ERROR <br />
          찾을 수 없는 페이지입니다.
        </h2>

        <div>
          <p>페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.</p>
          <p>입력하신 주소가 정확한지 다시 한 번 확인해주세요.</p>
        </div>

        <BlueBorderButton
          value={
            <div
              style={{
                width: '120px',
                display: 'flex',
                alignItems: 'center',
                columnGap: '1px',
              }}
            >
              홈으로 이동하기
              <img src={rightArrow} />
            </div>
          }
          onClick={handleClick}
        />
      </NotFoundContainer>
    </RootContainer>
  )
}
export default NotFound
