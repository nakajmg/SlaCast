import * as React from 'react'
import store from '../modules/Store'
import storage from '../modules/storage'
import { Observer, Provider } from 'mobx-react'
import ChatViewer from '../components/ChatViewer/index'

declare global {
  interface Window {
    store: any
  }
}

class Root extends React.Component {
  async componentDidMount() {
    const token: any = await storage.getClientToken()
    await store.initialize(token)
    window.store = store
  }
  render() {
    return (
      <Provider store={store}>
        <Observer>
          {() => (
            <div>
              {!store.initialized ? <div>...initializing</div> : <ChatViewer />}
            </div>
          )}
        </Observer>
      </Provider>
    )
  }
}

export default Root
