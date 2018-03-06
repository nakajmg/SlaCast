import { app, BrowserWindow, ipcMain } from 'electron'
import SlackRtmClient from '../slack/Rtm'
import SlackWebClient from '../slack/Web'
import { MessageEvent, ReactionEvent } from '@slack/client'
import storage from '../modules/storage'
import createClientWindow from './client'
import createSigninWindow from './signin'
import events from '../modules/events'
import { RTM_EVENTS } from '@slack/client'

let clientWindow: BrowserWindow | null
let signinWindow: BrowserWindow | null
let rtm: any

app.on('window-all-closed', () => {
  app.quit()
})

app.on('ready', async () => {
  // await storage.clear() // for debug
  const token: any = await storage.get(storage.keys.CLIENT_TOKEN)
  if (token) {
    const web = new SlackWebClient(token)
    const ok = await web.authTest()
    if (ok) {
      openClient()
      connectRtm(token)
      return
    }
  }

  openSignin()
  ipcMain.on(events.RECEIVE_SLACK_TOKEN, async (e: Event, query: any) => {
    await storage.set(storage.keys.CLIENT_TOKEN, query.token)
    if (signinWindow) signinWindow.close()
    openClient()
    connectRtm(query.token)
  })
})

const defaultPreferences = {
  theme: 'Dark',
  alwaysOnTop: true,
  backgroundOpacity: 0.1,
  border: true,
  currentChannel: '',
}

async function openClient() {
  const preferences = await storage.get(storage.keys.PREFERENCES)
  if (!preferences) {
    await storage.set(storage.keys.PREFERENCES, defaultPreferences)
  }
  if (clientWindow) return
  clientWindow = createClientWindow()
  clientWindow.on('closed', () => {
    clientWindow = null
  })

  ipcMain.on(events.SLACK_SIGN_OUT, async () => {
    const token: any = await storage.get(storage.keys.CLIENT_TOKEN)
    const web = new SlackWebClient(token)
    const ok = await web.authTest()
    if (ok) {
      await rtm.stop()
      await web.revokeToken()
    }
    await storage.clear()
    if (clientWindow) {
      clientWindow.webContents.session.clearStorageData({}, () => {
        if (clientWindow) clientWindow.close()
      })
    }
  })
}

function openSignin() {
  if (signinWindow) return
  signinWindow = createSigninWindow()
  signinWindow.on('closed', () => {
    signinWindow = null
  })
}

function connectRtm(token: string) {
  if (rtm) return
  rtm = new SlackRtmClient(token)
  rtm.on(RTM_EVENTS.MESSAGE, (message: MessageEvent) => {
    if (!clientWindow) return
    clientWindow.webContents.send(events.SLACK_MESSAGE, message)
  })
  rtm.on(RTM_EVENTS.REACTION_ADDED, (reaction: ReactionEvent) => {
    if (!clientWindow) return
    clientWindow.webContents.send(events.SLACK_REACTION_ADDED, reaction)
  })
  rtm.on(RTM_EVENTS.REACTION_REMOVED, (reaction: ReactionEvent) => {
    if (!clientWindow) return
    clientWindow.webContents.send(events.SLACK_REACTION_REMOVED, reaction)
  })
}
