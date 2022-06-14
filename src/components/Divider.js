import React from 'react'
import { PermissionContext } from '../contexts/permission-context';
import pageStyles from "../styles/page.module.css";
import styles from "./../styles/components/Divider.module.css"
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
const cxPage = classNames.bind(pageStyles);

export const Divider = () => {
  return (
    <PermissionContext.Consumer>
      {
        value =>
          <div className={cxPage("component-section", value.status.toLowerCase())}>
            <div className={cx("divider", value.status.toLowerCase())}>
              <div className={cx("separator")}></div>
            </div>
          </div>

      }
    </PermissionContext.Consumer>
  )
}
