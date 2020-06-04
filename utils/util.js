const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const DateTime = date => {
  const time = new Date(date);
  const year = time.getFullYear()
  const month = time.getMonth() + 1
  const day = time.getDate()
  return [month, day].map(formatNumber).join('月')+"日"
}
const ymr = date => {
  const time = new Date(date);
  const year = time.getFullYear()
  const month = time.getMonth() + 1
  const day = time.getDate()
  return [year, month, day].map(formatNumber).join('-') 
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  ymr : ymr,
  DateTime : DateTime,
  formatNumber : formatNumber
}