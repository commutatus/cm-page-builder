import React from 'react'
import ContentEditable from './ContentEditable'
import styles from "./../styles/components/Heading.module.css"
import classNames from "classnames/bind";
const cx = classNames.bind(styles);


export class Header3 extends React.Component {

  state = {
    styles: {}
  }

  handleChange = (e) => {
    this.setState({
      value: [e.target.value],
    })
  }

  render() {
    return (
      <ContentEditable
        html={this.state.html}
        onChange={this.handleChange}
        placeholder="Header3"
        className="cm-header3"
        classGetter={cx}
      />
    )
  }
}