import * as React from 'react'
import { ipcRenderer } from 'electron'
import qs from 'query-string'
import events from '../modules/events'

class Signin extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      auth_url: 'https://slack.com/oauth/authorize',
      redirect_uri:
        'https://us-central1-slack-user-status.cloudfunctions.net/slacommesignin',
      this_url: encodeURIComponent(window.location.href),
    }
  }
  componentWillMount() {
    const [, locationSearch] = window.location.href.split('?')
    const query = qs.parse(locationSearch)
    if (query.token) {
      ipcRenderer.send(events.RECEIVE_SLACK_TOKEN, query)
    }
  }
  href() {
    return `${
      this.state.auth_url
    }?scope=client&client_id=2320436460.319793460160&redirect_uri=${
      this.state.redirect_uri
    }&state=${this.state.this_url}`
  }

  render() {
    return (
      <div
        style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <a id="signin" href={this.href()}>
          <img
            alt="Slack でサインインする"
            height="40"
            width="172"
            src="https://platform.slack-edge.com/img/sign_in_with_slack@2x.png"
          />
        </a>
      </div>
    )
  }
}

export default Signin
