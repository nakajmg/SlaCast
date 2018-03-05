import * as React from 'react'
import './ChatMessage.scss'
import MI from 'markdown-it'
const mdit = MI({ html: true, breaks: true })
import tsToHHmmss from '../../modules/tsToHHmmss'
import messageReplacer from '../../modules/messageReplacer'
import { ReactionEvent } from '@slack/client'
import { emojify } from 'node-emoji'
const _className = 'ChatMessage'

function ChatMessage({
  message,
  membersInfo,
  className,
  reactions,
  emojis,
}: any) {
  const member = membersInfo[message.user]
  const messageText = messageReplacer({ message, membersInfo, emojis })

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
          dangerouslySetInnerHTML={{
            __html: mdit.render(messageText),
          }}
        />
        <div className={`${_className}_Reactions`}>
          {reactions
            .filter(
              (reaction: ReactionEvent) => reaction.item.ts === message.ts,
            )
            .map((reaction: ReactionEvent) => {
              const customEmoji = emojis.find(
                ({ name, imageUrl }: { name: string; imageUrl: string }) => {
                  return name === reaction.reaction
                },
              )
              return customEmoji ? (
                <div
                  className={`${_className}_CustomReaction`}
                  key={reaction.event_ts}
                  title={membersInfo[reaction.user].name}
                >
                  <img src={`${customEmoji.imageUrl}`} width="20" />
                </div>
              ) : (
                <div
                  className={`${_className}_Reaction`}
                  key={reaction.event_ts}
                  title={membersInfo[reaction.user].name}
                >
                  {emojify(`:${reaction.reaction}:`)}
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default ChatMessage
