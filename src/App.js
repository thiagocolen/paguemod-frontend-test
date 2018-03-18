import React, { Component } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
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

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import './App.css'


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
                <Route path="/contacts" component={ContactList} />
                <Route path="/new-contact-step-1" component={ContactFormUserInfo} />
                <Route path="/new-contact-step-2" component={ContactFormAddress} />
                <Route path="/edit-contact-step-1/:id" component={ContactFormUserInfo} />
                <Route path="/edit-contact-step-2/:id" component={ContactFormAddress} />
              </div>
            </BrowserRouter>
          </Provider>
        </ReduxBlockUi>

      </MuiThemeProvider>
    )
  }
}


export default App