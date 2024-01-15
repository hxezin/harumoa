import { IDiary } from '../../types'
import Input from '../common/Input'
import Section from '../common/Section'
import SectionItem from '../common/SectionItem'
import Textarea from '../common/Textarea'

interface DiaryProps {
  setDiary?: React.Dispatch<React.SetStateAction<IDiary>>
  diaryData: IDiary
  viewMode: boolean
}

const Diary = ({ setDiary, diaryData, viewMode }: DiaryProps) => {
  return (
    <Section title='하루 일기 작성하기'>
      <SectionItem title='오늘의 한 줄 요약'>
        <Input
          type='text'
          placeholder='오늘을 한 줄 요약 해주세요.'
          value={diaryData.title}
          onChange={(e) => {
            setDiary && setDiary({ ...diaryData, title: e.target.value })
          }}
          viewMode={viewMode}
        />
      </SectionItem>

      <SectionItem title='상세 내용'>
        <Textarea
          onChange={(e) => {
            setDiary && setDiary({ ...diaryData, content: e.target.value })
          }}
          value={diaryData.content ?? ''}
          placeholder='상세 내용을 적어주세요.'
          viewMode={viewMode}
        />
      </SectionItem>
    </Section>
  )
}

export default Diary
