import React from 'react';
import '../styles/components/Upload.css';
import withComponent from './withComponent';
import { PermissionContext } from '../contexts/permission-context';
import { connect } from 'react-redux';
import { DirectUpload } from 'activestorage';
import { updateComponent } from '../redux/reducers/appDataReducers';
import { CircularProgressbar } from 'react-circular-progressbar'; // Package for progress bar
import 'react-circular-progressbar/dist/styles.css';
import { bytesToSize } from '../utils/helpers'; // Stylesheet for progress bar
import { S3_BASE_URL } from '../utils/constant';
import Loader from './Loader';
//const acceptedExtensions = [ 'pdf', 'xls', 'docx', 'doc', 'csv', 'zip' ]

class WrappedUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploaded: false,
      file: props.componentType === 'File',
      externalImageResponse: null
    };
    WrappedUpload.contextType = PermissionContext;
  }

  componentWillMount() {
    const { component_attachment, content, componentType } = this.props;
    if (typeof content === 'object')
      this.getImageUploader()(this.props.content, null, true);
    if (component_attachment && componentType === 'File') {
      let name = component_attachment.filename.split('.')[0];
      let ext = component_attachment.filename.split('.')[1].toLowerCase();
      let fileInfo = {
        name,
        ext,
        size: bytesToSize(component_attachment.filesize),
      };
      this.setState({ fileInfo });
    }
  }

  componentWillReceiveProps = nextProps => {
    const { progressInfo, externalImageResponse } = nextProps;
    if (
      progressInfo &&
      progressInfo.progress &&
      nextProps.id === progressInfo.progress.id &&
      progressInfo.progress.operation === `UpdatePageComponentMutation`
    )
      if (progressInfo.progress.percent < 100 && this.state.uploading) {
        this.setState({ uploadProgress: progressInfo.progress.percent });
      } else if (
        this.state.uploadProgress < 100 &&
        progressInfo.progress.percent === 100
      ) {
        setTimeout(() => {
          this.setState({ uploadProgress: 100, uploading: false });
        }, 2000);
      }
    // else if (this.state.uploading && progressInfo.progress.percent === 100 && this.state.uploadProgress === 1)
    //   this.setState({ uploading: false })
    if (externalImageResponse && 
        this.props.externalImageResponse !== externalImageResponse &&
        nextProps.id === externalImageResponse.client_reference_id
      ) {
      this.setState({ externalImageResponse })
    }
  };

  getImageUploader = () => {
    return this.props.useDirectStorageUpload
      ? this._directStorageUpload
      : this._uploadImage;
  };

  _uploadImage = (e, context, isFile) => {
    var content = '';
    if (isFile || (e.target.files && e.target.files[0])) {
      let file = isFile ? e : e.target.files[0];
      let extension = file.name
        .split('.')
        .pop()
        .toLowerCase();
      let reader = new FileReader();
      let fileInfo = {
        name: file.name.split('.')[0],
        ext: extension,
        size: bytesToSize(file.size),
      };
      this.setState({ fileInfo });
      reader.onloadstart = e => {
        this.setState({ uploading: true });
      };
      reader.onload = e => {
        content = e.target.result;
        this.setState({ uploaded: true });
        this.props.updateComponent({
          id: this.props.id,
          newState: {
            component_attachment: { filename: file.name, content },
            initial: false,
          },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  _directStorageUpload = (e, context) => {
    var content = '';
    if (e.target.files && e.target.files[0]) {
      let file = e.target.files[0];
      const upload = new DirectUpload(
        file,
        '/rails/active_storage/direct_uploads',
      );
      upload.create((error, blob) => {
        if (error) {
          console.log('Error uploading the file to active storage');
          console.log(error);
        } else {
          let signed_id = blob.signed_id;
          let filename = blob.filename;
          let url = `/rails/active_storage/blobs/${signed_id}/${filename}`; // filename can be whatever
          this.props.updateComponent({
            id: this.props.id,
            newState: {
              component_attachment: { filename, signed_id, url },
              initial: false,
            },
          });
        }
      });
    }
  };

  // Method to get file size from base 64 string
  // getFileSize = (base64String) => {
  //   var stringLength = base64String.length - 'data:image/png;base64,'.length;

  //   var sizeInBytes = 4 * Math.ceil((stringLength / 3))*0.5624896334383812;
  //   var sizeInKb=sizeInBytes/1000;
  // }

  getFileIcon = ext => {
    switch (ext) {
      case 'pdf':
        return `${S3_BASE_URL}/icons/pdf.svg`;
      case 'doc':
      case 'docx':
        return `${S3_BASE_URL}/icons/document.svg`;
      case 'xls':
        return `${S3_BASE_URL}/icons/spreadsheet.svg`;
      case 'zip':
        return `${S3_BASE_URL}/icons/zip.svg`;
      default:
        return `${S3_BASE_URL}/icons/document.svg`;
    }
  };

  render() {
    let { component_attachment } = this.props;
    const { uploadProgress, fileInfo, uploaded, file, uploading, externalImageResponse } = this.state;
    let { context } = this;
    let isEdit = context.status === 'Edit';
    return (
      <div
        className={`component-section ${
          !isEdit && !component_attachment ? '' : 'cm-uploader'
        } ${context.status.toLowerCase()} ${
          !component_attachment ? '' : 'hover-effect-none'
        }`}
        onClick={() => this.fileInputElem && this.fileInputElem.click()}
      >
        {// UI to show for file uploads
        fileInfo && file && (
          <a
            href={component_attachment && component_attachment.url}
            style={{ textDecoration: 'none' }}
            target="_blank"
          >
            <div className="file-data-section">
              <div className="file-data-icon">
                <img
                  src={this.getFileIcon(fileInfo.ext)}
                  alt="Alt image"
                  className="file-data-icon-img"
                />
              </div>
              <div className="file-data-information">
                <div className="file-data-name">{fileInfo.name}</div>
                <div className="file-data-extension">
                  {`${fileInfo.ext.toUpperCase()} file (${fileInfo.size})`}
                  {uploadProgress && uploadProgress < 100 && (
                    <div className="file-data-loader">
                      <CircularProgressbar value={uploadProgress} />
                      <div className="file-data-loader-percent">{` ${uploadProgress}%`}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </a>
        )}

        {// UI to show for image upload
        component_attachment && !file && (
          <div className="image-upload">
              {
                //check for external image url & blur until saved on API
                ((component_attachment.url && (component_attachment.url).includes(this.props.assetBaseUrl)) || component_attachment.content) ?
                  <img
                    src={component_attachment.url || component_attachment.content}
                    width="100%"
                    alt={component_attachment.filename}
                  />
                  :
                  <div className='external-image'>
                      <img
                        src={component_attachment.url || component_attachment.content}
                        width="100%"
                        style={externalImageResponse ? {} : { filter: 'blur(5px)' }}
                        alt={component_attachment.filename}
                      />
                      {!externalImageResponse && <div className='blur-image-loader'><Loader/></div>}
                  </div>
              }
              <div className="file-data-loader-section">
                {uploadProgress && uploadProgress < 100 && (
                  <div className="file-data-loader">
                    <CircularProgressbar value={uploadProgress} />
                    <div className="file-data-loader-percent">{` ${uploadProgress}%`}</div>
                  </div>
                )}
              </div>
            </div>
          )}
        {isEdit && !uploading && !component_attachment && (
          <React.Fragment>
            <span>
              <i className="cm-icon-upload" />
            </span>
            Click to upload file
            {!uploaded && (
              <input
                ref={node => (this.fileInputElem = node)}
                type="file"
                accept={!file ? `image/*` : `*`}
                hidden
                onChange={e => this.getImageUploader()(e, context)}
              />
            )}
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = {
  updateComponent,
};

export const Upload = withComponent(
  connect(
    null,
    mapDispatchToProps,
  )(WrappedUpload),
);
