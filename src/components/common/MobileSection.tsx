import { ReactNode, useState } from 'react'
import styled from 'styled-components'
import ChevronUp from '../../assets/icons/chevronUp.svg'
import ChevronDown from '../../assets/icons/chevronDown.svg'

interface SectionProps {
  title?: string
  button?: ReactNode
  children: ReactNode
}

const Container = styled.section`
  border: none;

  @media screen and (max-width: 780px) {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid ${({ theme }) => theme.color.gray0};
  }

  h5 {
    display: none;

    @media screen and (max-width: 780px) {
      display: block;
      margin: 0;
      font-size: ${({ theme }) => theme.fontSize.base};
    }
  }
`
const Header = styled.div`
  display: none;

  @media (max-width: 780px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${({ theme }) => theme.color.gray3};

    div:first-child {
      width: 100%;
      display: flex;
      justify-content: space-between;

      button {
        border: none;
        background: transparent;
        margin-right: 0.5rem;

        color: ${({ theme }) => theme.color.gray1};
      }
    }
  }
`

const Button = styled.div`
  img {
    width: 20px;
    cursor: pointer;
  }
  display: none;

  @media (max-width: 780px) {
    display: block;
  }
`

const ChildrenContainer = styled.div<{ $isShow: boolean }>`
  display: block;

  @media screen and (max-width: 780px) {
    display: ${({ $isShow }) => ($isShow ? 'block' : 'none')};
  }
`

const MobileSection = ({ title, children, button }: SectionProps) => {
  const [toggle, setToggle] = useState(
    localStorage.getItem(`${title}_toggle`) === 'true'
  )

  const handleClick = () => {
    setToggle((prevToggle) => {
      const newToggle = !prevToggle
      localStorage.setItem(`${title}_toggle`, String(newToggle))
      return newToggle
    })
  }

  return (
    <Container>
      {title && (
        <Header onClick={handleClick}>
          <div>
            <h5>{title}</h5>
            {button && button}
          </div>
          <Button
            onClick={(e) => {
              e.stopPropagation()
              handleClick()
            }}
          >
            <img src={toggle ? ChevronUp : ChevronDown} alt='' />
          </Button>
        </Header>
      )}

      <ChildrenContainer $isShow={toggle || !title}>
        {children}
      </ChildrenContainer>
    </Container>
  )
}
export default MobileSection
