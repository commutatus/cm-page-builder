import React from 'react'
import '../styles/components/Embed.css'
import withComponent from './withComponent'

const WrappedEmbed = (props) => {
  let {videoUrl} = props
  return(
    <div className="cm-embed">
      {
        videoUrl 
        ?
        <iframe title="video-frame" width="100%" height="320px" src={videoUrl} />
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

export const Embed = withComponent(WrappedEmbed)
