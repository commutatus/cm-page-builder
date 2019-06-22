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

  uploadImage = (e) => {
    var content = ''
    if (e.target.files && e.target.files[0]) {
      let fileName = e.target.files[0].name;
      let reader = new FileReader();
      reader.onload = (e) => {
        content = e.target.result;
        this.props.updateComponent({id: this.props.id, newState: {image: {filename: fileName, content}}})
      }
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  render() {
    let {image} = this.props
    return(
      <PermissionContext.Consumer>
        {
          value => 
          <div className={`component-section cm-uploader ${value.status.toLowerCase()}`} onClick={() => this.fileInputElem && this.fileInputElem.click()}>
            {
              image
              ?
              <img src={image.url || image.content} width="100%" height="400px" alt={image.filename} />
              :
              <React.Fragment>
                <span><i className="cm-upload" /></span>
                Click to upload file
                <input ref={node => this.fileInputElem = node} type="file" accept="image/*" hidden onChange={this.uploadImage} />
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

