import { BrowserWindow, shell, ipcMain } from 'electron'
const isDevelopment: boolean = process.env.NODE_ENV !== 'production'
import * as path from 'path'
import { format as formatURL } from 'url'
import events from '../modules/events'

function createClientWindow() {
  const window = new BrowserWindow({
    width: 300,
    height: 600,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    x: 0,
    y: 0,
  })

  if (isDevelopment) {
    // window.webContents.openDevTools()
  }

  if (isDevelopment) {
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`)
  } else {
    window.loadURL(
      formatURL({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true,
      }),
    )
  }

  window.webContents.on('devtools-opened', () => {
    window.focus()
    setImmediate(() => {
      window.focus()
    })
  })

  window.webContents.on('will-navigate', (e, url) => {
    if (/^http:\/\/localhost/.test(url)) return
    if (/^https:\/\/.*?slack.com\/oauth\//.test(url)) return
    if (
      /^https:\/\/us-central1-slack-user-status\.cloudfunctions.net\//.test(url)
    )
      return
    if (/^file:\/\//.test(url)) return
    e.preventDefault()
    shell.openExternal(url)
  })

  ipcMain.on(
    events.SET_ALWAYS_ON_TOP,
    (e: EventListenerObject, preferences: any) => {
      window.setAlwaysOnTop(preferences.alwaysOnTop)
    },
  )
  return window
}

export default createClientWindow
