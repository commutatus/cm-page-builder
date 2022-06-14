import React from 'react'
import ContentEditable from './ContentEditable'
import withComponent from './withComponent'
import styles from "./../styles/components/List.module.css"
import classNames from "classnames/bind";
const cxList = classNames.bind(styles);
import stylesText from "./../styles/components/Text.module.css"
const cxText = classNames.bind(stylesText);

const WrappedUlist = (props) => {
  return (
    <div className={cxList("cm-u-list")}>
      <ContentEditable
        {...props}
        html={props.html}
        onChange={props.handleChange}
        onInputChange={props.onInputChange}
        placeholder="Bulleted list"
        className="cm-text-block"
        id={props.id}
        data-component-type={'Ulist'}
        listOrder={<span className={cxList("bulleted-dot")}></span>}
        classGetter={cxText}
      />
    </div>
  )
}

export const Ulist = withComponent(WrappedUlist)