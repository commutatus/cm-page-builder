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

  state = {
    videoUrl: this.props.url || ''
  }

  handleChange = (e) => {
    this.setState({
      videoUrl: getVideoUrl(e.target.value), 
    }, () => {
      this.props.handleUpdate({content: this.state.html, id: this.props.id}, 'Embed')
    })
  }

  render(){
    let {videoUrl} = this.state
    return(
      <div className="cm-embed">
        {
          videoUrl 
          ?
          <iframe title="video-frame" width="100%" height="320px" src={this.state.videoUrl} />
          :
          <React.Fragment>
            <span className="embed-icon"><i className="cm-video" /></span>
            <input 
              placeholder="Paste the URL from Vimeo or YouTube"
              className="embed-input"
              onBlur={this.handleChange}
            />
          </React.Fragment>
        }
      </div>
    )
  }
}
