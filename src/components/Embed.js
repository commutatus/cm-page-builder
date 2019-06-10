import React from 'react'
import '../styles/components/Embed.css'
import ContentEditable from './ContentEditable';

const getVideoUrl = (url) => {
  let videoid = url.replace(/(https{0,1}:\/\/){0,1}(www\.){0,1}((youtube.com\/{0,1}(watch\?v=){0,1})|(vimeo.com\/{0,1}))/g, "")
  if(url.includes('vimeo')){
    return `//player.vimeo.com/video/${videoid}`
  }
  else if(url.includes('youtube')){
    return `https://www.youtube.com/embed/${videoid}`
  }
  return ''
}
export class Embed extends React.Component{

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
          <input 
            placeholder="embed"
            onBlur={this.handleChange}
          />
        }
      </div>
    )
  }
}