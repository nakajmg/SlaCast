// new Date(+"1358546515.000008".split('.')[0] * 1000)
// new Date().getTime() / 1000 + '.000000'
import {toNumber} from 'lodash'
const parseTimeStamp = (timestamp: string): number => {
  const [ts] = timestamp.split('.')
  return toNumber(ts) * 1000
}

export default parseTimeStamp
