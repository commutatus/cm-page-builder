import React from 'react'
import ContentEditable from './ContentEditable'
import withComponent from './withComponent'

const WrappedOlist = (props) =>  {
  return(
    <React.Fragment>
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
    </React.Fragment>
  )
}

export const Olist = withComponent(WrappedOlist)