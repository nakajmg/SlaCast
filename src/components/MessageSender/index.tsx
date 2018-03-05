import * as React from 'react'
import './MessageSender.scss'

class MessageSender extends React.Component {
  private className: string = 'MessageSender'
  render() {
    return (
      <div className={this.className}>
        <textarea className={`${this.className}_Input`} />
      </div>
    )
  }
}

export default MessageSender
