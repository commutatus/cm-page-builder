import React from 'react'
import ContentEditable from './ContentEditable'
import withComponent from './withComponent'
import styles from "./../styles/components/List.module.css"
import classNames from "classnames/bind";
const cxList = classNames.bind(styles);
import stylesText from "./../styles/components/Text.module.css"
const cxText = classNames.bind(stylesText);

const WrappedOlist = (props) =>  {
  return(
    <div className={cxList("cm-o-list")}>
      <ContentEditable
          { ...props }
          html={props.html}
          onChange={props.handleChange}
          onInputChange={props.onInputChange}
          placeholder="Numbered list"
          className="cm-text-block"
          id={props.id}
          listOrder={<span>{props.order}.</span>}
      classGetter={cxText}
      />
    </div>
  )
}

export const Olist = withComponent(WrappedOlist)