import React from 'react'
import Page from './page'
import './styles/App.css'

class App extends React.Component{
 
  render() {
    return (
      <div className="cm-editor">
        <div>
          <h1>Edit <span>(Click below to start editing...)</span></h1>
          <Page  status={'Edit'} />
        </div>
        <div>
        <h1>Preview</h1>
        <Page  status={'Read'} />
        </div>
      </div>
    )
  }
}
export default App