import * as React from 'react'
import './ChatViewer.scss'
import { Observer, inject } from 'mobx-react'
import { computed, observable, reaction } from 'mobx'
import { filter } from 'lodash'
import events from '../../modules/events'
import {
  PartialChannelResult,
  MessageEvent,
  ReactionEvent,
} from '@slack/client'
import ChannelList from './ChannelList'
import ChannelFilter from './ChannelFilter'
import ChannelName from './ChannelName'
import ThemeSwitcher from './ThemeSwitcher'
import ChatMessagesTree from '../ChatMessagesTree/ChatMessagesTree'
import MessageSender from '../MessageSender/index'
import { ipcRenderer } from 'electron'

@inject('store')
class Viewer extends React.Component<any, any> {
  @observable channelsFilter: string = ''
  @observable channelListVisiblity: boolean = false
  className: string = 'ChatViewer'
  constructor(props: any, private messagesTree: HTMLElement) {
    super(props)
    this.handleOnClickChannel = this.handleOnClickChannel.bind(this)
    this.handleOnInputFilter = this.handleOnInputFilter.bind(this)
    this.toggleChannelListVisibility = this.toggleChannelListVisibility.bind(
      this,
    )
    this.handleOnKeyUp = this.handleOnKeyUp.bind(this)
    this.toggleTheme = this.toggleTheme.bind(this)
    this.listen()
    reaction(
      () => this.props.store.channelMessages.length,
      (data, reaction) => {
        const messages = this.messagesTree.querySelector('div')
        if (messages) {
          this.messagesTree.scrollTop = messages.offsetHeight
        }
      },
      {
        delay: 100,
      },
    )
  }
  listen() {
    ipcRenderer.on(
      events.SLACK_MESSAGE,
      (e: EventListenerObject, message: MessageEvent) => {
        const store = this.props.store
        if (message.subtype) {
          switch (message.subtype) {
            case 'message_deleted':
              return store.deleteMessage(message.previous_message)
            case 'message_changed':
              return store.updateMessage(
                message.previous_message,
                message.message,
              )
          }
        }
        this.props.store.messages.push(message)
      },
    )
    ipcRenderer.on(
      events.SLACK_REACTION_ADDED,
      (e: EventListenerObject, reaction: ReactionEvent) => {
        const store = this.props.store
        if (reaction.reaction.indexOf('::') !== -1) {
          let [_reaction] = reaction.reaction.split('')
          store.reactions.push({ ...reaction, reaction: _reaction })
          return
        }
        store.reactions.push(reaction)
      },
    )
    ipcRenderer.on(
      events.SLACK_REACTION_REMOVED,
      (e: EventListenerObject, reaction: ReactionEvent) => {
        this.props.store.removeReaction(reaction)
      },
    )
  }

  handleOnClickChannel(id: string) {
    this.props.store.updateCurrentChannel({ id })
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
  toggleTheme() {
    const theme =
      this.props.store.preferences.theme === 'Light' ? 'Dark' : 'Light'
    this.props.store.preferences = {
      ...this.props.store.preferences,
      theme,
    }
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
            <div className={`${this.className}_Header`}>
              <ThemeSwitcher
                theme={store.preferences.theme}
                handleToggleTheme={this.toggleTheme}
              />
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
            </div>
            <div
              className={`${this.className}_Chat`}
              ref={(el: any) => (this.messagesTree = el)}
            >
              <ChatMessagesTree
                messagesTree={store.messagesTree}
                membersInfo={store.membersInfo}
                channelsName={store.channelsName}
                reactions={store.reactions}
                emojis={store.emojis}
              />
            </div>
            <div className={`${this.className}_Sender`}>
              <MessageSender />
            </div>
          </div>
        )}
      </Observer>
    )
  }
}

export default Viewer
