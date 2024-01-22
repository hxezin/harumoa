import { localStorageSetting, setCustom } from '../api/firebase'
import { Custom } from '../types'
import { useEffect, useState } from 'react'
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
import SidebarSetting from '../components/custom/SidebarSetting'
import DailySetting from '../components/custom/DailySetting'
import isEqual from 'lodash.isequal'

const Setting = () => {
  const navigate = useNavigate()
  const { isOpen, onClose, onOpen } = useModal()
  const { custom, isLoading } = useCustom()

  const [customData, setCustomData] = useState<Custom>(initialCustom)
  const [originData, setOriginData] = useState<Custom>(initialCustom)
  const [disabled, setDisabled] = useState(true)

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

  // 저장/되돌리기 버튼 조건부 활성화
  useEffect(() => {
    setDisabled(isEqual(originData, customData))
  }, [customData, originData])

  const handleCancle = () => {
    setCustomData(deepCopy(originData))
  }

  // const handleUserOut = async () => {
  //   //회원탈퇴
  //   const res = await revokeAccessUser()
  //   if (res) {
  //     //localStorage.clear() //로컬스토리지 클리어
  //     navigate('/login')
  //   }
  // }

  return (
    <>
      {!custom || isLoading || isPending ? (
        <LoadingSpinner />
      ) : (
        <Template
          title='설정'
          guidance='커스텀과 로그인 정보를 변경할 수 있습니다.'
        >
          <SidebarSetting
            expectedLimit={customData.expected_limit}
            setExpectedLimit={(data) => {
              setCustomData({ ...customData, expected_limit: data })
            }}
          />
          <DailySetting customData={customData} setCustomData={setCustomData} />
        </Template>
      )}

      {/* {isOpen && (
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
      )} */}

      <SettingFooter
        onCancle={handleCancle}
        onSave={patchCustom}
        onConfirm={onOpen}
        disabled={disabled}
      />
    </>
  )
}

export default Setting
