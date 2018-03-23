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
import ContactFormUserInfo from './components/ContactFormUserInfo'
import ContactFormAddress from './components/ContactFormAddress'
import Login from './components/Login'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import './App.css'

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
  ({ history }) =>
    fakeAuth.isAuthenticated ? (
      <p>
        Welcome!{" "}
        <button
          onClick={() => {
            fakeAuth.signout(() => history.push("/"))
          }}
        >
          Sign out
        </button>
      </p>
    ) : (
      <p>You are not logged in.</p>
    )
)

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
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
                <PrivateRoute path="/new-contact-step-1" component={ContactFormUserInfo} />
                <PrivateRoute path="/new-contact-step-2" component={ContactFormAddress} />
                <PrivateRoute path="/edit-contact-step-1/:id" component={ContactFormUserInfo} />
                <PrivateRoute path="/edit-contact-step-2/:id" component={ContactFormAddress} />
              </div>
            </BrowserRouter>
          </Provider>
        </ReduxBlockUi>

      </MuiThemeProvider>
    )
  }
}


export default App