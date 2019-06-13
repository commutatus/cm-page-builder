import React from 'react'
import '../styles/components/Embed.css'
import withComponent from './withComponent'
import { PermissionContext } from '../contexts/permission-context';

const WrappedEmbed = (props) => {
  let {videoUrl, showMoreOptions} = props
  return(
    <PermissionContext.Consumer>
      {
        (value) => (
          <div className="component-section cm-embed">
            {
              value.status === `Edit`
              &&
              <div className="component-dragger" onClick={(e) => props.optionHandleClick(e, value.handleAction)}><i className="cm cm-handle" />
                {
                  showMoreOptions &&
                  <div onMouseUp={(e) => e.stopPropagation()}>test</div>
                }
              </div>
            }
            {
              (videoUrl) 
              ?
              <iframe title="video-frame" className={`${value.status.toLowerCase()}`} width="100%" height="320px" src={videoUrl} />
              :
              <React.Fragment>
                <span className="embed-icon"><i className="cm-video" /></span>
                <input 
                  placeholder="Paste the URL from Vimeo or YouTube"
                  className="embed-input"
                  onBlur={props.handleEmbed}
                />
              </React.Fragment>
            }
          </div>
        )
      }
      </PermissionContext.Consumer>
  )
}

export const Embed = withComponent(WrappedEmbed)
