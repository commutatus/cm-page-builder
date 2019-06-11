import React from 'react'
import ContentEditable from './ContentEditable'
import withComponent from './withComponent'
import '../styles/components/Title.css';

const WrappedTitle = (props) => {
    return(
      <ContentEditable 
        html={props.html} 
        onChange={props.handleChange} 
        placeholder="Title of the page"
        className="cm-title"
        id={props.id}
        handleMouseUp={props.onMouseUp}
      />
    )
}

export const Title = withComponent(WrappedTitle)