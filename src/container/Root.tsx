import * as React from 'react'
import store from '../modules/Store'
import storage from '../modules/storage'
import { Observer, Provider, observer, inject } from 'mobx-react'
import ChatViewer from '../components/ChatViewer/ChatViewer'
import { computed, observable } from 'mobx'
import { filter } from 'lodash'
import { PartialChannelResult } from '@slack/client'

declare global {
  interface Window {
    store: any
  }
}

@inject('store')
@observer
class Component extends React.Component<any, any> {
  @observable search: string = ''
  constructor(props: any) {
    super(props)
    this.handleOnClickChannel = this.handleOnClickChannel.bind(this)
    this.handleOnInputFilter = this.handleOnInputFilter.bind(this)
  }

  handleOnClickChannel(id: string) {
    this.props.store.currentChannel = id
  }
  handleOnInputFilter(e: React.FormEvent<HTMLInputElement>) {
    this.search = e.currentTarget.value
  }
  @computed
  get channels(): PartialChannelResult[] {
    if (this.search === '') return this.props.store.channels
    return filter(
      this.props.store.channels,
      ({ name }: PartialChannelResult) => !!~name.indexOf(this.search),
    )
  }
  render() {
    const store = this.props.store
    return (
      <Observer>
        {() => (
          <div>
            {!store.initialized ? (
              <div>...initializing</div>
            ) : (
              <ChatViewer
                channels={this.channels}
                currentChannelName={store.currentChannelName}
                handleOnClickChannel={this.handleOnClickChannel}
                handleOnInputFilter={this.handleOnInputFilter}
              />
            )}
          </div>
        )}
      </Observer>
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
