import styled from 'styled-components'

export const ConfirmContainer = styled.div`
  min-width: 250px;

  h5 {
    font-weight: 400;
  }

  div {
    display: flex;
    column-gap: 10px;
    justify-content: center;

    button {
      width: 50px;
      border: none;
      padding: 5px 10px;
    }
  }

  div > button:nth-child(2) {
    background: #3de6fd;
  }
`
