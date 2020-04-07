const formatTime = (d, fields ='second') => {
  const date = typeof d !== 'object' ? new Date(d) : d
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  let result;
  const fieldsDay = [year, month, day].map(formatNumber).join('/')
  const fieldsMinute = [hour, minute].map(formatNumber).join(':')
  const fieldsSecond = [hour, minute, second].map(formatNumber).join(':')
  switch (fields) {
    case 'day':
      result = fieldsDay;
      break;
    case 'minute':
      result = fieldsMinute;
      break;  
    default:
      result = fieldsSecond;
  }
  return result;
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}
