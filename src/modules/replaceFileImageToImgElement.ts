function replaceFileImageToImgElement(message: any): string | any {
  if (message.subtype && message.file) {
    if (/(png|jpg|jpeg|gif)/.test(message.file.filetype)) {
      return `<img src='${message.file.thumb_360}'/>`
    }
  }
  return
}

export default replaceFileImageToImgElement
