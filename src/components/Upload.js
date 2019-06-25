import React from 'react'
import '../styles/components/Upload.css';
import withComponent from './withComponent'
import { PermissionContext } from '../contexts/permission-context';
import DragHandle from './DragHandle'
import {connect} from 'react-redux'
import {
  updateComponent
} from '../redux/reducers/appDataReducers'

class WrappedUpload extends React.Component{

  constructor(props){
    super(props)
    this.state = {}
  }

  uploadImage = (e, context) => {
    var content = ''
    if (e.target.files && e.target.files[0]) {
      let fileName = e.target.files[0].name;
      let reader = new FileReader();
      reader.onload = (e) => {
        content = e.target.result;
        if (this.props.initial) 
          context.emitUpdate(null, {client_reference_id: this.props.id,  component_attachment: { filename: fileName, content }, position: this.props.position, component_type: this.props.componentType}, 'createComponent')
        else
         context.emitUpdate(this.props.id, { component_attachment: { filename: fileName, content }, position: this.props.position, component_type: this.props.componentType }, 'updateComponent')
        this.props.updateComponent({id: this.props.id, newState: {component_attachment: {filename: fileName, content}, initial: false}})
      }
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  render() {
    let {component_attachment} = this.props
    return(
      <PermissionContext.Consumer>
        {
          value => 
          <div className={`component-section cm-uploader ${value.status.toLowerCase()}`} onClick={() => this.fileInputElem && this.fileInputElem.click()}>
            {
              component_attachment
              ?
              <img src={component_attachment.url || component_attachment.content} width="100%" height="400px" alt={component_attachment.filename} />
              :
              <React.Fragment>
                <span><i className="cm-upload" /></span>
                Click to upload file
                <input ref={node => this.fileInputElem = node} type="file" accept="image/*" hidden onChange={(e) => this.uploadImage(e, value)} />
              </React.Fragment>
            }
          </div>
        }
      </PermissionContext.Consumer>
    )
  }
}

const mapDispatchToProps = {
  updateComponent
}

export const Upload = withComponent(connect(null, mapDispatchToProps)(WrappedUpload))

