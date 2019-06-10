import React from 'react'
import ContentEditable from './ContentEditable'
import '../styles/components/Heading.css';
import withComponent from './withComponent';


const WrappedHeader2 = (props) => {
  return(
    <ContentEditable 
      html={props.html}
      onChange={props.handleChange} 
      onInputChange={props.onInputChange}
      placeholder="Header2"
      className="cm-header2"
      id={props.id}
    />
  )
}

export const Header2 = withComponent(WrappedHeader2)

