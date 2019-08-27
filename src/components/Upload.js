import React from 'react'
import '../styles/components/Upload.css';
import withComponent from './withComponent'
import { PermissionContext } from '../contexts/permission-context';
import {connect} from 'react-redux'
import { DirectUpload } from 'activestorage'
import {
  updateComponent
} from '../redux/reducers/appDataReducers'

class WrappedUpload extends React.Component{

  constructor(props){
    super(props)
    this.state = {}
    WrappedUpload.contextType = PermissionContext
  }

  getImageUploader = () => {
    return this.props.useDirectStorageUpload ?
      this._directStorageUpload :
      this._uploadImage
  }

  _uploadImage = (e, context) => {
    var content = ''
    if (e.target.files && e.target.files[0]) {
      let file = e.target.files[0];
      let reader = new FileReader();
      reader.onload = (e) => {
        content = e.target.result;
        this.props.updateComponent({id: this.props.id, newState: {component_attachment: {filename: file.name, content}, initial: false}})
      }
      reader.readAsDataURL(file);
    }
  }

  _directStorageUpload = (e, context) => {
    var content = ''
    if (e.target.files && e.target.files[0]) {
      let file = e.target.files[0]
      const upload = new DirectUpload(file, "/rails/active_storage/direct_uploads")
      upload.create((error, blob) => {
        if (error) {
          console.log("Error uploading the file to active storage")
          console.log(error)          
        } else {
          let signed_id = blob.signed_id
          let filename = blob.filename
          let url = `/rails/active_storage/blobs/${signed_id}/${filename}` // filename can be whatever
          this.props.updateComponent({
            id: this.props.id,
            newState: {component_attachment: {filename, signed_id, url}, initial: false}
          })
        }
      })
    }
  }

  render() {
    let {component_attachment} = this.props
    let {context} = this
    let isEdit = context.status === 'Edit'
    return(
      <div
        className={`component-section ${!isEdit && !component_attachment ? "" :'cm-uploader'} ${context.status.toLowerCase()} ${!component_attachment ? '' : 'hover-effect-none'}`}
        onClick={() => this.fileInputElem && this.fileInputElem.click()}
      >
        {
          component_attachment
          ?
          <img src={component_attachment.url || component_attachment.content} width="100%" alt={component_attachment.filename} />
          :
          isEdit &&
          <React.Fragment>
            <span><i className="cm-icon-upload" /></span>
            Click to upload file
            <input ref={node => this.fileInputElem = node} type="file" accept="image/*" hidden onChange={(e) => this.getImageUploader()(e, context)} />
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
