import React from 'react'
import '../styles/components/Upload.css';
import withComponent from './withComponent'
class WrappedUpload extends React.Component{

  render() {
    let {file} = this.props
    return(
      <div className="cm-uploader" onClick={() => this.fileInputElem.click()}>
        {
          file
          ?
          <img src={file} width="100%" height="400px" />
          :
          <React.Fragment>
            Click to upload file
            <input ref={node => this.fileInputElem = node} type="file" accept="image/*" hidden onChange={this.props.uploadImage} />
          </React.Fragment>
        }
      </div>
    )
  }
}

export const Upload = withComponent(WrappedUpload)

