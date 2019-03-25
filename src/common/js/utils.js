export function formatDate(time) {
  const date = new Date(time)
  const year = date.getFullYear()
  const month = addZero(date.getMonth() + 1)
  const day = addZero(date.getDate())
  const h = addZero(date.getHours())
  const m = addZero(date.getMinutes())
  const s = addZero(date.getSeconds())
  return `${year}-${month}-${day} ${h}:${m}:${s}`
}

function addZero(num) {
  return num > 9 ? num : `0${num}`
}
