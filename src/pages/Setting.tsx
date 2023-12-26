import { useQuery } from '@tanstack/react-query'
import { getCustom } from '../api/firebase'
import { Custom } from '../types'
import { useEffect, useState } from 'react'

import ExpectedLimit from '../components/custom/ExpectedLimit'
import DailyResult from '../components/custom/DailyResult'
import CustomCategory from '../components/custom/CustomCategory'
import styled from 'styled-components'

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
  const [isEdit, setIsEdit] = useState(false)

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

  function handleCancle() {
    setIsEdit(false)
    setCustomData(JSON.parse(JSON.stringify(originData)))
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

      <button>회원 탈퇴하기</button>
    </SettingContainer>
  )
}

export default Setting
