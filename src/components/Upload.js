import React from 'react'
import '../styles/components/Upload.css';

export class Upload extends React.Component{

  state={
    file: '',
    name: ''
  }

  uploadImage = (e, type) => {
    var picBase64 = ''
    if(e.target.files && e.target.files[0]){
      let fileName = e.target.files[0].name;
      let reader = new FileReader();
      reader.onload = (e) => {
        picBase64 = e.target.result;
        this.setState({file: picBase64, name: fileName})
      }
      reader.readAsDataURL(e.target.files[0]);
    }

  }
  
  render() {
    let {file} = this.state
    return(
      <div className="cm-uploader" onClick={() => this.fileInputElem.click()}>
        {
          file
          ?
          <img src={file} width="100%" height="400px" />
          :
          <React.Fragment>
            Click to upload file
            <input ref={node => this.fileInputElem = node} type="file" accept="image/*" hidden onChange={this.uploadImage} />
          </React.Fragment>
        }
      </div>
    )
  }
}