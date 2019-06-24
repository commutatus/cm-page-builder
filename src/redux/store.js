import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import appReducers from './reducers/appReducers'

const logger = createLogger({
  // ...options
});
export const store = compose(
	applyMiddleware(
    thunk, 
    // logger
  )
)(createStore)(appReducers) //reducers
