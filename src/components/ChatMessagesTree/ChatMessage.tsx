import * as React from 'react'
import './ChatMessage.scss'
import MI from 'markdown-it'
const mdit = MI({ html: true, breaks: true })
import tsToHHmmss from '../../modules/tsToHHmmss'
import messageReplacer from '../../modules/messageReplacer'

const _className = 'ChatMessage'
function ChatMessage({ message, membersInfo, className }: any) {
  const member = membersInfo[message.user]
  const messageText = messageReplacer({ message, membersInfo })
  return (
    <div className={`${_className} ${className}`}>
      <div className={`${_className}_Avatar`}>
        <img src={member.profile.image_192} />
      </div>
      <div className={`${_className}_Content`}>
        <div className={`${_className}_NameAndTS`}>
          <span className={`${_className}_Name`}>{member.name}</span>
          <span className={`${_className}_TS`}>{tsToHHmmss(message.ts)}</span>
        </div>
        <div
          className={`${_className}_Body`}
          dangerouslySetInnerHTML={{ __html: mdit.render(messageText) }}
        />
      </div>
    </div>
  )
}

export default ChatMessage
