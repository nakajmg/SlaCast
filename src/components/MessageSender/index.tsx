import * as React from 'react'
import './MessageSender.scss'
import store from '../../modules/Store'
import { observer } from 'mobx-react'

@observer
class MessageSender extends React.Component {
  constructor(props: any) {
    super(props)
  }
  private className: string = 'MessageSender'
  isPressed: boolean = false
  onKeyUp(e: any) {
    if (e.key === 'Enter' && this.isPressed && !e.shiftKey) {
      store.postMessage({ message: e.target.value })
      e.preventDefault()
      e.target.value = ''
    }
    this.isPressed = false
  }
  onKeyPress(e: KeyboardEvent) {
    this.isPressed = true
  }
  render() {
    return (
      <div
        className={`${this.className} ${store.preferences.theme}`}
        style={{ borderWidth: store.preferences.border ? '1px' : '0' }}
      >
        <textarea
          className={`${this.className}_Input`}
          onKeyUp={(e: any) => this.onKeyUp(e)}
          onKeyPress={(e: any) => this.onKeyPress(e)}
        />
      </div>
    )
  }
}

export default MessageSender
