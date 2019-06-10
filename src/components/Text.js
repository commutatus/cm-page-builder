import React from 'react'
import ContentEditable from './ContentEditable'
import withComponent from './withComponent'
import '../styles/components/Text.css';


const WrappedText = () =>  {
  return(
    <ContentEditable 
      html={props.html} 
      onChange={props.handleChange}
      onInputChange={this.props.onInputChange}
      placeholder="Start typing or choose a component..."
      className="cm-text-block"
      id={props.id}
    />
  )
}

export const Text = withComponent(WrappedText)