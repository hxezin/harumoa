import { IDiary } from '../../types'
import { DiaryColumnContainer, DiaryContainer } from '../../assets/css/Book'

interface DiaryProps {
  diaryData: IDiary
}

const DiaryDetail = ({ diaryData }: DiaryProps) => {
  return (
    <DiaryContainer>
      <h3>오늘의 요약 (필수)</h3>

      {diaryData.title}
      <DiaryColumnContainer>
        <h3 style={{ margin: '50px 0px 0px' }}>풀어쓰기 (선택)</h3>

        {diaryData.content}
      </DiaryColumnContainer>
    </DiaryContainer>
  )
}

export default DiaryDetail
