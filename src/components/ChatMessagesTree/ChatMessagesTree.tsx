import * as React from 'react'
import './ChatMessagesTree.scss'
import { map } from 'lodash'
import ChatMessagesTreeNode from './ChatMessagesTreeNode'

const className = 'ChatMessagesTree'
function ChatMessagesTree({
  messagesTree,
  membersInfo,
  reactions,
  emojis,
}: any) {
  return (
    <div className={className}>
      {map(messagesTree, ({ message, _thread }: any) => (
        <ChatMessagesTreeNode
          message={message}
          _thread={_thread}
          reactions={reactions}
          key={message.ts}
          membersInfo={membersInfo}
          emojis={emojis}
        />
      ))}
    </div>
  )
}

export default ChatMessagesTree
