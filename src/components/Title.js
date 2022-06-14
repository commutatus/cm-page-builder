import React from 'react'
import ContentEditable from './ContentEditable'
import withComponent from './withComponent'
import styles from "./../styles/components/Title.module.css"
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const WrappedTitle = (props) => {
  return (
    <ContentEditable
      {...props}
      id="page-title"
      placeholder="Title of the page"
      className="cm-title"
      classGetter={cx}
    />
  )
}

export const Title = withComponent(WrappedTitle)