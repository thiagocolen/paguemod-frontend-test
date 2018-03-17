import React, { Component } from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import './App.css'


let store = createStore(rootReducer)


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <h1>asd</h1>
        </div>
      </Provider>
    );
  }
}


export default App