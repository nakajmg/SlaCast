import {
  RtmClient,
  CLIENT_EVENTS,
  RTM_EVENTS,
  RtmStartResult,
} from '@slack/client'
import * as EventEmitter from 'events'

class SlackRtmClient extends EventEmitter {
  client: any
  constructor(public token: string) {
    super()
    if (!token) throw new Error('Required bot token')
    this.token = token
    this._initialize()
  }

  _initialize() {
    this.client = new RtmClient(this.token)
    this._start()
  }

  _start() {
    this.client.start()
    this.client.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (data: RtmStartResult) => {
      console.log('authenticated')
      return data
      // console.log(data.channels)
      // console.log(data.users)
    })
    this.client.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, () => {
      console.log('ready')
    })
    this.describeChannel()
  }

  stop() {
    return this.client.disconnect()
  }

  describeChannel() {
    this.client.on(RTM_EVENTS.MESSAGE, (message: MessageEvent) => {
      console.log(message)
      this.emit(RTM_EVENTS.MESSAGE, message)
    })
    this.client.on(RTM_EVENTS.REACTION_ADDED, (message: MessageEvent) => {
      console.log(message)
      this.emit(RTM_EVENTS.REACTION_ADDED, message)
    })
    this.client.on(RTM_EVENTS.REACTION_REMOVED, (message: MessageEvent) => {
      console.log(message)
      this.emit(RTM_EVENTS.REACTION_REMOVED, message)
    })
  }
}

export default SlackRtmClient
