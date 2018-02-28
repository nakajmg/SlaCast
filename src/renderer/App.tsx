import * as React from 'react'
import './App.scss'
import { observable, IObservableArray } from 'mobx'
import { observer } from 'mobx-react'
import { ipcRenderer } from 'electron'
import { MessageEvent } from '@slack/client'
import util from 'util'
const messages: IObservableArray<MessageEvent> = observable([])

ipcRenderer.on(
  'slackmessage',
  (e: EventListenerObject, message: MessageEvent) => {
    console.log(util.inspect(message))
    messages.push(message)
  },
)
// let web: any

// function Message(props: any) {
//   return (
//     <div>
//       <h4>
//         #{web.channels[props.channel]}({props.channel})
//       </h4>
//       <div>
//         {web.members[props.user]}({props.user}): {props.text}
//       </div>
//     </div>
//   )
// }

function MessageItem({ text, ts, channel, user, message }: MessageEvent) {
  return (
    <div key={ts}>
      #{channel}, {user}, {text}
    </div>
  )
}

@observer
class App extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        ready{messages.map((message: MessageEvent) => MessageItem(message))}
      </div>
    )
  }
}

export default App
