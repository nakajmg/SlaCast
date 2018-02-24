import { app, BrowserWindow } from 'electron'
import * as path from 'path'
import { format as formatURL } from 'url'

const isDevelopment: boolean = process.env.NODE_ENV !== 'production'

let mainWindow: BrowserWindow | null

function createMainWindow() {
  const window = new BrowserWindow({
    width: 640,
    height: 480,
    frame: false,
    transparent: true,
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

  window.on('closed', () => {
    mainWindow = null
  })

  window.webContents.on('devtools-opened', () => {
    window.focus()
    setImmediate(() => {
      window.focus()
    })
  })

  return window
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    mainWindow = createMainWindow()
  }
})

app.on('ready', () => {
  mainWindow = createMainWindow()
})
