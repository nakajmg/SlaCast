import { BrowserWindow } from 'electron'
const isDevelopment: boolean = process.env.NODE_ENV !== 'production'
import * as path from 'path'
import { format as formatURL } from 'url'

function createClientWindow() {
  const window = new BrowserWindow({
    width: 640,
    height: 480,
    // frame: false,
    // transparent: true,
    alwaysOnTop: true,
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

  return window
}

export default createClientWindow
