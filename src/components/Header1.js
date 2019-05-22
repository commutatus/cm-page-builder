import React from 'react'
import ContentEditable from './ContentEditable'
import '../styles/components/header1.css';


export class Header1 extends React.Component{

  state = {
    styles: {}
  }

  handleChange = (e) => {
    this.setState({
      value: [e.target.value], 
    })
  }

  render(){
    return(
      <ContentEditable 
        html={this.state.html} 
        onChange={this.handleChange} 
        placeholder="Header1"
        className="cm-header1"
      />
    )
  }
}
  