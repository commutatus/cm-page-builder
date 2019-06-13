import React from 'react'
import '../styles/components/Upload.css';
import withComponent from './withComponent'
import { PermissionContext } from '../contexts/permission-context';
class WrappedUpload extends React.Component{

  render() {
    let {image} = this.props
    return(
      <PermissionContext.Consumer>
        {
          value => 
          <div className={`component-sectioncm-uploader ${value.status.toLowerCase()}`} onClick={() => this.fileInputElem.click()}>
            {
              value.status === `Edit`
              &&
              <div className="component-dragger" onClick={(e) => props.optionHandleClick(e, value.handleAction)}><i className="cm cm-handle" />
                {/* {
                  showMoreOptions &&
                  <div onMouseUp={(e) => e.stopPropagation()}>test</div>
                } */}
              </div>
            }
            {
              image
              ?
              <img src={image.url} width="100%" height="400px" alt={image.filename} />
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

