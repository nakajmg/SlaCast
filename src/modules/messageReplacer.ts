import replaceFileImageToImgElement from './replaceFileImageToImgElement'
import replaceUserIdToUserName from './replaceUserIdToUserName'
import replaceImageLinkToImgElement from './replaceImageLinkToImgElement'

function messageReplacer({ message, membersInfo }: any): string {
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
  return messageText
}

export default messageReplacer
