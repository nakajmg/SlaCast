import * as React from 'react'
import './Preferences.scss'
import store from '../../modules/Store'
import { ipcRenderer } from 'electron'
import events from '../../modules/events'

const className = 'Preferences'
class Preferences extends React.Component {
  changeTheme(theme: string) {
    store.preferences = { ...store.preferences, theme }
  }

  incrementOpacity() {
    const backgroundOpacity = store.preferences.backgroundOpacity * 10 + 1
    if (backgroundOpacity > 10) return
    store.preferences = {
      ...store.preferences,
      backgroundOpacity: Math.round(backgroundOpacity * 10) / 100,
    }
  }
  decrementOpacity() {
    const backgroundOpacity = store.preferences.backgroundOpacity * 10 - 1
    if (backgroundOpacity < 0) return
    store.preferences = {
      ...store.preferences,
      backgroundOpacity: Math.round(backgroundOpacity * 10) / 100,
    }
  }
  onChangeBorder() {
    store.preferences = {
      ...store.preferences,
      border: !store.preferences.border,
    }
  }
  onChangeAlwaysOnTop() {
    store.preferences = {
      ...store.preferences,
      alwaysOnTop: !store.preferences.alwaysOnTop,
    }
  }
  signOut() {
    ipcRenderer.send(events.SLACK_SIGN_OUT)
  }
  render() {
    const preferences = store.preferences
    return (
      <div className={`${className} ${preferences.theme}`}>
        <div className={`${className}_Heading`}>Preferences</div>
        <div className={`${className}_Item`}>
          <div className={`${className}_Label`}>Theme</div>
          <label>
            <input
              type="radio"
              value="Dark"
              checked={preferences.theme === 'Dark'}
              onChange={() => this.changeTheme('Dark')}
            />
            Dark
          </label>
          <label>
            <input
              type="radio"
              value="Light"
              checked={preferences.theme === 'Light'}
              onChange={() => this.changeTheme('Light')}
            />
            Light
          </label>
        </div>
        <div className={`${className}_Item`}>
          <div className={`${className}_Label`}>BackgroundOpacity</div>
          <button onClick={() => this.decrementOpacity()}>-</button>
          <div className={`${className}_Input`}>
            {preferences.backgroundOpacity}
          </div>
          <button onClick={() => this.incrementOpacity()}>+</button>
        </div>
        <div className={`${className}_Item`}>
          <div className={`${className}_Label`}>Window always on top</div>
          <input
            type="checkbox"
            checked={preferences.alwaysOnTop}
            onChange={this.onChangeAlwaysOnTop}
          />
        </div>
        <div className={`${className}_Item`}>
          <div className={`${className}_Label`}>Show Border</div>
          <input
            type="checkbox"
            checked={preferences.border}
            onChange={this.onChangeBorder}
          />
        </div>
        <div className={`${className}_Item`}>
          <div className={`${className}_Label`}>Sign out</div>
          <button onClick={this.signOut}>Sign out</button>
        </div>
      </div>
    )
  }
}
export default Preferences
