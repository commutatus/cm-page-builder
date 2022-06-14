import React from 'react'
import ContentEditable from './ContentEditable'
import withComponent from './withComponent'
import styles from "./../styles/components/Text.module.css"
import classNames from "classnames/bind";
const cx = classNames.bind(styles);


const WrappedText = (props) =>  {
  return(
    <ContentEditable
      {...props}
      placeholder="Start typing or choose a component..."
      className="cm-text-block"
      classGetter={cx}
    />
  )
}

export const Text = withComponent(WrappedText)