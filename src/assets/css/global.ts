import { createGlobalStyle } from 'styled-components'
import { css } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

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
