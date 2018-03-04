import * as React from 'react'
import { map } from 'lodash'
import ChatMessagesTreeNode from './ChatMessagesTreeNode'

const className = 'ChatMessagesTree'
function ChatMessagesTree({ messagesTree, membersInfo }: any) {
  return (
    <div className={className}>
      {map(messagesTree, ({ message, _thread }: any) => (
        <ChatMessagesTreeNode
          message={message}
          _thread={_thread}
          key={message.ts}
          membersInfo={membersInfo}
        />
      ))}
    </div>
  )
}

export default ChatMessagesTree
