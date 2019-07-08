import React from 'react'
import '../styles/components/Upload.css';
import withComponent from './withComponent'
import { PermissionContext } from '../contexts/permission-context';
import {connect} from 'react-redux'
import {
  updateComponent
} from '../redux/reducers/appDataReducers'

class WrappedUpload extends React.Component{

  constructor(props){
    super(props)
    this.state = {}
    WrappedUpload.contextType = PermissionContext
  }  

  uploadImage = (e, context) => {
    var content = ''
    if (e.target.files && e.target.files[0]) {
      let fileName = e.target.files[0].name;
      let reader = new FileReader();
      reader.onload = (e) => {
        content = e.target.result;
        this.props.updateComponent({id: this.props.id, newState: {component_attachment: {filename: fileName, content}, initial: false}})
      }
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  render() {
    let {component_attachment} = this.props
    let {context} = this
    let isEdit = context.status === 'Edit'
    return(
      <div 
        className={`component-section ${!isEdit && !component_attachment ? "" :'cm-uploader'} ${context.status.toLowerCase()}`} 
        onClick={() => this.fileInputElem && this.fileInputElem.click()}
      >
        {
          component_attachment
          ?
          <img src={component_attachment.url || component_attachment.content} width="100%" alt={component_attachment.filename} />
          :
          isEdit &&
          <React.Fragment>
            <span><i className="cm-upload" /></span>
            Click to upload file
            <input ref={node => this.fileInputElem = node} type="file" accept="image/*" hidden onChange={(e) => this.uploadImage(e, context)} />
          </React.Fragment>
        }
      </div>
    )
  }
}

const mapDispatchToProps = {
  updateComponent
}

export const Upload = withComponent(connect(null, mapDispatchToProps)(WrappedUpload))

