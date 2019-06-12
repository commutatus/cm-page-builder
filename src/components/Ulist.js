import React from 'react'
import ContentEditable from './ContentEditable'
import withComponent from './withComponent'
import '../styles/components/List.css'

const WrappedUlist = (props) =>  {
  return(
    <div style={{display: 'flex'}}>
        <span className="bulleted-dot"></span>
        <ContentEditable 
          html={props.html} 
          onChange={props.handleChange}
          onInputChange={props.onInputChange}
          placeholder="Bulleted list"
          className="cm-text-block"
          id={props.id}
          unorderedList
        />
    </div>
  )
}

export const Ulist = withComponent(WrappedUlist) 