import React from 'react'
import ContentEditable from './ContentEditable'
import '../styles/components/Heading.css';
import withComponent from './withComponent'

const WrappedHeader1 = (props) => {

  return(
    <ContentEditable 
      {...props}
      placeholder="Header1"
      className="cm-header1"
    />
  )
}

export const Header1 = withComponent(WrappedHeader1)
  