import React from 'react'
import ContentEditable from './ContentEditable'
import '../styles/components/Text.css';


export class Text extends React.Component{

  state = {
    html: this.props.content
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value, 
    }, () => {
      this.props.handleUpdate({content: this.state.html, id: this.props.id}, 'Title')
    })
  }


  render(){
    return(
      <ContentEditable 
        html={this.state.html} 
        onChange={this.handleChange}
        onInputChange={this.props.onInputChange}
        placeholder="Start typing or choose a component..."
        className="cm-text-block"
        id={this.props.id}
      />
    )
  }
}