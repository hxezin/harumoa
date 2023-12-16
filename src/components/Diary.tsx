import styled from 'styled-components'
import { IDiary } from '../types'

const DiaryContainer = styled.div`
  width: 40%;
`

const DiaryColumnContainer = styled.div`
  display: flex;
  flex-direction: column;

  row-gap: 20px;

  textarea {
    height: 300px;
  }
`

interface DiaryProps {
  setDiary: React.Dispatch<React.SetStateAction<IDiary>>
  diaryData: IDiary
}

const Diary = ({ setDiary, diaryData }: DiaryProps) => {
  return (
    <DiaryContainer>
      <h3>오늘의 요약 (필수)</h3>
      <DiaryColumnContainer>
        <input
          type='text'
          onChange={(e) => {
            diaryData.title = e.target.value

            setDiary(diaryData)
          }}
        />

        <h3>풀어쓰기 (선택)</h3>
        <textarea
          onChange={(e) => {
            diaryData.content = e.target.value

            setDiary(diaryData)
          }}
        />
      </DiaryColumnContainer>
    </DiaryContainer>
  )
}

export default Diary
