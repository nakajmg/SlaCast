import SlackWebClient from '../slack/Web'
import { observable, computed } from 'mobx'
import { zipObject, map } from 'lodash'
import { PartialChannelResult, FullUserResult } from '@slack/client'
import { IObservableArray } from 'mobx/lib/types/observablearray'
// import storage from './storage'

interface INameMap {
  [key: string]: string
}

class Store {
  webClient: SlackWebClient
  @observable messages: IObservableArray<MessageEvent> = observable([])
  @observable members: IObservableArray<FullUserResult> = observable([])
  @observable channels: IObservableArray<PartialChannelResult> = observable([])
  @observable subscribedChannels: IObservableArray<Object> = observable([])

  constructor(public token: string) {
    this.token = token
    this.webClient = new SlackWebClient(this.token)
  }

  async initialize() {
    return Promise.all([
      this.channels.replace(await this.webClient._fetchChannels()),
      this.members.replace(await this.webClient._fetchMembers()),
    ])
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

export default Store
