import React from 'react'
import '../styles/components/Embed.css'
import withComponent from './withComponent'
import { PermissionContext } from '../contexts/permission-context';
import DragHandle from './DragHandle'
import {connect} from 'react-redux'
import {getVideoUrl} from '../utils/helpers'
import {
  updateComponent
} from '../redux/reducers/appDataReducers'

class WrappedEmbed extends React.Component{

  handleEmbed = (e, context) => {
    if (this.props.initial)
      context.emitUpdate(null, {client_reference_id: this.props.id, content: getVideoUrl(e.target.value), position: this.props.position, component_type: this.props.componentType}, 'createComponent')
    else
      context.emitUpdate(this.props.id, {content: getVideoUrl(e.target.value), position: this.props.position, component_type: this.props.componentType}, 'updateComponent')
    this.props.updateComponent({id: this.props.id, newState: {content: getVideoUrl(e.target.value), initial: false}})
  }

  render(){
    let {content} = this.props
    return(
      <PermissionContext.Consumer>
        {
          (value) => (
            <div className={`component-section cm-embed ${value.status.toLowerCase()}`}>
              {
                (content) 
                ?
                <iframe title="video-frame" className={`${value.status.toLowerCase()}`} width="100%" height="320px" src={content} />
                :
                <div className="embed-input-field">
                  <span className="embed-icon"><i className="cm-video" /></span>
                  <input 
                    data-root="true"
                    placeholder="Paste the URL from Vimeo or YouTube"
                    className="embed-input"
                    onBlur={(e) => this.handleEmbed(e, value)}
                  />
                </div>
              }
            </div>
          )
        }
        </PermissionContext.Consumer>
    )
  }
}

const mapDispatchToProps = {
  updateComponent
}

export const Embed = withComponent(connect(state => state, mapDispatchToProps)(WrappedEmbed))
