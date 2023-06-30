import React from 'react'
import withComponent from './withComponent'
import { PermissionContext } from '../contexts/permission-context';
import { connect } from 'react-redux'
import { getVideoUrl } from '../utils/helpers'
import {
  updateComponent
} from '../redux/reducers/appDataReducers'
import styles from "./../styles/components/Embed.module.css"
import pageStyles from "../styles/page.module.css";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
const cxPage = classNames.bind(pageStyles)

class WrappedEmbed extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
    WrappedEmbed.contextType = PermissionContext
  }

  handleEmbed = (e) => {
    this.props.updateComponent({ id: this.props.id, newState: { content: getVideoUrl(e.target.value), initial: false } })
  }

  render() {
    let { content } = this.props
    let { context } = this
    let isEdit = context.status === 'Edit'
    return (
      <div className={cx(
        cxPage("component-section"), "cm-embed", context.status.toLowerCase(), { 'hover-effect-none': content }
      )}>
        {
          (content)
            ?
            <iframe
              title="video-frame"
              className={cx(context.status.toLowerCase())}
              width="100%"
              height="320px"
              src={content}
            />
            :
            isEdit &&
            <div className={cx("embed-input-field")}>
              <span className={cx("embed-icon")}><i className={cx("fa-light fa-clapperboard-play")} /></span>
              <input
                data-root="true"
                placeholder="Paste the URL from Vimeo or YouTube"
                className={cx("embed-input")}
                onBlur={(e) => this.handleEmbed(e)}
              />
            </div>
        }
      </div>
    )
  }
}

const mapDispatchToProps = {
  updateComponent
}

export const Embed = withComponent(connect(null, mapDispatchToProps)(WrappedEmbed))
