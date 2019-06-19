import React from 'react'
import ContentEditable from './ContentEditable'
import withComponent from './withComponent'
import '../styles/components/Title.css';

const WrappedTitle = (props) => {
    return(
      <ContentEditable 
        {...props}
        placeholder="Title of the page"
        className="cm-title"
      />
    )
}

export const Title = withComponent(WrappedTitle)