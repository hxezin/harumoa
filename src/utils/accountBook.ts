export const inputNumberWithComma = (str: string | number): string => {
  return String(str).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')
}

export const inputNumberCheck = (str: string): string => {
  // str 값이 숫자가 아닐경우 빈문자열로 replace
  return str.replace(/^0|[^0-9]/g, '')
}
