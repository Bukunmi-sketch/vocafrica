export const generateTimeOptions = () => {
  const times = []
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      
      let displayHour = hour
      let period = 'AM'
      
      if (hour === 0) {
        displayHour = 12
      } else if (hour === 12) {
        displayHour = 12
        period = 'PM'
      } else if (hour > 12) {
        displayHour = hour - 12
        period = 'PM'
      }
      
      const displayTime = `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`
      times.push({ value: timeString, display: displayTime })
    }
  }
  return times
}