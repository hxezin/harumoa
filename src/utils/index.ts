// 문자열 배열을 select 옵션 형태로 변환
export function formatSelectOptions(arr: string[]) {
  return arr.map((item) => ({ label: item, value: item }))
}

// 객체 깊은 복사
// JSON.stringify와 JSON.parse를 사용하므로 함수, 정규표현식 등은 복사되지 않음
export function deepCopy<T>(obj: T): T {
  const jsonString = JSON.stringify(obj)
  const copy = JSON.parse(jsonString)
  return copy
}
