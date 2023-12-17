import styled from 'styled-components'

//book 관련 page styled component
export const BookContainer = styled.div`
  padding: 10px 30px;
`

export const BookDataContainer = styled.div`
  display: flex;
  justify-content: space-between;

  h2 {
    margin: 0;
  }
`

export const BookContentContainer = styled.div`
  display: flex;
  column-gap: 30px;

  margin-top: 20px;
`

//account book styled component
export const AccountBookContainer = styled.div`
  width: 60%;
`

export const AccountBookTable = styled.table`
  width: 100%;

  tr > td {
    width: 20%;
    text-align: center;
  }

  tr > td:nth-last-child(1) {
    width: 5%;
  }
`

//diary  styled component
export const DiaryContainer = styled.div`
  width: 40%;
`

export const DiaryColumnContainer = styled.div`
  display: flex;
  flex-direction: column;

  row-gap: 20px;

  textarea {
    height: 300px;
  }
`
