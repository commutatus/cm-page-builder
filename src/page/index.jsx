import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import Page from './PageContainer'

const PageBuilder = (props) =>
  <Provider store={store}>
    <Page {...props} />
  </Provider>

export default PageBuilder;