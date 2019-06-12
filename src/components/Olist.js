import React from 'react'
import ContentEditable from './ContentEditable'
import withComponent from './withComponent'
import '../styles/components/List.css'

const WrappedOlist = (props) =>  {
  return(
    <div style={{display: 'flex'}}>
        <span>{props.order}.</span>
        <ContentEditable 
            html={props.html} 
            onChange={props.handleChange}
            onInputChange={props.onInputChange}
            placeholder="Numbered list"
            className="cm-text-block"
            id={props.id}
            orderedList
        />
    </div>
  )
}

export const Olist = withComponent(WrappedOlist) 