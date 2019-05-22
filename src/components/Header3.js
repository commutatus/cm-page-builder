import React from 'react'
import ContentEditable from './ContentEditable'
import '../styles/components/heading.css';


export class Header3 extends React.Component{

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
        placeholder="Header3"
        className="cm-header3"
      />
    )
  }
}