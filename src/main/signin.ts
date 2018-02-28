import { BrowserWindow } from 'electron'
const isDevelopment: boolean = process.env.NODE_ENV !== 'production'
import * as path from 'path'
import { format as formatURL } from 'url'

const createSigninWindow = () => {
  const window = new BrowserWindow({
    width: 580,
    height: 640,
  })

  if (isDevelopment) {
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}/signin`)
  } else {
    window.loadURL(
      formatURL({
        pathname: path.join(__dirname, '/signin/index.html'),
        protocol: 'file',
        slashes: true,
      }),
    )
  }

  return window
}

export default createSigninWindow
