import SlackWebClient from '../slack/Web'
import { observable, computed, IObservableArray } from 'mobx'
import { zipObject, map } from 'lodash'
import {
  PartialChannelResult,
  FullUserResult,
  MessageEvent,
} from '@slack/client'
// import storage from './storage'

interface INameMap {
  [key: string]: string
}

class Store {
  @observable initialized: boolean = false
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
  get membersName(): INameMap {
    return zipObject(
      map(this.members, ({ id }) => id),
      map(this.members, ({ name }) => name),
    )
  }
}

export default new Store()
