import React from 'react'
import ContentEditable from './ContentEditable'
import '../styles/components/Heading.css';


export class Header2 extends React.Component{

  state = {
    html: this.props.content
  }
  
  handleChange = (e) => {
    this.setState({
      html: e.target.value, 
    }, () => {
      this.props.handleUpdate({content: this.state.html, id: this.props.id}, 'Header2')
    })
  }


  render(){
    return(
      <ContentEditable 
        html={this.state.html}
        id={this.props.id} 
        onChange={this.handleChange} 
        onInputChange={this.props.onInputChange}
        placeholder="Header2"
        className="cm-header2"
        id={this.props.id}
      />
    )
  }
}