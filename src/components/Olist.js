import React from 'react'
import ContentEditable from './ContentEditable'
import withComponent from './withComponent'
import '../styles/components/List.css'
import '../styles/components/Text.css'

const WrappedOlist = (props) =>  {
  return(
    <div className="cm-o-list">
      <ContentEditable 
          { ...props }
          html={props.html} 
          onChange={props.handleChange}
          onInputChange={props.onInputChange}
          placeholder="Numbered list"
          className="cm-text-block"
          id={props.id}
          listOrder={<span>{props.order}.</span>}
      />
    </div>
  )
}

export const Olist = withComponent(WrappedOlist) 