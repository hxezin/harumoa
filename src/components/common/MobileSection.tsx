import { ReactNode, useState } from 'react'
import styled from 'styled-components'
// import { ReactComponent as ChevronUp } from '../../assets/icons/chevronUp.svg'
// import { ReactComponent as ChevronDown } from '../../assets/icons/chevronDown.svg'

import ChevronUp from '../../assets/icons/chevronUp.svg'
import ChevronDown from '../../assets/icons/chevronDown.svg'
import theme from '../../assets/css/theme'

interface SectionProps {
  title?: string
  children: ReactNode
}

const Container = styled.section`
  width: 100%;

  @media screen and (max-width: 780px) {
    padding: 1.5rem;
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
`

const Button = styled.div`
  img {
    width: 20px;
    cursor: pointer;
  }
`

const MobileSection = ({ title, children }: SectionProps) => {
  const [toggle, setToggle] = useState(
    Boolean(localStorage.getItem(`${title}_toggle`) ?? 'true')
  )

  return (
    <Container>
      {title && (
        <Header>
          <h5>{title}</h5>
          <Button
            onClick={() => {
              console.log(typeof toggle)

              setToggle(!toggle)
              localStorage.setItem(`${title}_toggle`, String(!toggle))
              console.log(localStorage.getItem(`${title}_toggle`))
            }}
          >
            <img src={toggle ? ChevronUp : ChevronDown} alt='' />
          </Button>
        </Header>
      )}

      {toggle && children}
    </Container>
  )
}
export default MobileSection
