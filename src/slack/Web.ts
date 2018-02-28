import { WebClient, WebApiResultAny } from '@slack/client'

interface Emoji {
  key: string
  url: string
}

class SlackWebClient {
  client: WebClient
  constructor(public token: string) {
    if (!token) throw new Error('Required user token')
    this.token = token
    this.client = new WebClient(this.token)
  }

  async _fetchEmojiList() {
    const res: WebApiResultAny = await this.client.emoji.list()
    if (!res.ok) return []
    return Object.keys(res.emoji).map((key: string): Emoji => {
      const url = res.emoji[key]
      return { key, url }
    })
  }

  async _fetchChannels() {
    const res: WebApiResultAny = await this.client.channels.list()
    if (!res.ok) return []
    return res.channels
  }

  async _fetchMembers() {
    const res: WebApiResultAny = await this.client.users.list()
    if (!res.ok) return []
    return res.members
  }
}

export default SlackWebClient
