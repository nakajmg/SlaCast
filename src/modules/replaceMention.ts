import { findKey } from 'lodash'

function replaceMention(message: string, membersInfo: any) {
  return message.replace(/\B\@([\w\-]+)/g, (match: string, $1: string) => {
    const id = findKey(membersInfo, ({ name }: any) => {
      return name === $1
    })
    if (id) {
      return `<@${id}>`
    }
    return match
  })
}

export default replaceMention
