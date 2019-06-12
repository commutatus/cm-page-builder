import React from 'react'
import ContentEditable from './ContentEditable'
import withComponent from './withComponent'
import '../styles/components/Text.css';

const WrappedUlist = (props) =>  {
  return(
    <React.Fragment>
        <span className="bulleted-dot"></span>
        <ContentEditable 
            html={props.html} 
            onChange={props.handleChange}
            onInputChange={props.onInputChange}
            placeholder="Bulleted list"
            className="cm-text-block"
            id={props.id}
        />
    </React.Fragment>
  )
}

export const Ulist = withComponent(WrappedUlist)