import React from 'react'
const getVideoUrl = (url) => {
    let videoid = url.replace(/(https{0,1}:\/\/){0,1}(www\.){0,1}((youtube.com\/{0,1}(watch\?v=){0,1})|(vimeo.com\/{0,1}))/g, "")
    if(url.includes('vimeo')){
      return `//player.vimeo.com/video/${videoid}`
    }
    else if(url.includes('youtube')){
      return `https://www.youtube.com/embed/${videoid}`
    }
    return ''
}
const withComponent = (WrappedComponent) => {
    class withComponent extends React.Component {

        state = {
            html: this.props.content,
            file: '',
            name: '',
            videoUrl: this.props.url || ''
        }

        _handleChanges = () => {
            this.setState({
                html: e.target.value, 
            }, () => {
                this.props.handleUpdate({content: this.state.html, id: this.props.id}, 'Title')
            })
        }

        _uploadImage = (e) => {
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

        _handleEmbed = () => {
            this.setState({
                videoUrl: getVideoUrl(e.target.value), 
            }, () => {
                this.props.handleUpdate({content: this.state.html, id: this.props.id}, 'Embed')
            })
        }
        
        render () {
            const { html, file, videoUrl } = this.state
            const { id, ...rest } = this.props
            return  <WrappedComponent
                        { ...rest }
                        html={html}
                        handleChange={this._handleChanges}
                        uploadImage={this._uploadImage}
                        id={id}
                        file={file}
                        videoUrl={videoUrl}
                        handleEmbed={this._handleEmbed}
                    />
        }
    }
    return withComponent
}

export default withComponent