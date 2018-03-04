import * as React from 'react'
import './ChatMessagesTreeNode.scss'
import { map } from 'lodash'
import ChatMessage from './ChatMessage'
const className = 'ChatMessagesTreeNode'
function ChatMessagesTreeNode({ message, _thread, membersInfo }: any) {
  return (
    <div className={className}>
      <ChatMessage message={message} membersInfo={membersInfo} />
      <div className={`${className}_Thread`}>
        {map(_thread, (message: any) => (
          <ChatMessage
            className={`${className}_ThreadMessage`}
            message={message}
            key={message.ts}
            membersInfo={membersInfo}
          />
        ))}
      </div>
    </div>
  )
}

export default ChatMessagesTreeNode
