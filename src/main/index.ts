import { app, BrowserWindow, ipcMain } from 'electron'
// import SlackRtmClient from '../slack/Rtm'
// import env from '../../.env.js'
// import { MessageEvent } from '@slack/client'
import storage from '../modules/storage'
import createClientWindow from './client'
import createSigninWindow from './signin'
import events from '../modules/events'

let clientWindow: BrowserWindow | null
let signinWindow: BrowserWindow | null

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// app.on('activate', () => {
//   if (clientWindow === null) {
//     clientWindow = createClientWindow()
//     clientWindow.on('closed', () => {
//       clientWindow = null
//     })
//   }
// })

app.on('ready', async () => {
  // await storage.clear() // for debug
  const token = await storage.get(storage.keys.CLIENT_TOKEN)
  console.log(token)
  if (token) {
    openClient()
  } else {
    openSignin()
  }
})

ipcMain.on(events.RECEIVE_SLACK_TOKEN, async (e: Event, query: any) => {
  await storage.set(storage.keys.CLIENT_TOKEN, query.token)
  if (signinWindow) signinWindow.close()
  openClient()
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

/*
const rtm = new SlackRtmClient(env.BOT_TOKEN)
rtm.on('message', (message: MessageEvent) => {
  if (!clientWindow) return
  clientWindow.webContents.send('slackmessage', message)
})
*/
