import React from 'react'
import ContentEditable from './ContentEditable'
import '../styles/components/Heading.css';
import withComponent from './withComponent'

const WrappedHeader1 = (props) => {

  return(
    <ContentEditable 
      html={props.html}
      onChange={props.handleChange}
      onInputChange={props.onInputChange}
      placeholder="Header1"
      className="cm-header1"
      id={props.id}
    />
  )
}

export const Header1 = withComponent(WrappedHeader1)
  