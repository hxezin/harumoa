import { useQuery } from '@tanstack/react-query'
import { UserOut, getCustom } from '../api/firebase'
import { Custom } from '../types'
import { useEffect, useState } from 'react'

import ExpectedLimit from '../components/custom/ExpectedLimit'
import DailyResult from '../components/custom/DailyResult'
import CustomCategory from '../components/custom/CustomCategory'
import styled from 'styled-components'
import Modal from '../components/common/Modal'
import useModal from '../hooks/useModal'
import { useNavigate } from 'react-router-dom'

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

const UserOutContainer = styled.div`
  width: 250px;

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

  const { data, isLoading } = useQuery({
    queryKey: ['custom'],
    queryFn: () => getCustom(),
  })

  useEffect(() => {
    if (data) {
      setCustomData(data)
      setOriginData(JSON.parse(JSON.stringify(data)))
    }
  }, [data])

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
  if (!data || isLoading) return <div>Loading...</div>

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
          <button
            onClick={() => {
              console.log(customData)
              setIsEdit(!isEdit)
            }}
          >
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
          setCategory={(data) =>
            setCustomData({ ...customData, category: data })
          }
          isEdit={isEdit}
        />
      </CustomContainer>

      <button onClick={onOpen}>회원 탈퇴하기</button>

      {isOpen && (
        <Modal onClose={onClose}>
          <UserOutContainer>
            <h3>정말 탈퇴하시겠습니까?</h3>
            <h5>탈퇴 시 저장된 데이터는 삭제됩니다.</h5>

            <div>
              <button onClick={onClose}>취소</button>
              <button onClick={handleUserOut}>확인</button>
            </div>
          </UserOutContainer>
        </Modal>
      )}
    </SettingContainer>
  )
}

export default Setting
