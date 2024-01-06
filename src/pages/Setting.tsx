import { UserOut, localStorageSetting, setCustom } from '../api/firebase'
import { Custom } from '../types'
import { useEffect, useState } from 'react'

import ExpectedLimit from '../components/custom/ExpectedLimit'
import DailyResult from '../components/custom/DailyResult'
import CustomCategory from '../components/custom/CustomCategory'
import styled from 'styled-components'
import Modal from '../components/common/Modal'
import useModal from '../hooks/useModal'
import { useNavigate } from 'react-router-dom'
import { ConfirmContainer } from '../assets/css/Confirm'
import usePatchCustom from '../hooks/custom/usePatchCustom'
import useCustom from '../hooks/custom/useCustom'

const SettingContainer = styled.div`
  padding: 10px;
`

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;

  div > h2 {
    margin: 0;
    margin-bottom: 5px;
  }
`

const CustomContainer = styled.div`
  section {
    margin-bottom: 2rem;
  }
`

const Setting = () => {
  const navigate = useNavigate()

  const [isEdit, setIsEdit] = useState(false)
  const { isOpen, onClose, onOpen } = useModal()

  const [customData, setCustomData] = useState<Custom>({
    category: { expense: '', income: '' },
    daily_result: '',
    expected_limit: {
      is_possible: true,
      price: 300000,
    },
  })

  const [originData, setOriginData] = useState({})

  const { custom, isLoading } = useCustom()

  const { patchCustom } = usePatchCustom({
    onMutate: () => setCustom(customData),
    onSuccess: () => {
      //로컬스토리지 변경된 카테고리 업데이트
      localStorageSetting(customData.category)
      setIsEdit(false)
    },
    onError: () => setCustom(custom),
  })

  useEffect(() => {
    if (custom) {
      setCustomData(custom)
      setOriginData(JSON.parse(JSON.stringify(custom)))
    }
  }, [custom])

  const handleCancle = () => {
    setIsEdit(false)
    setCustomData(JSON.parse(JSON.stringify(originData)))
  }

  const handleUserOut = async () => {
    //회원탈퇴
    const res = await UserOut()
    if (res) {
      //toast 보여주기
      //이동
      navigate('/login')
    }
  }

  // 로딩 스피너 추후 변경
  if (!custom || isLoading) return <div>Loading...</div>

  return (
    <SettingContainer>
      <TitleContainer
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <div>
          <h2>설정</h2>
          <span>회원탈퇴와 커스텀을 할 수 있는 페이지입니다.</span>
        </div>
        <div>
          {isEdit && (
            <button style={{ marginRight: '10px' }} onClick={handleCancle}>
              취소하기
            </button>
          )}
          <button onClick={() => (isEdit ? patchCustom() : setIsEdit(true))}>
            {isEdit ? '저장하기' : '수정하기'}
          </button>
        </div>
      </TitleContainer>

      <CustomContainer>
        <DailyResult
          dailyResult={customData.daily_result}
          setDailyResult={(data) =>
            setCustomData({ ...customData, daily_result: data })
          }
          isEdit={isEdit}
        />
        <ExpectedLimit
          expectedLimit={customData.expected_limit}
          setExpectedLimit={(data) => {
            setCustomData({ ...customData, expected_limit: data })
          }}
          isEdit={isEdit}
        />
        <CustomCategory
          category={customData.category}
          setCategory={(data) => {
            console.log(data)

            setCustomData({ ...customData, category: data })
          }}
          isEdit={isEdit}
        />
      </CustomContainer>

      <button onClick={onOpen}>회원 탈퇴하기</button>

      {isOpen && (
        <Modal onClose={onClose}>
          <ConfirmContainer>
            <h3>정말 탈퇴하시겠습니까?</h3>
            <h5>탈퇴 시 저장된 데이터는 삭제됩니다.</h5>

            <div>
              <button onClick={onClose}>취소</button>
              <button onClick={handleUserOut}>확인</button>
            </div>
          </ConfirmContainer>
        </Modal>
      )}
    </SettingContainer>
  )
}

export default Setting
