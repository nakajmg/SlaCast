import * as React from 'react'
import './App.scss'
import { observable, IObservableArray } from 'mobx'
import { observer } from 'mobx-react'
import { ipcRenderer } from 'electron'
import { MessageEvent } from '@slack/client'
// const env = require('../../.env.js')
// const { WebClient } = require('@slack/client')
interface IMessage {
  text: string
  ts: string
}
const messages: IObservableArray<IMessage> = observable([])

ipcRenderer.on('slackmessage', (e: EventListenerObject, message: MessageEvent) => {
  messages.push(message)
})
/*
const web = new WebClient(env.TOKEN)

web.channels
  .history(env.CHANNEL_ID, {
    oldest: '1519539000.000000',
  })
  .then(({ messages: [] }) => {
    messages.forEach((message: IMessage) => messages.push(message))
    console.log(messages)
    // web.chat.postMessage(env.CHANNEL_ID, 'テストだよ')
  })

  .catch(console.error)
*/

function MessageItem({ text, ts }: IMessage) {
  return <div key={ts}>{text}</div>
}

@observer
class App extends React.Component<{}, {}> {
  render() {
    return <div>{messages.map((message: IMessage) => MessageItem(message))}</div>
  }
}

export default App
