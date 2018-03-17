import React, { Component } from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import rootReducer from './reducers'
import Contacts from './components/contacts'
import './App.css'


let store = createStore(rootReducer)


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Route path="/contacts" component={Contacts} />
        </BrowserRouter>
      </Provider>
    )
  }
}


export default App