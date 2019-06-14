import React from 'react'
import '../styles/components/Embed.css'
import withComponent from './withComponent'
import { PermissionContext } from '../contexts/permission-context';
import DragHandle from './DragHandle'

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
              <DragHandle handleAction={value.handleAction} id={props.id} /> 
            }
            {
              (videoUrl) 
              ?
              <iframe title="video-frame" className={`${value.status.toLowerCase()}`} width="100%" height="320px" src={videoUrl} />
              :
              <div className="embed-input-field">
                <span className="embed-icon"><i className="cm-video" /></span>
                <input 
                  placeholder="Paste the URL from Vimeo or YouTube"
                  className="embed-input"
                  onBlur={props.handleEmbed}
                />
              </div>
            }
          </div>
        )
      }
      </PermissionContext.Consumer>
  )
}

export const Embed = withComponent(WrappedEmbed)
