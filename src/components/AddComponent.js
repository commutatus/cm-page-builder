import React from 'react'

class AddComponent extends React.Component{

  componentWillMount() {
    window.addEventListener('onkeypress', this.handleKeyPress)
  }

  componentWillUnmount() {
    window.removeEventListener('onkeypress', this.handleKeyPress)
  }

  render(){
    return(
      <div className="add-component-container">
        Start typing or chooose a component.
      </div>
    )
  }
}