import { app, BrowserWindow, ipcMain } from 'electron'
import SlackRtmClient from '../slack/Rtm'
// import env from '../../.env.js'
import { MessageEvent } from '@slack/client'
import storage from '../modules/storage'
import createClientWindow from './client'
import createSigninWindow from './signin'
import events from '../modules/events'
import { RTM_EVENTS } from '@slack/client'

let clientWindow: BrowserWindow | null
let signinWindow: BrowserWindow | null
let rtm: any

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('ready', async () => {
  // await storage.clear() // for debug
  const token: any = await storage.get(storage.keys.CLIENT_TOKEN)
  console.log(token)
  if (token) {
    openClient()
    connectRtm(token)
  } else {
    openSignin()
  }
})

ipcMain.on(events.RECEIVE_SLACK_TOKEN, async (e: Event, query: any) => {
  await storage.set(storage.keys.CLIENT_TOKEN, query.token)
  if (signinWindow) signinWindow.close()
  openClient()
  connectRtm(query.token)
})

function openClient() {
  if (clientWindow) return
  clientWindow = createClientWindow()
  clientWindow.on('closed', () => {
    clientWindow = null
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
}
