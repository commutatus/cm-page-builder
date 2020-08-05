import React from 'react'
import Page from './page'
import './styles/App.css'

class App extends React.Component{
 
  render() {
    return (
      <div className="cm-editor">
        <Page  status={'Edit'} />
        <Page  status={'Read'} />
      </div>
    )
  }
}
export default App