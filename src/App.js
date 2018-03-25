import React, { Component } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, withRouter } from 'react-router-dom'
import { Redirect } from 'react-router'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import promiseMiddleware from 'redux-promise-middleware'

import ReduxBlockUi from 'react-block-ui/redux'
import reduxMiddleware from 'react-block-ui/reduxMiddleware';
import 'react-block-ui/style.css'
import CircularProgress from 'material-ui/CircularProgress'

import rootReducer from './reducers'

import ContactList from './components/ContactList'
import ContactForm from './components/ContactForm'
import Login from './components/Login'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import './App.css'

import RaisedButton from 'material-ui/RaisedButton'
import AppBar from 'material-ui/AppBar'

import axios from 'axios'


const loggerMiddleware = createLogger()

let store = createStore(
  rootReducer,
  applyMiddleware(
    promiseMiddleware(),
    reduxMiddleware,
    thunkMiddleware, 
    loggerMiddleware 
  )
)

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb, username, password) {

    axios.get('/auth', {
        auth: {
          username: username,
          password: password
        },
        baseURL: 'https://cors-anywhere.herokuapp.com/https://paguemob-interview-environment.firebaseapp.com',
        headers: { 'Content-Type': 'application/json' }
      })
      .then((response) => {   
        this.isAuthenticated = true
        setTimeout(cb, 100) 
      })   
      .catch((error) => {
        this.isAuthenticated = false
        setTimeout(cb, 100)    
      })
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      fakeAuth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
)

const AuthButton = withRouter(
  ({ history }) => (
    <AppBar
      iconElementLeft={
        <img 
          style={{marginTop: '11px', marginLeft: '20px'}} 
          src="https://paguemob.com/img/logo-white.svg" />
      }
      iconElementRight={
        fakeAuth.isAuthenticated ? (
          <RaisedButton label="Sign out" 
            style={{marginTop: '5px', marginRight: '20px'}}
            onClick={() => { fakeAuth.signout(() => history.push("/")) }} />   
        ) : ''
      }
    />
  )
)

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#f05f40'
  }
})

class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
          <ReduxBlockUi
            tag="div"
            block={[/_PENDING/]}
            unblock={[/_FULFILLED/, /_REJECTED/]}
            loader={
              <CircularProgress size = {40}
              thickness = {4} />
            }>

          <Provider store={store}>
            <BrowserRouter>
              <div>
                <AuthButton />
                <Route exact path="/" render={() => (<Redirect to="/contacts"/>) }/>                
                <Route path="/login" render={(props) => (<Login {...props} fakeAuth={fakeAuth}/>)} />                
                <PrivateRoute path="/contacts" component={ContactList} />
                <PrivateRoute path="/new-contact" component={ContactForm} />
                <PrivateRoute path="/edit-contact/:id" component={ContactForm} />
                <div className="footer">
                  <small>Keep calm, it´s just a test.</small>
                  <br/>
                  <small>github.com/thiagocolen/paguemod-frontend-test</small>
                </div>
              </div>
            </BrowserRouter>
          </Provider>
        </ReduxBlockUi>

      </MuiThemeProvider>
    )
  }
}


export default App