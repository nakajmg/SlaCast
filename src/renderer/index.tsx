import * as React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { HashRouter } from 'react-router-dom'

ReactDOM.render(
  <HashRouter basename="/" hashType="hashbang">
    <App />
  </HashRouter>,
  document.querySelector('#app'),
)
