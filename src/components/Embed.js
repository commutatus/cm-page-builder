import React from 'react'
import '../styles/components/Embed.css'
import withComponent from './withComponent'
import { PermissionContext } from '../contexts/permission-context';
import {connect} from 'react-redux'
import {getVideoUrl} from '../utils/helpers'
import {
  updateComponent
} from '../redux/reducers/appDataReducers'

class WrappedEmbed extends React.Component{

  constructor(props){
    super(props)
    this.state = {}
    WrappedEmbed.contextType = PermissionContext
  }

  handleEmbed = (e) => {
    this.props.updateComponent({id: this.props.id, newState: {content: getVideoUrl(e.target.value), initial: false}})
  }
  
  render(){
    let {content} = this.props
    let { context } = this
    return(
      <div className={`component-section cm-embed ${context.status.toLowerCase()}`}>
        {
          (content) 
          ?
          <iframe title="video-frame" className={`${context.status.toLowerCase()}`} width="100%" height="320px" src={content} />
          :
          <div className="embed-input-field">
            <span className="embed-icon"><i className="cm-video" /></span>
            <input 
              data-root="true"
              placeholder="Paste the URL from Vimeo or YouTube"
              className="embed-input"
              onBlur={(e) => this.handleEmbed(e, context)}
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
