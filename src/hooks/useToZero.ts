export function useToZero(month: Number) {
  if (month < 10) {
    return `0${month}`
  } else {
    return month
  }
}