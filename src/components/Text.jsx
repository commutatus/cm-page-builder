import React from 'react'
import ContentEditable from './ContentEditable'
import withComponent from './withComponent'
import '../styles/components/Text.css';


const WrappedText = (props) =>  {
  return(
    <ContentEditable 
      {...props}
      placeholder="Start typing or choose a component..."
      className="cm-text-block"
    />
  )
}

export const Text = withComponent(WrappedText)