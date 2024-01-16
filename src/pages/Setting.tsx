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
import usePatchCustom from '../hooks/custom/usePatchCustom'
import useCustom from '../hooks/custom/useCustom'
import { deepCopy } from '../utils'
import { initialCustom } from '../constants/config'
import SettingFooter from '../components/custom/SettingFooter'
import LoadingSpinner from '../components/common/LoadingSpinner'
import Template from '../components/common/Template'
import Confirm from '../components/common/Confirm'
import { Button, RedButton } from '../components/common/Button'

const SettingContainer = styled.div`
  width: 65%;
  margin: 3rem auto 8rem;
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

  const { isOpen, onClose, onOpen } = useModal()

  const [customData, setCustomData] = useState<Custom>(initialCustom)

  const [originData, setOriginData] = useState<Custom>(initialCustom)

  const { custom, isLoading } = useCustom()

  const { patchCustom, isPending } = usePatchCustom({
    onMutate: () => setCustom(customData),
    onSuccess: () => {
      //로컬스토리지 변경된 카테고리 업데이트
      localStorageSetting(customData.category)
    },
    onError: () => setCustom(originData),
  })

  useEffect(() => {
    if (custom) {
      setCustomData(deepCopy(custom))
      setOriginData(deepCopy(custom))
    }
  }, [custom])

  const handleCancle = () => {
    setCustomData(deepCopy(originData))
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

  if (!custom || isLoading || isPending) return <LoadingSpinner />

  return (
    <>
      <Template
        title='설정'
        guidance='커스텀과 로그인 정보를 변경할 수 있습니다.'
      >
        <CustomContainer>
          <DailyResult
            dailyResult={customData.daily_result}
            setDailyResult={(data) =>
              setCustomData({ ...customData, daily_result: data })
            }
            isEdit={true}
          />
          <ExpectedLimit
            expectedLimit={customData.expected_limit}
            setExpectedLimit={(data) => {
              setCustomData({ ...customData, expected_limit: data })
            }}
            isEdit={true}
          />
          <CustomCategory
            category={customData.category}
            setCategory={(data) => {
              console.log(data)

              setCustomData({ ...customData, category: data })
            }}
            isEdit={true}
          />
        </CustomContainer>

        <button onClick={onOpen}>회원 탈퇴하기</button>
      </Template>

      {isOpen && (
        <Modal onClose={onClose}>
          <Confirm
            title={`정말 탈퇴하시겠습니까?`}
            guidance={
              <>
                탈퇴하시면 모으신 모든 하루 조각들이 산산이 흩어져요. <br />{' '}
                흩어진 조각들은 다시 모을 수 없는데 정말로 탈퇴하시겠습니까?
              </>
            }
            buttons={
              <>
                <Button onClick={onClose} value='취소하기' />
                <RedButton onClick={handleUserOut} value='탈퇴하기' />
              </>
            }
          />
        </Modal>
      )}

      <SettingFooter
        onCancle={handleCancle}
        onSave={patchCustom}
        onConfirm={onOpen}
      />
    </>
  )
}

export default Setting
