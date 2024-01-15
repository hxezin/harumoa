import { useLocation, useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import ContentFooter from '../common/ContentFooter'
import { BlueButton, Button, RedButton } from '../common/Button'

const Box = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`

interface BookFooterProps {
  date: string
  isEditMode?: boolean
  onDelete?: () => void
  onSave?: () => void
  disabled?: boolean
}

const BookFooter = ({
  date,
  isEditMode,
  onDelete,
  onSave,
  disabled,
}: BookFooterProps) => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <ContentFooter>
      <Box>
        <Button
          value={isEditMode ? '취소하기' : '수정하기'}
          onClick={() =>
            isEditMode
              ? navigate(-1)
              : navigate(`/edit?date=${date}`, { state: location.state })
          }
        />

        {onDelete && <RedButton value='삭제하기' onClick={onDelete} />}

        {onSave && (
          <BlueButton value='저장하기' onClick={onSave} disabled={disabled} />
        )}
      </Box>
    </ContentFooter>
  )
}

export default BookFooter
