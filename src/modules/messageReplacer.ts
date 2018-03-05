import replaceFileImageToImgElement from './replaceFileImageToImgElement'
import replaceUserIdToUserName from './replaceUserIdToUserName'
import replaceImageLinkToImgElement from './replaceImageLinkToImgElement'
import { emojify } from 'node-emoji'

function messageReplacer({ message, membersInfo, emojis }: any): any {
  let replacedMessage = replaceFileImageToImgElement(message)
  if (replacedMessage) return replacedMessage
  let messageText = message.text
  messageText = replaceUserIdToUserName({
    messageText,
    membersInfo,
  })
  messageText = replaceImageLinkToImgElement({
    messageText,
  })
  messageText = emojify(messageText)

  const emojiRegex = /:([0-9a-z]+):/g
  messageText = messageText.replace(emojiRegex, (match: string, $1: string) => {
    const customEmoji = emojis.find(({ name }: { name: string }) => {
      return name === $1
    })
    if (customEmoji) {
      return `<span><img src='${
        customEmoji.imageUrl
      }' style='height: 1.4em;width: auto;margin: 0 0.1em;'/></span>`
    }
    return match
  })

  return messageText
}

export default messageReplacer
