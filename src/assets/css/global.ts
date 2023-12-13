import { createGlobalStyle } from 'styled-components'
import { css } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  li {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: #000;
  }

  button {
    cursor: pointer;
  }
`

export default GlobalStyle

export const ellipsisStyles = css`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`
