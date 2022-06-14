import React from 'react'
import Page from './page'
import styles from "./styles/App.module.css"
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
class App extends React.Component{

  render() {
    return (
      <div className={cx("cm-editor")}>
        <div>
          <h1>Edit <span>(Click below to start editing...)</span></h1>
          <Page  status={'Edit'} />
        </div>
        <div>
        <h1>Preview</h1>
        <Page  status={'Read'} />
        </div>
      </div>
    )
  }
}
export default App