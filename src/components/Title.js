import React from 'react'
import ContentEditable from './ContentEditable'
import '../styles/components/Title.css';

export class Title extends React.Component{

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
        placeholder="Title"
        className="cm-title"
      />
    )
  }
}