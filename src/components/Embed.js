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
        <input 
          placeholder="embed"
          onBlur={props.handleEmbed}
        />
      }
    </div>
  )
}

export const Embed = withComponent(WrappedEmbed)