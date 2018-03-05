import * as React from 'react'
import './ChatMessagesTreeNode.scss'
import { map } from 'lodash'
import ChatMessage from './ChatMessage'
const className = 'ChatMessagesTreeNode'
function ChatMessagesTreeNode({
  message,
  _thread,
  membersInfo,
  reactions,
  emojis,
}: any) {
  return (
    <div className={className}>
      <ChatMessage
        message={message}
        membersInfo={membersInfo}
        reactions={reactions}
        emojis={emojis}
      />
      <div className={`${className}_Thread`}>
        {map(_thread, (message: any) => (
          <ChatMessage
            className={`${className}_ThreadMessage`}
            message={message}
            key={`${message.ts}`}
            membersInfo={membersInfo}
            reactions={reactions}
            emojis={emojis}
          />
        ))}
      </div>
    </div>
  )
}

export default ChatMessagesTreeNode
