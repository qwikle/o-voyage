import { DateTime } from 'luxon'
export function getListOfDatesFromTwoDates(startDate: string, stopDate: string) {
  const dateArray = []
  let currentDate = DateTime.fromISO(startDate)
  while (currentDate <= DateTime.fromISO(stopDate)) {
    const value = currentDate.toFormat('yyyy-MM-dd')
    const date = currentDate.toFormat('dd/MM/yyyy')
    dateArray.push({
      day: dateArray.length + 1,
      date,
      value
    })
    currentDate = currentDate.plus({ days: 1 })
  }
  return dateArray
}
