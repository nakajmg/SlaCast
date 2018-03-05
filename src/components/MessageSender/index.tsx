import * as React from 'react'
import './MessageSender.scss'
import { ipcRenderer } from 'electron'
import { Provider } from 'mobx-react'
import store from '../../modules/Store'

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
      <div className={this.className}>
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
