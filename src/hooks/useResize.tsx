import { useEffect, useState } from 'react'

const useResize = () => {
  const [resize, setResize] = useState(window.innerWidth)

  const handleResize = () => {
    setResize(window.innerWidth)
  }

  useEffect(() => {
    //화면 사이즈 이벤트 등록
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return { resize }
}

export default useResize
