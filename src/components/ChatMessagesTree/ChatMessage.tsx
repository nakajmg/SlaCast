import * as React from 'react'
import './ChatMessage.scss'
import parseTimeStamp from '../../modules/parseTimeStamp'
import { parse, format } from 'date-fns'
const _className = 'ChatMessage'

function tsToTime(ts: string) {
  return format(parse(parseTimeStamp(ts)), 'HH:mm:ss')
}

function ChatMessage({ message, membersInfo, className }: any) {
  const member = membersInfo[message.user]
  return (
    <div className={`${_className} ${className}`}>
      <div className={`${_className}_Avatar`}>
        <img src={member.profile.image_192} />
      </div>
      <div>
        <div className={`${_className}_NameAndTS`}>
          <span className={`${_className}_Name`}>{member.name}</span>
          <span className={`${_className}_TS`}>{tsToTime(message.ts)}</span>
        </div>
        <div className={`${_className}_Body`}>{message.text}</div>
      </div>
    </div>
  )
}

export default ChatMessage
