import React from 'react'
import '../styles/components/Upload.css';
import withComponent from './withComponent'
import { PermissionContext } from '../contexts/permission-context';
import DragHandle from './DragHandle'

class WrappedUpload extends React.Component{

  render() {
    let {image} = this.props
    // console.log(image)
    return(
      <PermissionContext.Consumer>
        {
          value => 
          <div className={`component-section cm-uploader ${value.status.toLowerCase()}`} onClick={() => this.fileInputElem && this.fileInputElem.click()}>
            {
              value.status === `Edit`
              &&
              <DragHandle handleAction={value.handleAction} id={this.props.id} /> 
            }
            {
              image
              ?
              <img src={image.url || image.content} width="100%" height="400px" alt={image.filename} />
              :
              <React.Fragment>
                <span><i className="cm-upload" /></span>
                Click to upload file
                <input ref={node => this.fileInputElem = node} type="file" accept="image/*" hidden onChange={this.props.uploadImage} />
              </React.Fragment>
            }
          </div>
        }
      </PermissionContext.Consumer>
    )
  }
}

export const Upload = withComponent(WrappedUpload)

