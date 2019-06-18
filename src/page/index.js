import React from 'react'
import Page from './PageContainer'
import {Provider} from 'react-redux'
import {store} from '../redux/store'

export default (props) =>
  <Provider store={store}>
    <Page {...props} />
  </Provider>