import { IDiary } from '../../types'
import { DiaryColumnContainer, DiaryContainer } from '../../assets/css/Book'

interface DiaryProps {
  setDiary: React.Dispatch<React.SetStateAction<IDiary>>
  diaryData: IDiary
}

const DiaryWrite = ({ setDiary, diaryData }: DiaryProps) => {
  return (
    <DiaryContainer>
      <h3>오늘의 요약 (필수)</h3>
      <DiaryColumnContainer>
        <input
          type='text'
          value={diaryData.title}
          onChange={(e) => {
            setDiary({ ...diaryData, title: e.target.value })
          }}
        />

        <h3 style={{ margin: '30px 0px 0px' }}>풀어쓰기 (선택)</h3>
        <textarea
          onChange={(e) => {
            setDiary({ ...diaryData, content: e.target.value })
          }}
          value={diaryData.content ?? ''}
        />
      </DiaryColumnContainer>
    </DiaryContainer>
  )
}

export default DiaryWrite
