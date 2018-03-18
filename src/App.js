import React, { Component } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import promiseMiddleware from 'redux-promise-middleware'
import rootReducer from './reducers'
import ContactList from './components/ContactList'
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
      <Provider store={store}>
        <BrowserRouter>
          <Route path="/contacts" component={ContactList} />
        </BrowserRouter>
      </Provider>
    )
  }
}


export default App