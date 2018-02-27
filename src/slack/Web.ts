import { WebClient, WebApiResultAny } from '@slack/client'

interface Emoji {
  key: string
  url: string
}

class SlackWebClient {
  client: any
  emojiList: Emoji[]
  constructor(public token: string) {
    if (!token) throw new Error('Required user token')
    this.emojiList = []
    this.token = token
    this._initialize()
  }

  _initialize() {
    this.client = new WebClient(this.token)
  }

  async _fetchEmojiList() {
    const res: WebApiResultAny = await this.client.emoji.list()
    if (!res.ok) return
    this.emojiList = Object.keys(res.emoji).map((key: string): Emoji => {
      const url = res.emoji[key]
      return { key, url }
    })
  }
}

export default SlackWebClient
