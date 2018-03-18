import React, { Component } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import promiseMiddleware from 'redux-promise-middleware'
import rootReducer from './reducers'

import ContactList from './components/ContactList'
import ContactFormUserInfo from './components/ContactFormUserInfo'
import ContactFormAddress from './components/ContactFormAddress'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import './App.css'


const loggerMiddleware = createLogger()

let store = createStore(
  rootReducer,
  applyMiddleware(
    promiseMiddleware(),
    thunkMiddleware, 
    loggerMiddleware 
  )
)


class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Provider store={store}>
          <BrowserRouter>
            <div>
              <Route path="/contacts" component={ContactList} />
              <Route path="/new-contact-step-1" component={ContactFormUserInfo} />
              <Route path="/new-contact-step-2" component={ContactFormAddress} />
            </div>
          </BrowserRouter>
        </Provider>
      </MuiThemeProvider>
    )
  }
}


export default App