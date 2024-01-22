import { createGlobalStyle } from 'styled-components'
import { css } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'SUITE-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/SUITE-Regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
  }

  *{
    font-family: Suite-Regular
  }

  li {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: #000;
  }

  button, button:hover {
    cursor: pointer;
  }

  button:disabled {
    cursor: default;
  }
`

export default GlobalStyle

export const ellipsisStyles = css`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`
