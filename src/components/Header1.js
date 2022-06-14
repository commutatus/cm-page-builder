import React from 'react'
import ContentEditable from './ContentEditable'
import withComponent from './withComponent'
import styles from "./../styles/components/Heading.module.css"
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const WrappedHeader1 = (props) => {

  return(
    <ContentEditable
      {...props}
      placeholder="Heading"
      className="cm-header1"
      classGetter={cx}
    />
  )
}

export const Header1 = withComponent(WrappedHeader1)
