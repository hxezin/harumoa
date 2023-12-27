// 문자열 배열을 select 옵션 형태로 변환
export function formatSelectOptions(arr: string[]) {
  return arr.map((item) => ({ label: item, value: item }))
}
