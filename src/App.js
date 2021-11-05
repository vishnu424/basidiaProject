import {Route, Switch} from 'react-router-dom'

import AddUser from './components/AddUser'
import Users from './components/Users'
import Weather from './components/Weather'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/add-user" component={AddUser} />
    <Route exact path="/users" component={Users} />
    <Route exact path="/weather" component={Weather} />
  </Switch>
)

export default App
