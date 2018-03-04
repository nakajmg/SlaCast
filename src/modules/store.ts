import SlackWebClient from '../slack/Web'
import { observable, computed, IObservableArray } from 'mobx'
import { zipObject, map, filter, reduce, each } from 'lodash'
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
    this.initialized = true
    this.messages.push({
      channel: 'C9FLVQ03Z',
      source_team: 'T029ECUDJ',
      team: 'T029ECUDJ',
      text: 'hogehoge',
      ts: '1520147856.000039',
      type: 'message',
      user: 'U029ECUDL',
    })
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
