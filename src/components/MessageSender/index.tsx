import * as React from 'react'
import './MessageSender.scss'
import store from '../../modules/Store'
import replaceMention from '../../modules/replaceMention'
import { observer } from 'mobx-react'
import { Picker, EmojiData } from 'emoji-mart'
import { observable } from 'mobx'
import 'emoji-mart/css/emoji-mart.css'

@observer
class MessageSender extends React.Component {
  private className: string = 'MessageSender'
  @observable showPicker: boolean = false
  isPressed: boolean = false
  textarea: HTMLElement | any
  constructor(props: any) {
    super(props)
    this.onSelectEmoji = this.onSelectEmoji.bind(this)
  }
  togglePicker() {
    this.showPicker = !this.showPicker
  }
  onKeyUp(e: any) {
    e.stopPropagation()
    if (e.key === 'Enter' && this.isPressed && !e.shiftKey) {
      if (e.target.value.trim() !== '') {
        const message = replaceMention(e.target.value, store.membersInfo)
        store.postMessage({ message })
        e.target.value = ''
      }
    }
    this.isPressed = false
  }
  onKeyPress(e: KeyboardEvent) {
    e.stopPropagation()
    if (e.key === 'Enter' && !e.shiftKey) e.preventDefault()
    this.isPressed = true
  }
  onSelectEmoji(emoji: EmojiData, e: React.MouseEvent<HTMLElement>) {
    const arr = this.textarea.value.split('')
    arr.splice(this.textarea.selectionStart, 0, emoji.colons)
    this.textarea.value = arr.join('')
    this.showPicker = false
    this.textarea.focus()
  }

  render() {
    return (
      <div
        className={`${this.className} ${store.preferences.theme}`}
        style={{ borderWidth: store.preferences.border ? '1px' : '0' }}
      >
        <textarea
          ref={el => (this.textarea = el)}
          className={`${this.className}_Input`}
          onKeyUp={(e: any) => this.onKeyUp(e)}
          onKeyPress={(e: any) => this.onKeyPress(e)}
        />
        <div
          className={`${this.className}_ShowPicker`}
          onClick={() => this.togglePicker()}
        >
          😄
        </div>
        {this.showPicker ? (
          <Picker
            set={'apple'}
            custom={JSON.parse(JSON.stringify(store.emojis.peek()))}
            onClick={this.onSelectEmoji}
          />
        ) : null}
      </div>
    )
  }
}

export default MessageSender
