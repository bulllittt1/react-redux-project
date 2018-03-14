import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import App from './containers/ConnectedApp'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

const logger = createLogger()

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger)
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
