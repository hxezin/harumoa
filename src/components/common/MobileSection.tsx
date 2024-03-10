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
  width: 100%;
  border: none;

  @media screen and (max-width: 780px) {
    padding: 1.5rem;
    border: 1px solid ${({ theme }) => theme.color.gray0};
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
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 780px) {
    display: none;
  }
`

const Button = styled.div`
  img {
    width: 20px;
    cursor: pointer;
  }

  @media (min-width: 780px) {
    display: none;
  }
`

const MobileSection = ({ title, children }: SectionProps) => {
  const [toggle, setToggle] = useState(
    localStorage.getItem(`${title}_toggle`) === 'true'
  )

  return (
    <Container>
      {title && (
        <Header>
          <h5>{title}</h5>
          <Button
            onClick={() => {
              setToggle((prevToggle) => {
                const newToggle = !prevToggle
                localStorage.setItem(`${title}_toggle`, String(newToggle))
                return newToggle
              })
            }}
          >
            <img src={toggle ? ChevronUp : ChevronDown} alt='' />
          </Button>
        </Header>
      )}

      {(!title || toggle) && children}
    </Container>
  )
}
export default MobileSection
