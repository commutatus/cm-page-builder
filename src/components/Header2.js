import React from 'react'
import ContentEditable from './ContentEditable'
import withComponent from './withComponent';
import styles from "./../styles/components/Heading.module.css"
import classNames from "classnames/bind";
const cx = classNames.bind(styles);


const WrappedHeader2 = (props) => {
  return(
    <ContentEditable
      {...props}
      placeholder="Subheading"
      className="cm-header2"
      classGetter={cx}
    />
  )
}

export const Header2 = withComponent(WrappedHeader2)

