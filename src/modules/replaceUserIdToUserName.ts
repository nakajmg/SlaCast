const regexMention = /<@([A-Za-z0-9]+)>/g
function replaceUserIdToUserName({ messageText, membersInfo }: any): string {
  return messageText.replace(
    regexMention,
    (match: string, $1: string, $2: string) => {
      return `@${membersInfo[$1].name}`
    },
  )
}

export default replaceUserIdToUserName
