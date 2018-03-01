import * as React from 'react'
import store from '../modules/Store'
import storage from '../modules/storage'
import { Observer, Provider, observer, inject } from 'mobx-react'

declare global {
  interface Window {
    store: any
  }
}

@inject('store')
@observer
class Component extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    console.log(this.props)
  }
  render() {
    return (
      <div>
        <Observer>
          {() => (
            <div>
              <div>{this.props.store.initialized ? '' : '...initializing'}</div>
              {Object.keys(this.props.store.membersName).map((id: string) => (
                <div key={id}>
                  {this.props.store.membersName[id]} ({id})
                </div>
              ))}
            </div>
          )}
        </Observer>
      </div>
    )
  }
}

class Root extends React.Component {
  async componentDidMount() {
    const token: any = await storage.getClientToken()
    await store.initialize(token)
    window.store = store
    console.log(store)
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
