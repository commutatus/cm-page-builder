import React from 'react'
import ContentEditable from './ContentEditable'
import '../styles/components/Heading.css';
import withComponent from './withComponent';


const WrappedHeader2 = (props) => {
  return(
    <ContentEditable 
      {...props}
      placeholder="Header"
      className="cm-header2"
    />
  )
}

export const Header2 = withComponent(WrappedHeader2)

