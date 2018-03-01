import * as React from 'react'
import './App.scss'
import { ipcRenderer } from 'electron'
import { MessageEvent } from '@slack/client'
import util from 'util'
import Root from '../container/Root'
import Test from '../container/Test'
import Signin from '../container/Signin'
import { Route, Switch } from 'react-router-dom'
import store from '../modules/Store'

ipcRenderer.on(
  'slackmessage',
  (e: EventListenerObject, message: MessageEvent) => {
    console.log(util.inspect(message))
    store.messages.push(message)
  },
)

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={Root} />
        <Route path="/signin" component={Signin} />
      </Switch>
    )
  }
}
export default App
