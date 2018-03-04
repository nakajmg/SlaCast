import * as React from 'react'
import store from '../modules/Store'
import storage from '../modules/storage'
import { Observer, Provider, observer, inject } from 'mobx-react'
import ChatViewer from '../components/ChatViewer/index'

@inject('store')
@observer
class Component extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
  }
  render() {
    const store = this.props.store
    return (
      <Observer>
        {() => (
          <div>
            {!store.initialized ? <div>...initializing</div> : <ChatViewer />}
          </div>
        )}
      </Observer>
    )
  }
}

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
        <Component />
      </Provider>
    )
  }
}

export default Root
