import SlackWebClient from '../slack/Web'
import { observable, computed, IObservableArray, action } from 'mobx'
import { zipObject, map, filter, reduce, each, findIndex } from 'lodash'
import {
  PartialChannelResult,
  FullUserResult,
  MessageEvent,
} from '@slack/client'

interface INameMap {
  [key: string]: string
}

class Store {
  @observable initialized: boolean = false
  @observable currentChannel: string = 'C9FLVQ03Z'
  webClient: SlackWebClient | any
  @observable messages: IObservableArray<MessageEvent> = observable([])
  @observable members: IObservableArray<FullUserResult> = observable([])
  @observable channels: IObservableArray<PartialChannelResult> = observable([])
  @observable subscribedChannels: IObservableArray<Object> = observable([])

  async initialize(token: string) {
    this.webClient = new SlackWebClient(token)
    await Promise.all([
      this.channels.replace(await this.webClient._fetchChannels()),
      this.members.replace(await this.webClient._fetchMembers()),
    ])
    require('./_mock.js').forEach((message: any) => this.messages.push(message))
    this.initialized = true
  }

  @action.bound
  deleteMessage(message: MessageEvent) {
    const index = findIndex(this.messages, ({ ts }) => ts === message.ts)
    if (index) {
      this.messages.splice(index, 1)
    }
  }
  @action.bound
  updateMessage(message: MessageEvent, newMessage: MessageEvent) {
    const index = findIndex(this.messages, ({ ts }) => ts === message.ts)
    debugger
    if (index) {
      this.messages.splice(index, 1, { ...this.messages[6], ...newMessage })
    }
  }

  // storageから設定を復元
  async restoreFromStorage() {}

  // storageに設定を保存
  async saveToStorage() {}

  @computed
  get channelsName(): INameMap {
    return zipObject(
      map(this.channels, ({ id }) => id),
      map(this.channels, ({ name }) => name),
    )
  }

  @computed
  get currentChannelName(): string {
    return this.channelsName[this.currentChannel]
  }

  @computed
  get membersName(): INameMap {
    return zipObject(
      map(this.members, ({ id }) => id),
      map(this.members, ({ name }) => name),
    )
  }

  @computed
  get membersInfo() {
    return zipObject(map(this.members, ({ id }) => id), this.members)
  }

  @computed
  get channelMessages(): MessageEvent[] {
    return filter(
      this.messages,
      ({ channel }) => channel === this.currentChannel,
    )
  }
  @computed
  get messagesTree() {
    const messages = filter(this.channelMessages, message => {
      return !(
        message.thread_ts ||
        message.subtype === 'message_replied' ||
        message.hidden
      )
    })
    const replieMessages = filter(
      this.channelMessages,
      ({ thread_ts }) => thread_ts,
    )
    const messagesTree = reduce(
      messages,
      (ret: any, message: MessageEvent): any => {
        ret[message.ts] = { message, _thread: [] }
        return ret
      },
      {},
    )
    each(replieMessages, message => {
      if (message.thread_ts && messagesTree[message.thread_ts]) {
        messagesTree[message.thread_ts]._thread.push(message)
      }
    })
    return messagesTree
  }
}

export default new Store()
