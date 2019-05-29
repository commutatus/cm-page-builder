import React from 'react'
import ContentEditable from './ContentEditable'
import '../styles/components/Title.css';

export class Title extends React.Component{

  state = {
    html: this.props.content
  }

  handleChange = (e) => {
    this.setState({
      html: e.target.value, 
    }, () => {
      this.props.handleUpdate({content: this.state.html}, 'Title')
    })
  }

  render(){
    return(
      <ContentEditable 
        html={this.state.html} 
        onChange={this.handleChange} 
        placeholder="Title of the page"
        className="cm-title"
      />
    )
  }
}