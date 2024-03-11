import { ReactNode, useState } from 'react'
import styled from 'styled-components'
// import { ReactComponent as ChevronUp } from '../../assets/icons/chevronUp.svg'
// import { ReactComponent as ChevronDown } from '../../assets/icons/chevronDown.svg'

import ChevronUp from '../../assets/icons/chevronUp.svg'
import ChevronDown from '../../assets/icons/chevronDown.svg'

interface SectionProps {
  title?: string
  children: ReactNode
}

const Container = styled.section`
  border: none;

  @media screen and (max-width: 780px) {
    padding: 1.5rem;
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

const MobileSection = ({ title, children }: SectionProps) => {
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
          <h5>{title}</h5>
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
