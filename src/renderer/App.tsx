import * as React from 'react'
import './App.scss'
import Root from '../container/Root'
import Signin from '../container/Signin'
import { Route, Switch } from 'react-router-dom'

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={Root} />
        <Route path="/signin" component={Signin} />
      </Switch>
    )
  }
}
export default App
