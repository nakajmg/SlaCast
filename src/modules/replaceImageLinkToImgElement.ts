const regexImageLink = /<(https?:\/\/.*\.(png|jpg|gif))>/g
function imageLinkToImgElement({ messageText }: any): string {
  return messageText.replace(
    regexImageLink,
    (match: string, $1: string, $2: string) => {
      return `<img src='${$1}'/>\n`
    },
  )
}

export default imageLinkToImgElement
