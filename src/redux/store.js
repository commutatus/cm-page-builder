import {createStore, compose, applyMiddleware} from 'redux';
import appReducers from './reducers/appReducers'

export const store = createStore(appReducers)