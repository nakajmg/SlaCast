const dateToTimeStamp = (date: Date): string => {
  return date.getTime() / 1000 + '.000000'
}

export default dateToTimeStamp
