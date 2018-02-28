import * as React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Store from '../modules/Store'
import storage from '../modules/storage'

declare global {
  interface Window {
    store: Store
  }
}
;(async () => {
  const token: any = await storage.getClientToken()
  const store = new Store(token)
  await store.initialize()
  window.store = store
  ReactDOM.render(<App />, document.querySelector('#app'))
})()
