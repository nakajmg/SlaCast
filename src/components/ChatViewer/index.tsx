import * as React from 'react'
import './ChatViewer.scss'
import { Observer, inject } from 'mobx-react'
import { computed, observable } from 'mobx'
import { filter } from 'lodash'
import events from '../../modules/events'
import { PartialChannelResult, MessageEvent } from '@slack/client'
import ChannelList from './ChannelList'
import ChannelFilter from './ChannelFilter'
import ChannelName from './ChannelName'
import ChatMessagesTree from '../ChatMessagesTree/ChatMessagesTree'
import { ipcRenderer } from 'electron'
import util from 'util'

@inject('store')
class Viewer extends React.Component<any, any> {
  @observable channelsFilter: string = ''
  @observable channelListVisiblity: boolean = false
  className: string = 'ChatViewer'
  constructor(props: any) {
    super(props)
    this.handleOnClickChannel = this.handleOnClickChannel.bind(this)
    this.handleOnInputFilter = this.handleOnInputFilter.bind(this)
    this.toggleChannelListVisibility = this.toggleChannelListVisibility.bind(
      this,
    )
    this.handleOnKeyUp = this.handleOnKeyUp.bind(this)
    this.listen()
  }
  listen() {
    ipcRenderer.on(
      events.SLACK_MESSAGE,
      (e: EventListenerObject, message: MessageEvent) => {
        console.log(util.inspect(message))
        this.props.store.messages.push(message)
        // this.props.store.messages.splice(0, 0, message)
      },
    )
  }

  handleOnClickChannel(id: string) {
    this.props.store.currentChannel = id
    this.channelListVisiblity = false
  }
  handleOnInputFilter(e: React.FormEvent<HTMLInputElement>) {
    this.channelsFilter = e.currentTarget.value
  }
  handleOnKeyUp(e: KeyboardEvent) {
    if (e.key !== 'Escape') return
    this._resetChannelsFilter()
  }
  toggleChannelListVisibility() {
    this.channelListVisiblity = !this.channelListVisiblity
  }
  _resetChannelsFilter() {
    this.channelsFilter = ''
    this.channelListVisiblity = false
  }

  @computed
  get channels(): PartialChannelResult[] {
    if (this.channelsFilter === '') return this.props.store.channels
    return filter(
      this.props.store.channels,
      ({ name }: PartialChannelResult) => !!~name.indexOf(this.channelsFilter),
    )
  }
  render() {
    const store = this.props.store
    return (
      <Observer>
        {() => (
          <div className={this.className}>
            <ChannelName
              currentChannelName={store.currentChannelName}
              handleOnClick={this.toggleChannelListVisibility}
            />
            <div
              className={`${this.className}_ChannelList`}
              style={{
                display: !this.channelListVisiblity ? 'none' : '',
              }}
            >
              <ChannelFilter
                handleOnInputFilter={this.handleOnInputFilter}
                handleOnKeyUp={this.handleOnKeyUp}
                filterValue={this.channelsFilter}
              />
              <ChannelList
                channels={this.channels}
                handleOnClickChannel={this.handleOnClickChannel}
              />
            </div>
            <ChatMessagesTree
              messagesTree={store.messagesTree}
              membersInfo={store.membersInfo}
              channelsName={store.channelsName}
            />
          </div>
        )}
      </Observer>
    )
  }
}

export default Viewer
