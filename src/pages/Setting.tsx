import { useQuery } from '@tanstack/react-query'
import { getCustom } from '../api/firebase'
import { Custom } from '../types'
import { useEffect, useState } from 'react'

import ExpectedLimit from '../components/custom/ExpectedLimit'
import DailyResult from '../components/custom/DailyResult'
import Category from '../components/custom/Category'
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

const Setting = () => {
  const [isEdit, setIsEdit] = useState(false)

  const [customData, setCustomData] = useState<Custom>({
    category: '',
    daily_result: '',
    expected_limit: {
      is_possible: true,
      price: 300000,
    },
  })

  const { data, isLoading } = useQuery({
    queryKey: ['custom'],
    queryFn: () => getCustom(),
  })

  useEffect(() => {
    if (data) {
      setCustomData(data)
    }
  }, [data])

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
            <button
              style={{ marginRight: '10px' }}
              onClick={() => setIsEdit(false)}
            >
              취소하기
            </button>
          )}
          <button
            onClick={() => {
              setIsEdit(!isEdit)
            }}
          >
            {isEdit ? '저장하기' : '수정하기'}
          </button>
        </div>
      </TitleContainer>

      <DailyResult
        dailyResult={customData.daily_result}
        setDailyResult={(data) =>
          setCustomData({ ...customData, daily_result: data })
        }
        isEdit
      />
      <ExpectedLimit
        expectedLimit={customData.expected_limit}
        setExpectedLimit={(data) => {
          setCustomData({ ...customData, expected_limit: data })
        }}
        isEdit
      />
      <Category
        category={customData.category}
        setCategory={(data) => setCustomData({ ...customData, category: data })}
        isEdit
      />
      <button>회원 탈퇴하기</button>
    </SettingContainer>
  )
}

export default Setting
