import parseTimeStamp from './parseTimeStamp'
import { parse, format } from 'date-fns'

function tsToHHmmss(ts: string): string {
  return format(parse(parseTimeStamp(ts)), 'HH:mm:ss')
}

export default tsToHHmmss
